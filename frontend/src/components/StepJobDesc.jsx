import React from 'react';
import { FileText, Sparkles, Send } from 'lucide-react';
import { getSampleJob } from '../services/api';

export default function StepJobDesc({ jobDescription, setJobDescription, onAnalyze, loading, onToast }) {
  const loadSampleJD = async () => {
    try {
      const sample = await getSampleJob();
      setJobDescription(sample.job_description);
      onToast("Loaded Sample Job Description (Full Stack Engineer at NexusAI)");
    } catch (err) {
      onToast(`Error: ${err.message}`);
    }
  };

  return (
    <div className="glass-card">
      <div className="section-title">
        <span className="step-num">2</span>
        <span>Paste Job Description (JD)</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-400">
            Target Job Description Text:
          </label>
          <button
            type="button"
            className="btn-secondary text-xs"
            onClick={loadSampleJD}
          >
            <Sparkles size={13} className="text-cyan-400" />
            Try with Sample JD (NexusAI)
          </button>
        </div>

        <textarea
          rows={10}
          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
          placeholder="Paste the full job posting here (e.g. Job Title, Company Name, Required & Preferred Qualifications, Responsibilities)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            className="btn-primary w-full sm:w-auto"
            onClick={onAnalyze}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Analyzing JD & Match Evidence...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Analyze Job & Generate Outreach</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
