const API_BASE = "http://localhost:8000/api";

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch {
    return { status: "offline", gemini_api_configured: false };
  }
}

export async function uploadResumePdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/resume/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to parse PDF resume.");
  }

  return await res.json();
}

export async function getSampleResume() {
  const res = await fetch(`${API_BASE}/sample/resume`);
  if (!res.ok) throw new Error("Failed to load sample resume.");
  return await res.json();
}

export async function getSampleJob() {
  const res = await fetch(`${API_BASE}/sample/job`);
  if (!res.ok) throw new Error("Failed to load sample job description.");
  return await res.json();
}

export async function analyzeJobAndResume({ jobDescription, candidateProfile, tone = "Professional", length = "Medium" }) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_description: jobDescription,
      candidate_profile: candidateProfile,
      tone,
      length,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to analyze job description.");
  }

  return await res.json();
}

export async function regenerateOutreach({ jobDescription, candidateProfile, tone, length }) {
  const res = await fetch(`${API_BASE}/regenerate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job_description: jobDescription,
      candidate_profile: candidateProfile,
      tone,
      length,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to regenerate outreach.");
  }

  return await res.json();
}
