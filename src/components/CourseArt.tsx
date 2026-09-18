import type { ComponentType } from "react";
import type { Course } from "@/data/courses";

type P = { className?: string };

const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path
    d={`M${x} ${y - 5 * s} L${x + 1.6 * s} ${y - 1.6 * s} L${x + 5 * s} ${y} L${x + 1.6 * s} ${y + 1.6 * s} L${x} ${y + 5 * s} L${x - 1.6 * s} ${y + 1.6 * s} L${x - 5 * s} ${y} L${x - 1.6 * s} ${y - 1.6 * s} Z`}
    className="fill-accent/70"
  />
);

/* ---------- Entretien maison ---------- */

function ArtVaisselleEco({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="28" y="58" width="30" height="56" rx="7" className="fill-primary/25" />
      <rect x="36" y="48" width="14" height="10" rx="2" className="fill-primary/40" />
      <path d="M34 76h18M34 84h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/90" />
      <rect x="70" y="72" width="118" height="38" rx="9" className="fill-primary/15" />
      <path d="M78 72v-6c0-6 5-10 12-10h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/55" />
      <path d="M96 58v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/55" />
      <rect x="88" y="88" width="30" height="8" rx="3" className="fill-card/90" />
      <circle cx="136" cy="92" r="8" className="fill-card/90" />
      <circle cx="106" cy="74" r="5" className="fill-card" />
      <circle cx="118" cy="70" r="4" className="fill-card" />
      <circle cx="152" cy="72" r="5" className="fill-card" />
      <rect x="168" y="98" width="26" height="13" rx="3" className="fill-accent/60" />
      <Sparkle x={196} y={52} s={0.8} />
      <Sparkle x={64} y={44} />
    </svg>
  );
}

function ArtVaissellePremium({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="30" y="56" width="34" height="58" rx="8" className="fill-primary/25" />
      <rect x="40" y="44" width="14" height="12" rx="2" className="fill-primary/40" />
      <rect x="36" y="36" width="26" height="9" rx="4" className="fill-primary/45" />
      <path d="M62 40h9v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/45" />
      <rect x="74" y="70" width="112" height="40" rx="10" className="fill-primary/15" />
      <circle cx="88" cy="70" r="6" className="fill-card" />
      <circle cx="102" cy="66" r="5" className="fill-card" />
      <circle cx="118" cy="69" r="6" className="fill-card" />
      <circle cx="134" cy="66" r="5" className="fill-card" />
      <circle cx="150" cy="70" r="6" className="fill-card" />
      <rect x="92" y="90" width="34" height="9" rx="3" className="fill-card/90" />
      <circle cx="152" cy="94" r="9" className="fill-card/80" />
      <circle cx="198" cy="98" r="9" className="fill-accent/70" />
      <circle cx="198" cy="98" r="4.5" className="fill-accent/40" />
      <Sparkle x={206} y={44} />
      <Sparkle x={66} y={44} s={0.8} />
    </svg>
  );
}

function ArtSavonMains({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M56 26v90M86 26v90M154 26v90M184 26v90" stroke="currentColor" strokeWidth="1.5" className="text-primary/15" />
      <path d="M56 46h128M56 96h128" stroke="currentColor" strokeWidth="1.5" className="text-primary/15" />
      <rect x="102" y="66" width="40" height="52" rx="10" className="fill-primary/25" />
      <rect x="116" y="50" width="12" height="16" rx="2" className="fill-primary/45" />
      <path d="M116 56h-16v7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/45" />
      <path d="M110 84h24M110 92h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/90" />
      <ellipse cx="104" cy="118" rx="16" ry="6" className="fill-primary/30" />
      <ellipse cx="142" cy="119" rx="14" ry="5.5" className="fill-primary/25" />
      <circle cx="92" cy="72" r="2.5" className="fill-primary/45" />
      <circle cx="88" cy="84" r="2" className="fill-primary/45" />
      <circle cx="152" cy="76" r="2.5" className="fill-primary/45" />
      <path d="M84 60q8 10 0 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/70" />
      <Sparkle x={196} y={44} s={0.9} />
    </svg>
  );
}

