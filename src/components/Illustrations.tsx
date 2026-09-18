// Lightweight thematic SVG illustrations for the training platform.
// Colors use currentColor + fixed palette aligned with the app theme.

interface IconProps {
  className?: string;
}

export function DishIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="8" y="18" width="32" height="20" rx="6" className="fill-primary/15" />
      <rect x="12" y="22" width="24" height="12" rx="4" className="fill-primary/30" />
      <path d="M16 18c0-4 3.6-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <circle cx="24" cy="12" r="2.5" className="fill-accent" />
      <path d="M14 28h20M14 32h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
    </svg>
  );
}

export function SoapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="10" y="14" width="28" height="20" rx="5" className="fill-primary/20" />
      <circle cx="19" cy="24" r="3" className="fill-primary/40" />
      <circle cx="28" cy="22" r="2" className="fill-primary/30" />
      <circle cx="29" cy="28" r="2.5" className="fill-primary/40" />
      <path d="M14 14c-1-3 1-6 4-6M34 14c1-3-1-6-4-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/70" />
    </svg>
  );
}

export function OvenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="10" y="8" width="28" height="32" rx="4" className="fill-primary/15" />
      <rect x="14" y="14" width="20" height="12" rx="2" className="fill-primary/30" />
      <path d="M14 32h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <path d="M20 20c0-2 1.5-3 1.5-5M26 20c0-2 1.5-3 1.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}

export function BleachIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M18 10h12v6l6 8v14a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V24l6-8v-6Z" className="fill-primary/20" />
      <path d="M18 10h12v4H18z" className="fill-primary/40" />
      <path d="M12 26h24" stroke="currentColor" strokeWidth="2" className="text-primary/50" />
      <path d="M20 30c1 2 2.5 3 4 3s3-1 4-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}

export function LaundryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="9" y="8" width="30" height="32" rx="5" className="fill-primary/15" />
      <circle cx="24" cy="26" r="9" className="fill-primary/30" />
      <circle cx="24" cy="26" r="5" className="fill-primary/50" />
      <circle cx="16" cy="14" r="1.8" className="fill-accent" />
      <circle cx="23" cy="14" r="1.8" className="fill-primary/40" />
    </svg>
  );
}

export function FloorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M6 36l10-22h16l10 22" className="fill-primary/15" />
      <path d="M12 36l6-14h12l6 14" className="fill-primary/30" />
      <path d="M16 12c0-3 3.5-4 8-4s8 1 8 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <path d="M20 8V4h8v4" className="fill-primary/40" />
    </svg>
  );
}

export function GlassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="14" y="8" width="20" height="24" rx="2" className="fill-primary/15" />
      <path d="M18 12h8M18 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      <path d="M24 32v8M18 40h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <path d="M30 10l6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
    </svg>
  );
}

export function BathroomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 26h32v4a10 10 0 0 1-10 10H18A10 10 0 0 1 8 30v-4Z" className="fill-primary/20" />
      <path d="M14 26V14a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
      <path d="M12 34h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/50" />
      <circle cx="34" cy="16" r="4" className="fill-accent/60" />
    </svg>
  );
}

export function SoftenerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M20 6h8v6l6 8v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V20l6-8V6Z" className="fill-primary/20" />
      <path d="M14 26c2 3 5 5 10 5s8-2 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      <circle cx="24" cy="34" r="2.5" className="fill-accent" />
      <path d="M20 6h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
    </svg>
  );
}

export function ScrubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M10 24a14 14 0 0 1 28 0v6a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6v-6Z" className="fill-primary/20" />
      <circle cx="19" cy="26" r="2" className="fill-primary/40" />
      <circle cx="27" cy="24" r="2" className="fill-primary/40" />
      <circle cx="24" cy="31" r="2" className="fill-primary/40" />
      <circle cx="31" cy="29" r="1.6" className="fill-accent" />
    </svg>
  );
}

export function SoapbarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="8" y="18" width="32" height="16" rx="4" className="fill-primary/25" />
      <rect x="12" y="22" width="24" height="8" rx="2" className="fill-primary/45" />
      <path d="M14 14c2-3 6-3 8 0M26 14c2-3 6-3 8 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/70" />
    </svg>
  );
}

export function ShampooIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="16" y="12" width="16" height="28" rx="5" className="fill-primary/20" />
      <rect x="19" y="6" width="10" height="6" rx="2" className="fill-primary/40" />
      <path d="M20 24h8M20 29h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      <circle cx="24" cy="35" r="2" className="fill-accent" />
    </svg>
  );
}

