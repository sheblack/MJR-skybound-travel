
import React, { useState } from 'react';
import { SearchParams, PreferenceType, TransportType } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const POPULAR_CITIES = [
  "Jakarta (CGK/HLP)", "Surabaya (SUB)", "Bali (DPS)", "Medan (KNO)", 
  "Yogyakarta (YIA)", "Bandung (BDO)", "Makassar (UPG)", "Semarang (SRG)", 
  "Palembang (PLM)", "Batam (BTH)", "Ambon (AMQ)", "Jayapura (DJJ)", 
  "Lombok (LOP)"
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [params, setParams] = useState<SearchParams>({
    origin: 'Jakarta (CGK/HLP)',
    destination: 'Bali (DPS)',
    departureDate: new Date().toISOString().split('T')[0],
    passengers: 1,
    maxBudget: 5000000,
    preference: PreferenceType.BEST_VALUE,
    transportType: 'ALL'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) onSearch(params);
  };

  const transportModes = [
    { id: 'ALL', label: 'Semua', icon: 'fa-table-cells-large' },
    { id: TransportType.BUS, label: 'Bus', icon: 'fa-bus' },
    { id: TransportType.TRAIN, label: 'Kereta', icon: 'fa-train' },
    { id: TransportType.PLANE, label: 'Pesawat', icon: 'fa-plane' },
    { id: TransportType.SEA, label: 'Laut', icon: 'fa-ship' },
  ];

  return (
    <div className="bg-white p-5 md:p-6 relative">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Horizontal Mode Switcher - Ultra Compact */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth-touch">
          {transportModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setParams({ ...params, transportType: mode.id as any })}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border-2 ${
                params.transportType === mode.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100 hover:text-slate-600'
              }`}
            >
              <i className={`fa-solid ${mode.icon} text-[10px]`}></i>
              {mode.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Kota Asal</label>
            <div className="relative group">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] transition-colors group-focus-within:text-blue-600">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <input
                list="origins"
                type="text"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-blue-600 rounded-xl outline-none text-xs font-bold transition-all focus:bg-white"
                value={params.origin}
                onChange={(e) => setParams({ ...params, origin: e.target.value })}
                placeholder="Asal"
                required
              />
              <datalist id="origins">
                {POPULAR_CITIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Tujuan</label>
            <div className="relative group">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] transition-colors group-focus-within:text-blue-600">
                <i className="fa-solid fa-map-pin"></i>
              </span>
              <input
                list="destinations"
                type="text"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-blue-600 rounded-xl outline-none text-xs font-bold transition-all focus:bg-white"
                value={params.destination}
                onChange={(e) => setParams({ ...params, destination: e.target.value })}
                placeholder="Tujuan"
                required
              />
              <datalist id="destinations">
                {POPULAR_CITIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          <div className="space-y-1 lg:col-span-1 md:col-span-2">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">Tanggal</label>
            <div className="relative group">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] pointer-events-none transition-colors group-focus-within:text-blue-600">
                <i className="fa-solid fa-calendar-day"></i>
              </span>
              <input
                type="date"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-blue-600 rounded-xl outline-none text-xs font-bold transition-all focus:bg-white"
                value={params.departureDate}
                onChange={(e) => setParams({ ...params, departureDate: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 bg-blue-600 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/20 active:scale-[0.98] ${loading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-[#0f172a]'}`}
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span className="uppercase tracking-[0.2em] text-[9px]">Menganalisis...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
              <span className="uppercase tracking-[0.2em] text-[9px]">Cari Tiket Sekarang</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
