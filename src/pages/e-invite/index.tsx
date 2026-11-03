import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/e-invite/EInvite.module.css';
import d from '@/styles/e-invite/Details.module.css';


/* ── cover components ── */
function Ornament({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g transform="translate(20,20)" fill="white">
        <ellipse cx="0" cy="-9" rx="3" ry="7" opacity="0.9" />
        <ellipse cx="9" cy="0" rx="7" ry="3" opacity="0.9" />
        <ellipse cx="0" cy="9" rx="3" ry="7" opacity="0.9" />
        <ellipse cx="-9" cy="0" rx="7" ry="3" opacity="0.9" />
        <ellipse cx="6.4" cy="-6.4" rx="2.5" ry="5" opacity="0.75" transform="rotate(-45 6.4 -6.4)" />
        <ellipse cx="6.4" cy="6.4" rx="2.5" ry="5" opacity="0.75" transform="rotate(45 6.4 6.4)" />
        <ellipse cx="-6.4" cy="6.4" rx="2.5" ry="5" opacity="0.75" transform="rotate(-45 -6.4 6.4)" />
        <ellipse cx="-6.4" cy="-6.4" rx="2.5" ry="5" opacity="0.75" transform="rotate(45 -6.4 -6.4)" />
        <circle r="5" opacity="0.95" />
        <circle r="2.5" fill="#1a1a8a" opacity="0.9" />
        <polygon points="0,-17 1.5,-14 0,-11 -1.5,-14" opacity="0.75" />
        <polygon points="17,0 14,1.5 11,0 14,-1.5" opacity="0.75" />
        <polygon points="0,17 1.5,14 0,11 -1.5,14" opacity="0.75" />
        <polygon points="-17,0 -14,1.5 -11,0 -14,-1.5" opacity="0.75" />
      </g>
    </svg>
  );
}

function Divider() {
  return (
    <div className={styles.divider}>
      <span className={styles.divLine} />
      <span className={styles.divDots}>• • •</span>
      <span className={styles.divLine} />
    </div>
  );
}

