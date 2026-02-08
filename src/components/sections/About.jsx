import React from 'react';

const About = () => {
    return (
        <section id="about">
            <h1>About Me</h1>
            <p className="muted">
                I’m a curious, impact-driven dev who loves turning ideas into reliable systems. I work across the stack—building
                Spring Boot microservices with Spring AI, prototyping Python APIs with FastAPI, and crafting frontend
                experiences with React—so I bring a practical <strong>“jack-of-all-trades”</strong> approach: fast to iterate,
                rigorous about reliability, and committed to clean, maintainable code.
            </p>
            <p className="muted">
                I’m a strong advocate for Java as a first-class platform for enterprise AI. Java’s performance, mature tooling,
                and production-grade ecosystem make it ideal for scalable, observable AI systems that serve real users. My focus
                is on marrying solid engineering practices with modern ML/NLP techniques to build systems that are not only
                intelligent, but robust, testable, and production-ready.
            </p>

            <div className="personal-journey">
                <h2>More Than Code</h2>
                <p className="muted">I’m not just a developer — I’m a <strong>creator</strong>, <strong>storyteller</strong>, and
                    <strong>lifelong learner</strong>.</p>

                <div className="journey-grid">

                    <div className="journey-card youtube">
                        <div className="journey-icon">YouTuber</div>
                        <h3>Free World Coder</h3>

                        <div className="youtube-preview">
                            <img src="https://placehold.co/100x100/ff0000/ffffff?text=FWC" alt="Free World Coder YouTube Channel"
                                className="youtube-thumb" />
                            <div className="youtube-info">
                                <p className="muted">
                                    <strong>No paywalls. No clickbait. No Topmate.</strong><br />
                                    I run <em>Free World Coder</em> — a YouTube channel where I build real projects, explore software concepts across languages, and share <strong>100% open-source code</strong> you can fork, learn from, and use freely.
                                </p>
                                <p className="muted">
                                    While 80% of creators chase views with incomplete tutorials and paywalled repos, I’m here to give you <strong>clean, complete, production-ready code</strong> — because learning should be free, and knowledge shouldn’t come with a subscription.
                                </p>
                            </div>
                        </div>

                        <a href="https://youtube.com/@freeworldcoder" target="_blank" className="btn-outline">
                            Watch on YouTube
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </a>
                    </div>

                    <div className="journey-card">
                        <div className="journey-icon">Open Book</div>
                        <h3>Writer & Avid Reader</h3>

                        <div className="medium-preview">
                            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/medium.svg" alt="Medium Logo"
                                className="medium-logo" />
                            <div className="medium-info">
                                <p>Medium is where I turn technical deep-dives into stories that spark ideas. I write about Java’s future,
                                    AI ethics, and real-world dev challenges—one post at a time.</p>
                                <p className="muted">Deep technical insights. Real-world context. No fluff.</p>
                            </div>
                        </div>

                        <a href="https://medium.com/@suyashbaoney58" target="_blank" className="btn-outline">
                            Read on Medium
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </a>
                    </div>

                    <div className="journey-card">
                        <div className="journey-icon">Current Projects</div>
                        <h3>Building & Scaling</h3>
                        <ul className="project-list">
                            <li>
                                <strong>DocEase: Doctor's Appointment Management PaaS</strong> — Minor College Project<br />
                                <small className="project-desc">
                                    A patient-first platform that simplifies booking and managing doctor appointments. Patients can search
                                    doctors by specialty, view availability, and book slots instantly. Doctors get real-time dashboards and
                                    notifications. Built with <strong>Java, Spring Boot</strong> (backend), <strong>React</strong>
                                    (frontend), and powered by <strong>Kafka</strong> for event-driven updates and
                                    <strong>WebSockets</strong> for live communication — all running locally for now.
                                </small>
                                <a href="https://github.com/suyash-rgb/DocEase/tree/microservices" target="_blank" className="project-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            </li>

                            <li>
                                <strong>Rural Healthcare AI Bot</strong> — Sunstone Hackathon Project<br />
                                <small className="project-desc">
                                    An AI-powered chatbot for rural India, delivering instant symptom checks, medical advice, and clinic
                                    connections via WhatsApp or web. It uses NLP to understand local languages and triage health issues —
                                    bridging the gap in underserved areas where doctors are scarce. Built with <strong>Python,
                                        FastAPI</strong> for backend & ML, <strong>Twilio API</strong> for messaging and <strong>Sarvam AI</strong>
                                    for translations and trans-literations
                                </small>
                                <a href="https://github.com/suyash-rgb/Sunstone-Hackathon_1.0-Rural-Healthcare-AI-Bot.git" target="_blank"
                                    className="project-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            </li>

                            <li>
                                <strong>BusinessBotix</strong> — No-Code AI Chatbot Builder SaaS<br />
                                <small className="project-desc">
                                    A visual drag-and-drop platform for business owners to build and deploy smart AI chatbots on their
                                    websites — no coding needed. Create conversation flows, train on FAQs, and go live in minutes. Powered
                                    by <strong>React + React Flow</strong> (frontend), <strong>Python FastAPI</strong> (backend), and
                                    <strong>ACDQAs</strong> for advanced conversational AI.
                                </small>
                                <a href="https://github.com/suyash-rgb/Conversation-AI-ChatBot-Builder-SaaS.git" target="_blank" className="project-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="doing mt">
                    <h2>What I'm doing</h2>
                </div>
                <div className="mca-showcase">
                    <div className="mca-text">
                        <h3>Pursuing MCA</h3>
                        <p><strong>Sage University</strong> in collaboration with <strong>Sunstone Eduversity</strong></p>
                        <p className="muted">Balancing academics with real-world projects and content creation.</p>
                    </div>
                    <img src="https://placehold.co/220x220/123456/ffffff?text=MCA" alt="Suyash Baoney at Sage University with Sunstone" className="mca-photo" />
                </div>
            </div>
        </section>
    );
};

export default About;
