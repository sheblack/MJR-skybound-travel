
import React from 'react';
import { TravelOption, TransportType } from '../types';

interface ResultCardProps {
  option: TravelOption;
}

const ResultCard: React.FC<ResultCardProps> = ({ option }) => {
  const getTransportIcon = (type: string) => {
    const normalizedType = type.toUpperCase();
    if (normalizedType.includes('PLANE')) return <i className="fa-solid fa-plane"></i>;
    if (normalizedType.includes('TRAIN')) return <i className="fa-solid fa-train"></i>;
    if (normalizedType.includes('BUS')) return <i className="fa-solid fa-bus"></i>;
    if (normalizedType.includes('SEA')) return <i className="fa-solid fa-ship"></i>;
    return <i className="fa-solid fa-suitcase"></i>;
  };

  const getTagStyle = (tag: string) => {
    const t = tag.toUpperCase();
    if (t.includes('CHEAPEST') || t.includes('TERMURAH')) return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    if (t.includes('FASTEST') || t.includes('TERCEPAT')) return 'bg-amber-50 text-amber-600 border-amber-200';
    if (t.includes('BEST') || t.includes('NILAI')) return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-slate-50 text-slate-500 border-slate-200';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
      {/* Visual Indicator for Top Picks */}
      {option.score > 90 && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-[7px] font-black rounded-bl-lg uppercase tracking-widest z-10 shadow-lg">
          Best Option
        </div>
      )}

      {/* TOP: Provider Info */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-blue-600 text-lg border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            {getTransportIcon(option.type)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base tracking-tighter leading-none group-hover:text-blue-600 transition-colors">{option.providerName}</h3>
            <p className="text-[8px] font-black text-slate-400 mt-1 uppercase tracking-widest">{option.class} • via {option.otaName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Score</div>
          <div className="text-lg font-black text-slate-900 tracking-tighter">{option.score}</div>
        </div>
      </div>

      {/* CENTER: Timeline - Compact */}
      <div className="flex items-center justify-between bg-slate-50/50 rounded-xl p-4 mb-5 border border-slate-100/30 flex-grow">
        <div className="text-center">
          <div className="text-lg font-black text-slate-900 tabular-nums">{option.departureTime}</div>
          <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5 tracking-widest">Depart</div>
        </div>
        
        <div className="flex-grow px-3 flex flex-col items-center">
          <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{option.duration}</div>
          <div className="w-full h-[1px] bg-slate-200 relative">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-slate-400"></div>
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-slate-400"></div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-black text-slate-900 tabular-nums">{option.arrivalTime}</div>
          <div className="text-[7px] font-black text-slate-400 uppercase mt-0.5 tracking-widest">Arrive</div>
        </div>
      </div>

      {/* BOTTOM: Price & Action */}
      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-1">
          {option.tags.map(tag => (
            <span key={tag} className={`text-[7px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest ${getTagStyle(tag)}`}>
              {tag.replace(/_/g, ' ')}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0">
            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Total</div>
            <div className="text-xl font-black text-blue-600 tracking-tighter">
              {formatPrice(option.price)}
            </div>
          </div>
          <a 
            href={option.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow py-3 bg-blue-600 hover:bg-[#0f172a] text-white font-black rounded-lg text-center shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest active:scale-95"
          >
            Pesan
            <i className="fa-solid fa-chevron-right text-[7px]"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
