import { useState, useEffect, useRef } from "react";

// ─── Intersection Observer Hook ───
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Scroll-triggered fade in ───
export function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(35px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Image with loading state + hover zoom ───
export function FoodImage({ src, alt, style = {} }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--pho-brown)", ...style }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease, transform 0.5s ease",
          display: "block",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      />
    </div>
  );
}

// ─── Section label (small gold uppercase text) ───
export function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "11px",
      letterSpacing: "5px",
      textTransform: "uppercase",
      color: "var(--gold)",
      marginBottom: "20px",
    }}>
      {children}
    </div>
  );
}

// ─── Section heading with accent word ───
export function SectionHeading({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(28px, 5vw, 44px)",
      fontWeight: 400,
      ...style,
    }}>
      {children}
    </h2>
  );
}

// ─── Accent text (gold or jade italic span) ───
export function Accent({ children, color = "var(--gold)" }) {
  return <span style={{ fontStyle: "italic", color }}>{children}</span>;
}
