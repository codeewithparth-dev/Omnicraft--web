export default function MarqueeTicker() {
  const text = "DESIGN · ENGINEERING · STRATEGY · MOTION · BRANDING · 3D · ";
  const repeatedText = Array(10).fill(text).join("");

  return (
    <div style={{ backgroundColor: 'var(--accent)', color: '#000', padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }} className="marquee-container">
      <div className="marquee-content" style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1.25rem' }}>
        <span style={{ paddingRight: '10px' }}>{repeatedText}</span>
        <span style={{ paddingRight: '10px' }}>{repeatedText}</span>
      </div>
    </div>
  );
}