function ArtFour({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="78" y="34" width="84" height="74" rx="8" className="fill-primary/15" />
      <circle cx="90" cy="41" r="3" className="fill-card" />
      <circle cx="102" cy="41" r="3" className="fill-card" />
      <rect x="90" y="52" width="60" height="30" rx="4" className="fill-card/85" />
      <path d="M102 58v14M114 62v10M128 56v12M138 60v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/50" />
      <rect x="176" y="56" width="26" height="52" rx="6" className="fill-primary/25" />
      <path d="M182 48l14-6v10l-10 4z" className="fill-primary/40" />
      <rect x="180" y="44" width="8" height="8" className="fill-primary/45" />
      <circle cx="168" cy="40" r="2" className="fill-primary/50" />
      <circle cx="162" cy="48" r="2" className="fill-primary/50" />
      <circle cx="170" cy="30" r="2" className="fill-primary/50" />
      <path d="M96 116q4-6 0-12M110 116q4-6 0-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/60" />
      <Sparkle x={206} y={88} s={0.8} />
    </svg>
  );
}

function ArtJavel({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="88" y="60" width="56" height="54" rx="8" className="fill-primary/20" />
      <rect x="106" y="50" width="20" height="10" rx="2" className="fill-primary/40" />
      <path d="M144 70c10 2 10 22 0 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/50" />
      <rect x="104" y="74" width="24" height="24" rx="2" transform="rotate(45 116 86)" className="fill-accent/60" />
      <path d="M92 96q10-6 20 0t20 0t20 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/70" />
      <circle cx="76" cy="70" r="3" className="fill-primary/45" />
      <circle cx="164" cy="66" r="3" className="fill-primary/45" />
      <Sparkle x={62} y={48} s={0.9} />
      <Sparkle x={182} y={104} s={0.7} />
    </svg>
  );
}

function ArtLessive({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="118" y="36" width="78" height="76" rx="10" className="fill-primary/15" />
      <path d="M118 52h78" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
      <circle cx="132" cy="44" r="3" className="fill-card" />
      <circle cx="144" cy="44" r="3" className="fill-card" />
      <circle cx="157" cy="80" r="22" className="fill-card/85" />
      <circle cx="157" cy="80" r="16" className="fill-primary/15" />
      <path d="M147 76q10-8 20 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
      <rect x="36" y="58" width="36" height="54" rx="9" className="fill-primary/25" />
      <rect x="46" y="50" width="16" height="8" rx="2" className="fill-primary/40" />
      <path d="M44 80h20M44 88h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/90" />
      <rect x="86" y="94" width="28" height="18" rx="4" className="fill-primary/35" />
      <rect x="86" y="100" width="28" height="6" className="fill-card/70" />
      <circle cx="84" cy="66" r="4" className="fill-card" />
      <circle cx="94" cy="56" r="3" className="fill-card" />
      <Sparkle x={210} y={52} s={0.9} />
    </svg>
  );
}

function ArtSanibon({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M28 116h184" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <path d="M84 74l8 42h56l8-42Z" className="fill-primary/20" />
      <ellipse cx="120" cy="74" rx="36" ry="6" className="fill-primary/35" />
      <rect x="100" y="60" width="40" height="10" rx="5" className="fill-primary/40" />
      <path d="M150 30l-14 44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/55" />
      <path d="M136 74l-8 26M136 74v28M136 74l8 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/45" />
      <path d="M198 44l6 12h-12ZM208 52l5 10h-10ZM190 52l5 10h-10Z" className="fill-primary/50" />
      <path d="M198 58v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/45" />
      <ellipse cx="66" cy="110" rx="7" ry="2" className="fill-card/80" />
      <ellipse cx="180" cy="113" rx="6" ry="2" className="fill-card/80" />
      <Sparkle x={56} y={60} s={0.9} />
    </svg>
  );
}

function ArtSol({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="48" y="84" width="144" height="32" className="fill-primary/10" />
      <path d="M84 84v32M120 84v32M156 84v32M48 92h144M48 104h144" stroke="currentColor" strokeWidth="1.5" className="text-primary/25" />
      <path d="M156 28l-16 60" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/55" />
      <rect x="124" y="86" width="34" height="10" rx="5" className="fill-primary/40" />
      <path d="M128 96l-4 14M138 96v15M148 96l4 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/45" />
      <rect x="64" y="54" width="22" height="40" rx="6" className="fill-primary/25" />
      <rect x="68" y="46" width="14" height="9" rx="2" className="fill-primary/45" />
      <path d="M82 50l8 4-6 5z" className="fill-primary/40" />
      <path d="M192 58q8 8 0 16M200 54q12 12 0 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/60" />
      <Sparkle x={44} y={56} s={0.8} />
    </svg>
  );
}

