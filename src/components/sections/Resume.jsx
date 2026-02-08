import React from 'react';
import Skills from './Skills';
import Education from './Education';
const Resume = () => {
    return (
        <section id="resume">
            <h1>Resume</h1>
            <Skills />

            <Education />

            <div className="resume-section">
                <h2>Certifications</h2>
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
                <h2>Workshops & Training</h2>
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
                <h2>Coding Progress</h2>
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
                            <div className="github-image-wrapper">
                                <img src="https://streak-stats.demolab.com/?user=suyash-rgb&theme=tokyonight&hide_border=true"
                                    alt="GitHub Streak" className="github-card" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Resume;
