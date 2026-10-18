from pydantic import BaseModel, Field
from typing import List, Optional

class CandidateEducation(BaseModel):
    degree: str = ""
    college: str = ""
    graduation_year: str = ""

class CandidateProject(BaseModel):
    name: str = ""
    description: str = ""
    technologies: List[str] = Field(default_factory=list)

class CandidateExperience(BaseModel):
    company: str = ""
    role: str = ""
    duration: str = ""
    highlights: List[str] = Field(default_factory=list)

class CandidateProfile(BaseModel):
    name: str = "Candidate"
    education: List[CandidateEducation] = Field(default_factory=list)
    technical_skills: List[str] = Field(default_factory=list)
    programming_languages: List[str] = Field(default_factory=list)
    frameworks: List[str] = Field(default_factory=list)
    databases: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    projects: List[CandidateProject] = Field(default_factory=list)
    work_experience: List[CandidateExperience] = Field(default_factory=list)
    internships: List[CandidateExperience] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)
    relevant_links: List[str] = Field(default_factory=list)
    summary: Optional[str] = None
    raw_text: Optional[str] = None

class JobAnalysis(BaseModel):
    company: str = "Target Company"
    role: str = "Target Role"
    location: str = "Not specified"
    employment_type: str = "Full-time"
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    soft_skills: List[str] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)
    experience_requirements: str = ""
    education_requirements: str = ""
    keywords: List[str] = Field(default_factory=list)

class MatchAnalysis(BaseModel):
    match_score: int = Field(default=75, ge=0, le=100)
    score_reasoning: str = ""
    strong_matches: List[str] = Field(default_factory=list)
    partial_matches: List[str] = Field(default_factory=list)
    missing_requirements: List[str] = Field(default_factory=list)

class PersonalizationLayer(BaseModel):
    company_relevance: str = ""
    role_relevance: str = ""
    candidate_highlights: List[str] = Field(default_factory=list)
    personalization_points: List[str] = Field(default_factory=list)

class OutreachEmails(BaseModel):
    subjects: List[str] = Field(default_factory=list)
    recruiter_email: str = ""
    hiring_manager_email: str = ""
    employee_outreach: str = ""

class OutreachLinkedIn(BaseModel):
    connection_message: str = ""
    connection_word_count: int = 0
    follow_up_message: str = ""

class AnalysisRequest(BaseModel):
    job_description: str
    candidate_profile: Optional[CandidateProfile] = None
    tone: str = "Professional"  # Professional, Friendly, Confident, Concise
    length: str = "Medium"      # Short, Medium, Detailed

class AnalysisResponse(BaseModel):
    job_analysis: JobAnalysis
    candidate_match: MatchAnalysis
    personalization: PersonalizationLayer
    emails: OutreachEmails
    linkedin: OutreachLinkedIn
    candidate_profile: CandidateProfile
    is_mock: bool = False

class RegenerateRequest(BaseModel):
    job_description: str
    candidate_profile: Optional[CandidateProfile] = None
    tone: str = "Professional"
    length: str = "Medium"
    outreach_type: Optional[str] = None  # "recruiter", "hiring_manager", "employee", "linkedin", or None for all