function ArtVitres({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <circle cx="206" cy="32" r="10" className="fill-accent/70" />
      <path d="M206 18v-5M219 25l4-4M193 25l-4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/60" />
      <rect x="66" y="28" width="108" height="76" rx="6" className="fill-card/70" />
      <path d="M66 28h108v76H66Z" stroke="currentColor" strokeWidth="2.5" className="text-primary/35" />
      <path d="M120 28v76M66 66h108" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
      <path d="M84 42l18 18M100 38l14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/25" />
      <rect x="150" y="94" width="40" height="6" rx="3" className="fill-primary/45" />
      <path d="M190 94l16-32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/55" />
      <rect x="30" y="62" width="24" height="44" rx="7" className="fill-primary/25" />
      <rect x="34" y="54" width="16" height="9" rx="2" className="fill-primary/45" />
      <circle cx="62" cy="58" r="2" className="fill-primary/50" />
      <circle cx="70" cy="52" r="2" className="fill-primary/50" />
      <Sparkle x={156} y={56} />
    </svg>
  );
}

function ArtWc({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="88" y="30" width="64" height="26" rx="6" className="fill-primary/20" />
      <rect x="112" y="34" width="16" height="5" rx="2" className="fill-card" />
      <path d="M92 56h56v10c0 18-12 30-28 30S92 84 92 66Z" className="fill-card/85" />
      <ellipse cx="120" cy="56" rx="28" ry="7" className="fill-primary/30" />
      <path d="M108 96h24l4 14h-32Z" className="fill-primary/25" />
      <path d="M172 52v40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/55" />
      <ellipse cx="172" cy="96" rx="9" ry="6" className="fill-primary/40" />
      <path d="M162 100h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <circle cx="100" cy="68" r="2.5" className="fill-card" />
      <circle cx="140" cy="72" r="2.5" className="fill-card" />
      <circle cx="120" cy="80" r="2" className="fill-card" />
      <g transform="rotate(-24 198 90)">
        <rect x="188" y="70" width="20" height="40" rx="5" className="fill-primary/25" />
        <rect x="194" y="62" width="8" height="9" rx="2" className="fill-primary/45" />
      </g>
      <Sparkle x={56} y={52} s={0.9} />
    </svg>
  );
}

/* ---------- Soins & hygiène ---------- */

function ArtAdoucissant({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M104 58c0-6 4-10 8-12h16c4 2 8 6 8 12v44a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8Z" className="fill-primary/25" />
      <rect x="112" y="38" width="16" height="9" rx="2" className="fill-primary/45" />
      <rect x="110" y="72" width="20" height="18" rx="3" className="fill-card/85" />
      <circle cx="120" cy="81" r="3" className="fill-accent/70" />
      <circle cx="115" cy="77" r="2" className="fill-accent/50" />
      <circle cx="125" cy="77" r="2" className="fill-accent/50" />
      <circle cx="115" cy="85" r="2" className="fill-accent/50" />
      <circle cx="125" cy="85" r="2" className="fill-accent/50" />
      <path d="M40 110q20-10 40 0t40 0t40 0t40 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/35" />
      <path d="M168 60h10l6 7 6-7h10l6 14-9 4v26h-32V78l-9-4Z" className="fill-primary/20" />
      <Sparkle x={64} y={56} s={0.9} />
      <Sparkle x={198} y={40} s={0.8} />
    </svg>
  );
}

function ArtCreme({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M52 74v22a8 8 0 0 0 8 8h32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/40" />
      <path d="M188 74v22a8 8 0 0 1-8 8h-32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/40" />
      <rect x="98" y="70" width="44" height="38" rx="12" className="fill-primary/25" />
      <rect x="94" y="62" width="52" height="12" rx="6" className="fill-primary/45" />
      <rect x="112" y="55" width="16" height="7" rx="3" className="fill-primary/45" />
      <path d="M108 88q6-8 12 0t12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/90" />
      <circle cx="80" cy="104" r="6" stroke="currentColor" strokeWidth="2" className="text-primary/50" fill="none" />
      <circle cx="164" cy="100" r="5" stroke="currentColor" strokeWidth="2" className="text-primary/50" fill="none" />
      <rect x="130" y="112" width="24" height="12" rx="3" className="fill-accent/50" />
      <Sparkle x={58} y={54} s={0.9} />
      <Sparkle x={190} y={52} s={0.8} />
    </svg>
  );
}

