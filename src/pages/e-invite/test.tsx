import { useRef } from 'react';

export default function EInviteTest() {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#000', cursor: 'pointer' }}
      onClick={() => { if (ref.current) { ref.current.currentTime = 5; ref.current.play(); } }}
    >
      <video
        ref={ref}
        src="/e-invite/template_bunga_purple/wedding_book_opening.mp4"
        playsInline
        onLoadedMetadata={() => { if (ref.current) ref.current.currentTime = 5; }}
        style={{ width: '100%', maxWidth: '480px', display: 'block' }}
      />
    </div>
  );
}
