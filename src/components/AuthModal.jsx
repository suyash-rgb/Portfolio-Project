import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Lock, Mail, AlertTriangle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleAuth = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!isSupabaseConfigured) {
            setErrorMsg('Please configure your Supabase Project URL and Key first.');
            return;
        }

        setLoading(true);
        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Sign-up initiated! Check your email to confirm or sign in directly.');
                setIsSignUp(false);
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onAuthSuccess(data.user);
                onClose();
            }
        } catch (err) {
            setErrorMsg(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isSignUp ? 'Create Admin Account' : 'Admin Login'}</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {errorMsg && (
                    <div style={{
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#fb7185',
                        fontSize: '0.85rem',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AlertTriangle size={15} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="email" 
                                placeholder="suyashbaoney58@gmail.com" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••••••" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-actions" style={{ marginTop: '20px' }}>
                        <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={{ fontSize: '0.82rem' }}
                        >
                            {isSignUp ? 'Switch to Sign In' : 'Create Admin Account'}
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Authenticating...' : isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