function ArtSavonDur({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M76 106h88l-6 10H82Z" className="fill-primary/25" />
      <rect x="84" y="88" width="72" height="18" rx="6" className="fill-primary/35" />
      <rect x="96" y="70" width="48" height="18" rx="6" className="fill-primary/25" />
      <rect x="112" y="70" width="16" height="18" className="fill-card/70" />
      <circle cx="120" cy="79" r="5" stroke="currentColor" strokeWidth="2" className="text-primary/50" fill="none" />
      <circle cx="78" cy="58" r="5" className="fill-card" />
      <circle cx="92" cy="48" r="4" className="fill-card" />
      <circle cx="166" cy="52" r="6" className="fill-card" />
      <circle cx="178" cy="64" r="4" className="fill-card" />
      <path d="M70 70c3 4 3 8 0 10s-4-4 0-10Z" className="fill-primary/45" />
      <Sparkle x={204} y={44} />
    </svg>
  );
}

function ArtShampooing({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M78 44q-10 24 4 46M162 44q10 24-4 46" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary/30" />
      <rect x="100" y="50" width="40" height="62" rx="14" className="fill-primary/25" />
      <rect x="110" y="40" width="20" height="11" rx="3" className="fill-primary/45" />
      <rect x="108" y="72" width="24" height="24" rx="4" className="fill-card/85" />
      <path d="M120 78c4 6 4 10 0 12s-5-6 0-12Z" className="fill-primary/50" />
      <circle cx="88" cy="60" r="4" className="fill-card" />
      <circle cx="94" cy="72" r="3" className="fill-card" />
      <circle cx="154" cy="58" r="5" className="fill-card" />
      <circle cx="148" cy="70" r="3" className="fill-card" />
      <path d="M106 60q-3 8 0 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/70" />
      <Sparkle x={200} y={48} s={0.9} />
    </svg>
  );
}

function ArtGelDouche({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M120 26v-10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/50" />
      <rect x="88" y="26" width="64" height="12" rx="6" className="fill-primary/35" />
      <circle cx="100" cy="34" r="1.8" className="fill-card" />
      <circle cx="110" cy="34" r="1.8" className="fill-card" />
      <circle cx="120" cy="34" r="1.8" className="fill-card" />
      <circle cx="130" cy="34" r="1.8" className="fill-card" />
      <circle cx="140" cy="34" r="1.8" className="fill-card" />
      <path d="M100 42q-2 24 6 44M120 42q0 26 0 46M140 42q2 24-6 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-card/80" />
      <rect x="164" y="64" width="30" height="48" rx="9" className="fill-primary/25" />
      <rect x="172" y="56" width="14" height="9" rx="2" className="fill-primary/45" />
      <path d="M170 82h18M170 90h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/85" />
      <path d="M60 64q6-6 0-12M74 70q6-6 0-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <Sparkle x={54} y={92} s={0.8} />
      <Sparkle x={204} y={44} s={0.9} />
    </svg>
  );
}

/* ---------- Auto ---------- */

function ArtAutoShampoing({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M28 118h184" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <path d="M52 96c2-14 10-22 24-24l10-12a10 10 0 0 1 8-4h40a10 10 0 0 1 8 4l12 14c12 2 20 10 22 22v6a4 4 0 0 1-4 4h-10a12 12 0 0 1-23 0h-46a12 12 0 0 1-23 0h-14a4 4 0 0 1-4-4Z" className="fill-primary/25" />
      <path d="M92 62h20v14H86l6-14Z" className="fill-card/85" />
      <path d="M118 62h22l8 14h-30Z" className="fill-card/85" />
      <circle cx="80" cy="104" r="10" className="fill-primary/50" />
      <circle cx="80" cy="104" r="4" className="fill-card" />
      <circle cx="156" cy="104" r="10" className="fill-primary/50" />
      <circle cx="156" cy="104" r="4" className="fill-card" />
      <circle cx="84" cy="66" r="9" className="fill-card" />
      <circle cx="100" cy="58" r="11" className="fill-card" />
      <circle cx="116" cy="64" r="9" className="fill-card" />
      <circle cx="130" cy="58" r="8" className="fill-card" />
      <circle cx="142" cy="66" r="7" className="fill-card" />
      <path d="M188 88l4 30h28l4-30Z" className="fill-primary/20" />
      <ellipse cx="206" cy="88" rx="18" ry="5" className="fill-primary/40" />
      <circle cx="198" cy="84" r="4" className="fill-card" />
      <circle cx="212" cy="82" r="3" className="fill-card" />
      <circle cx="74" cy="44" r="3" className="fill-card" />
      <circle cx="66" cy="34" r="2" className="fill-card" />
      <Sparkle x={204} y={52} s={0.9} />
    </svg>
  );
}

