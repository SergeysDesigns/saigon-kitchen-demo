import { useState } from "react";
import { FadeSection, FoodImage, SectionLabel, SectionHeading, Accent } from "./components.jsx";
import content from "./content.js";

// Split restaurant name into plain + accent parts
function RestaurantName({ size = "22px" }) {
  const plain = content.name.replace(content.nameAccent, "").trim();
  return (
    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: size }}>
      {plain} <Accent>{content.nameAccent}</Accent>
    </span>
  );
}

// ═══════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════
function Hero() {
  return (
    <div style={{
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      animation: "heroReveal 1.4s ease forwards",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${content.images.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "slowZoom 20s ease forwards",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0.92) 100%)",
      }} />
      <div style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 clamp(24px, 5vw, 80px)",
        color: "var(--cream)",
      }}>
        <div style={{ animation: "fadeUp 1s ease 0.3s both", maxWidth: "700px" }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "11px", letterSpacing: "6px",
            textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px",
          }}>
            {content.cuisine} · {content.location}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(44px, 8vw, 88px)",
            fontWeight: 400, lineHeight: 1.05, marginBottom: "16px",
          }}>
            {content.name.replace(content.nameAccent, "")}
            <Accent>{content.nameAccent}</Accent>
          </h1>
          <div style={{
            width: "60px", height: "1px", background: "var(--gold)",
            margin: "24px auto", animation: "lineGrow 1s ease 0.8s both",
          }} />
          <p style={{
            fontSize: "clamp(17px, 2vw, 21px)", fontWeight: 300,
            color: "rgba(250,247,242,0.7)", lineHeight: 1.6, maxWidth: "450px",
            margin: "0 auto",
          }}>
            {content.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ABOUT + IMAGE GRID
// ═══════════════════════════════════════════
function About() {
  return (
    <div style={{ padding: "clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(24px, 4vw, 48px)",
        maxWidth: "1100px", margin: "0 auto", alignItems: "center",
      }}>
        <FadeSection>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <SectionHeading style={{ lineHeight: 1.25, marginBottom: "24px" }}>
              {content.aboutHeading}{" "}
              <Accent color="var(--jade)">{content.aboutAccent}</Accent>
            </SectionHeading>
            {content.aboutText.map((p, i) => (
              <p key={i} style={{
                fontSize: "17px", lineHeight: 1.8,
                color: "var(--warm-gray)", fontWeight: 300,
                marginBottom: i < content.aboutText.length - 1 ? "16px" : 0,
              }}>{p}</p>
            ))}
          </div>
        </FadeSection>
        <FadeSection delay={0.2}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "200px 200px",
            gap: "12px",
          }}>
            <FoodImage src={content.images.about1} alt="Food close up" style={{ borderRadius: "4px", gridRow: "1 / 3" }} />
            <FoodImage src={content.images.about2} alt="Food detail" style={{ borderRadius: "4px" }} />
            <FoodImage src={content.images.about3} alt="Fresh ingredients" style={{ borderRadius: "4px" }} />
          </div>
        </FadeSection>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SIGNATURE DISHES
// ═══════════════════════════════════════════
function SignatureDishes() {
  return (
    <div style={{
      background: "var(--charcoal)", color: "var(--cream)",
      padding: "clamp(60px, 10vw, 100px) 0",
    }}>
      <FadeSection>
        <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
          <SectionLabel>Signature Dishes</SectionLabel>
          <SectionHeading>
            Made Fresh, <Accent>Every Day</Accent>
          </SectionHeading>
        </div>
      </FadeSection>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1px", background: "rgba(200,164,90,0.1)",
        margin: "0 clamp(24px, 5vw, 80px)",
      }}>
        {content.signatureDishes.map((dish, i) => (
          <FadeSection key={i} delay={i * 0.12}>
            <div style={{ background: "var(--charcoal)", overflow: "hidden" }}>
              <FoodImage src={content.images[dish.image]} alt={dish.name} style={{ height: "260px" }} />
              <div style={{ padding: "28px 24px 32px" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px", fontWeight: 500, marginBottom: "8px",
                }}>{dish.name}</h3>
                <p style={{
                  color: "var(--warm-gray)", fontSize: "15px",
                  fontWeight: 300, fontStyle: "italic", lineHeight: 1.6,
                }}>{dish.desc}</p>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MENU
// ═══════════════════════════════════════════
function Menu() {
  const [activeTab, setActiveTab] = useState(content.menuCategories[0].id);

  return (
    <div style={{
      padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
      maxWidth: "850px", margin: "0 auto",
    }}>
      <FadeSection>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionLabel>The Menu</SectionLabel>
          <SectionHeading>
            From Our <Accent color="var(--jade)">Kitchen</Accent>
          </SectionHeading>
        </div>

        <div style={{
          display: "flex", justifyContent: "center",
          gap: "clamp(16px, 3vw, 36px)", marginBottom: "48px", flexWrap: "wrap",
        }}>
          {content.menuCategories.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
              color: activeTab === tab.id ? "var(--jade)" : "var(--warm-gray)",
              paddingBottom: "8px",
              borderBottom: activeTab === tab.id ? "2px solid var(--jade)" : "2px solid transparent",
              transition: "all 0.3s ease",
            }}>{tab.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {(content.menuItems[activeTab] || []).map((item, i) => (
            <div key={`${activeTab}-${i}`} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", gap: "16px",
              animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              paddingBottom: "24px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(18px, 2.5vw, 21px)", fontWeight: 500,
                  }}>{item.name}</h4>
                  {item.popular && (
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase",
                      background: "var(--jade)", color: "white",
                      padding: "3px 8px", borderRadius: "2px",
                    }}>Popular</span>
                  )}
                </div>
                <p style={{
                  color: "var(--warm-gray)", fontSize: "14px",
                  fontStyle: "italic", fontWeight: 300,
                }}>{item.desc}</p>
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--jade)", fontSize: "19px",
                flexShrink: 0, fontWeight: 500,
              }}>${item.price}</span>
            </div>
          ))}
        </div>
      </FadeSection>
    </div>
  );
}

