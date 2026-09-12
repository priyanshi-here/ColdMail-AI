import React from 'react';
import { Building2, Briefcase, MapPin, CheckCircle2, AlertTriangle, XCircle, Award, Target } from 'lucide-react';
import PersonalizationBadge from './PersonalizationBadge';

export default function StepAnalysis({ analysisData }) {
  if (!analysisData) return null;

  const { job_analysis, candidate_match, personalization } = analysisData;
  const matchScore = candidate_match?.match_score || 75;

  return (
    <div className="glass-card mb-8">
      <div className="section-title justify-between">
        <div className="flex items-center gap-3">
          <span className="step-num">3</span>
          <span>Job Analysis & Resume Match Score</span>
        </div>
      </div>

      {/* Score Gauge & Overview */}
      <div className="score-card">
        <div className="score-circle" style={{ '--score-pct': matchScore }}>
          <div className="score-circle-inner">
            <span className="score-val text-emerald-400">{matchScore}%</span>
            <span className="score-lbl">Match</span>
          </div>
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Briefcase size={20} className="text-indigo-400" />
              {job_analysis.role || 'Target Role'}
            </h3>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold text-xs border border-indigo-500/30 flex items-center gap-1">
              <Building2 size={13} /> {job_analysis.company || 'Company'}
            </span>
            {job_analysis.location && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin size={12} /> {job_analysis.location}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Evidence Assessment: </span>
            {candidate_match.score_reasoning || "Match computed based on skill overlap and project experience."}
          </p>
        </div>
      </div>

      {/* Personalization Transparency Badge */}
      <PersonalizationBadge personalization={personalization} />

      {/* Required vs Preferred Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Target size={14} className="text-indigo-400" /> Required Skills (JD)
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {job_analysis.required_skills && job_analysis.required_skills.length > 0 ? (
              job_analysis.required_skills.map((skill, idx) => (
                <span key={idx} className="tag-pill req">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">Not specified</span>
            )}
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Award size={14} className="text-cyan-400" /> Preferred Skills (JD)
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {job_analysis.preferred_skills && job_analysis.preferred_skills.length > 0 ? (
              job_analysis.preferred_skills.map((skill, idx) => (
                <span key={idx} className="tag-pill pref">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">None specified</span>
            )}
          </div>
        </div>
      </div>

      {/* Match Categories: Strong, Partial, Missing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong Matches */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3.5 space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Strong Matches
          </h4>
          <div className="space-y-1.5">
            {candidate_match.strong_matches && candidate_match.strong_matches.length > 0 ? (
              candidate_match.strong_matches.map((item, idx) => (
                <div key={idx} className="text-xs text-emerald-200 bg-emerald-950/40 p-2 rounded border border-emerald-900/40">
                  ✓ {item}
                </div>
              ))
            ) : (
              <span className="text-xs text-slate-500">No direct strong matches identified</span>
            )}
          </div>
        </div>

        {/* Partial Matches */}
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 space-y-2">
          <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <AlertTriangle size={16} /> Partial / Related
          </h4>
          <div className="space-y-1.5">
            {candidate_match.partial_matches && candidate_match.partial_matches.length > 0 ? (
              candidate_match.partial_matches.map((item, idx) => (
                <div key={idx} className="text-xs text-amber-200 bg-amber-950/40 p-2 rounded border border-amber-900/40">
                  ~ {item}
                </div>
              ))
            ) : (
              <span className="text-xs text-slate-500 font-mono">None</span>
            )}
          </div>
        </div>

        {/* Missing Requirements */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <XCircle size={16} /> Missing Requirements
          </h4>
          <div className="space-y-1.5">
            {candidate_match.missing_requirements && candidate_match.missing_requirements.length > 0 ? (
              candidate_match.missing_requirements.map((item, idx) => (
                <div key={idx} className="text-xs text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-900/30">
                  ✗ {item}
                </div>
              ))
            ) : (
              <span className="text-xs text-emerald-400 font-medium">All core requirements present!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
