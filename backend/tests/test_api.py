import os
import sys
import unittest
from fastapi.testclient import TestClient

# Ensure backend root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app

class TestColdReachAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_health_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "healthy")
        self.assertIn("gemini_api_configured", data)

    def test_sample_resume_endpoint(self):
        response = self.client.get("/api/sample/resume")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("name", data)
        self.assertIn("technical_skills", data)
        self.assertIn("projects", data)

    def test_sample_job_endpoint(self):
        response = self.client.get("/api/sample/job")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("job_description", data)
        self.assertTrue(len(data["job_description"]) > 0)

    def test_analyze_endpoint(self):
        payload = {
            "job_description": "We are seeking a Senior Full Stack Engineer proficient in React, FastAPI, and PostgreSQL.",
            "tone": "Professional",
            "length": "Medium"
        }
        response = self.client.post("/api/analyze", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("job_analysis", data)
        self.assertIn("candidate_match", data)
        self.assertIn("personalization", data)
        self.assertIn("emails", data)
        self.assertIn("linkedin", data)
        self.assertGreaterEqual(data["candidate_match"]["match_score"], 0)

    def test_regenerate_endpoint(self):
        # First fetch sample candidate profile
        candidate_res = self.client.get("/api/sample/resume")
        candidate_profile = candidate_res.json()

        payload = {
            "job_description": "Frontend Engineer role using React and TypeScript.",
            "candidate_profile": candidate_profile,
            "tone": "Friendly",
            "length": "Short"
        }
        response = self.client.post("/api/regenerate", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("emails", data)
        self.assertIn("linkedin", data)

    def test_upload_invalid_file_type(self):
        response = self.client.post(
            "/api/resume/upload",
            files={"file": ("resume.txt", b"Hello world", "text/plain")}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid file format", response.json()["detail"])

if __name__ == "__main__":
    unittest.main()
