"use client";
import { useState } from "react";
import { Compass, Play, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockVideos } from "@/lib/mock-data";

export default function CoordenadasPage() {
  const [search, setSearch] = useState("");
  const videos = mockVideos.coordenadas.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <Compass size={22} className="text-[var(--primary)]" /> Coordenadas
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Veja os vídeos que preparamos para orientar no seu planejamento.</p>
      </div>

      <div className="flex items-center gap-3">
        <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
          <option>Todos</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
          <input
            className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-1)] placeholder:text-[var(--text-3)]"
            placeholder="Buscar por coordenadas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <Card key={v.id} noPad className="overflow-hidden cursor-pointer hover:border-[var(--primary)] transition-colors group">
            <div className="aspect-video bg-[var(--surface-2)] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                <Play size={20} className="text-white ml-0.5" />
              </div>
              {v.isNew && (
                <Badge variant="primary" className="absolute top-2 right-2 text-[10px]">NEW</Badge>
              )}
              <p className="absolute bottom-2 right-2 text-white text-[10px] bg-black/50 px-1.5 py-0.5 rounded">
                {v.views} views
              </p>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-[var(--text-1)] leading-tight">{v.title}</p>
              {v.professor && (
                <p className="text-xs text-[var(--text-3)] mt-1">{v.professor}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
