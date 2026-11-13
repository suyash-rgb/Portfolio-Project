import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Plus, Trash2, Edit2, GitBranch, GraduationCap, Briefcase, Award } from 'lucide-react';

const defaultJourney = [
    {
        id: 'seed-j-1',
        year: '2025',
        title: "Master's in Computer Application",
        organization: 'ICA, Sage University',
        type: 'edu',
        branch_name: 'main',
        commit_hash: 'c4a91b2',
        description: "Currently pursuing Master's in Computer Application with a focus on AI and Machine Learning.",
        status: 'HEAD (Active)'
    },
    {
        id: 'seed-j-2',
        year: '2023',
        title: "Bachelor's in Computer Application",
        organization: 'SVIMS, DAVV University',
        type: 'edu',
        branch_name: 'main',
        commit_hash: 'b7e289f',
        description: 'Specialized in Back-end Development. Built 5+ enterprise & web applications.',
        status: 'merged'
    },
    {
        id: 'seed-j-3',
        year: '2020-23',
        title: 'Home Tutor',
        organization: 'Freelance / Self-Employed',
        type: 'work',
        branch_name: 'feature/work',
        commit_hash: 'f193dc0',
        description: 'Mentored students across multiple subjects. Developed leadership and communication skills.',
        status: 'merged -> main'
    },
    {
        id: 'seed-j-4',
        year: '2022',
        title: 'J2EE Training',
        organization: 'Java Enterprise Training',
        type: 'training',
        branch_name: 'feature/training',
        commit_hash: 'a903ef4',
        description: 'Specialized J2EE training, mastering core Java, Servlets, JSP, and enterprise architecture.',
        status: 'merged -> main'
    }
];

export default function JourneyManager({ user, onRequireAuth }) {
    const [journey, setJourney] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form state
    const [year, setYear] = useState('');
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [type, setType] = useState('edu');
    const [branchName, setBranchName] = useState('main');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('merged');

    const fetchJourney = async () => {
        if (!isSupabaseConfigured) {
            setJourney(defaultJourney);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('journey')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setJourney(data && data.length > 0 ? data : defaultJourney);
        } catch (err) {
            console.error('Error fetching journey:', err);
            setJourney(defaultJourney);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJourney();
    }, []);

    const openCreateModal = () => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(null);
        setYear('2026');
        setTitle('');
        setOrganization('');
        setType('edu');
        setBranchName('main');
        setDescription('');
        setStatus('merged');
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        if (!user && isSupabaseConfigured) {
            onRequireAuth();
            return;
        }
        setEditingItem(item);
        setYear(item.year);
        setTitle(item.title);
        setOrganization(item.organization);
        setType(item.type || 'edu');
        setBranchName(item.branch_name || 'main');
        setDescription(item.description || '');
        setStatus(item.status || 'merged');
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const payload = {
            year,
            title,
            organization,
            type,
            branch_name: branchName,
            description,
            status
        };

        if (!isSupabaseConfigured) {
            if (editingItem) {
                setJourney(journey.map(j => j.id === editingItem.id ? { ...j, ...payload } : j));
            } else {
                setJourney([{ id: `local-${Date.now()}`, ...payload }, ...journey]);
            }
            setModalOpen(false);
            return;
        }

        try {
            if (editingItem && !editingItem.id.toString().startsWith('seed-')) {
                const { error } = await supabase
                    .from('journey')
                    .update(payload)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('journey')
                    .insert([payload]);
                if (error) throw error;
            }

            setModalOpen(false);
            fetchJourney();
        } catch (err) {
            alert('Failed to save milestone: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this journey item?')) return;

        if (!isSupabaseConfigured) {
            setJourney(journey.filter(j => j.id !== id));
            return;
        }

        if (!user) {
            onRequireAuth();
            return;
        }

        try {
            const { error } = await supabase
                .from('journey')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchJourney();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    const getTypeIcon = (t) => {
        if (t === 'work') return <Briefcase size={14} />;
        if (t === 'training') return <Award size={14} />;
        return <GraduationCap size={14} />;
    };

    const getTypeBadgeClass = (t) => {
        if (t === 'work') return 'badge-cyan';
        if (t === 'training') return 'badge-emerald';
        return 'badge-purple';
    };

    return (
        <section>
            <div className="section-action-header">
                <div>
                    <h2>Education & Journey Milestones</h2>
                    <p>Update study degrees, work experience, certifications and timeline tags.</p>
                </div>
                <button className="btn-primary" onClick={openCreateModal}>
                    <Plus size={16} />
                    <span>Add Milestone</span>
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Loading milestones...
                </div>
            ) : (
                <div className="cms-grid">
                    {journey.map((item) => (
                        <div key={item.id} className="cms-card">
                            <div className="card-top">
                                <span className={`badge ${getTypeBadgeClass(item.type)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                    {getTypeIcon(item.type)}
                                    <span>{item.type.toUpperCase()}</span>
                                </span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                                    {item.year}
                                </span>
                            </div>

                            <h3>{item.title}</h3>
                            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.86rem', marginBottom: '8px', fontWeight: 600 }}>
                                {item.organization}
                            </p>
                            <p>{item.description}</p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-dim)',
                                marginBottom: '14px'
                            }}>
                                <GitBranch size={13} />
                                <span>{item.branch_name || 'main'}</span>
                                {item.status && <span>• {item.status}</span>}
                            </div>

                            <div className="card-footer">
                                <div></div>
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
                            <h3>{editingItem ? 'Edit Milestone' : 'New Milestone'}</h3>
                            <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Year / Duration *</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. 2025 or 2020-23" 
                                        value={year} 
                                        onChange={e => setYear(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select value={type} onChange={e => setType(e.target.value)}>
                                        <option value="edu">Education (Degree/School)</option>
                                        <option value="work">Experience (Work/Job)</option>
                                        <option value="training">Training / Certification</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Title / Degree / Role *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Master's in Computer Application" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label>Institution / Company *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Sage University / Freelance" 
                                    value={organization} 
                                    onChange={e => setOrganization(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Branch Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="main or feature/work" 
                                        value={branchName} 
                                        onChange={e => setBranchName(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status Tag</label>
                                    <input 
                                        type="text" 
                                        placeholder="HEAD (Active) or merged" 
                                        value={status} 
                                        onChange={e => setStatus(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    rows="3" 
                                    placeholder="Milestone achievements, focus area, GPA, etc." 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)} 
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Save Milestone
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

