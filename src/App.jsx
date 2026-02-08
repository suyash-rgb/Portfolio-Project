import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth <= 900) {
      setIsSidebarOpen(false);
    }
    // Optional: Scroll more gently or not at all if the navbar is sticky
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} onToggleSidebar={toggleSidebar} />
      <div className={`wrap ${isSidebarOpen && window.innerWidth <= 900 ? 'overlay-active' : ''}`}>
        <Sidebar className={isSidebarOpen ? 'show' : 'sidebar-hidden'} />
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        <MainContent activeTab={activeTab} onToggleSidebar={toggleSidebar} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
