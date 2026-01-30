import React, { useState } from 'react';
import { SearchParams, SearchResult } from './types';
import { searchTravel } from './geminiService';
import SearchForm from './SearchForm';
import ResultCard from './ResultCard';
import Documentation from './Documentation';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'search' | 'docs'>('search');

  const handleSearch = async (p: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchTravel(p);
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <header className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">MJR SkyBound</h1>
              <p className="text-[7px] font-black text-blue-400 tracking-[0.3em] uppercase mt-1">Global Intelligence</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <button 
              onClick={() => {setView('search'); setResults(null);}}
              className={`text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all ${view === 'search' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/10'}`}
            >
              Search
            </button>
            <button 
              onClick={() => setView('docs')}
              className={`text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all ${view === 'docs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/10'}`}
            >
              System
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-6">
        {view === 'docs' ? (
          <Documentation />
        ) : (
          <div className="space-y-8">
            <SearchForm onSearch={handleSearch} loading={loading} />

            {error && (
              <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 shadow-sm">
                <i className="fa-solid fa-circle-exclamation text-xl"></i>
                <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
              </div>
            )}

            {loading && (
              <div className="py-32 text-center">
                <div className="inline-block w-14 h-14 border-[5px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing MJR Satellite Data...</p>
              </div>
            )}

            {results && !loading && (
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] border border-blue-50 shadow-sm relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 opacity-[0.03]">
                    <i className="fa-solid fa-robot text-[120px]"></i>
                  </div>
                  <h3 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">MJR Intelligence Analysis</h3>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">"{results.aiAnalysis}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.options.map(opt => <ResultCard key={opt.id} option={opt} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#0f172a] p-10 text-center border-t border-white/5 mt-12">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em]">MJR Infrastructure © 2024</p>
      </footer>
    </div>
  );
};

export default App;
