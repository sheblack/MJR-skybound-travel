import { GoogleGenAI, Type } from "@google/genai";
import { SearchParams, SearchResult } from "./types";

const travelSchema = {
  type: Type.OBJECT,
  properties: {
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          otaName: { type: Type.STRING },
          providerName: { type: Type.STRING },
          type: { type: Type.STRING },
          departureTime: { type: Type.STRING },
          arrivalTime: { type: Type.STRING },
          duration: { type: Type.STRING },
          price: { type: Type.NUMBER },
          class: { type: Type.STRING },
          affiliateUrl: { type: Type.STRING },
          score: { type: Type.NUMBER },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['id', 'otaName', 'providerName', 'price', 'type', 'affiliateUrl']
      }
    },
    aiAnalysis: { type: Type.STRING }
  },
  required: ['options', 'aiAnalysis']
};

export const searchTravel = async (params: SearchParams): Promise<SearchResult> => {
  // Inisialisasi sesuai guideline: const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Bertindaklah sebagai Analis Perjalanan Senior MJR. Simulasikan data tiket real-time untuk:
    Rute: ${params.origin} ke ${params.destination}
    Tanggal: ${params.departureDate}
    Tipe Transportasi: ${params.transportType}
    
    Hasilkan 5 opsi terbaik dalam JSON valid. Gunakan nama operator asli Indonesia (Garuda, KAI, Rosalia Indah, Pelni).
    Berikan analisis AI MJR yang persuasif dalam Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: travelSchema,
      },
    });

    // Mengakses properti .text secara langsung (bukan method)
    const text = response.text;
    if (!text) throw new Error("MJR Engine: Data tidak ditemukan.");
    return JSON.parse(text);
  } catch (error) {
    console.error("MJR Engine Error:", error);
    throw new Error("Gagal sinkronisasi dengan MJR Network. Periksa API KEY di Vercel Dashboard Settings.");
  }
};
