import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StepResume from './components/StepResume';
import StepJobDesc from './components/StepJobDesc';
import StepAnalysis from './components/StepAnalysis';
import StepOutreach from './components/StepOutreach';
import { checkHealth, analyzeJobAndResume, regenerateOutreach } from './services/api';

export default function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [loadingRegenerate, setLoadingRegenerate] = useState(false);
  const [toast, setToast] = useState(null);

  const resultsRef = useRef(null);

  useEffect(() => {
    checkHealth().then((res) => setApiStatus(res));
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      showToast("Please paste a Job Description before analyzing.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeJobAndResume({
        jobDescription,
        candidateProfile,
        tone,
        length,
      });

      setAnalysisData(result);
      if (!candidateProfile && result.candidate_profile) {
        setCandidateProfile(result.candidate_profile);
      }

      showToast("Analysis complete! Evidence match score & outreach generated.");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err) {
      showToast(`Analysis Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (newLength = length, newTone = tone) => {
    if (!analysisData || !jobDescription.trim()) return;

    setLoadingRegenerate(true);
    try {
      const result = await regenerateOutreach({
        jobDescription,
        candidateProfile: candidateProfile || analysisData.candidate_profile,
        tone: newTone,
        length: newLength,
      });

      setAnalysisData(result);
      showToast(`Outreach updated with ${newTone} tone & ${newLength} length!`);
    } catch (err) {
      showToast(`Regeneration Error: ${err.message}`);
    } finally {
      setLoadingRegenerate(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header apiStatus={apiStatus} />

      {/* Main Steps Grid */}
      <div className="steps-grid">
        <StepResume
          candidateProfile={candidateProfile}
          setCandidateProfile={setCandidateProfile}
          onToast={showToast}
        />

        <StepJobDesc
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          loading={loading}
          onToast={showToast}
        />
      </div>

      {/* Results Section */}
      <div ref={resultsRef}>
        {analysisData && (
          <>
            <StepAnalysis analysisData={analysisData} />

            <StepOutreach
              analysisData={analysisData}
              tone={tone}
              setTone={setTone}
              length={length}
              setLength={setLength}
              onRegenerate={handleRegenerate}
              loadingRegenerate={loadingRegenerate}
              onToast={showToast}
            />
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast && <div className="toast-msg">{toast}</div>}
    </div>
  );
}
