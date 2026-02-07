import { HLSPlayer } from "@/components/HLSPlayer";
import { BroadcastHero } from "@/components/ui/BroadcastHero";
import { ProgramScheduleBar } from "@/components/ui/ProgramScheduleBar";
import Navbar from "@/components/navbar";

export default function LiveStreamPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Navbar /> {/* Ensure Navbar is present on this page too */}
      <div className="container mx-auto px-6 pt-40 pb-32">
        {/* Live Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
              <span className="text-red-600 font-bold tracking-widest uppercase text-sm">
                Live Broadcast
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-900">
              TVKU Live Stream.
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-neutral-500 font-mono">
              Signal Status: 1080p | Stable
            </p>
            <p className="text-primary font-bold">
              24/7 Educational & Cultural Program
            </p>
          </div>
        </div>

        {/* Player Section */}
        <div className="w-full mb-12">
          <HLSPlayer
            src="https://tvku.tv/hlsstream/hls/live.m3u8"
            autoPlay={true}
            poster="/images/tvkulogoresize.png" // Fallback poster
          />
          <div className="bg-white p-6 rounded-none shadow-sm border border-t-0 border-neutral-200">
            <h2 className="text-xl font-bold mb-2">Sedang Tayang</h2>
            <p className="text-neutral-600">
              Saksikan siaran langsung program-program terbaik TVKU Udinus.
            </p>
          </div>
        </div>

        {/* Schedule Bar */}
        <div className="mb-12">
          <h3 className="font-bold text-neutral-400 uppercase tracking-widest mb-4">
            Jadwal Hari Ini
          </h3>
          <ProgramScheduleBar />
        </div>
      </div>
    </div>
  );
}
