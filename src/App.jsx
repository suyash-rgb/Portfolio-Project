import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
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

  return (
    <div className={`wrap ${isSidebarOpen && window.innerWidth <= 900 ? 'overlay-active' : ''}`}>
      <Sidebar className={isSidebarOpen ? 'show' : 'sidebar-hidden'} />
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <MainContent onToggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;
