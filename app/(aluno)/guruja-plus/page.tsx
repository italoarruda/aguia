"use client";
import { useState } from "react";
import { Sparkles, Play, Search, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockVideos } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function GurujaPlusPage() {
  const [filter, setFilter] = useState<"todos" | "assistidos" | "nao">("todos");
  const [search, setSearch] = useState("");

  const videos = mockVideos.gurujaPlus.filter((v) => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "todos" ? true : filter === "assistidos" ? v.watched : !v.watched;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <Sparkles size={22} className="text-[var(--primary)]" /> Guruja+
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">
          Conteúdos complementares para apoiar sua jornada de estudos, ajudando a manter foco, equilíbrio e constância ao longo da preparação.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]"
        >
          <option value="todos">Todos</option>
          <option value="assistidos">Assistidos</option>
          <option value="nao">Não assistidos</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
          <input
            className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-1)] placeholder:text-[var(--text-3)]"
            placeholder="Procurar por um vídeo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v.id} className="space-y-3">
            <Card noPad className={cn(
              "overflow-hidden cursor-pointer hover:border-[var(--primary)] transition-colors group",
              v.watched && "opacity-80"
            )}>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-muted)] flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                  <Play size={20} className="text-[var(--primary)] group-hover:text-[#0A1A2E] ml-0.5" />
                </div>
                {v.watched && (
                  <Badge variant="success" className="absolute top-2 right-2 text-[10px] flex items-center gap-1">
                    <Check size={10} /> Assistido
                  </Badge>
                )}
              </div>
            </Card>
            <div>
              <p className="text-sm font-semibold text-[var(--text-1)]">{v.title} | {v.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
