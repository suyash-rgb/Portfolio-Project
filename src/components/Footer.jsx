import React from 'react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Suyash Baoney. All rights reserved.</p>
                <div className="footer-badges">
                    <span className="footer-badge">Built with React & Vite</span>
                    <span className="footer-badge">Styled with CSS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
