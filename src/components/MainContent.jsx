import React, { useState } from 'react';
import About from './sections/About';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

const MainContent = ({ onToggleSidebar }) => {
    const [activeTab, setActiveTab] = useState('about');

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
        setIsNavOpen(false); // Close mobile nav when a link is clicked
        // Smooth scroll to top of content
        const tabPanels = document.querySelector('.tab-panels');
        if (tabPanels) {
            tabPanels.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className={`main ${isNavOpen ? 'nav-open' : ''}`}>
            {/* Mobile Header */}
            <div className="mobile-header" id="mobileHeader">
                <div className="mobile-left" onClick={onToggleSidebar} style={{ cursor: 'pointer' }}>
                    <div className="avatar small">
                        <img src="https://placehold.co/100x100/18283b/ffffff?text=SB" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span className="profile-text-mobile">Profile</span>
                </div>

                <button
                    className={`hambtn ${isNavOpen ? 'active' : ''}`}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    aria-label="Toggle Navigation"
                >
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <div className={`mobile-nav-menu ${isNavOpen ? 'show' : ''}`}>
                <nav className="mobile-nav-links">
                    <a href="#about" className={activeTab === 'about' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'about')}>About</a>
                    <a href="#resume" className={activeTab === 'resume' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'resume')}>Resume</a>
                    <a href="#portfolio" className={activeTab === 'portfolio' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'portfolio')}>Portfolio</a>
                    <a href="#blog" className={activeTab === 'blog' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'blog')}>Blog</a>
                    <a href="#contact" className={activeTab === 'contact' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'contact')}>Contact</a>
                </nav>
            </div>

            {/* Desktop Nav */}
            <div className="topbar">
                <nav className="nav" role="navigation" aria-label="Main">
                    <a href="#about" className={activeTab === 'about' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'about')}>About</a>
                    <a href="#resume" className={activeTab === 'resume' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'resume')}>Resume</a>
                    <a href="#portfolio" className={activeTab === 'portfolio' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'portfolio')}>Portfolio</a>
                    <a href="#blog" className={activeTab === 'blog' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'blog')}>Blog</a>
                    <a href="#contact" className={activeTab === 'contact' ? 'active' : ''} onClick={(e) => handleTabClick(e, 'contact')}>Contact</a>
                </nav>
            </div>

            {/* Tab Panels */}
            <div className="tab-panels">
                {/* We render all but hide inactive ones with CSS to match the original behavior and animation */}
                <div className={activeTab === 'about' ? 'tab-content active' : 'tab-content'}>
                    <About />
                </div>
                <div className={activeTab === 'resume' ? 'tab-content active' : 'tab-content'}>
                    <Resume />
                </div>
                <div className={activeTab === 'portfolio' ? 'tab-content active' : 'tab-content'}>
                    <Portfolio />
                </div>
                <div className={activeTab === 'blog' ? 'tab-content active' : 'tab-content'}>
                    <Blog />
                </div>
                <div className={activeTab === 'contact' ? 'tab-content active' : 'tab-content'}>
                    <Contact />
                </div>
            </div>

            {/* Footer */}
            <footer className="site-footer">
                <div className="muted"> Built with React & Vite & Tailwind</div>
            </footer>
        </main>
    );
};

export default MainContent;