// ═══════════════════════════════════════════
// ATMOSPHERE BREAK
// ═══════════════════════════════════════════
function Atmosphere() {
  return (
    <div style={{ position: "relative", height: "50vh", minHeight: "300px", overflow: "hidden" }}>
      <img src={content.images.interior} alt="Restaurant interior" style={{
        width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", color: "var(--cream)", padding: "24px",
      }}>
        <FadeSection>
          <SectionHeading style={{ marginBottom: "12px" }}>
            {content.atmosphereHeading}{" "}
            <Accent>{content.atmosphereAccent}</Accent>
          </SectionHeading>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase",
            color: "rgba(250,247,242,0.6)",
          }}>{content.atmosphereTags}</p>
        </FadeSection>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// FOOTER (hours, contact, order)
// ═══════════════════════════════════════════
function Footer() {
  return (
    <>
      <div style={{
        background: "var(--charcoal)", color: "var(--cream)",
        padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)",
      }}>
        <FadeSection>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(40px, 5vw, 64px)",
            maxWidth: "950px", margin: "0 auto", textAlign: "center",
          }}>
            <div>
              <SectionLabel>Hours</SectionLabel>
              <div style={{ color: "var(--warm-gray)", fontSize: "16px", lineHeight: 2.1, fontWeight: 300 }}>
                {content.hours.map((h, i) => <div key={i}>{h}</div>)}
              </div>
            </div>
            <div>
              <SectionLabel>Location</SectionLabel>
              <div style={{ color: "var(--warm-gray)", fontSize: "16px", lineHeight: 2.1, fontWeight: 300 }}>
                <div>{content.address.street}</div>
                <div>{content.address.suite}</div>
                <div>{content.address.city}</div>
                <div style={{ marginTop: "8px" }}>{content.phone}</div>
              </div>
            </div>
            {(content.orderPickupUrl || content.orderDeliveryUrl) && (
              <div>
                <SectionLabel>Order</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", marginTop: "8px" }}>
                  {content.orderPickupUrl && (
                    <a href={content.orderPickupUrl} style={{
                      background: "var(--gold)", color: "var(--charcoal)", border: "none",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
                      padding: "14px 36px", cursor: "pointer", fontWeight: 600,
                      transition: "all 0.3s ease", width: "100%", maxWidth: "220px",
                      textDecoration: "none", textAlign: "center",
                    }}>Order Pickup</a>
                  )}
                  {content.orderDeliveryUrl && (
                    <a href={content.orderDeliveryUrl} style={{
                      background: "transparent", color: "var(--gold)",
                      border: "1px solid var(--gold)",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
                      padding: "14px 36px", cursor: "pointer",
                      transition: "all 0.3s ease", width: "100%", maxWidth: "220px",
                      textDecoration: "none", textAlign: "center",
                    }}>Order Delivery</a>
                  )}
                </div>
              </div>
            )}
          </div>
        </FadeSection>
      </div>

      <div style={{
        background: "var(--charcoal)",
        borderTop: "1px solid rgba(200,164,90,0.1)",
        textAlign: "center", padding: "32px 24px", color: "var(--cream)",
      }}>
        <div style={{ marginBottom: "10px" }}>
          <RestaurantName />
        </div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px", letterSpacing: "3px", color: "var(--warm-gray)",
        }}>
          © {new Date().getFullYear()} {content.name.toUpperCase()} · {content.location.toUpperCase()} · ALL RIGHTS RESERVED
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
export default function App() {
  return (
    <>
      <Hero />
      <About />
      <SignatureDishes />
      <Menu />
      <Atmosphere />
      <Footer />
    </>
  );
}