function ArtAutoGlass({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M48 100l40-58h92l20 58Z" className="fill-card/80" />
      <path d="M48 100l40-58h92l20 58Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-primary/35" />
      <path d="M100 90l30-32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-card/90" />
      <path d="M64 92l52-18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/55" />
      <path d="M116 74l44-15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary/40" />
      <rect x="36" y="108" width="18" height="12" rx="3" className="fill-primary/40" />
      <circle cx="58" cy="96" r="2" className="fill-primary/50" />
      <circle cx="66" cy="88" r="2" className="fill-primary/50" />
      <circle cx="74" cy="80" r="2" className="fill-primary/50" />
      <Sparkle x={150} y={64} />
      <Sparkle x={122} y={82} s={0.7} />
      <Sparkle x={186} y={104} s={0.8} />
    </svg>
  );
}

function ArtAutoTableau({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M32 78q28-18 88-18t88 18v22a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6Z" className="fill-primary/20" />
      <rect x="64" y="74" width="20" height="9" rx="3" className="fill-card/85" />
      <rect x="92" y="74" width="20" height="9" rx="3" className="fill-card/85" />
      <rect x="120" y="74" width="20" height="9" rx="3" className="fill-card/85" />
      <circle cx="172" cy="80" r="11" className="fill-card/85" />
      <path d="M172 80l7-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/55" />
      <rect x="140" y="72" width="22" height="14" rx="3" className="fill-card/70" />
      <path d="M196 96q8-8 16-2l-6 14q-8 4-14-2Z" className="fill-accent/50" />
      <path d="M186 92q-6 6-2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/60" />
      <path d="M48 88q10-6 20-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-card/70" />
      <Sparkle x={206} y={44} s={0.9} />
    </svg>
  );
}

function ArtAutoMoteur({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="84" y="52" width="72" height="48" rx="8" className="fill-primary/25" />
      <rect x="96" y="36" width="12" height="16" rx="3" className="fill-primary/45" />
      <rect x="116" y="36" width="12" height="16" rx="3" className="fill-primary/45" />
      <rect x="136" y="36" width="12" height="16" rx="3" className="fill-primary/45" />
      <path d="M84 66H64v20h20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/45" />
      <path d="M156 70h20v14h-20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/45" />
      <rect x="96" y="100" width="48" height="10" rx="4" className="fill-primary/40" />
      <circle cx="90" cy="60" r="2" className="fill-card" />
      <circle cx="150" cy="60" r="2" className="fill-card" />
      <circle cx="90" cy="92" r="2" className="fill-card" />
      <circle cx="150" cy="92" r="2" className="fill-card" />
      <rect x="28" y="66" width="22" height="42" rx="5" className="fill-primary/25" />
      <rect x="32" y="58" width="14" height="9" rx="2" className="fill-primary/45" />
      <path d="M46 62h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/45" />
      <path d="M60 104c3 5 3 9 0 11s-4-5 0-11ZM198 100c3 5 3 9 0 11s-4-5 0-11Z" className="fill-primary/50" />
      <Sparkle x={206} y={52} s={0.8} />
    </svg>
  );
}