export function BodyWashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="20" r="10" className="fill-primary/25" />
      <circle cx="20" cy="17" r="3" className="fill-primary/45" />
      <circle cx="28" cy="19" r="2.4" className="fill-primary/35" />
      <path d="M14 30h20l-3 10H17l-3-10Z" className="fill-primary/20" />
      <circle cx="24" cy="35" r="2" className="fill-accent" />
    </svg>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="9" y="28" width="7" height="12" rx="2" className="fill-primary/35" />
      <rect x="20" y="20" width="7" height="20" rx="2" className="fill-primary/55" />
      <rect x="31" y="12" width="7" height="28" rx="2" className="fill-accent" />
      <path d="M9 8h30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
    </svg>
  );
}

export function SafetyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M24 6l14 5v12c0 9-6 15-14 19-8-4-14-10-14-19V11l14-5Z" className="fill-primary/20" />
      <path d="M24 10.5 34 14v9c0 6.5-4.2 11.3-10 14.6C18.2 34.3 14 29.5 14 23v-9l10-3.5Z" className="fill-primary/40" />
      <path d="M19 24l4 4 7-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
    </svg>
  );
}

export function LabelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M10 12a4 4 0 0 1 4-4h14l12 12-12 12H14a4 4 0 0 1-4-4V12Z" className="fill-primary/25" />
      <circle cx="18" cy="16" r="2.5" className="fill-accent" />
      <path d="M22 24h10M22 28h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 30c0-3 2-5 5-6l4-8a4 4 0 0 1 3.4-2h7.2a4 4 0 0 1 3.4 2l4 8c3 1 5 3 5 6v4a2 2 0 0 1-2 2h-2a6 6 0 0 1-11.5 0h-3a6 6 0 0 1-11.5 0H10a2 2 0 0 1-2-2v-4Z" className="fill-primary/25" />
      <path d="M18 16.5 15.6 23h7.4v-7h-3.4c-.7 0-1.3.2-1.6.5Z" className="fill-card/90" />
      <path d="M25 16h3.4c.7 0 1.3.2 1.6.5l2.4 6.5H25v-7Z" className="fill-card/90" />
      <circle cx="17" cy="34" r="4" className="fill-primary/40" />
      <circle cx="31" cy="34" r="4" className="fill-primary/40" />
      <path d="M12 24h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      <circle cx="41" cy="12" r="2.5" className="fill-accent" />
    </svg>
  );
}

export function WaxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="10" y="16" width="28" height="24" rx="5" className="fill-primary/20" />
      <rect x="16" y="8" width="16" height="8" rx="2" className="fill-primary/40" />
      <path d="M14 24h20M14 29h20M14 34h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/55" />
      <path d="M36 10c3 1 5 3.5 5 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent" />
      <circle cx="36" cy="7" r="2" className="fill-accent" />
    </svg>
  );
}

export function InteriorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 34c6-10 16-16 32-16v10a24 24 0 0 1-24 12l-8-2v-4Z" className="fill-primary/25" />
      <path d="M14 32c4-6 12-10 22-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      <path d="M12 28c2-3 5-6 9-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/45" />
      <circle cx="36" cy="24" r="3" className="fill-accent/70" />
      <path d="M8 38h32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/70" />
    </svg>
  );
}

export function WheelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="24" r="16" className="fill-primary/20" />
      <circle cx="24" cy="24" r="9" className="fill-card/80" />
      <circle cx="24" cy="24" r="3" className="fill-primary/50" />
      <path d="M24 8v7M24 33v7M8 24h7M33 24h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
      <path d="M13 13l5 5M30 30l5 5M35 13l-5 5M13 35l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/40" />
      <circle cx="38" cy="10" r="2" className="fill-accent" />
    </svg>
  );
}

export function EngineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="10" y="18" width="20" height="16" rx="3" className="fill-primary/25" />
      <path d="M30 22h6v8h-6" className="fill-primary/35" />
      <rect x="14" y="10" width="4" height="8" rx="1.5" className="fill-primary/45" />
      <rect x="22" y="10" width="4" height="8" rx="1.5" className="fill-primary/45" />
      <rect x="10" y="34" width="24" height="4" rx="2" className="fill-primary/45" />
      <path d="M4 22h4v8H4" className="fill-primary/35" />
      <path d="M36 12c4 2 6 5 6 9s-2 7-6 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent" />
      <circle cx="36" cy="9" r="2" className="fill-accent" />
    </svg>
  );
}

export function FoamIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M10 34c-2-4 0-8 4-9-1-4 2-7 6-7 1-3 4-5 7-4 3-2 8-1 9 3 4 0 7 3 6 7 3 1 5 5 3 9 0 2-2 4-4 4H14c-2 0-4-1-4-3Z" className="fill-primary/25" />
      <circle cx="18" cy="26" r="2.5" className="fill-card/90" />
      <circle cx="26" cy="22" r="2.5" className="fill-card/90" />
      <circle cx="33" cy="27" r="2.5" className="fill-card/90" />
      <path d="M14 40h22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
      <circle cx="38" cy="11" r="2" className="fill-accent" />
    </svg>
  );
}

