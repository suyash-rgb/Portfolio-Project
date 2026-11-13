import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Plus, Trash2, Edit2, ExternalLink, Image, Check, AlertCircle } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const defaultProjects = [
    {
        id: 'seed-1',
        title: 'LinkLitez',
        category: 'Full Stack Web',
        description: 'Fast, lightweight link-in-bio and URL shortener built for creators and developers.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
        github_url: 'https://github.com/suyash-rgb',
        live_url: 'https://github.com/suyash-rgb',
        featured: true
    },
    {
        id: 'seed-2',
        title: 'PresencePulse',
        category: 'AI & Automation',
        description: 'Real-time automated attendance and engagement tracker utilizing computer vision and audio signals.',
        tags: ['Python', 'OpenCV', 'FastAPI', 'React'],
        github_url: 'https://github.com/suyash-rgb',
        live_url: 'https://github.com/suyash-rgb',
        featured: true
    },
    {
        id: 'seed-3',
        title: 'SmartEmail Classifier',
        category: 'AI & Machine Learning',
        description: 'AI-powered email prioritization and response suggestion engine built with NLP models.',
        tags: ['Python', 'Transformers', 'Flask'],
        github_url: 'https://github.com/suyash-rgb',
        live_url: 'https://github.com/suyash-rgb',
        featured: true
    }
];

export default function ProjectsManager({ user, onRequireAuth }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Full Stack Web');
    const [description, setDescription] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [featured, setFeatured] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const fetchProjects = async () => {
        if (!isSupabaseConfigured) {
            setProjects(defaultProjects);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data && data.length > 0 ? data : defaultProjects);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setProjects(defaultProjects);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const openCreateModal = () => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(null);
        setTitle('');
        setCategory('Full Stack Web');
        setDescription('');
        setTagsInput('');
        setGithubUrl('');
        setLiveUrl('');
        setImageUrl('');
        setFeatured(false);
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(item);
        setTitle(item.title);
        setCategory(item.category || 'Full Stack Web');
        setDescription(item.description || '');
        setTagsInput(Array.isArray(item.tags) ? item.tags.join(', ') : '');
        setGithubUrl(item.github_url || '');
        setLiveUrl(item.live_url || '');
        setImageUrl(item.image_url || '');
        setFeatured(Boolean(item.featured));
        setModalOpen(true);
    };

    // Upload thumbnail to Supabase Storage
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isSupabaseConfigured || !user) {
            alert('Please connect Supabase and log in as Admin to upload images directly to storage bucket.');
            return;
        }

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `projects/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            setImageUrl(publicUrl);
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
            category,
            description,
            tags,
            github_url: githubUrl,
            live_url: liveUrl,
            image_url: imageUrl,
            featured,
            updated_at: new Date().toISOString()
        };

        if (!isSupabaseConfigured) {
            // Local fallback simulation
            if (editingItem) {
                setProjects(projects.map(p => p.id === editingItem.id ? { ...p, ...payload } : p));
            } else {
                setProjects([{ id: `local-${Date.now()}`, ...payload }, ...projects]);
            }
            setModalOpen(false);
            return;
        }

        try {
            if (editingItem && !editingItem.id.toString().startsWith('seed-')) {
                const { error } = await supabase
                    .from('projects')
                    .update(payload)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([payload]);
                if (error) throw error;
            }

            setModalOpen(false);
            fetchProjects();
        } catch (err) {
            alert('Failed to save project: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        if (!isSupabaseConfigured) {
            setProjects(projects.filter(p => p.id !== id));
            return;
        }

        if (!user) {
            onRequireAuth();
            return;
        }

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchProjects();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    return (
        <section>
            <div className="section-action-header">
                <div>
                    <h2>Projects Management</h2>
                    <p>Manage portfolio showcase apps, categories, tags, and repo links.</p>
                </div>
                <button className="btn-primary" onClick={openCreateModal}>
                    <Plus size={16} />
                    <span>Add Project</span>
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Loading projects...
                </div>
            ) : (
                <div className="cms-grid">
                    {projects.map((item) => (
                        <div key={item.id} className="cms-card">
                            <div className="card-top">
                                <span className="badge badge-purple">{item.category}</span>
                                {item.featured && (
                                    <span className="badge badge-emerald">Featured</span>
                                )}
                            </div>

                            {item.image_url && (
                                <div style={{
                                    height: '140px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    marginBottom: '14px',
                                    background: '#040711'
                                }}>
                                    <img 
                                        src={item.image_url} 
                                        alt={item.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <h3>{item.title}</h3>
                            <p>{item.description}</p>

                            <div className="card-tags">
                                {item.tags && item.tags.map((tag, i) => (
                                    <span key={i} className="tag-pill">#{tag}</span>
                                ))}
                            </div>

                            <div className="card-footer">
                                <div className="card-links">
                                    {item.github_url && (
                                        <a href={item.github_url} target="_blank" rel="noreferrer" title="GitHub Repo">
                                            <GithubIcon size={16} />
                                        </a>
                                    )}
                                    {item.live_url && (
                                        <a href={item.live_url} target="_blank" rel="noreferrer" title="Live Demo">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <div className="card-actions">
                                    <button 
                                        className="btn-secondary" 
                                        onClick={() => openEditModal(item)}
                                        style={{ padding: '6px 10px' }}
                                        title="Edit Project"
                                    >
                                        <Edit2 size={13} />
                                    </button>
                                    <button 
                                        className="btn-danger" 
                                        onClick={() => handleDelete(item.id)}
                                        title="Delete Project"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingItem ? 'Edit Project' : 'New Project'}</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Project Title *</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. LinkLitez" 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category *</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. AI & Automation" 
                                        value={category} 
                                        onChange={e => setCategory(e.target.value)} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    rows="3" 
                                    placeholder="Brief summary of what the project does..." 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)} 
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input 
                                    type="text" 
                                    placeholder="React, Node.js, PostgreSQL, Tailwind" 
                                    value={tagsInput} 
                                    onChange={e => setTagsInput(e.target.value)} 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>GitHub URL</label>
                                    <input 
                                        type="url" 
                                        placeholder="https://github.com/suyash-rgb/..." 
                                        value={githubUrl} 
                                        onChange={e => setGithubUrl(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Live Demo URL</label>
                                    <input 
                                        type="url" 
                                        placeholder="https://your-app.vercel.app" 
                                        value={liveUrl} 
                                        onChange={e => setLiveUrl(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Thumbnail Image URL or Upload</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="https://... or upload below" 
                                        value={imageUrl} 
                                        onChange={e => setImageUrl(e.target.value)} 
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

                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input 
                                    type="checkbox" 
                                    id="featuredCheck" 
                                    checked={featured} 
                                    onChange={e => setFeatured(e.target.checked)} 
                                    style={{ width: 'auto' }} 
                                />
                                <label htmlFor="featuredCheck" style={{ margin: 0, cursor: 'pointer' }}>
                                    Pin as Featured Project
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
