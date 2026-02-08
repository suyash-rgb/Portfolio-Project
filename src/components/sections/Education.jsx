import React from 'react';

const educationData = [
    {
        year: "2025",
        title: "Master's in Computer Application",
        company: "ICA, Sage University",
        description: "Currently pursuing a Master's degree in Computer Application with a focus on AI and Machine Learning."
    },
    {
        year: "2023",
        title: "Bachelor's in Computer Application",
        company: "SVIMS, DAVV University",
        description: "Specialized in Back-end Development. GPA: 6/10. Built 5+ projects including a RESTful API for a task management app."
    },
    {
        year: "2019",
        title: "Higher Secondary (XII)",
        company: "St. George HSc School, Dhar",
        description: "PCM Stream. Scored 65% in CBSE Board Exams. Led Red House to victory in inter-school competitions."
    }
];

const Education = () => {
    return (
        <>
            <h2>Education</h2>
            <div className="resume-section"></div>
            <div className="timeline">
                {educationData.map((item, index) => (
                    <div key={index} className="timeline-item" data-year={item.year}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>{item.title}</h3>
                            <p className="company">{item.company}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Education;
