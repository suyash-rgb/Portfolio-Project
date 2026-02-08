import React, { useState } from 'react';

const Navbar = ({ activeTab, onTabChange, onToggleSidebar }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'about', label: 'About' },
        { id: 'resume', label: 'Resume' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' }
    ];

    const handleTabClick = (tabId) => {
        onTabChange(tabId);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <div className="navbar-left">
                    <button className="mobile-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                        <div className="avatar-mini">
                            <img src="https://res.cloudinary.com/dplwcwhak/image/upload/v1770543472/portfolio-pic_ewnncd.jpg" alt="Profile" />
                        </div>
                        <span className="toggle-text">Profile</span>
                    </button>
                    {/* Optional Desktop Logo or Site Name on Left */}
                    <div className="navbar-logo desktop-only">
                        {/* We can leave this empty or put a small branding text if desired */}
                    </div>
                </div>

                {/* Desktop Tabs */}
                <nav className="navbar-nav desktop-only">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`navbar-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className={`mobile-hambtn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Navigation"
                >
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                    <span className="ham-line"></span>
                </button>
            </div>

            {/* Mobile Slide-down Menu */}
            <div className={`mobile-nav-panel ${isMobileMenuOpen ? 'show' : ''}`}>
                <nav className="mobile-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`mobile-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
