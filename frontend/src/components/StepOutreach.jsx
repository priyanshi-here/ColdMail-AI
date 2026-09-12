import React, { useState } from 'react';
import { Mail, Copy, Check, RefreshCw, Scissors, Sparkles, UserCheck, Users, Download } from 'lucide-react';

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function StepOutreach({
  analysisData,
  tone,
  setTone,
  length,
  setLength,
  onRegenerate,
  loadingRegenerate,
  onToast
}) {
  const [activeTab, setActiveTab] = useState('recruiter'); // 'recruiter', 'hiring_manager', 'employee', 'linkedin_conn', 'linkedin_followup'
  const [copiedSubjectIndex, setCopiedSubjectIndex] = useState(null);
  const [copiedBody, setCopiedBody] = useState(false);

  if (!analysisData) return null;

  const { emails, linkedin, job_analysis } = analysisData;
  const subjects = emails?.subjects || [];

  const handleDownloadKit = () => {
    const comp = job_analysis?.company || 'Company';
    const role = job_analysis?.role || 'Role';
    const contentText = `=== COLDREACH AI OUTREACH KIT ===
Target Company: ${comp}
Target Role: ${role}
Match Score: ${analysisData.candidate_match?.match_score || 'N/A'}%

--------------------------------------------------
SUBJECT LINE OPTIONS:
${(emails?.subjects || []).map((s, i) => `Option ${i + 1}: ${s}`).join('\n')}

--------------------------------------------------
RECRUITER EMAIL:
${emails?.recruiter_email || ''}

--------------------------------------------------
HIRING MANAGER EMAIL:
${emails?.hiring_manager_email || ''}

--------------------------------------------------
REFERRAL / EMPLOYEE OUTREACH:
${emails?.employee_outreach || ''}

--------------------------------------------------
LINKEDIN CONNECTION DM:
${linkedin?.connection_message || ''}

--------------------------------------------------
LINKEDIN FOLLOW-UP DM:
${linkedin?.follow_up_message || ''}
`;

    const blob = new Blob([contentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Outreach_Kit_${comp.replace(/\s+/g, '_')}_${role.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onToast("Outreach Kit downloaded as .txt file!");
  };

  const copyToClipboard = (text, type = 'body', index = null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'subject') {
      setCopiedSubjectIndex(index);
      setTimeout(() => setCopiedSubjectIndex(null), 2000);
      onToast("Subject line copied to clipboard!");
    } else {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
      onToast("Outreach message copied to clipboard!");
    }
  };

  const handleConcise = () => {
    setLength("Short");
    onRegenerate("Short", tone);
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'recruiter':
        return {
          title: "Recruiter Email",
          subtitle: "Concise, professional email highlighting core qualifications & resume fit.",
          body: emails?.recruiter_email || ""
        };
      case 'hiring_manager':
        return {
          title: "Hiring Manager Email",
          subtitle: "Technical focus demonstrating project stack alignment & key contributions.",
          body: emails?.hiring_manager_email || ""
        };
      case 'employee':
        return {
          title: "Employee / Referral Outreach",
          subtitle: "Conversational outreach asking for guidance/insights into engineering culture.",
          body: emails?.employee_outreach || ""
        };
      case 'linkedin_conn':
        return {
          title: "LinkedIn Connection Message",
          subtitle: "Punchy request (approx 50-80 words) tailored to company and role.",
          body: linkedin?.connection_message || "",
          wordCount: (linkedin?.connection_message || "").trim().split(/\s+/).filter(Boolean).length
        };
      case 'linkedin_followup':
        return {
          title: "LinkedIn Follow-Up Message",
          subtitle: "Follow-up message after connection is accepted.",
          body: linkedin?.follow_up_message || ""
        };
      default:
        return { title: "", subtitle: "", body: "" };
    }
  };

  const content = getActiveContent();

  return (
    <div className="glass-card">
      <div className="section-title justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="step-num">4</span>
          <span>Generated Personal Outreach</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadKit}
            className="btn-secondary text-xs hover:border-emerald-500/50 hover:text-emerald-300"
            title="Download full outreach kit as text file"
          >
            <Download size={13} className="text-emerald-400" />
            Export Kit (.txt)
          </button>

          <button
            onClick={handleConcise}
            className="btn-secondary text-xs"
            disabled={loadingRegenerate}
            title="Make generated text shorter and more concise"
          >
            <Scissors size={13} className="text-amber-400" />
            Make More Concise
          </button>

          <button
            onClick={() => onRegenerate(length, tone)}
            className="btn-secondary text-xs hover:border-indigo-500/50 hover:text-indigo-300"
            disabled={loadingRegenerate}
          >
            <RefreshCw size={13} className={loadingRegenerate ? 'animate-spin' : ''} />
            Regenerate
          </button>
        </div>
      </div>

      {/* Tone & Length Preferences Bar */}
      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tone:</span>
          {["Professional", "Friendly", "Confident", "Concise"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTone(t);
                onRegenerate(length, t);
              }}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                tone === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Length:</span>
          {["Short", "Medium", "Detailed"].map((l) => (
            <button
              key={l}
              onClick={() => {
                setLength(l);
                onRegenerate(l, tone);
              }}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                length === l
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Outreach Category Tabs */}
      <div className="tabs-header">
        <button
          onClick={() => setActiveTab('recruiter')}
          className={`tab-btn ${activeTab === 'recruiter' ? 'active' : ''}`}
        >
          <Mail size={16} /> Recruiter Email
        </button>

        <button
          onClick={() => setActiveTab('hiring_manager')}
          className={`tab-btn ${activeTab === 'hiring_manager' ? 'active' : ''}`}
        >
          <UserCheck size={16} /> Hiring Manager Email
        </button>

        <button
          onClick={() => setActiveTab('employee')}
          className={`tab-btn ${activeTab === 'employee' ? 'active' : ''}`}
        >
          <Users size={16} /> Referral Outreach
        </button>

        <button
          onClick={() => setActiveTab('linkedin_conn')}
          className={`tab-btn ${activeTab === 'linkedin_conn' ? 'active' : ''}`}
        >
          <LinkedinIcon size={16} /> LinkedIn DM
        </button>

        <button
          onClick={() => setActiveTab('linkedin_followup')}
          className={`tab-btn ${activeTab === 'linkedin_followup' ? 'active' : ''}`}
        >
          <LinkedinIcon size={16} /> LinkedIn Follow-Up
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="space-y-4">
        {/* Email Subjects Option Selector (Visible for Email Tabs) */}
        {(activeTab === 'recruiter' || activeTab === 'hiring_manager') && subjects.length > 0 && (
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" /> 3 Targeted Subject Line Options:
            </p>
            <div className="space-y-1.5">
              {subjects.map((subj, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs text-indigo-200 hover:border-indigo-500/40 transition-all cursor-pointer group"
                  onClick={() => copyToClipboard(subj, 'subject', idx)}
                >
                  <span className="font-mono text-slate-200">
                    <span className="text-slate-500 font-sans mr-2">Option {idx + 1}:</span>
                    "{subj}"
                  </span>
                  <button className="text-xs text-slate-400 group-hover:text-indigo-400 flex items-center gap-1">
                    {copiedSubjectIndex === idx ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    {copiedSubjectIndex === idx ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Header Info */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-base text-slate-100">{content.title}</h4>
            <p className="text-xs text-slate-400">{content.subtitle}</p>
          </div>

          {content.wordCount !== undefined && (
            <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-mono">
              Word Count: {content.wordCount} words (Target: 50-80)
            </span>
          )}
        </div>

        {/* Main Content Box */}
        <div className="output-box font-sans">
          {loadingRegenerate ? (
            <div className="flex flex-col items-center justify-center h-44 gap-3">
              <div className="spinner" style={{ width: '28px', height: '28px' }}></div>
              <p className="text-xs text-indigo-300">Regenerating message with {tone} tone...</p>
            </div>
          ) : (
            content.body || "No message content generated."
          )}
        </div>

        {/* Copy Button Row */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => copyToClipboard(content.body, 'body')}
            className="btn-primary"
            disabled={!content.body || loadingRegenerate}
          >
            {copiedBody ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedBody ? 'Copied Message!' : 'Copy Outreach Message'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