function ArtAutoMousse({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M28 114h184" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <rect x="96" y="44" width="112" height="64" rx="10" className="fill-primary/15" />
      <circle cx="108" cy="58" r="11" className="fill-card" />
      <circle cx="128" cy="50" r="13" className="fill-card" />
      <circle cx="148" cy="58" r="11" className="fill-card" />
      <circle cx="166" cy="52" r="10" className="fill-card" />
      <circle cx="184" cy="60" r="9" className="fill-card" />
      <circle cx="118" cy="70" r="10" className="fill-card" />
      <circle cx="140" cy="68" r="12" className="fill-card" />
      <circle cx="160" cy="70" r="10" className="fill-card" />
      <circle cx="178" cy="68" r="9" className="fill-card" />
      <circle cx="104" cy="72" r="8" className="fill-card" />
      <rect x="28" y="70" width="24" height="44" rx="6" className="fill-primary/25" />
      <path d="M52 78l28-24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/50" />
      <path d="M80 54l10-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/50" />
      <circle cx="94" cy="50" r="4" className="fill-card/90" />
      <circle cx="102" cy="44" r="3" className="fill-card/90" />
      <Sparkle x={206} y={116} s={0.8} />
    </svg>
  );
}

function ArtAutoRefroidissement({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="56" y="44" width="76" height="62" rx="8" className="fill-primary/20" />
      <path d="M70 52v46M84 52v46M98 52v46M112 52v46M126 52v46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/40" />
      <rect x="84" y="36" width="20" height="9" rx="2" className="fill-primary/45" />
      <path d="M132 60q24-4 34 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary/45" />
      <rect x="172" y="64" width="36" height="48" rx="8" className="fill-primary/25" />
      <rect x="182" y="56" width="14" height="9" rx="2" className="fill-primary/45" />
      <path d="M176 94q8-5 14 0t14 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/80" />
      <path d="M46 32v14M39 36l14 6M39 42l14-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/70" />
      <rect x="166" y="28" width="6" height="20" rx="3" className="fill-primary/40" />
      <circle cx="169" cy="54" r="5" className="fill-accent/60" />
      <Sparkle x={210} y={44} s={0.8} />
    </svg>
  );
}

function ArtAutoAntibuee({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="44" y="36" width="152" height="68" rx="12" className="fill-card/70" />
      <rect x="44" y="36" width="152" height="68" rx="12" stroke="currentColor" strokeWidth="2.5" className="text-primary/30" fill="none" />
      <ellipse cx="92" cy="70" rx="26" ry="14" className="fill-primary/20" />
      <ellipse cx="136" cy="78" rx="30" ry="12" className="fill-primary/15" />
      <ellipse cx="160" cy="56" rx="18" ry="10" className="fill-primary/20" />
      <path d="M76 88q30-14 66-8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-card/90" />
      <circle cx="150" cy="88" r="8" className="fill-primary/30" />
      <path d="M162 80q6 6 2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/45" />
      <Sparkle x={176} y={52} s={0.9} />
      <Sparkle x={62} y={52} s={0.7} />
    </svg>
  );
}

function ArtAutoParfum({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="84" y="34" width="72" height="26" rx="6" className="fill-primary/20" />
      <path d="M92 41h56M92 47h56M92 53h56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/45" />
      <path d="M120 60v8" stroke="currentColor" strokeWidth="2" className="text-primary/45" />
      <rect x="110" y="68" width="20" height="30" rx="5" className="fill-primary/25" />
      <rect x="115" y="62" width="10" height="7" rx="2" className="fill-primary/45" />
      <path d="M120 82c3 5 3 8 0 10s-4-4 0-10Z" className="fill-card/90" />
      <path d="M138 76q8-6 16 0M142 84q10-8 20 0M138 92q8-6 16 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent/60" />
      <circle cx="152" cy="60" r="2" className="fill-accent" />
      <circle cx="162" cy="68" r="2" className="fill-accent" />
      <Sparkle x={64} y={52} s={0.9} />
    </svg>
  );
}

function ArtAutoJantes({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <circle cx="112" cy="76" r="44" className="fill-primary/25" />
      <circle cx="112" cy="76" r="28" className="fill-card/85" />
      <circle cx="112" cy="76" r="8" className="fill-primary/50" />
      <path d="M112 52v16M133 62l-12 12M133 90l-12-12M91 90l12-12M91 62l12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/45" />
      <circle cx="70" cy="44" r="3" className="fill-card" />
      <circle cx="62" cy="56" r="2" className="fill-card" />
      <circle cx="78" cy="32" r="2" className="fill-card" />
      <path d="M196 34l-24 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/55" />
      <path d="M162 64l16 12-8 10-16-12Z" className="fill-primary/40" />
      <Sparkle x={170} y={104} s={0.9} />
      <Sparkle x={52} y={96} s={0.7} />
    </svg>
  );
}