export function CoolantIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M24 6c6 7 12 13 12 20a12 12 0 0 1-24 0c0-7 6-13 12-20Z" className="fill-primary/25" />
      <path d="M18 28c0 3.5 2.5 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-card/90" />
      <path d="M24 2v3M14 5l1.5 2.5M34 5l-1.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/55" />
      <circle cx="40" cy="10" r="2" className="fill-accent" />
    </svg>
  );
}

export function FogIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="6" y="12" width="36" height="18" rx="6" className="fill-primary/20" />
      <path d="M10 20c3-3 7-4 11-3M20 24c4-4 9-5 14-3M26 18c3-2 7-2 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/85" />
      <path d="M10 36h28M14 41h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/55" />
      <circle cx="40" cy="9" r="2" className="fill-accent" />
    </svg>
  );
}

export function FreshenerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M14 18h20l-2 20a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4l-2-20Z" className="fill-primary/25" />
      <rect x="19" y="8" width="10" height="7" rx="2" className="fill-primary/45" />
      <path d="M20 26c2 2 6 2 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/85" />
      <path d="M36 14c2-2 5-2 7 0M34 8c2-2 5-2 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/50" />
      <path d="M41 17c1.5 1.5 1.5 4 0 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
      <circle cx="12" cy="10" r="2" className="fill-accent" />
    </svg>
  );
}

export function WasherIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M18 8h12l3 6H15l3-6Z" className="fill-primary/40" />
      <path d="M14 14h20a4 4 0 0 1 4 4v16a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V18a4 4 0 0 1 4-4Z" className="fill-primary/25" />
      <path d="M15 30c3-3 6-3 9 0s6 3 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/90" />
      <path d="M15 35c3-3 6-3 9 0s6 3 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-card/70" />
      <path d="M34 6c2.5.8 4 2.5 4 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent" />
      <circle cx="34" cy="4" r="2" className="fill-accent" />
    </svg>
  );
}

export function HeroBottles({ className }: IconProps) {
  return (
    <svg viewBox="0 0 220 160" fill="none" className={className} aria-hidden>
      {/* Back bottle */}
      <rect x="24" y="52" width="34" height="88" rx="8" className="fill-primary/15" />
      <rect x="31" y="38" width="20" height="14" rx="3" className="fill-primary/30" />
      <rect x="31" y="72" width="20" height="40" rx="3" className="fill-primary/25" />
      {/* Middle bottle */}
      <rect x="70" y="36" width="44" height="104" rx="10" className="fill-primary/25" />
      <rect x="82" y="20" width="20" height="16" rx="3" className="fill-primary/40" />
      <rect x="79" y="62" width="26" height="52" rx="4" className="fill-card/80" />
      <path d="M84 74h16M84 82h16M84 90h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
      {/* Foam bubbles */}
      <circle cx="150" cy="30" r="8" className="fill-accent/70" />
      <circle cx="168" cy="46" r="5" className="fill-accent/50" />
      <circle cx="158" cy="58" r="4" className="fill-accent/40" />
      {/* Droplet */}
      <path d="M160 80c8 10 12 16 12 22a12 12 0 1 1-24 0c0-6 4-12 12-22Z" className="fill-primary/40" />
      {/* Base tray */}
      <path d="M16 140h190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/50" />
    </svg>
  );
}

export function LabScene({ className }: IconProps) {
  return (
    <svg viewBox="0 0 260 140" fill="none" className={className} aria-hidden>
      {/* Beaker */}
      <path d="M40 40h36v56a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10V40Z" className="fill-primary/15" />
      <path d="M40 66h36v30a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10V66Z" className="fill-primary/35" />
      <path d="M34 40h48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary/60" />
      {/* Flask */}
      <path d="M118 30h16v26l18 34a8 8 0 0 1-7 12h-38a8 8 0 0 1-7-12l18-34V30Z" className="fill-primary/15" />
      <path d="M108 78l12-22h12l12 22a6 6 0 0 1-6 10h-24a6 6 0 0 1-6-10Z" className="fill-accent/60" />
      {/* Jar */}
      <rect x="188" y="46" width="40" height="60" rx="8" className="fill-primary/20" />
      <rect x="184" y="34" width="48" height="14" rx="5" className="fill-primary/40" />
      <circle cx="208" cy="76" r="4" className="fill-accent/60" />
      <circle cx="198" cy="88" r="3" className="fill-accent/40" />
      {/* Bubbles */}
      <circle cx="58" cy="28" r="4" className="fill-accent/50" />
      <circle cx="150" cy="20" r="3" className="fill-accent/40" />
      <path d="M20 118h220" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
    </svg>
  );
}
