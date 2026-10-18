import React from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';

export default function Header({ apiStatus }) {
  const isOnline = apiStatus?.status === 'healthy';
  const isGeminiConfigured = apiStatus?.gemini_api_configured;

  return (
    <header className="header-bar">
      <div className="logo-group">
        <div className="logo-icon-bg">
          <Send className="w-6 h-6 text-white" size={24} />
        </div>
        <div>
          <div className="logo-title flex items-center gap-2">
            <span className="gradient-title">ColdReach AI</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              v1.0
            </span>
          </div>
          <p className="logo-subtitle">
            Hyper-Personalized Job Outreach & Resume-JD Matcher
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isOnline ? (
          isGeminiConfigured ? (
            <div className="status-badge" title="Gemini AI Powered Generation Ready">
              <Sparkles size={14} />
              <span>Gemini 3.8 Active</span>
            </div>
          ) : (
            <div className="status-badge warning" title="No Gemini API Key set in backend .env. Operating in intelligent evidence-based mode.">
              <AlertCircle size={14} />
              <span>Smart Evidence Mode</span>
            </div>
          )
        ) : (
          <div className="status-badge warning">
            <div className="status-dot animate-pulse"></div>
            <span>Connecting to Backend...</span>
          </div>
        )}
      </div>
    </header>
  );
}
