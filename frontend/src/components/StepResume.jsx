import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, RefreshCw, Sparkles, User, Briefcase, Award, ExternalLink, Code } from 'lucide-react';
import { uploadResumePdf, getSampleResume } from '../services/api';

export default function StepResume({ candidateProfile, setCandidateProfile, onToast }) {
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      onToast("Please upload a valid PDF file (.pdf).");
      return;
    }

    setLoading(true);
    try {
      const profile = await uploadResumePdf(file);
      setCandidateProfile(profile);
      onToast("Resume uploaded and parsed successfully!");
    } catch (err) {
      onToast(`Upload error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const loadSample = async () => {
    setLoading(true);
    try {
      const sample = await getSampleResume();
      setCandidateProfile(sample);
      onToast("Loaded Sample Candidate Profile (Alex Chen)");
    } catch (err) {
      onToast(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="section-title">
        <span className="step-num">1</span>
        <span>Upload Candidate Resume</span>
      </div>

      {!candidateProfile ? (
        <div>
          <div
            className={`upload-zone ${dragActive ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            />

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="spinner" style={{ width: '36px', height: '36px' }}></div>
                <p className="text-sm font-semibold text-indigo-300">Extracting PDF text & building profile...</p>
              </div>
            ) : (
              <>
                <Upload className="upload-icon" />
                <p className="font-semibold text-base mb-1 text-slate-200">
                  Drop your resume PDF here, or <span className="text-indigo-400 underline">browse</span>
                </p>
                <p className="text-xs text-slate-400 mb-4">Supports PDF format (Max 10MB)</p>
                <button
                  type="button"
                  className="btn-secondary text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadSample();
                  }}
                >
                  <Sparkles size={14} className="text-amber-400" />
                  Try with Sample Resume (Alex Chen)
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400" size={20} />
              <div>
                <p className="text-sm font-bold text-emerald-300">Resume Uploaded Successfully</p>
                <p className="text-xs text-slate-400">Parsed candidate facts & skills extracted in memory</p>
              </div>
            </div>
            <button
              onClick={() => setCandidateProfile(null)}
              className="btn-secondary text-xs hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30"
              title="Replace current resume with another file"
            >
              <RefreshCw size={13} />
              Replace Resume
            </button>
          </div>

          {/* Parsed Profile Summary */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <User size={16} className="text-indigo-400" />
                <span className="font-bold text-sm text-slate-100">{candidateProfile.name}</span>
              </div>
              {candidateProfile.education && candidateProfile.education.length > 0 && (
                <span className="text-xs text-slate-400">
                  🎓 {candidateProfile.education[0].degree} ({candidateProfile.education[0].graduation_year})
                </span>
              )}
            </div>

            {/* Technical Skills */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Code size={13} /> Skills & Technologies:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {candidateProfile.technical_skills && candidateProfile.technical_skills.length > 0 ? (
                  candidateProfile.technical_skills.map((skill, idx) => (
                    <span key={idx} className="tag-pill req">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">None extracted</span>
                )}
              </div>
            </div>

            {/* Featured Projects */}
            {candidateProfile.projects && candidateProfile.projects.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                  <Briefcase size={13} /> Extracted Projects ({candidateProfile.projects.length}):
                </p>
                <div className="space-y-1">
                  {candidateProfile.projects.map((proj, i) => (
                    <div key={i} className="text-xs bg-slate-950/40 p-2 rounded border border-slate-800/60">
                      <span className="font-semibold text-indigo-300">{proj.name}: </span>
                      <span className="text-slate-300">{proj.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {candidateProfile.relevant_links && candidateProfile.relevant_links.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ExternalLink size={12} />
                <span>Links: {candidateProfile.relevant_links.join(' | ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
