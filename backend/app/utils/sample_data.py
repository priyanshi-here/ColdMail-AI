from app.schemas import CandidateProfile, CandidateEducation, CandidateProject, CandidateExperience

SAMPLE_RESUME_TEXT = """
Alex Chen
San Francisco, CA | alex.chen@example.com | github.com/alexc-dev | linkedin.com/in/alexchen-dev

SUMMARY
Software Engineer with 3 years of experience specializing in full-stack web application development, API integration, and machine learning pipelines. Demonstrated track record in building high-throughput Python backends (FastAPI, Django) and interactive React frontends.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | Graduated May 2023

TECHNICAL SKILLS
- Programming Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS
- Frameworks & Libraries: React, Next.js, FastAPI, Flask, Node.js, Express, Tailwind CSS
- Databases: PostgreSQL, MongoDB, Redis
- Developer Tools & Cloud: Docker, AWS (S3, EC2, Lambda), Git, GitHub Actions, Linux

PROJECTS
1. AI PDF Research Assistant (RAG Pipeline)
   - Built a full-stack document QA system using React, FastAPI, LangChain, and PostgreSQL (pgvector).
   - Extracted and indexed 500+ PDF papers, achieving sub-200ms semantic retrieval and citation tracking.
   - Deployed containerized backend to AWS EC2 with automated CI/CD via GitHub Actions.

2. Real-Time Analytics Dashboard
   - Developed a responsive web application in React and TypeScript with WebSockets for real-time data streaming.
   - Designed PostgreSQL database schema and optimized query performance by 40% using indexed JSONB columns.

WORK EXPERIENCE
Software Engineer | Apex Cloud Solutions
June 2023 - Present | San Francisco, CA
- Architected RESTful microservices in Python (FastAPI) handling 1.5M daily API requests.
- Engineered modern React component UI design system used across 4 internal enterprise applications.
- Integrated OAuth2 authentication and JWT token security, resolving critical vulnerability compliance checks.

Software Engineering Intern | ByteScale Tech
June 2022 - August 2022 | Remote
- Implemented automated data ingestion pipeline using Python and Redis queue.
- Created unit and integration test suite increasing code coverage from 68% to 89%.

CERTIFICATIONS & ACHIEVEMENTS
- AWS Certified Developer – Associate (2023)
- 1st Place, CalHacks 2022 Hackathon (Built real-time video summarizer)
"""

SAMPLE_CANDIDATE_PROFILE = CandidateProfile(
    name="Alex Chen",
    education=[
        CandidateEducation(degree="Bachelor of Science in Computer Science", college="University of California, Berkeley", graduation_year="2023")
    ],
    technical_skills=["Python", "JavaScript", "TypeScript", "SQL", "REST APIs", "Microservices", "Docker", "AWS", "Git"],
    programming_languages=["Python", "JavaScript", "TypeScript", "SQL"],
    frameworks=["React", "Next.js", "FastAPI", "Flask", "Node.js", "Express", "Tailwind CSS"],
    databases=["PostgreSQL", "MongoDB", "Redis"],
    tools=["Docker", "AWS S3", "AWS EC2", "Git", "GitHub Actions", "Linux"],
    projects=[
        CandidateProject(
            name="AI PDF Research Assistant (RAG Pipeline)",
            description="Built a full-stack document QA system using React, FastAPI, LangChain, and PostgreSQL (pgvector). Extracted and indexed 500+ PDF papers with sub-200ms semantic retrieval.",
            technologies=["React", "FastAPI", "Python", "LangChain", "PostgreSQL", "AWS"]
        ),
        CandidateProject(
            name="Real-Time Analytics Dashboard",
            description="Developed a responsive web application in React and TypeScript with WebSockets for real-time streaming, optimizing query performance by 40%.",
            technologies=["React", "TypeScript", "WebSockets", "PostgreSQL"]
        )
    ],
    work_experience=[
        CandidateExperience(
            company="Apex Cloud Solutions",
            role="Software Engineer",
            duration="June 2023 - Present",
            highlights=[
                "Architected RESTful microservices in Python (FastAPI) handling 1.5M daily API requests.",
                "Engineered modern React component UI design system across 4 internal enterprise applications.",
                "Integrated OAuth2 authentication and JWT token security."
            ]
        )
    ],
    internships=[
        CandidateExperience(
            company="ByteScale Tech",
            role="Software Engineering Intern",
            duration="June 2022 - August 2022",
            highlights=[
                "Implemented automated data ingestion pipeline using Python and Redis queue.",
                "Created unit and integration test suite increasing code coverage from 68% to 89%."
            ]
        )
    ],
    certifications=["AWS Certified Developer – Associate"],
    achievements=["1st Place, CalHacks 2022 Hackathon (Built real-time video summarizer)"],
    relevant_links=["github.com/alexc-dev", "linkedin.com/in/alexchen-dev"],
    summary="Software Engineer with 3 years of experience in full-stack web application development, API integration, and machine learning pipelines.",
    raw_text=SAMPLE_RESUME_TEXT
)

SAMPLE_JOB_DESCRIPTION = """
Full Stack Software Engineer (Python & React)
Company: NexusAI Systems
Location: San Francisco, CA (Hybrid)
Employment Type: Full-time

About NexusAI:
NexusAI is building the next generation of AI-driven workflow automation platforms for enterprise engineering teams. We are scaling our core platform to process millions of complex enterprise documents and automated workflows.

Role Responsibilities:
- Design, build, and maintain scalable RESTful APIs and backend services using Python (FastAPI or Django).
- Build clean, interactive, high-performance web applications using React, TypeScript, and modern CSS.
- Collaborate with product and ML teams to integrate LLM and RAG pipelines into client-facing applications.
- Optimize database queries and vector indexes in PostgreSQL.
- Maintain CI/CD pipelines and deployment infrastructure on AWS (Docker, EC2, ECS).

Required Qualifications:
- 2+ years of professional software engineering experience.
- Strong proficiency in Python and modern backend frameworks (FastAPI/Django).
- Solid experience building interactive user interfaces with React and JavaScript/TypeScript.
- Experience working with relational databases, specifically PostgreSQL.
- Hands-on experience with Git, Docker, and REST API development.

Preferred Qualifications:
- Experience building Document Processing, RAG, or LLM-integrated applications.
- Familiarity with cloud platforms like AWS (S3, EC2, ECS).
- Knowledge of state management and TypeScript in frontend React applications.
- AWS certification is a plus.
"""
