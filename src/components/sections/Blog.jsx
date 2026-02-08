import React from 'react';

const Blog = () => {
    return (
        <section id="blog">
            <h1>Blog</h1>
            <div className="blog-grid">

                <article className="blog-card">
                    <div className="blog-thumb">
                        <img src="https://res.cloudinary.com/dplwcwhak/image/upload/v1770542920/java-30-thumb_pmesrj.png" alt="Java at 30 article thumbnail" />
                    </div>
                    <div className="blog-info">
                        <h3>Java at 30 : A Journey of Innovation, Endurance, and a Glimpse into the AI Era</h3>
                        <p className="muted">Reflecting on Java's 30-year legacy, its evolution, and how AI is shaping its future in
                            enterprise and beyond.</p>
                        <a href="https://medium.com/@suyashbaoney58/java-at-30-a-journey-of-innovation-endurance-and-a-glimpse-into-the-ai-era-c6443d6a2990"
                            target="_blank" rel="noopener noreferrer" className="btn-read">
                            Read on Medium
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </a>
                    </div>
                </article>

                <article className="blog-card">
                    <div className="blog-thumb">
                        <img src="https://res.cloudinary.com/dplwcwhak/image/upload/v1770542932/when-bots-pay-the-toll-thumb_nsod0z.png" alt="Cloudflare Pay-Per-Crawl article thumbnail" />
                    </div>
                    <div className="blog-info">
                        <h3>When Bots Pay the Toll : Cloudflare’s Pay-Per-Crawl and the New Economics of AI Scraping</h3>
                        <p className="muted">Read about how a Cloudflare 522 timeout led me to rethink web scraping: bot management,
                            Pay‑Per‑Crawl, robots.txt as moral code, and what these shifts mean for developers, researchers, and
                            a fair web.</p>
                        <a href="https://medium.com/@suyashbaoney58/when-bots-pay-the-toll-cloudflares-pay-per-crawl-and-the-new-economics-of-ai-scraping-3a64f0f31c59"
                            target="_blank" rel="noopener noreferrer" className="btn-read">
                            Read on Medium
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </a>
                    </div>
                </article>

                <article className="blog-card">
                    <div className="blog-thumb">
                        <img src="https://res.cloudinary.com/dplwcwhak/image/upload/v1770542917/git-20-thumb_e6nmxl.jpg" alt="Git 20 article thumbnail" />
                    </div>
                    <div className="blog-info">
                        <h3>Git at 20 : How Linus Torvalds' Creation Revolutionized the World</h3>
                        <p className="muted">A deep dive into Git’s origin, its impact on software development, and why it remains
                            the backbone of modern collaboration.</p>
                        <a href="https://www.linkedin.com/pulse/git-20-how-linus-torvalds-creation-revolutionized-world-suyash-baoney-wmmkf"
                            target="_blank" rel="noopener noreferrer" className="btn-read">
                            Read on LinkedIn
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                            </svg>
                        </a>
                    </div>
                </article>

            </div>
        </section>
    );
};

export default Blog;
