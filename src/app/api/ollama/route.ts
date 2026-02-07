import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

interface IBerita {
  id: number
  judul: string
  deskripsi: string
  kategori: {
    nama: string
  }
}

interface IProgram {
  id: number
  judul: string
  deskripsi: string
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    const userPrompt = prompt.trim()

    const systemPrompt = `anda adalah LIL BAH AI. Aturan:
    1. Fokus pada topik berita dan informasi umum
    2. Jangan bahas topik sensitif
    3. Jawab dalam bahasa yang sopan dan informatif
    4. Jika tidak tahu jawabannya, katakan dengan sopan kalau kurang tahu
    5. Jika ada berita terkini, sertakan dalam jawaban
    6. jawab pertanyaan sesuai dengan apa yang ada di dalam data yang dimiliki
    `;

    let fullPrompt = `${systemPrompt}\n\nPertanyaan: ${userPrompt}`;

    if (prompt.toLowerCase().includes("berita")) {
      const beritaRes = await axios.get(`https://apidev.tvku.tv/api/berita`)
      const beritaData = beritaRes.data.data

      if (beritaData && beritaData.length > 0) {
        const beritaFormatted = beritaData.map((item: IBerita, idx: number) => {
          return `${idx + 1}. ${item.judul} [${item.kategori?.nama ?? 'Umum'}]\n   ${item.deskripsi}`
        }).join('\n\n')        

        fullPrompt += `\n\n📰 Berita Terkini: \n\n${beritaFormatted}`
      }
    }

    if (prompt.toLowerCase().includes("program")) {
      const programRes = await axios.get(`https://apidev.tvku.tv/api/our-programs`)
      const programData = programRes.data.data

      if (programData && programData.length > 0) {
        const programFormatted = programData.map((item: IProgram, idx: number) => {
          return `${idx + 1}. ${item.judul}\n   ${item.deskripsi}`
        }).join('\n\n')
        
        fullPrompt += `\n\n📺 Daftar Program: \n\n${programFormatted}`
      }
    }

    // Kirim prompt ke Ollama
    const response = await fetch(`http://127.0.0.1:11434/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: fullPrompt,
        stream: false,
      }),
    })

    const data = await response.json()
    const finalResponse = data.response.trim()

    const elevenRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/3AwU3nHsI4YWeBJbz6yn`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: finalResponse,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          speed: 1.0,
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    })

    const audioBuffer = await elevenRes.arrayBuffer()
    const audioBase64 = Buffer.from(audioBuffer).toString('base64')
    const audioDataUrl = `data:audio/mpeg;base64,${audioBase64}`

    return NextResponse.json({
      response: finalResponse,
      audio: audioDataUrl,
    })

  } catch (error) {
    console.error("Error in /api/ollama:", error)
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    )
  }
}
