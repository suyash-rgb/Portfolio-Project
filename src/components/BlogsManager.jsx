import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Plus, Trash2, Edit2, ExternalLink, BookOpen, Image, Calendar, Clock } from 'lucide-react';

const defaultBlogs = [
    {
        id: 'seed-blog-1',
        title: 'Beyond AI Guardrails and Refusals: Why LMS Platforms Must Own Their Anti-Cheat Engines',
        excerpt: 'A deep dive into why modern learning management platforms and interview tools cannot rely solely on model-level refusals, and why native anti-cheat architectures are vital.',
        medium_url: 'https://medium.com/@suyashbaoney58/beyond-ai-guardrails-and-refusals-why-lms-platforms-must-own-their-anti-cheat-engines-e6ffc1a5cd83',
        tags: ['AI Safety', 'EdTech', 'Machine Learning', 'Anti-Cheat'],
        read_time: '7 min read',
        published_date: '2026-10-01'
    }
];

export default function BlogsManager({ user, onRequireAuth }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form state
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [mediumUrl, setMediumUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [readTime, setReadTime] = useState('5 min read');
    const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
    const [uploadingImage, setUploadingImage] = useState(false);

    const fetchBlogs = async () => {
        if (!isSupabaseConfigured) {
            setBlogs(defaultBlogs);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('published_date', { ascending: false });

            if (error) throw error;
            setBlogs(data && data.length > 0 ? data : defaultBlogs);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setBlogs(defaultBlogs);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const openCreateModal = () => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(null);
        setTitle('');
        setExcerpt('');
        setMediumUrl('');
        setThumbnailUrl('');
        setTagsInput('');
        setReadTime('5 min read');
        setPublishedDate(new Date().toISOString().split('T')[0]);
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(item);
        setTitle(item.title);
        setExcerpt(item.excerpt || '');
        setMediumUrl(item.medium_url || '');
        setThumbnailUrl(item.thumbnail_url || '');
        setTagsInput(Array.isArray(item.tags) ? item.tags.join(', ') : '');
        setReadTime(item.read_time || '5 min read');
        setPublishedDate(item.published_date || new Date().toISOString().split('T')[0]);
        setModalOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isSupabaseConfigured || !user) {
            alert('Please connect Supabase and log in as Admin to upload thumbnails.');
            return;
        }

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `blog-${Date.now()}.${fileExt}`;
            const filePath = `blogs/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            setThumbnailUrl(publicUrl);
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const tags = tagsInput
            .split(',')
            .map(t => t.trim())
            .filter(Boolean);

        const payload = {
            title,
            excerpt,
            medium_url: mediumUrl,
            thumbnail_url: thumbnailUrl,
            tags,
            read_time: readTime,
            published_date: publishedDate
        };

        if (!isSupabaseConfigured) {
            if (editingItem) {
                setBlogs(blogs.map(b => b.id === editingItem.id ? { ...b, ...payload } : b));
            } else {
                setBlogs([{ id: `local-${Date.now()}`, ...payload }, ...blogs]);
            }
            setModalOpen(false);
            return;
        }

        try {
            if (editingItem && !editingItem.id.toString().startsWith('seed-')) {
                const { error } = await supabase
                    .from('blogs')
                    .update(payload)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('blogs')
                    .insert([payload]);
                if (error) throw error;
            }

            setModalOpen(false);
            fetchBlogs();
        } catch (err) {
            alert('Failed to save article: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        if (!isSupabaseConfigured) {
            setBlogs(blogs.filter(b => b.id !== id));
            return;
        }

        if (!user) {
            onRequireAuth();
            return;
        }

        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchBlogs();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    return (
        <section>
            <div className="section-action-header">
                <div>
                    <h2>Articles & Medium Blog Manager</h2>
                    <p>Publish and organize technical articles, Medium links, and thumbnails.</p>
                </div>
                <button className="btn-primary" onClick={openCreateModal}>
                    <Plus size={16} />
                    <span>Add Article</span>
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Loading articles...
                </div>
            ) : (
                <div className="cms-grid">
                    {blogs.map((item) => (
                        <div key={item.id} className="cms-card">
                            <div className="card-top">
                                <span className="badge badge-cyan">
                                    <Clock size={11} style={{ marginRight: '4px' }} />
                                    {item.read_time || '5 min read'}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={12} />
                                    {item.published_date}
                                </span>
                            </div>

                            {item.thumbnail_url && (
                                <div style={{
                                    height: '140px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    marginBottom: '14px',
                                    background: '#f1f5f9'
                                }}>
                                    <img 
                                        src={item.thumbnail_url} 
                                        alt={item.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <h3>{item.title}</h3>
                            <p>{item.excerpt}</p>

                            <div className="card-tags">
                                {item.tags && item.tags.map((tag, i) => (
                                    <span key={i} className="tag-pill">#{tag}</span>
                                ))}
                            </div>

                            <div className="card-footer">
                                <div className="card-links">
                                    {item.medium_url && (
                                        <a href={item.medium_url} target="_blank" rel="noreferrer" title="Open Article">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <div className="card-actions">
                                    <button 
                                        className="btn-secondary" 
                                        onClick={() => openEditModal(item)}
                                        style={{ padding: '6px 10px' }}
                                    >
                                        <Edit2 size={13} />
                                    </button>
                                    <button 
                                        className="btn-danger" 
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingItem ? 'Edit Article' : 'New Article'}</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label>Article Title *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Beyond AI Guardrails and Refusals..." 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label>Excerpt / Summary</label>
                                <textarea 
                                    rows="3" 
                                    placeholder="Brief overview of the article..." 
                                    value={excerpt} 
                                    onChange={e => setExcerpt(e.target.value)} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Medium / Article URL *</label>
                                <input 
                                    type="url" 
                                    placeholder="https://medium.com/@suyashbaoney58/..." 
                                    value={mediumUrl} 
                                    onChange={e => setMediumUrl(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Read Time</label>
                                    <input 
                                        type="text" 
                                        placeholder="7 min read" 
                                        value={readTime} 
                                        onChange={e => setReadTime(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Published Date</label>
                                    <input 
                                        type="date" 
                                        value={publishedDate} 
                                        onChange={e => setPublishedDate(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input 
                                    type="text" 
                                    placeholder="AI Safety, EdTech, Machine Learning" 
                                    value={tagsInput} 
                                    onChange={e => setTagsInput(e.target.value)} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Cover Thumbnail URL or Upload</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="https://... or upload below" 
                                        value={thumbnailUrl} 
                                        onChange={e => setThumbnailUrl(e.target.value)} 
                                    />
                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                        <Image size={15} />
                                        <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            style={{ display: 'none' }} 
                                            onChange={handleImageUpload} 
                                            disabled={uploadingImage}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Save Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

