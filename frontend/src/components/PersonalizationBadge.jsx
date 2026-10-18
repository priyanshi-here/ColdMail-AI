import React from 'react';
import { ShieldCheck, CheckSquare } from 'lucide-react';

export default function PersonalizationBadge({ personalization }) {
  if (!personalization) return null;

  const points = personalization.personalization_points || [];

  return (
    <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900/60 to-purple-950/60 border border-indigo-500/30 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="text-emerald-400" size={18} />
        <span className="font-bold text-sm text-indigo-200 uppercase tracking-wider">
          Personalization Transparency Layer
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
          Zero Hallucination
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-2 font-medium">
        Personalized specifically using verified evidence:
      </p>

      <ul className="space-y-1.5">
        {points.length > 0 ? (
          points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
              <CheckSquare size={14} className="text-indigo-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))
        ) : (
          <li className="text-xs text-slate-400">
            Personalized based on role qualifications and candidate projects.
          </li>
        )}
      </ul>
    </div>
  );
}