function ArtAutoLaveGlace({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M28 40q92-22 184 0" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-primary/25" />
      <rect x="92" y="64" width="56" height="54" rx="9" className="fill-card/75" />
      <rect x="96" y="86" width="48" height="28" rx="6" className="fill-primary/35" />
      <path d="M96 92q10-5 22 0t22 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/80" />
      <rect x="112" y="54" width="16" height="11" rx="2" className="fill-primary/45" />
      <path d="M148 74q18 2 24 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/45" />
      <path d="M172 88l8 4-8 4Z" className="fill-primary/50" />
      <rect x="184" y="84" width="32" height="14" rx="6" className="fill-card/70" />
      <path d="M180 92q4-4 8 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <circle cx="84" cy="52" r="2.5" className="fill-primary/45" />
      <circle cx="160" cy="50" r="2.5" className="fill-primary/45" />
      <Sparkle x={54} y={94} s={0.9} />
    </svg>
  );
}

/* ---------- Business ---------- */

function ArtCoutMatiere({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="76" y="88" width="88" height="8" rx="4" className="fill-primary/45" />
      <rect x="108" y="96" width="24" height="16" className="fill-primary/35" />
      <rect x="100" y="112" width="40" height="6" rx="3" className="fill-primary/45" />
      <rect x="88" y="58" width="22" height="30" rx="4" className="fill-primary/25" />
      <rect x="92" y="52" width="14" height="7" rx="2" className="fill-primary/45" />
      <rect x="116" y="64" width="20" height="24" rx="4" className="fill-primary/35" />
      <rect x="119" y="58" width="14" height="7" rx="2" className="fill-primary/45" />
      <path d="M164 56l18-10 18 10v24l-18 10-18-10Z" className="fill-accent/50" />
      <circle cx="196" cy="62" r="3" className="fill-card" />
      <path d="M196 62q-8 8-16 10" stroke="currentColor" strokeWidth="2" className="text-accent/60" fill="none" />
      <path d="M172 72h20M172 80h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/80" />
      <rect x="180" y="100" width="30" height="22" rx="4" className="fill-card/85" />
      <rect x="184" y="104" width="22" height="6" rx="1" className="fill-primary/25" />
      <circle cx="187" cy="115" r="1.5" className="fill-primary/50" />
      <circle cx="193" cy="115" r="1.5" className="fill-primary/50" />
      <circle cx="199" cy="115" r="1.5" className="fill-primary/50" />
      <circle cx="205" cy="115" r="1.5" className="fill-primary/50" />
      <circle cx="64" cy="106" r="8" className="fill-accent/60" />
      <circle cx="64" cy="106" r="4.5" stroke="currentColor" strokeWidth="1.5" className="text-card/80" fill="none" />
      <Sparkle x={54} y={62} s={0.9} />
    </svg>
  );
}

function ArtSecurite({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <path d="M40 44h160" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/35" />
      <rect x="52" y="28" width="12" height="16" rx="3" className="fill-primary/30" />
      <rect x="70" y="24" width="14" height="20" rx="3" className="fill-primary/40" />
      <rect x="92" y="30" width="10" height="14" rx="3" className="fill-accent/50" />
      <rect x="104" y="56" width="34" height="16" rx="8" stroke="currentColor" strokeWidth="3" className="text-primary/55" fill="none" />
      <path d="M104 64H84M138 64h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/45" />
      <rect x="96" y="78" width="20" height="32" rx="9" className="fill-primary/30" />
      <ellipse cx="94" cy="86" rx="4" ry="7" className="fill-primary/30" />
      <rect x="126" y="78" width="20" height="32" rx="9" className="fill-primary/25" />
      <ellipse cx="148" cy="86" rx="4" ry="7" className="fill-primary/25" />
      <rect x="182" y="72" width="16" height="34" rx="6" className="fill-accent/60" />
      <rect x="186" y="64" width="8" height="9" rx="2" className="fill-primary/45" />
      <path d="M198 76q10 2 8 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/50" />
      <path d="M28 114h184" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <Sparkle x={62} y={94} s={0.9} />
    </svg>
  );
}

