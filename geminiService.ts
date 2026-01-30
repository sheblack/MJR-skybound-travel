
import { GoogleGenAI, Type } from "@google/genai";
import { SearchParams, TravelOption, TransportType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const travelOptionSchema = {
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
          type: { 
            type: Type.STRING,
            description: "Wajib menggunakan salah satu dari: PLANE, TRAIN, BUS, atau SEA"
          },
          departureTime: { type: Type.STRING },
          arrivalTime: { type: Type.STRING },
          duration: { type: Type.STRING },
          price: { type: Type.NUMBER },
          currency: { type: Type.STRING },
          class: { type: Type.STRING },
          availableSeats: { type: Type.NUMBER },
          affiliateUrl: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          score: { type: Type.NUMBER },
          upsellOptions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                price: { type: Type.NUMBER }
              }
            }
          }
        },
        required: ['id', 'otaName', 'providerName', 'price', 'currency', 'tags', 'score', 'type']
      }
    },
    aiAnalysis: { type: Type.STRING },
    suggestedUpsell: { type: Type.STRING }
  },
  required: ['options', 'aiAnalysis']
};

export const getAnalyzedTravelOptions = async (params: SearchParams): Promise<any> => {
  const transportHint = params.transportType && params.transportType !== 'ALL' 
    ? `Hanya cari transportasi jenis: ${params.transportType}` 
    : "Berikan variasi transportasi (Pesawat, Kereta, Bus, atau Kapal Laut/Ferry Pelni)";

  const prompt = `
    Bertindaklah sebagai Analis Data Perjalanan Senior MJR. Simulasikan agregasi API real-time dari OTA terkemuka untuk:
    Asal: ${params.origin}
    Tujuan: ${params.destination}
    Tanggal: ${params.departureDate}
    Preferensi: ${params.preference}
    
    ${transportHint}

    ATURAN KETAT UNTUK FIELD 'type':
    - Jika Pesawat/Maskapai, gunakan 'PLANE'
    - Jika Kereta Api, gunakan 'TRAIN'
    - Jika Bus/Travel, gunakan 'BUS'
    - Jika Kapal Laut/Ferry/Pelni, gunakan 'SEA'

    Instruksi Khusus URL:
    - Karena ini adalah DEMO, JANGAN membuat link booking spesifik yang dalam (deep link) karena akan 404.
    - Gunakan link pencarian umum sebagai simulasi.
    - Contoh: jika Tiket.com pesawat, gunakan 'https://www.tiket.com/pesawat'.
    - Jika Traveloka kereta, gunakan 'https://www.traveloka.com/en-id/kereta-api'.
    - Jika Pelni, gunakan 'https://www.pelni.co.id/reservasi-tiket'.

    Instruksi Output:
    1. Hasilkan 5-7 opsi perjalanan yang beragam dalam bahasa Indonesia.
    2. Skor (0-100) berdasarkan preferensi user.
    3. Analisis AI MJR harus menyebutkan bahwa harga adalah estimasi real-time.
    4. Teks harus profesional dan meyakinkan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: travelOptionSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Tidak ada respon dari AI");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