function DoorKnob() {
  return (
    <div className={styles.doorKnob}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <radialGradient id="kg" cx="38%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="35%"  stopColor="#e8e4e0" />
            <stop offset="70%"  stopColor="#bdb8b4" />
            <stop offset="100%" stopColor="#8a8480" />
          </radialGradient>
          <radialGradient id="ks" cx="32%" cy="26%" r="38%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="18" cy="18" r="17" fill="url(#kg)" />
        <circle cx="18" cy="18" r="17" fill="url(#ks)" />
        <circle cx="18" cy="18" r="17" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      </svg>
      {/* keyhole */}
      <div className={styles.keyhole}>
        <div className={styles.keyholeCircle} />
        <div className={styles.keyholeSlot} />
      </div>
    </div>
  );
}

function DoorHinge({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div className={`${styles.hinge} ${position === 'top' ? styles.hingeTop : styles.hingeBottom}`}>
      <svg width="20" height="48" viewBox="0 0 20 48" fill="none">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#8a8480" />
            <stop offset="40%"  stopColor="#f0ede8" />
            <stop offset="100%" stopColor="#bdb8b4" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="18" height="46" rx="2" fill="url(#hg)" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <circle cx="10" cy="8"  r="3" fill="rgba(0,0,0,0.25)" />
        <circle cx="10" cy="24" r="3" fill="rgba(0,0,0,0.25)" />
        <circle cx="10" cy="40" r="3" fill="rgba(0,0,0,0.25)" />
      </svg>
    </div>
  );
}

function DoorPanels() {
  return (
    <div className={styles.doorPanels}>
      <div className={styles.doorPanelTop} />
      <div className={styles.doorPanelBottom} />
    </div>
  );
}

function SongketStrip({ position = 'left' }: { position?: SongketPos }) {
  const posClass = {
    left:   styles.songketLeft,
    right:  styles.songketRight,
    top:    styles.songketTop,
    bottom: styles.songketBottom,
  }[position];

  const borderClass = {
    left:   styles.songketBorderRight,
    right:  styles.songketBorderLeft,
    top:    styles.songketBorderBottom,
    bottom: styles.songketBorderTop,
  }[position];

  return (
    <div className={`${styles.songket} ${posClass}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="sg1" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M6,0 L12,6 L6,12 L0,6 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
          </pattern>
          <pattern id="sg2" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M12,1 L23,12 L12,23 L1,12 Z" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />
            <path d="M12,7 L17,12 L12,17 L7,12 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
            <circle cx="12" cy="12" r="1.8" fill="rgba(255,255,255,0.55)" />
            <circle cx="12" cy="1"  r="1" fill="rgba(255,255,255,0.4)" />
            <circle cx="23" cy="12" r="1" fill="rgba(255,255,255,0.4)" />
            <circle cx="12" cy="23" r="1" fill="rgba(255,255,255,0.4)" />
            <circle cx="1"  cy="12" r="1" fill="rgba(255,255,255,0.4)" />
          </pattern>
          <pattern id="sg3" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M24,3 L45,24 L24,45 L3,24 Z" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <line x1="24" y1="16" x2="24" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
            <line x1="16" y1="24" x2="32" y2="24" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
            <circle cx="24" cy="24" r="4"   fill="rgba(255,255,255,0.5)" />
            <circle cx="24" cy="24" r="2.2" fill="#1a1a8a" />
            <circle cx="24" cy="24" r="1"   fill="rgba(255,255,255,0.6)" />
            <polygon points="24,6 25.5,10 24,14 22.5,10" fill="rgba(255,255,255,0.35)" />
            <polygon points="42,24 38,25.5 34,24 38,22.5" fill="rgba(255,255,255,0.35)" />
            <polygon points="24,42 25.5,38 24,34 22.5,38" fill="rgba(255,255,255,0.35)" />
            <polygon points="6,24 10,25.5 14,24 10,22.5"  fill="rgba(255,255,255,0.35)" />
            <circle cx="24" cy="3"  r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="45" cy="24" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="24" cy="45" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="3"  cy="24" r="1.5" fill="rgba(255,255,255,0.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sg1)" />
        <rect width="100%" height="100%" fill="url(#sg2)" />
        <rect width="100%" height="100%" fill="url(#sg3)" opacity="0.85" />
      </svg>
      <div className={borderClass} />
    </div>
  );
}

/* ── slot machine date ── */
const SLOT_TARGET = 'SABTU | 09 . 01 . 27';
const NUM_POOL = '0123456789';
const ALPHA_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STATIC_CHARS = new Set([' ', '|', '.']);

function SlotDate() {
  const [chars, setChars] = useState<string[]>(Array(SLOT_TARGET.length).fill(' '));

  useEffect(() => {
    const target = SLOT_TARGET.split('');

    target.forEach((final, idx) => {
      const staggerDelay = idx * 30;

      if (STATIC_CHARS.has(final)) {
        setTimeout(() => {
          setChars(prev => { const n = [...prev]; n[idx] = final; return n; });
        }, staggerDelay);
        return;
      }

      const pool = /[0-9]/.test(final) ? NUM_POOL : ALPHA_POOL;
      const totalFrames = 8 + idx;
      let frame = 0;

      setTimeout(() => {
        const tick = () => {
          frame++;
          setChars(prev => {
            const n = [...prev];
            n[idx] = frame >= totalFrames
              ? final
              : pool[Math.floor(Math.random() * pool.length)];
            return n;
          });
          if (frame < totalFrames) {
            const progress = frame / totalFrames;
            setTimeout(tick, 20 + progress * 60);
          }
        };
        tick();
      }, staggerDelay);
    });
  }, []);

  return (
    <p className={styles.date}>
      {chars.map((c, i) => (
        <span key={i} className={styles.slotChar}>{c}</span>
      ))}
    </p>
  );
}

/* ── footer ── */
const CONTACTS = [
  { name: 'Hairul', tel: '+60134534504', display: '013-453 4504' },
  { name: 'Rosidah', tel: '+60134334504', display: '013-433 4504' },
  { name: 'Faiz', tel: '+60149254755', display: '014-925 4755' },
  { name: 'Fahmi', tel: '+601156516348', display: '011-565 16348' },
];

function Footer({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) {
  const [showCal, setShowCal] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const VENUE_QUERY = 'Damai+Homestay+Sungai+Petani';
  const wazeUrl = `https://waze.com/ul?q=${VENUE_QUERY}&navigate=yes`;
  const googleMapsUrl = `https://maps.google.com/?q=${VENUE_QUERY}`;

  const handleApple = () => {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Majlis Perkahwinan//EN',
      'BEGIN:VEVENT',
      'DTSTART:20270109T110000', 'DTEND:20270109T170000',
      'SUMMARY:Majlis Perkahwinan Azbin & Lin',
      'LOCATION:Damai Homestay\\, Lot 843\\, Jalan Sg Jagong\\, Sg Layar\\, Sungai Petani',
      'DESCRIPTION:Majlis Perkahwinan Muhammad Azbin Fahmi & Norfadlin Nasoha',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'majlis-perkahwinan.ics'; a.click();
    URL.revokeObjectURL(url);
    setShowCal(false);
  };

  const handleGoogle = () => {
    window.open(
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=Majlis+Perkahwinan+Azbin+%26+Lin' +
      '&dates=20270109T110000/20270109T170000' +
      '&location=Damai+Homestay%2C+Sungai+Petani',
      '_blank'
    );
    setShowCal(false);
  };

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerBtns}>
          <button className={styles.footerBtn} onClick={() => setShowCal(true)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className={styles.footerBtnLabel}>CALENDAR</span>
          </button>
          <button className={styles.footerBtn} onClick={() => setShowCall(true)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span className={styles.footerBtnLabel}>CALL</span>
          </button>
          <button className={styles.footerBtn} onClick={() => setShowMap(true)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className={styles.footerBtnLabel}>MAP</span>
          </button>
        </div>
        <button className={styles.musicIconBtn} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>
          )}
        </button>

        <p className={styles.footerCredit}>
          e-invite by <a className={styles.footerCreditLink} href="https://azbinfahmi.com" target="_blank" rel="noreferrer">azbinfahmi</a>
        </p>
      </div>

      {showMap && (
        <div className={styles.modalOverlay} onClick={() => setShowMap(false)}>
          <div className={styles.calModal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowMap(false)}>✕</button>
            <p className={styles.calModalTitle}>BUKA DENGAN</p>
            <div className={styles.calOptions}>
              <a className={styles.calOption} href={wazeUrl} target="_blank" rel="noreferrer" onClick={() => setShowMap(false)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/e-invite/waze.png" alt="Waze" className={styles.mapAppIcon} />
                <span className={styles.calOptionLabel}>WAZE</span>
              </a>
              <a className={styles.calOption} href={googleMapsUrl} target="_blank" rel="noreferrer" onClick={() => setShowMap(false)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/e-invite/google-maps.png" alt="Google Maps" className={styles.mapAppIcon} />
                <span className={styles.calOptionLabel}>GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {showCall && (
        <div className={styles.modalOverlay} onClick={() => setShowCall(false)}>
          <div className={styles.calModal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowCall(false)}>✕</button>
            <p className={styles.calModalTitle}>HUBUNGI KAMI</p>
            <div className={styles.callList}>
              {CONTACTS.map(c => (
                <a key={c.tel} href={`tel:${c.tel}`} className={styles.callItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div className={styles.callItemInfo}>
                    <span className={styles.callItemName}>{c.name}</span>
                    <span className={styles.callItemNum}>{c.display}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCal && (
        <div className={styles.modalOverlay} onClick={() => setShowCal(false)}>
          <div className={styles.calModal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowCal(false)}>✕</button>
            <p className={styles.calModalTitle}>TAMBAH KE KALENDAR</p>
            <div className={styles.calOptions}>
              <button className={styles.calOption} onClick={handleApple}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className={styles.calOptionLabel}>APPLE CALENDAR</span>
              </button>
              <button className={styles.calOption} onClick={handleGoogle}>
                <svg width="52" height="52" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className={styles.calOptionLabel}>GOOGLE CALENDAR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── reveal on scroll ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── countdown ── */
const WEDDING_DATE = new Date('2027-01-09T11:00:00+08:00');

function Countdown() {
  const calc = () => {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { hari: 0, jam: 0, minit: 0, saat: 0 };
    return {
      hari:  Math.floor(diff / (1000 * 60 * 60 * 24)),
      jam:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minit: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      saat:  Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [time, setTime] = useState({ hari: 0, jam: 0, minit: 0, saat: 0 });

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: time.hari,  label: 'HARI',  pad: 2 },
    { val: time.jam,   label: 'JAM',   pad: 2 },
    { val: time.minit, label: 'MINIT', pad: 2 },
    { val: time.saat,  label: 'SAAT',  pad: 2 },
  ];

  return (
    <div className={d.countdown}>
      {units.map(({ val, label, pad }, i) => (
        <>
          <div key={label} className={d.countdownItem}>
            <span className={d.countdownNum}>{String(val).padStart(pad, '0')}</span>
            <span className={d.countdownLabel}>{label}</span>
          </div>
          {i < units.length - 1 && <span key={`sep-${i}`} className={d.countdownSep}>:</span>}
        </>
      ))}
    </div>
  );
}

/* ── details components ── */
function ArchDivider() {
  return (
    <div className={d.archDivider}>
      <span className={d.archDivLine} />
      <span className={d.archDots}>• • •</span>
      <span className={d.archDivLine} />
    </div>
  );
}


/* ── main page ── */
export default function EInvitePage() {
  const [opened, setOpened] = useState(false);
  const [hiding, setHiding] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const open = () => {
    setHiding(true);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 12.5;
      audio.play().catch(() => {});
    }
    setTimeout(() => setOpened(true), 750);
  };

  return (
    <>
      <Head>
        <title>Majlis Perkahwinan - Azbin &amp; Lin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@700&family=Cormorant+Garamond:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <audio ref={audioRef} src="/e-invite/Selamat Pengantin Baru.mp3" loop preload="auto" />

      {!opened && (
        <div className={`${styles.splash} ${hiding ? styles.splashHide : ''}`} onClick={open}>
          <SongketStrip position="left" />
          <SongketStrip position="top" />
          <SongketStrip position="bottom" />
          <DoorPanels />
          <DoorHinge position="top" />
          <DoorHinge position="bottom" />
          <DoorKnob />
          <div className={styles.splashContent}>
            <p className={styles.splashSub}>JEMPUTAN PERKAHWINAN</p>
            <span className={styles.splashMono}>AL</span>
            <p className={styles.splashNames}>Azbin &amp; Lin</p>
            <p className={styles.splashDate}>09 . 01 . 2027</p>
            <div className={styles.splashTap}>
              <span className={styles.splashTapDot} />
              sentuh screen untuk masuk
            </div>
          </div>
        </div>
      )}

      <div className={styles.page}>

        {/* ── SECTION 1: cover ── */}
        <div className={styles.cover}>
          <SongketStrip position="left" />
          <Ornament size={26} className={`${styles.orn} ${styles.ornT1}`} />
          <Ornament size={22} className={`${styles.orn} ${styles.ornT2}`} />
          <Ornament size={26} className={`${styles.orn} ${styles.ornT3}`} />
          <Ornament size={24} className={`${styles.orn} ${styles.ornMR}`} />
          <Ornament size={22} className={`${styles.orn} ${styles.ornML}`} />
          <Ornament size={24} className={`${styles.orn} ${styles.ornB1}`} />
          <Ornament size={26} className={`${styles.orn} ${styles.ornB2}`} />
          <Ornament size={22} className={`${styles.orn} ${styles.ornB3}`} />

          <div className={styles.content}>
            <h2 className={`${styles.majlis} ${opened ? styles.coverItem1 : styles.coverHidden}`}>MAJLIS</h2>
            <h2 className={`${styles.perkahwinan} ${opened ? styles.coverItem2 : styles.coverHidden}`}>PERKAHWINAN</h2>
            <div className={opened ? styles.coverItem3 : styles.coverHidden}><Divider /></div>
            <span className={`${styles.monogramWrap} ${opened ? styles.coverItem4 : styles.coverHidden}`}>
              <span className={styles.monoFirst}>A</span>
              <span className={styles.monoSecond}>L</span>
            </span>
            <div className={`${styles.namesRow} ${opened ? styles.coverItem5 : styles.coverHidden}`}>
              <Ornament size={20} className={styles.ornInline} />
              <h1 className={styles.names}>AZBIN &amp; LIN</h1>
            </div>
            <div className={opened ? styles.coverItem6 : styles.coverHidden}><Divider /></div>
            <div className={opened ? styles.coverItem7 : styles.coverHidden}><SlotDate /></div>
            <p className={`${styles.hijri} ${opened ? styles.coverItem8 : styles.coverHidden}`}>30 Rejab 1448H</p>
            <p className={`${styles.venue} ${opened ? styles.coverItem9 : styles.coverHidden}`}>Damai Homestay, Sungai Petani</p>
          </div>
        </div>

        {/* ── SECTION 2: details ── */}
        <div className={d.navyBg}>
          <div className={d.arch}>
            <Reveal><p className={d.walimatul}>Walimatul Urus</p></Reveal>
            <Reveal delay={100}><ArchDivider /></Reveal>
            <Reveal delay={150}>
              <p className={d.parentNames}>
                Hairul Faizal Bin Osmat<br />&amp;<br />Rosidah Binti Che Me
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className={d.inviteText}>
                Dengan segala hormatnya kami ingin mempersilakan<br />
                Dato&apos;/Datin/Tuan/Puan/Encik/Cik sekeluarga
              </p>
            </Reveal>
            <Reveal delay={250}><hr className={d.dottedLine} /></Reveal>
            <Reveal delay={300}><p className={d.toMajlis}>ke Majlis Perkahwinan Putera kami yang disayangi</p></Reveal>
            <Reveal delay={350}><p className={d.groomName}>Muhammad Azbin Fahmi Bin Hairul Faizal</p></Reveal>
            <Reveal delay={400}><p className={d.dan}>dan pasangannya</p></Reveal>
            <Reveal delay={450}><p className={d.brideName}>Norfadlin Nasoha binti Muhammad Zain</p></Reveal>
          </div>
        </div>

        {/* ── SECTION 3: info grid ── */}
        <Reveal>
          <div className={d.infoGridWrapper}>
            <div className={d.infoGrid}>
              <div className={d.infoCol}>
                <p className={d.dayLabel}>SABTU</p>
                <p className={d.dayNumber}>09</p>
                <p className={d.monthYear}>Januari 2027</p>
                <p className={d.hijriSmall}>30 Rejab 1448H</p>
              </div>
              <div className={d.infoCol}>
                <div className={d.midTop}>
                  <p className={d.infoLabel}>Aturcara Majlis</p>
                  <p className={d.infoValue}>
                    <span className={d.infoValueBold}>11.00 pagi</span> hingga <span className={d.infoValueBold}>5.00 petang</span>
                  </p>
                </div>
                <p className={d.infoLabel}>Lokasi</p>
                <p className={d.venueName}><span className={d.venuePin}>📍</span>Damai Homestay</p>
                <p className={d.venueAddr}>Lot 843, Jalan Sg Jagong,<br />Sg Layar</p>
              </div>
              <div className={d.countdownRow}>
                <Countdown />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION 4: map ── */}
        {/* <div className={d.mapSection}>
          <img src="/e-invite/peta.png" alt="Peta lokasi Damai Homestay" className={d.mapImg} />
        </div> */}

        {/* ── SECTION 5: doa ── */}
        <div className={d.doaSection}>
          <Reveal>
          <div className={d.doaContainer}>
            <Reveal delay={100}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/e-invite/bismillah.png" alt="Bismillah" className={d.bismillah} />
            </Reveal>
            <Reveal delay={200}>
              <p className={d.doaText}>
                Ya Allah, kurniakanlah kepada kedua mempelai ini rumah tangga yang sakinah, mawaddah dan warahmah.
                Satukanlah hati mereka dalam kasih yang Engkau redhai, teguhkanlah mereka dalam kesetiaan,
                dan jadikanlah mereka pelindung serta penyejuk hati buat satu sama lain. Amin.
              </p>
            </Reveal>
          </div>
          </Reveal>
        </div>

        <div className={styles.pageBottomPad} />
      </div>

      <Footer audioRef={audioRef} />
    </>
  );
}
