import logging
from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from app.config import settings
from app.schemas import (
    CandidateProfile, AnalysisRequest, AnalysisResponse, RegenerateRequest
)
from app.services.pdf_service import pdf_service
from app.services.gemini_service import gemini_service
from app.utils.sample_data import (
    SAMPLE_CANDIDATE_PROFILE, SAMPLE_JOB_DESCRIPTION
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("coldreach-ai")

app = FastAPI(
    title="ColdReach AI Backend API",
    description="AI-powered personalized outreach email & LinkedIn message generator for job seekers",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows Vite dev server & production builds
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "gemini_api_configured": bool(settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here"),
        "service": "ColdReach AI API"
    }

@app.post("/api/resume/upload", response_model=CandidateProfile)
async def upload_resume(file: UploadFile = File(...)):
    """
    Uploads a PDF resume, extracts raw text, and returns a structured CandidateProfile JSON.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PDF document (.pdf).")

    contents = await file.read()
    if len(contents) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File size exceeds maximum allowed limit of {settings.MAX_FILE_SIZE_MB}MB.")

    try:
        raw_text = pdf_service.extract_text_from_pdf_bytes(contents)
        candidate_profile = gemini_service.parse_resume_text(raw_text)
        return candidate_profile
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error parsing resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process uploaded resume. Please verify file content and try again.")

@app.get("/api/sample/resume", response_model=CandidateProfile)
def get_sample_resume():
    """Returns a sample candidate profile for quick application testing."""
    return SAMPLE_CANDIDATE_PROFILE

@app.get("/api/sample/job")
def get_sample_job():
    """Returns a sample job description for quick application testing."""
    return {"job_description": SAMPLE_JOB_DESCRIPTION}

@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze_job_and_resume(request: AnalysisRequest):
    """
    Analyzes job description against candidate resume, computes match score,
    identifies required/preferred skills, and generates targeted outreach.
    """
    if not request.job_description or not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description text cannot be empty.")

    # If candidate profile is not provided in request, fallback to sample candidate
    candidate = request.candidate_profile or SAMPLE_CANDIDATE_PROFILE

    try:
        response = gemini_service.analyze_and_generate(
            job_description=request.job_description.strip(),
            candidate_profile=candidate,
            tone=request.tone,
            length=request.length
        )
        return response
    except Exception as e:
        logger.error(f"Error analyzing job description: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/api/regenerate", response_model=AnalysisResponse)
def regenerate_outreach(request: RegenerateRequest):
    """
    Re-generates outreach emails and LinkedIn messages with updated tone or length controls.
    """
    if not request.job_description or not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description text cannot be empty.")

    candidate = request.candidate_profile or SAMPLE_CANDIDATE_PROFILE

    try:
        response = gemini_service.analyze_and_generate(
            job_description=request.job_description.strip(),
            candidate_profile=candidate,
            tone=request.tone,
            length=request.length
        )
        return response
    except Exception as e:
        logger.error(f"Error regenerating outreach: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Regeneration failed: {str(e)}")
