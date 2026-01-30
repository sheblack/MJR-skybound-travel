
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 space-y-12">
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-microchip text-blue-600"></i>
          Arsitektur Sistem MJR
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">1. Lapisan Frontend (React/Tailwind)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              SPA Responsif menggunakan standar React. Manajemen state menangani intensi pencarian dan hasil API. Penekanan tinggi pada UX konversi.
            </p>
            <h3 className="font-bold text-slate-800">2. Orkestrasi AI (Gemini 3 MJR)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mendeteksi "Value Intent" di luar penyortiran sederhana. Memberi peringkat hasil berdasarkan rasio harga/durasi/reliabilitas. Menghasilkan wawasan bahasa alami untuk membangun kepercayaan.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800">3. Lapisan Agregasi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Terhubung ke API OTA (Disimulasikan dalam demo). Menormalisasi skema XML/JSON dari Traveloka, Tiket.com, dll., menjadi format internal yang seragam.
            </p>
            <h3 className="font-bold text-slate-800">4. Mesin Afiliasi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Menghasilkan link pelacakan secara dinamis. Mengimplementasikan strategi deep-linking untuk mendorong pengguna langsung ke halaman pembayaran guna mengurangi gesekan funnel.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 rounded-3xl p-8 text-slate-100 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-emerald-400"></i>
          Bisnis & Strategi Konversi MJR
        </h2>
        <div className="space-y-6">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 mb-2">Peringkat Nilai Dinamis</h4>
            <p className="text-sm text-slate-300">
              Tidak seperti situs tradisional yang hanya mengurutkan berdasarkan harga, SkyBound AI MJR menonjolkan "Nilai Terbaik" (⭐), keseimbangan waktu tempuh dan biaya.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 mb-2">CTA Afiliasi Berbasis Kepercayaan</h4>
            <p className="text-sm text-slate-300">
              Copywriting dihasilkan oleh AI agar tidak mengganggu. "Ini opsi paling hemat. Lanjut booking lewat partner resmi kami" membangun kredibilitas.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h4 className="font-bold text-emerald-400 mb-2">Intelijen Upsell AI MJR</h4>
            <p className="text-sm text-slate-300">
              Rekomendasi bagasi dan asuransi prediktif berdasarkan jenis transportasi dan durasi meningkatkan AOV untuk pembayaran afiliasi.
            </p>
          </div>
        </div>
      </section>
      
      <div className="text-center text-slate-400 text-xs">
        <p>&copy; 2024 Platform SkyBound AI MJR. Dibangun untuk Skala Perjalanan Profesional.</p>
        <p>Penafian: Harga disimulasikan dan dihasilkan melalui Gemini untuk tujuan demonstrasi.</p>
      </div>
    </div>
  );
};

export default Documentation;
