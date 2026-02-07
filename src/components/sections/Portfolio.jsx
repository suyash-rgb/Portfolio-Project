import React, { useState, useRef } from 'react';

const projects = [
    {
        title: "PresencePulse",
        description: "PresencePulse is a real-time, AI-powered attendance system that uses face recognition to automate attendance tracking in classrooms, integrating seamlessly with Google Sheets for live data syncing and automated email alerts via Google Apps Script.",
        details: "Built with **Python, Google Apps Script, Deep Learning, OpenCV, and PyQt5**, the system captures faces in real-time, computes 128-dimensional embeddings, and classifies identities using a trained SVM model",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=PresencePulse",
        video: "https://www.youtube.com/embed/bKg4XHOL-Fc",
        link: "https://github.com/suyash-rgb/PresencePulse.git",
        live: "https://www.youtube.com/watch?v=bKg4XHOL-Fc",
        wide: true
    },
    {
        title: "Smart Email Assistant",
        description: "The Smart Email Assistant is a Chrome extension that brings AI-powered reply generation directly into Gmail, helping users craft professional, casual, friendly, or formal responses with just a click.",
        details: "Built with **Spring Boot, Gemini API, Mutation Observer, and Material UI**, it seamlessly blends backend intelligence with frontend responsiveness to deliver **context-aware email replies inside the native Gmail interface**.",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Smart+Email",
        video: "https://www.youtube.com/embed/wTNfwma_LSM",
        link: "https://github.com/suyash-rgb/Smart-Email-Assistant.git",
        live: "https://www.youtube.com/playlist?list=PLTn5QuoMedJW4isxDZ_LGZhTtWNSJL42h"
    },
    {
        title: "LinkLitez: URL Shortener WebApp",
        description: "LinkLitez is a powerful, feature-rich URL shortening platform designed for efficiency, customization, and scalability. It enables users to create, manage, and track shortened links while ensuring secure and seamless redirection.",
        details: "Built with **Java, Spring Boot, JWT Security, PostgreSQL, and React**, LinkLitez delivers a scalable, secure, and high-performance URL shortening platform with real-time analytics, and seamless redirection.",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=LinkLitez",
        video: "https://www.youtube.com/embed/fSiNUnTsJ9o",
        link: "https://github.com/suyash-rgb/URL-Shortener-WebApp.git",
        live: "https://www.youtube.com/playlist?list=PLTn5QuoMedJUaq9YyoClfsdBt5RwazV2v"
    },
    {
        title: "Quick Invoice",
        description: "Lightweight, customizable invoice generation platform built for freelancers and small businesses. With real-time previews, branded templates, and integrated email delivery, QuickInvoice helps users save time and get paid faster.",
        details: "Built on Spring Boot, React and Third Party Integrations like **Clerk, Cloudinary, and Brevo SMTP**, QuickInvoice streamlines invoice generation while securely managing users, media uploads, and email delivery — enabling **scalable, production-ready billing workflows**",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Invoice",
        video: "https://www.youtube.com/embed/SYk692Lb3Os",
        link: "https://github.com/suyash-rgb/Invoice-Generator-Project.git",
        live: "https://www.youtube.com/watch?v=SYk692Lb3Os"
    },
    {
        title: "Quirky Roomie",
        description: "A collaborative platform for flatmates to log household complaints, vote on issues, resolve them, and earn karma points—all wrapped in a fun, gamified experience.",
        details: "Built with **MERN stack**, Quirky Roomie enhances communication and accountability among flatmates, making shared living more organized.",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Quirky+Roomie",
        video: "https://www.youtube.com/embed/fs2fPADTaQc",
        link: "https://github.com/suyash-rgb/Quirky-Roomie.git",
        live: "https://www.youtube.com/watch?v=fs2fPADTaQc"
    }
];

const ProjectCard = ({ project }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (iframeRef.current) {
            // Add autoplay params if not already present
            const videoId = project.video.split('/').pop();
            iframeRef.current.src = `${project.video}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (iframeRef.current) {
            iframeRef.current.src = '';
        }
    };

    const formatText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    return (
        <article
            className={`project-card ${project.wide ? 'wide' : ''} ${isPlaying ? 'video-active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-video={project.video}
        >
            <div className="project-thumb">
                <div className="thumb-wrapper" data-tooltip="Click to view project demo">
                    <img src={project.image} alt={`${project.title} Thumbnail`} style={{ opacity: isPlaying ? 0 : 1 }} />
                </div>
                <div className={`video-preview ${isPlaying ? 'visible' : ''}`} style={{ opacity: isPlaying ? 1 : 0, visibility: isPlaying ? 'visible' : 'hidden' }}>
                    <iframe ref={iframeRef} allow="autoplay; encrypted-media" allowFullScreen title={project.title}></iframe>
                </div>
            </div>
            <div className="project-info">
                <h3>{project.title}</h3>
                <p className="muted" dangerouslySetInnerHTML={{ __html: formatText(project.description) }}></p>
                <p dangerouslySetInnerHTML={{ __html: formatText(project.details) }}></p>
                <div className="project-links">
                    <a href={project.link} className="btn-icon" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a href={project.live} className="btn-icon live" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                    </a>
                </div>
            </div>
        </article>
    );
};

const Portfolio = () => {
    return (
        <section id="portfolio">
            <h2>Projects</h2>
            <div className="portfolio-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
