import React, { useEffect, useRef } from 'react';

const Resume = () => {
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
        <section id="resume">

            <div className="resume-section">
                <h2>Tech Skills</h2>
                <div className="skills-grid">
                    <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"
                        alt="Java" />
                    <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white"
                        alt="Spring Boot" />
                    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
                        alt="JavaScript" />
                    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                        alt="React" />
                    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                        alt="Tailwind CSS" />
                    <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"
                        alt="MySQL" />
                    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
                        alt="MongoDB" />
                    <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white"
                        alt="Hibernate" />
                    <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"
                        alt="Git" />
                    <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white"
                        alt="Render" />
                    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
                    <img src="https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white"
                        alt="Pandas" />
                    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
                        alt="Postman" />
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

            <h2>Education</h2>
            <div className="resume-section"></div>
            <div className="timeline">
                <div className="timeline-item" data-year="2025">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">

                        <h3>Master's in Computer Application</h3>
                        <p className="company">ICA, Sage University</p>
                        <p>Currently pursuing a Master's degree in Computer Application with a focus on AI and Machine Learning.</p>
                    </div>
                </div>

                <div className="timeline-item" data-year="2023">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">

                        <h3>Bachelor's in Computer Application</h3>
                        <p className="company">SVIMS</p>
                        <p>Specialized in Back-end Development. GPA: 6/10. Built 5+ projects including a RESTful API for a task
                            management app.</p>
                    </div>
                </div>

                <div className="timeline-item" data-year="2019">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">

                        <h3>Higher Secondary (XII)</h3>
                        <p className="company">St. George HSc School, Dhar</p>
                        <p>PCM Stream. Scored 65% in CBSE Board Exams. Led Red House to victory in inter-school competitions.</p>
                    </div>
                </div>
            </div>

            <div className="resume-section">
                <h3>Certifications</h3>
                <div className="cert-grid">
                    <div className="cert-card">
                        <div className="cert-icon">Certified</div>
                        <h4>Postman API Fundamentals Student Expert</h4>
                        <p className="cert-issuer">LetsUpgrade in collaboration with Postman</p>
                    </div>

                    <div className="cert-card">
                        <div className="cert-icon">Certified</div>
                        <h4>J2EE Practitioner</h4>
                        <p className="cert-issuer">Universal Informatics</p>
                    </div>
                </div>
            </div>

            <div className="resume-section">
                <h3>Workshops & Training</h3>
                <div className="workshop-grid">
                    <div className="workshop-card">
                        <div className="workshop-icon"></div>
                        <h4>Python Programming Workshop</h4>
                        <p className="workshop-venue">SVIM Campus, Indore | SVIMS College</p>
                    </div>

                    <div className="workshop-card">
                        <div className="workshop-icon"></div>
                        <h4>Decode, Discuss, Deploy AI + Training Workshop</h4>
                        <p className="workshop-venue">Building Profitable Business with AI | Skillopedia</p>
                    </div>

                    <div className="workshop-card">
                        <div className="workshop-icon"></div>
                        <h4>30 Days Masterclass in Artificial Intelligence</h4>
                        <p className="workshop-venue">NoviTech R&D Private Limited</p>
                    </div>
                </div>
            </div>
            <br />

            <div className="resume-section">
                <h3>Coding Progress</h3>
                <div className="coding-stats">

                    <div className="platform-card">
                        <div className="platform-header">
                            <img src="https://img.shields.io/badge/HackerRank-2EC866?style=for-the-badge&logo=hackerrank&logoColor=white"
                                alt="HackerRank" />
                            <span className="badge">Gold Badge</span>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-value">342</div>
                                <div className="stat-label">Solved</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">5 stars</div>
                                <div className="stat-label">Problem Solving</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">Top 8%</div>
                                <div className="stat-label">Global Rank</div>
                            </div>
                        </div>
                        <div className="progress-ring">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#1a1a1a" strokeWidth="12" />
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#2ec866" strokeWidth="12"
                                    strokeDasharray="339.3" strokeDashoffset="67.86" className="ring-fill" />
                                <text x="60" y="65" textAnchor="middle" fill="#2ec866" fontSize="28" fontWeight="700">80%</text>
                            </svg>
                            <p className="ring-label">Completion</p>
                        </div>
                    </div>

                    <div className="platform-card">
                        <div className="platform-header">
                            <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black"
                                alt="LeetCode" />
                            <span className="badge">Knight</span>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-value">528</div>
                                <div className="stat-label">Solved</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">E:280 M:220</div>
                                <div className="stat-label">H:28</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">1780</div>
                                <div className="stat-label">Contest Rating</div>
                            </div>
                        </div>
                        <div className="progress-ring">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#1a1a1a" strokeWidth="12" />
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#ffa116" strokeWidth="12"
                                    strokeDasharray="339.3" strokeDashoffset="101.79" className="ring-fill" />
                                <text x="60" y="65" textAnchor="middle" fill="#ffa116" fontSize="28" fontWeight="700">70%</text>
                            </svg>
                            <p className="ring-label">Acceptance</p>
                        </div>
                    </div>

                    <div className="platform-card github-stats">
                        <div className="platform-header">
                            <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                                alt="GitHub" />
                            <span className="badge">Active Contributor</span>
                        </div>
                        <div className="github-images">
                            <img src="https://github-readme-stats.vercel.app/api?username=suyash-rgb&theme=shadow_blue&hide_border=false&include_all_commits=false&count_private=true"
                                alt="GitHub Stats" className="github-card" />
                            <img src="https://nirzak-streak-stats.vercel.app/?user=suyash-rgb&theme=shadow_blue&hide_border=false"
                                alt="GitHub Streak" className="github-card" />
                            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=suyash-rgb&theme=shadow_blue&hide_border=false&include_all_commits=false&count_private=true&layout=compact"
                                alt="Top Languages" className="github-card" />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Resume;