function ArtEtiquetage({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="56" y="52" width="30" height="56" rx="8" className="fill-primary/25" />
      <rect x="64" y="44" width="14" height="9" rx="2" className="fill-primary/45" />
      <rect x="60" y="68" width="22" height="26" rx="3" className="fill-card/90" />
      <path d="M64 76h14M64 84h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/50" />
      <rect x="96" y="60" width="26" height="48" rx="7" className="fill-primary/35" />
      <rect x="103" y="53" width="12" height="8" rx="2" className="fill-primary/45" />
      <rect x="100" y="74" width="18" height="20" rx="3" className="fill-card/85" />
      <rect x="136" y="44" width="74" height="62" rx="8" className="fill-card/80" />
      <rect x="136" y="44" width="74" height="62" rx="8" stroke="currentColor" strokeWidth="2.5" className="text-primary/30" fill="none" />
      <circle cx="148" cy="60" r="5" stroke="currentColor" strokeWidth="2.5" className="text-accent/70" fill="none" />
      <circle cx="148" cy="76" r="5" stroke="currentColor" strokeWidth="2.5" className="text-accent/70" fill="none" />
      <circle cx="148" cy="92" r="5" stroke="currentColor" strokeWidth="2.5" className="text-accent/70" fill="none" />
      <path d="M145 60l2 2l4-4M145 76l2 2l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/80" />
      <path d="M160 60h38M160 76h30M160 92h34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/40" />
      <rect x="52" y="112" width="26" height="14" rx="3" transform="rotate(-12 65 119)" className="fill-accent/60" />
      <circle cx="196" cy="120" r="8" stroke="currentColor" strokeWidth="2.5" className="text-accent/70" fill="none" />
      <circle cx="196" cy="120" r="4" stroke="currentColor" strokeWidth="1.5" className="text-accent/50" fill="none" />
      <Sparkle x={124} y={34} s={0.8} />
    </svg>
  );
}

function ArtDefault({ className }: P) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden>
      <ellipse cx="120" cy="84" rx="104" ry="46" className="fill-primary/10" />
      <rect x="58" y="56" width="34" height="58" rx="8" className="fill-primary/25" />
      <rect x="67" y="46" width="16" height="10" rx="2" className="fill-primary/40" />
      <rect x="104" y="48" width="38" height="66" rx="10" className="fill-primary/35" />
      <rect x="114" y="38" width="18" height="11" rx="2" className="fill-primary/45" />
      <path d="M112 72h22M112 82h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/85" />
      <rect x="154" y="62" width="30" height="52" rx="7" className="fill-primary/25" />
      <rect x="162" y="54" width="14" height="9" rx="2" className="fill-primary/40" />
      <Sparkle x={200} y={44} />
      <Sparkle x={44} y={50} s={0.8} />
    </svg>
  );
}

const ART: Record<Course["slug"], ComponentType<P>> = {
  "vaisselle-eco": ArtVaisselleEco,
  "vaisselle-premium": ArtVaissellePremium,
  "savon-liquide-mains": ArtSavonMains,
  "four-degraissant": ArtFour,
  javel: ArtJavel,
  "lessive-marseille": ArtLessive,
  sanibon: ArtSanibon,
  "sol-multiusage": ArtSol,
  vitres: ArtVitres,
  "wc-decalcifiant": ArtWc,
  adoucissant: ArtAdoucissant,
  "creme-a-recurer": ArtCreme,
  "savon-dur": ArtSavonDur,
  "shampooing-doux": ArtShampooing,
  "gel-douche": ArtGelDouche,
  "auto-shampoing": ArtAutoShampoing,
  "auto-glass": ArtAutoGlass,
  "auto-tableau": ArtAutoTableau,
  "auto-moteur": ArtAutoMoteur,
  "auto-mousse": ArtAutoMousse,
  "auto-liquide-refroidissement": ArtAutoRefroidissement,
  "auto-antibuée": ArtAutoAntibuee,
  "auto-parfum": ArtAutoParfum,
  "auto-jantes": ArtAutoJantes,
  "auto-lave-glace": ArtAutoLaveGlace,
  "cout-matiere": ArtCoutMatiere,
  "securite-atelier": ArtSecurite,
  "etiquetage-vente": ArtEtiquetage,
};

export function CourseArt({ slug, className }: { slug: Course["slug"]; className?: string }) {
  const Cmp = ART[slug] ?? ArtDefault;
  return <Cmp className={className} />;
}
