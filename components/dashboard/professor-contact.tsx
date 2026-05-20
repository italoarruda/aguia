"use client";
import { Mail, Phone, Instagram, MessageCircle, X } from "lucide-react";

interface ProfessorContactProps {
  professor: {
    name: string;
    email: string;
    whatsapp: string;
    instagram: string;
    telegram: string;
  };
  onClose: () => void;
}

export function ProfessorContact({ professor, onClose }: ProfessorContactProps) {
  return (
    <div className="absolute right-0 top-10 z-50 w-64 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-sm text-[var(--text-1)]">{professor.name}</p>
        <button onClick={onClose} className="text-[var(--text-3)] hover:text-[var(--text-1)]">
          <X size={14} />
        </button>
      </div>
      <p className="text-xs text-[var(--text-3)] mb-3">Contato:</p>
      <div className="space-y-2">
        <a href={`mailto:${professor.email}`} className="flex items-center gap-2 text-xs text-[var(--primary)] hover:underline">
          <Mail size={12} /> {professor.email}
        </a>
        <div className="flex items-center gap-2 text-xs text-[var(--text-2)]">
          <Phone size={12} /> {professor.whatsapp}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-2)]">
          <Instagram size={12} /> {professor.instagram}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-2)]">
          <MessageCircle size={12} /> {professor.telegram}
        </div>
      </div>
    </div>
  );
}
