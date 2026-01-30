
import React, { useState, useEffect } from 'react';
import { SearchParams, SearchResult } from './types';
import { getAnalyzedTravelOptions } from './services/geminiService';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import Documentation from './components/Documentation';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [status, setStatus] = useState('CONNECTED');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(s => s === 'CONNECTED' ? 'ENCRYPTED' : 'CONNECTED');
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SkyBound AI Travel',
          text: 'Cari tiket cerdas bertenaga AI MJR. Cek rute terbaikmu di sini!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await getAnalyzedTravelOptions(params);
      if (data && data.options) {
        data.options.sort((a: any, b: any) => a.price - b.price);
        setResults(data);
        setTimeout(() => {
          document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    } catch (err) {
      setError("Sinkronisasi Server MJR Gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      
      {/* ULTRA COMPACT HEADER */}
      <header className="bg-[#0f172a] text-white px-3 py-2.5 flex justify-between items-center sticky top-0 z-[100] border-b border-white/5 shadow-xl">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full ${status === 'CONNECTED' ? 'bg-emerald-400 shadow-[0_0_5px_#34d399]' : 'bg-blue-500 animate-pulse'}`}></div>
          <span className="text-[6px] font-black tracking-[0.4em] uppercase opacity-30">SYSTEM: {status}</span>
        </div>
        <div className="flex items-center gap-1.5 relative">
          {shareFeedback && (
            <div className="absolute -bottom-8 right-0 bg-emerald-500 text-white text-[6px] px-2 py-1 rounded font-black uppercase tracking-widest animate-bounce">
              Link Ter-Copy!
            </div>
          )}
          <button onClick={handleShare} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 text-white transition-all active:scale-90">
            <i className="fa-solid fa-share-nodes text-[8px]"></i>
          </button>
          <button onClick={toggleFullscreen} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 text-white transition-all active:scale-90">
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-[8px]`}></i>
          </button>
          <button onClick={() => setShowDocs(!showDocs)} className="text-[7px] font-black bg-blue-600 hover:bg-blue-700 px-2.5 py-1.5 rounded-md transition-all uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95">
            {showDocs ? 'Tutup' : 'Deployment'}
          </button>
        </div>
      </header>

      {/* COMPACT HERO */}
      <section className="relative pt-10 md:pt-16 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109c05d?auto=format&fit=crop&q=80&w=2500" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/90 to-[#fcfdfe]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/10 mb-4 animate-float">
            <span className="text-[7px] font-black text-blue-300 uppercase tracking-[0.2em]">SkyBound Intelligence v3.5 PRO</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
            Explore <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">Smart Travel.</span>
          </h1>
          <p className="text-[9px] md:text-sm text-white/40 font-medium max-w-lg mx-auto leading-relaxed italic">
            Optimasi rute perjalanan bisnis dengan presisi AI tingkat lanjut.
          </p>
        </div>
      </section>

      {/* CONTENT AREA */}
      <main className="px-4 -mt-12 relative z-20 flex-grow pb-48 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-100">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>

          {showDocs ? (
            <div className="mt-10 animate-in slide-in-from-bottom-5 duration-500">
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs">
                      <i className="fa-solid fa-check-double"></i>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Multi-Cloud Ready</p>
                      <p className="text-[10px] text-emerald-900/60 font-medium">Config detected for Vercel & Netlify.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <i className="fa-brands fa-github text-slate-400 text-lg"></i>
                    <i className="fa-solid fa-cloud text-slate-400 text-lg"></i>
                  </div>
               </div>
              <Documentation />
            </div>
          ) : (
            <div id="results-view" className="mt-10 space-y-10">
              {error && (
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center shadow-lg max-w-xs mx-auto">
                  <p className="text-[8px] font-black text-red-900 uppercase tracking-[0.1em]">{error}</p>
                </div>
              )}
              {results && (
                <div className="bg-[#0f172a] p-5 rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm shadow-xl">
                          <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.3em]">AI MJR Insights</span>
                      </div>
                      <p className="text-sm md:text-lg font-bold text-white leading-snug italic opacity-80">
                        "{results.aiAnalysis}"
                      </p>
                   </div>
                </div>
              )}
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {results.options.map((option) => (
                    <ResultCard key={option.id} option={option} />
                  ))}
                </div>
              )}
              {!results && !loading && (
                <div className="text-center py-20 opacity-20">
                  <i className="fa-solid fa-fingerprint text-3xl mb-4 block"></i>
                  <p className="text-[7px] font-black uppercase tracking-[0.5em]">Waiting for System Input</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#0f172a] py-12 px-8 border-t border-white/5 mt-auto text-center">
          <span className="text-lg font-black text-white tracking-tighter uppercase">
            SKYBOUND<span className="text-blue-500 italic">AI</span>
          </span>
          <p className="text-[7px] font-black text-slate-700 uppercase tracking-[0.4em] mt-4 italic">© 2024 MJR TECHNOLOGY • GLOBAL INFRASTRUCTURE</p>
      </footer>
    </div>
  );
};

export default App;
