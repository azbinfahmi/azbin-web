import Head from 'next/head';
import { useState, useEffect } from 'react';

type Ucapan = { id: number; name: string; message: string; created_at: string };

const PIN = 'bin';

export default function EInviteAdmin() {
  const [pin, setPin]           = useState('');
  const [authed, setAuthed]     = useState(false);
  const [pinError, setPinError] = useState(false);
  const [list, setList]         = useState<Ucapan[]>([]);
  const [loading, setLoading]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const handlePin = () => {
    if (pin === PIN) { setAuthed(true); setPinError(false); }
    else { setPinError(true); }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch('/api/e-invite/ucapan')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setList(data); })
      .finally(() => setLoading(false));
  }, [authed]);

  const handleDelete = async (id: number) => {
    if (!confirm('Padam ucapan ini?')) return;
    setDeleting(id);
    try {
      await fetch('/api/e-invite/ucapan', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setList(prev => prev.filter(u => u.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <Head><title>Admin — Buku Tetamu</title></Head>
      <div style={s.page}>
        <h1 style={s.title}>Buku Tetamu — Admin</h1>

        {!authed ? (
          <div style={s.pinBox}>
            <p style={s.pinLabel}>Masukkan PIN</p>
            <input
              style={s.pinInput}
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handlePin()}
              placeholder="PIN"
            />
            {pinError && <p style={s.pinError}>PIN salah.</p>}
            <button style={s.pinBtn} onClick={handlePin}>Masuk</button>
          </div>
        ) : loading ? (
          <p style={s.empty}>Memuatkan...</p>
        ) : list.length === 0 ? (
          <p style={s.empty}>Tiada ucapan lagi.</p>
        ) : (
          <div style={s.list}>
            {list.map(u => (
              <div key={u.id} style={s.card}>
                <div style={s.cardBody}>
                  <p style={s.name}>{u.name}</p>
                  <p style={s.msg}>{u.message}</p>
                  <p style={s.date}>{new Date(u.created_at).toLocaleString('ms-MY')}</p>
                </div>
                <button
                  style={{ ...s.delBtn, opacity: deleting === u.id ? 0.5 : 1 }}
                  onClick={() => handleDelete(u.id)}
                  disabled={deleting === u.id}
                >
                  Padam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#1a0a02',
    color: '#e6ccaa',
    fontFamily: 'system-ui, sans-serif',
    padding: '32px 20px',
    maxWidth: 600,
    margin: '0 auto',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 22,
    fontWeight: 700,
    color: '#e6ccaa',
    marginBottom: 28,
  },
  pinBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 300,
  },
  pinLabel: { fontSize: 14, opacity: 0.7, margin: 0 },
  pinInput: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid rgba(230,204,170,0.3)',
    background: 'rgba(230,204,170,0.08)',
    color: '#e6ccaa',
    fontSize: 16,
    outline: 'none',
  },
  pinError: { color: '#e74c3c', fontSize: 13, margin: 0 },
  pinBtn: {
    padding: '10px 24px',
    background: '#3d1a06',
    color: '#e6ccaa',
    border: '1px solid rgba(230,204,170,0.3)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    letterSpacing: '0.1em',
  },
  empty: { opacity: 0.5, fontSize: 14 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  card: {
    background: 'rgba(230,204,170,0.07)',
    border: '1px solid rgba(230,204,170,0.15)',
    borderRadius: 10,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardBody: { flex: 1 },
  name: { fontWeight: 700, fontSize: 15, margin: '0 0 4px', color: '#e6ccaa' },
  msg:  { fontSize: 14, margin: '0 0 6px', opacity: 0.85, lineHeight: 1.5 },
  date: { fontSize: 11, opacity: 0.45, margin: 0 },
  delBtn: {
    padding: '7px 14px',
    background: '#7a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
    flexShrink: 0,
    letterSpacing: '0.05em',
  },
};
