import React, { useState } from 'react';
import About from './sections/About';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

const MainContent = ({ activeTab }) => {
    return (
        <main className="main">
            {/* Tab Panels */}
            <div className="tab-panels">
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
        </main>
    );
};

export default MainContent;
