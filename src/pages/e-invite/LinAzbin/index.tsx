import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/e-invite/EInviteLinAzbin.module.css';
import d from '@/styles/e-invite/DetailsLinAzbin.module.css';


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
        <circle r="2.5" fill="#3d1a06" opacity="0.9" />
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



/* ── slot machine date ── */
const SLOT_TARGET = 'AHAD | 03 . 01 . 27';
const NUM_POOL = '0123456789';
const ALPHA_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STATIC_CHARS = new Set([' ', '|', '.']);

function SlotDate() {
  const [chars, setChars] = useState<string[]>(Array(SLOT_TARGET.length).fill(' '));

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
  { name: 'Fauzan', tel: '+601117192027' },
  { name: 'Faizul', tel: '+60189445714' },
];

function Footer({ audioRef, opened, showMap, setShowMap }: { audioRef: React.RefObject<HTMLAudioElement | null>; opened: boolean; showMap: boolean; setShowMap: (v: boolean) => void }) {
  const [showCal, setShowCal] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [calClosing, setCalClosing] = useState(false);
  const [callClosing, setCallClosing] = useState(false);
  const [mapClosing, setMapClosing] = useState(false);

  const closeCal  = () => { if (calClosing)  return; setCalClosing(true);  setTimeout(() => { setShowCal(false);  setCalClosing(false);  }, 280); };
  const closeCall = () => { if (callClosing) return; setCallClosing(true); setTimeout(() => { setShowCall(false); setCallClosing(false); }, 280); };
  const closeMap  = () => { if (mapClosing)  return; setMapClosing(true);  setTimeout(() => { setShowMap(false);  setMapClosing(false);  }, 280); };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play',  onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play',  onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play().catch(() => {}); }
  };

  const wazeUrl = 'https://www.waze.com/live-map/directions?q=Rumah+Abang+Jamil+IPOH%2C+Jalan+Raja+Dihilir%2C+Ipoh%2C+Perak%2C+Malaysia&navigate=yes&to=ll.4.5955864%2C101.1004774';
  const googleMapsUrl = 'https://www.google.com/maps/place/Rumah+Abang+Jamil+IPOH/@4.5955864,101.0979025,17z/data=!3m1!4b1!4m6!3m5!1s0x31caed222f56a7ed:0x7174d8df80aa3166!8m2!3d4.5955864!4d101.1004774!16s%2Fg%2F11pdw35k52?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D';

  const handleApple = () => {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Majlis Perkahwinan//EN',
      'BEGIN:VEVENT',
      'DTSTART:20270103T110000', 'DTEND:20270103T170000',
      'SUMMARY:Majlis Perkahwinan Lin & Azbin',
      'LOCATION:Rumah Abang Jamil\\, 29 Jalan Raja Dihilir\\, 30350 Ipoh\\, Perak',
      'DESCRIPTION:Majlis Perkahwinan Muhammad Azbin Fahmi & Norfadlin Nasoha',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'majlis-perkahwinan.ics'; a.click();
    URL.revokeObjectURL(url);
    closeCal();
  };

  const handleGoogle = () => {
    window.open(
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=Majlis+Perkahwinan+Lin+%26+Azbin' +
      '&dates=20270103T110000/20270103T170000' +
      '&location=29+Jalan+Raja+Dihilir%2C+30350+Ipoh%2C+Perak',
      '_blank'
    );
    closeCal();
  };

  return (
    <>
      <button className={`${styles.musicFloatBtn} ${opened ? styles.footerReveal : styles.footerHidden}`} onClick={togglePlay} aria-label={isPlaying ? 'Mute' : 'Unmute'}>
        {isPlaying ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        )}
      </button>
      <div className={`${styles.footer} ${opened ? styles.footerReveal : styles.footerHidden}`}>
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

        <p className={styles.footerCredit}>
          e-invite by <a className={styles.footerCreditLink} href="https://azbinfahmi.com" target="_blank" rel="noreferrer">azbinfahmi</a>
        </p>
      </div>

      {(showMap || mapClosing) && (
        <div className={styles.modalOverlay} onClick={closeMap}>
          <div className={`${styles.calModal} ${mapClosing ? styles.calModalClose : styles.calModalOpen}`} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeMap}>✕</button>
            <p className={styles.calModalTitle}>BUKA DENGAN</p>
            <div className={styles.calOptions}>
              <a className={styles.calOption} href={wazeUrl} target="_blank" rel="noreferrer" onClick={closeMap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/e-invite/waze.png" alt="Waze" className={styles.mapAppIcon} />
                <span className={styles.calOptionLabel}>WAZE</span>
              </a>
              <a className={styles.calOption} href={googleMapsUrl} target="_blank" rel="noreferrer" onClick={closeMap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/e-invite/google-maps.png" alt="Google Maps" className={styles.mapAppIcon} />
                <span className={styles.calOptionLabel}>GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {(showCall || callClosing) && (
        <div className={styles.modalOverlay} onClick={closeCall}>
          <div className={`${styles.calModal} ${callClosing ? styles.calModalClose : styles.calModalOpen}`} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeCall}>✕</button>
            <p className={styles.calModalTitle}>HUBUNGI KAMI</p>
            <div className={styles.callList}>
              {CONTACTS.map(c => (
                <div key={c.tel} className={styles.callItem}>
                  <span className={styles.callItemName}>{c.name}</span>
                  <div className={styles.callItemActions}>
                    <a href={`tel:${c.tel}`} className={styles.callIconBtn} aria-label={`Call ${c.name}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </a>
                    <a href={`https://wa.me/${c.tel.replace('+', '')}`} target="_blank" rel="noreferrer" className={styles.callIconBtn} aria-label={`WhatsApp ${c.name}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(showCal || calClosing) && (
        <div className={styles.modalOverlay} onClick={closeCal}>
          <div className={`${styles.calModal} ${calClosing ? styles.calModalClose : styles.calModalOpen}`} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeCal}>✕</button>
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
      { threshold: 0, rootMargin: '0px 0px -120px 0px' }
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
const WEDDING_DATE = new Date('2027-01-03T11:00:00+08:00');

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


/* ── floral corner ── */
function FlowerCorner({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: 'scale(1,1)',
    tr: 'scale(-1,1)',
    bl: 'scale(1,-1)',
    br: 'scale(-1,-1)',
  };
  return (
    <div className={`${d.flowerCorner} ${d['flower' + corner.toUpperCase()]}`}>
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: transforms[corner], transformOrigin: '50% 50%' }}>
        {/* stem */}
        <path d="M10 80 Q30 60 45 45" stroke="#5a2d0c" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* leaf 1 */}
        <path d="M20 68 Q10 50 28 48 Q32 62 20 68Z" fill="#6b3a10" opacity="0.85"/>
        {/* leaf 2 */}
        <path d="M35 55 Q22 42 38 36 Q44 50 35 55Z" fill="#7a4015" opacity="0.8"/>
        {/* small bud */}
        <circle cx="48" cy="42" r="5" fill="#8b4513"/>
        <path d="M44 40 Q48 34 52 40 Q56 46 48 48 Q40 46 44 40Z" fill="#9c5220"/>
        {/* main flower petals */}
        <ellipse cx="18" cy="25" rx="11" ry="7" transform="rotate(-30 18 25)" fill="#8b4513" opacity="0.9"/>
        <ellipse cx="30" cy="14" rx="11" ry="7" transform="rotate(15 30 14)" fill="#9c5220" opacity="0.9"/>
        <ellipse cx="8"  cy="38" rx="9"  ry="6" transform="rotate(-60 8 38)"  fill="#7a3a10" opacity="0.85"/>
        <ellipse cx="42" cy="18" rx="9"  ry="6" transform="rotate(45 42 18)"  fill="#8b4513" opacity="0.85"/>
        <ellipse cx="10" cy="15" rx="9"  ry="6" transform="rotate(-15 10 15)" fill="#6b3010" opacity="0.8"/>
        {/* flower center */}
        <circle cx="22" cy="24" r="8" fill="#c8842a"/>
        <circle cx="22" cy="24" r="5" fill="#e8a030"/>
        <circle cx="22" cy="24" r="2.5" fill="#c87020"/>
        {/* gold accent dots */}
        <circle cx="35" cy="12" r="2" fill="#c8a84b" opacity="0.8"/>
        <circle cx="6"  cy="44" r="1.5" fill="#c8a84b" opacity="0.7"/>
        <circle cx="50" cy="36" r="1.5" fill="#c8a84b" opacity="0.7"/>
      </svg>
    </div>
  );
}

/* ── falling petals ── */
const PETAL_COLORS = [
  { base: '#a8c8f0', inner: '#c8e0f8' }, // light blue
  { base: '#c8a8e8', inner: '#e0c8f8' }, // light purple
];

const PETALS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${(i * 5.7 + Math.sin(i * 1.3) * 8 + 50) % 100}%`,
  delay: `${(i * 0.55) % 8}s`,
  duration: `${6 + (i * 0.7) % 5}s`,
  size: 10 + (i % 4) * 3,
  rotate: (i * 37) % 360,
  color: PETAL_COLORS[i % 2],
}));

function FallingPetals() {
  return (
    <div className={styles.petalsContainer} aria-hidden="true">
      {PETALS.map(p => (
        <svg
          key={p.id}
          className={styles.petal}
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }}
          viewBox="0 0 20 20"
        >
          <ellipse cx="10" cy="10" rx="5" ry="9" fill={p.color.base} opacity="0.75" transform={`rotate(${p.rotate} 10 10)`} />
          <ellipse cx="10" cy="10" rx="4" ry="8" fill={p.color.inner} opacity="0.5" transform={`rotate(${p.rotate + 45} 10 10)`} />
        </svg>
      ))}
    </div>
  );
}

/* ── main page ── */
export default function EInvitePage() {
  const [opened, setOpened] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [ucapanList, setUcapanList] = useState<{ id: number; name: string; message: string; created_at: string }[]>([]);
  const [showUcapan, setShowUcapan] = useState(false);
  const [ucapanClosing, setUcapanClosing] = useState(false);
  const [ucapanName, setUcapanName] = useState('');
  const [ucapanMsg, setUcapanMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const scrollRef      = useRef<HTMLDivElement>(null);
  const yOffsetRef     = useRef(0);
  const isDraggingRef  = useRef(false);
  const dragStartY     = useRef(0);
  const dragStartOff   = useRef(0);
  const animFrameRef   = useRef<number>(0);
  const lastTimeRef    = useRef<number>(0);
  const wrapRef        = useRef<HTMLDivElement>(null);
  const [scrollNeeded, setScrollNeeded] = useState(false);

  useEffect(() => {
    fetch('/api/e-invite/ucapan')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setUcapanList(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (ucapanList.length === 0) { setScrollNeeded(false); return; }
    // measure after DOM settles; fall back to count > 3 if measure fails
    const id = setTimeout(() => {
      if (scrollRef.current) {
        const contentH = scrollRef.current.scrollHeight;
        setScrollNeeded(contentH > 272 || ucapanList.length >= 3);
      } else {
        setScrollNeeded(ucapanList.length > 3);
      }
    }, 100);
    return () => clearTimeout(id);
  }, [ucapanList]);

  useEffect(() => {
    if (!scrollNeeded || ucapanList.length === 0) return;
    const pxPerSec = 30;
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isDraggingRef.current && scrollRef.current) {
        const half = scrollRef.current.scrollHeight / 2;
        yOffsetRef.current = (yOffsetRef.current + (delta / 1000) * pxPerSec) % half;
        scrollRef.current.style.transform = `translate3d(0, -${yOffsetRef.current}px, 0)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animFrameRef.current); lastTimeRef.current = 0; };
  }, [ucapanList, scrollNeeded]);

  const onDragStart = (clientY: number) => {
    isDraggingRef.current = true;
    dragStartY.current   = clientY;
    dragStartOff.current = yOffsetRef.current;
  };

  const onDragMove = (clientY: number) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const half  = scrollRef.current.scrollHeight / 2;
    let offset  = dragStartOff.current + (dragStartY.current - clientY);
    offset = ((offset % half) + half) % half;
    yOffsetRef.current = offset;
    scrollRef.current.style.transform = `translate3d(0, -${offset}px, 0)`;
  };

  const onDragEnd = () => { isDraggingRef.current = false; };

  const closeUcapan = () => {
    setUcapanClosing(true);
    setTimeout(() => { setShowUcapan(false); setUcapanClosing(false); }, 320);
  };

  useEffect(() => {
    document.body.style.overflow = showUcapan ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showUcapan]);

  const handleUcapanSubmit = async () => {
    if (!ucapanName.trim() || !ucapanMsg.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/e-invite/ucapan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ucapanName, message: ucapanMsg }),
      });
      if (res.ok) {
        const newItem = await res.json();
        setUcapanList(prev => [newItem, ...prev]);
        setUcapanName('');
        setUcapanMsg('');
        closeUcapan();
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  const handleKnobClick = () => {
    if (hiding) return;
    const audio = audioRef.current;
    if (audio) { audio.currentTime = 21; audio.play().catch(() => {}); }
    setTimeout(() => setHiding(true), 200);
    setTimeout(() => setOpened(true), 200 + 900);
  };

  return (
    <>
      <Head>
        <title>Majlis Perkahwinan - Lin &amp; Azbin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@700&family=Cormorant+Garamond:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <audio ref={audioRef} src="/e-invite/Bersama Aku Setia Selamanya.mp3" loop preload="auto" />

      <div className={`${styles.splash} ${opened ? styles.splashDone : ''}`} onClick={!opened ? handleKnobClick : undefined}>
          <div className={styles.splashInner}>
            <div className={styles.bookBg} />
            <div className={styles.bookScene}>
              {/* Book cover — red, flips to reveal behind_curtain.png */}
              <div className={`${styles.bookCover} ${hiding ? styles.bookCoverOpen : ''}`}>
                <div className={styles.bookSpine}>
                  <span className={styles.bookSpineText}>Lin &amp; Azbin · 03.01.2027</span>
                </div>
                <div className={styles.bookFront}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/e-invite/template_bunga_purple/image1.png" alt="" aria-hidden="true" className={styles.bookCoupleImg} />
                  <div className={styles.bookFrame}>
                    {(['tl','tr','bl','br'] as const).map(c => (
                      <svg key={c} className={`${styles.bookCorner} ${styles['bookCorner_'+c]}`} width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M4 28 C4 4 28 4 28 4" stroke="#D4AF37" strokeWidth="1.4" fill="none"/>
                        <circle cx="4" cy="28" r="2.5" fill="#D4AF37"/>
                        <circle cx="28" cy="4" r="2.5" fill="#D4AF37"/>
                        <circle cx="14" cy="10" r="1.2" fill="#D4AF37" opacity="0.7"/>
                      </svg>
                    ))}
                    <p className={styles.splashSub}>JEMPUTAN PERKAHWINAN</p>
                    <div className={styles.bookFrameLine} />
                    <span className={styles.splashMono}>LA</span>
                    <div className={styles.bookFrameLine} />
                    <p className={styles.splashNames}>Lin &amp; Azbin</p>
                    <p className={styles.splashDate}>03 . 01 . 2027</p>
                    <div className={`${styles.tapHint} ${hiding ? styles.tapHintHide : ''}`}>
                      <span className={styles.splashTapDot} />
                      tekan untuk buka
                    </div>
                  </div>
                </div>
                <div className={styles.bookRibbon} />
                <div className={styles.bookBack} />
              </div>
            </div>
          </div>
      </div>

      <div className={styles.page}>
        {opened && <FallingPetals />}

        {/* ── SECTION 1: cover ── */}
        <div className={styles.cover}>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/e-invite/template_bunga_purple/1.png" alt="" className={`${styles.coverBg} ${styles.coverBgReveal}`} aria-hidden="true" />
          <div className={styles.content}>
            <h2 className={`${styles.majlis} ${opened ? styles.coverItem1 : styles.coverHidden}`}>MAJLIS</h2>
            <h2 className={`${styles.perkahwinan} ${opened ? styles.coverItem2 : styles.coverHidden}`}>PERKAHWINAN</h2>
            <div className={opened ? styles.coverItem3 : styles.coverHidden}><Divider /></div>
            <div className={styles.monoWithCouple}>
              <span className={`${styles.monogramWrap} ${opened ? styles.coverItem4 : styles.coverHidden}`}>
                <span className={styles.monoFirst}>L</span>
                <span className={styles.monoSecond}>A</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/e-invite/template_bunga_purple/image1.png" alt="" aria-hidden="true" className={`${styles.coupleImg} ${opened ? styles.coverItem10 : styles.coverHidden}`} />
            </div>
            <div className={`${styles.namesRow} ${opened ? styles.coverItem5 : styles.coverHidden}`}>
              <h1 className={styles.names}>LIN &amp; AZBIN</h1>
            </div>
            <div className={opened ? styles.coverItem6 : styles.coverHidden}><Divider /></div>
            <div className={opened ? styles.coverItem7 : styles.coverHidden}><SlotDate /></div>
            <p className={`${styles.hijri} ${opened ? styles.coverItem8 : styles.coverHidden}`}>24 Rejab 1448H</p>
            <p className={`${styles.venue} ${opened ? styles.coverItem9 : styles.coverHidden}`}>Rumah Abang Jamil, Ipoh</p>
          </div>
        </div>

        {/* ── SECTION 2: details ── */}
        <div className={d.navyBg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/e-invite/template_bunga_purple/2.png" alt="" className={d.archBg} aria-hidden="true" />
          <div className={d.arch}>
            <Reveal><p className={d.walimatul}>Walimatul Urus</p></Reveal>
            <Reveal delay={100}><ArchDivider /></Reveal>
            <Reveal delay={150}>
              <p className={d.parentNames}>
                Muhammad Zain Bin Mukhtar<br />&amp;<br />Jamnahayati Bt Kadri (Allahyarhamah)
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className={d.inviteText}>
                Dengan segala hormatnya menjemput<br />
                Dato&apos;/Datin/Tuan/Puan/Encik/Cik sekeluarga ke Majlis Perkahwinan
              </p>
            </Reveal>
            <Reveal delay={250}><hr className={d.dottedLine} /></Reveal>
            {/* <Reveal delay={300}><p className={d.toMajlis}>ke Majlis Perkahwinan</p></Reveal> */}
            <Reveal delay={350}><p className={d.groomName}>Norfadlin Nasoha Binti Muhammad Zain</p></Reveal>
            <Reveal delay={400}><p className={d.dan}>dan pasangannya</p></Reveal>
            <Reveal delay={450}><p className={d.brideName}>Muhammad Azbin Fahmi Bin Hairul Faizal</p></Reveal>
          </div>
        </div>

        {/* ── SECTION 3: info grid ── */}
        <div className={d.infoGridWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/e-invite/template_bunga_purple/3.png" alt="" aria-hidden="true" style={{ display: 'block', width: '100%', pointerEvents: 'none' }} />
          <div className={d.infoGridOverlay}>
            <div className={d.infoGrid}>
              {/* Date hero */}
              <div className={d.dateHero}>
                <Reveal><p className={d.dayLabel}>AHAD</p></Reveal>
                <Reveal delay={80}><p className={d.dayNumber}>03</p></Reveal>
                <Reveal delay={160}><p className={d.monthYear}>Januari 2027</p></Reveal>
                <Reveal delay={220}><p className={d.hijriSmall}>24 Rejab 1448H</p></Reveal>
              </div>
              <div className={d.heroDivider} />
              {/* Glass cards */}
              <div className={d.infoCards}>
                <Reveal>
                  <div className={d.infoCard}>
                    <p className={d.infoCardIcon}>🕐</p>
                    <p className={d.infoCardLabel}>Aturcara Majlis</p>
                    <p className={d.infoCardValue}>11.00 pagi<br />hingga<br />4.00 petang</p>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div className={d.infoCard} onClick={() => setShowMap(true)} style={{ cursor: 'pointer' }}>
                    <p className={d.infoCardIcon}>📍</p>
                    <p className={d.infoCardLabel}>Lokasi</p>
                    <p className={d.infoCardValue} style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Rumah Abang Jamil<br />29, Jalan Raja Dihilir<br />30350 Ipoh, Perak</p>
                  </div>
                </Reveal>
              </div>
              {/* Countdown */}
              <div className={d.countdownRow}>
                <Reveal><Countdown /></Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: map ── */}
        {/* <div className={d.mapSection}>
          <img src="/e-invite/peta.png" alt="Peta lokasi Damai Homestay" className={d.mapImg} />
        </div> */}

        {/* ── SECTION 5: doa ── */}
        <div className={d.doaSection} style={{ position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/e-invite/template_bunga_purple/4.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 0, pointerEvents: 'none' }} />
          <Reveal delay={100}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/e-invite/bismillah.png" alt="Bismillah" className={d.bismillah} />
          </Reveal>
          <Reveal delay={200}>
            <p className={d.doaText}>
              Ya Allah, jadikanlah perkahwinan kedua mempelai ini sebagai permulaan kepada sebuah kembara cinta yang diredhai.
              Lapangkanlah dada mereka untuk saling menerima, kuatkanlah hati mereka untuk saling setia,
              dan jadikanlah mereka pelindung serta penyembuh buat kedukaan satu sama lain. Amin.
            </p>
          </Reveal>
        </div>

        {/* ── SECTION 6: buku tetamu ── */}
        <div className={d.bukuSection} style={{ position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/e-invite/template_bunga_purple/5.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 0, pointerEvents: 'none' }} />
          <Reveal><p className={d.bukuTitle}>Buku Tetamu</p></Reveal>
          <Reveal delay={100}><p className={d.bukuSubtitle}>Tinggalkan ucapan anda untuk pengantin</p></Reveal>

          {ucapanList.length === 0 ? (
            <p className={d.bukuEmpty}>Belum ada ucapan. Jadilah yang pertama!</p>
          ) : (
            <div
              ref={wrapRef}
              className={`${d.bukuListWrap} ${!scrollNeeded ? d.bukuListWrapStatic : ''}`}
              onMouseDown={scrollNeeded ? e => onDragStart(e.clientY) : undefined}
              onMouseMove={scrollNeeded ? e => onDragMove(e.clientY) : undefined}
              onMouseUp={scrollNeeded ? onDragEnd : undefined}
              onMouseLeave={scrollNeeded ? onDragEnd : undefined}
              onTouchStart={scrollNeeded ? e => onDragStart(e.touches[0].clientY) : undefined}
              onTouchMove={scrollNeeded ? e => { e.preventDefault(); onDragMove(e.touches[0].clientY); } : undefined}
              onTouchEnd={scrollNeeded ? onDragEnd : undefined}
              style={{ touchAction: scrollNeeded ? 'none' : 'auto' }}
            >
              <div ref={scrollRef} className={d.bukuListScroll}>
                {(scrollNeeded ? [...ucapanList, ...ucapanList] : ucapanList).map((u, i) => (
                  <div key={`${u.id}-${i}`} className={d.bukuCard}>
                    <p className={d.bukuCardName}>{u.name}</p>
                    <p className={d.bukuCardMsg}>{u.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Reveal>
            <button className={d.bukuBtn} onClick={() => setShowUcapan(true)}>
              Beri Ucapan
            </button>
          </Reveal>
        </div>

        <div className={styles.pageBottomPad} />
      </div>

      {/* ── MODAL: beri ucapan ── */}
      {showUcapan && (
        <div className={d.ucapanOverlay} onClick={closeUcapan}>
          <div className={`${d.ucapanModal} ${ucapanClosing ? d.ucapanModalClose : ''}`} onClick={e => e.stopPropagation()}>
            <button className={d.ucapanClose} onClick={closeUcapan}>✕</button>
            <p className={d.ucapanModalTitle}>BERI UCAPAN</p>
            <input
              className={d.ucapanInput}
              placeholder="Nama anda"
              value={ucapanName}
              onChange={e => setUcapanName(e.target.value)}
              maxLength={60}
            />
            <div className={d.ucapanTextareaWrap}>
              <textarea
                className={d.ucapanTextarea}
                placeholder="Tulis ucapan anda..."
                value={ucapanMsg}
                onChange={e => setUcapanMsg(e.target.value)}
                maxLength={1000}
                rows={4}
              />
              <span className={`${d.ucapanCounter} ${ucapanMsg.length >= 1000 ? d.ucapanCounterFull : ''}`}>
                {ucapanMsg.length}/1000
              </span>
            </div>
            <button
              className={d.ucapanSubmit}
              onClick={handleUcapanSubmit}
              disabled={submitting || !ucapanName.trim() || !ucapanMsg.trim()}
            >
              {submitting ? 'Menghantar...' : 'Hantar Ucapan'}
            </button>
          </div>
        </div>
      )}

      <Footer audioRef={audioRef} opened={opened} showMap={showMap} setShowMap={setShowMap} />
    </>
  );
}
