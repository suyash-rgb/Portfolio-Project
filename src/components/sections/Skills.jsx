import React, { useEffect, useRef } from 'react';

const Skills = () => {
    const listRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        listRef.current.forEach(item => {
            if (item) {
                const fill = item.querySelector('.skill-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.setProperty('--target-width', width);
                    observer.observe(item);
                }
            }
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !listRef.current.includes(el)) {
            listRef.current.push(el);
        }
    };

    return (
        <>
            <div className="resume-section">
                <h2>Tech Skills</h2>
                <div className="skills-grid">
                    <img src="https://img.shields.io/badge/java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"
                        alt="Java" />
                    <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"
                        alt="Spring Boot" />
                    <img src="https://img.shields.io/badge/javascript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"
                        alt="JavaScript" />
                    <img src="https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logoColor=61DAFB"
                        alt="React" />
                    <img src="https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
                        alt="Tailwind CSS" />
                    <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"
                        alt="MySQL" />
                    <img src="https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white"
                        alt="MongoDB" />
                    <img src="https://img.shields.io/badge/git-F05033?style=for-the-badge&logo=git&logoColor=white"
                        alt="Git" />
                    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
                        alt="Python" />
                    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
                    <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"
                        alt="Pandas" />
                </div>
            </div>

            <div className="resume-section">
                <h2>Soft Skills</h2>
                <div className="soft-skills">
                    <div className="skill-item" ref={addToRefs}>
                        <div className="skill-label">
                            <span>Innovative</span>
                            <span className="skill-percent">80%</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '80%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}></div>
                        </div>
                    </div>

                    <div className="skill-item" ref={addToRefs}>
                        <div className="skill-label">
                            <span>Communication</span>
                            <span className="skill-percent">90%</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '90%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
                        </div>
                    </div>

                    <div className="skill-item" ref={addToRefs}>
                        <div className="skill-label">
                            <span>Team Player</span>
                            <span className="skill-percent">80%</span>
                        </div>
                        <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '80%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
};

export default Skills;
