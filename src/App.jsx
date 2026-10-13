
import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

// DEMO PHOTOS — Replace with the client's actual project images.
const photos = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
];

const names = [
  "Living Space",
  "Modern Kitchen",
  "TV Unit",
  "Wardrobe",
  "Profile Lighting",
  "Custom Interiors",
];

const gallery = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  image: photos[(i * 3 + Math.floor(i / 6)) % photos.length],
}));

const services = [
  {
    title: "Modular Kitchen",
    tag: "01 / KITCHENS",
    image: photos[2],
    tint: "#ff9c74",
  },
  {
    title: "TV Units",
    tag: "02 / LIVING",
    image: photos[3],
    tint: "#ffd16e",
  },
  {
    title: "Wardrobes",
    tag: "03 / STORAGE",
    image: photos[4],
    tint: "#9cbcaf",
  },
  {
    title: "UPVC & Aluminium",
    tag: "04 / INTERIORS",
    image: photos[6],
    tint: "#a8baf1",
  },
  {
    title: "Profile Lighting",
    tag: "05 / LIGHTING",
    image: photos[5],
    tint: "#f5b7b3",
  },
];

const INSTAGRAM =
  "https://www.instagram.com/tamilan_interiors_hosur/";

// Paste the client's public reel links here later.
const reelUrls = ["", "", ""];

function reelEmbed(url) {
  const match = url.match(
    /^https?:\/\/(?:www\.)?instagram\.com\/reel\/([\w-]+)\/?(?:\?.*)?$/
  );

  return match
    ? `https://www.instagram.com/reel/${match[1]}/embed/`
    : null;
}

// INLINE ICON — NO LUCIDE IMPORT ERROR
function Arrow({ direction = "right", size = 20 }) {
  const rotation = {
    right: 0,
    left: 180,
    up: -90,
    down: 90,
  }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

// SCROLL REVEAL
function Reveal({ children, className = "" }) {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;

    if (!("IntersectionObserver" in window)) {
      el.current.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={el} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// 3D-STYLE ROTATING PHOTO GLOBE
function PhotoGlobe({ onSelect }) {
  const stageRef = useRef(null);
  const photoRefs = useRef([]);
  const gesture = useRef({
    down: false,
    x: 0,
    y: 0,
    moved: false,
  });

  const rotation = useRef({ yaw: 0.3, pitch: 0.1 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let last = 0;
    let inView = true;

    const n = gallery.length;

    const spherePoints = gallery.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));

      return {
        x: Math.cos(a) * radius,
        y,
        z: Math.sin(a) * radius,
      };
    });

    const draw = () => {
      const radius = stage.clientWidth * 0.33;
      const { yaw, pitch } = rotation.current;

      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cx = Math.cos(pitch);
      const sx = Math.sin(pitch);

      spherePoints.forEach((p, index) => {
        const node = photoRefs.current[index];
        if (!node) return;

        const x = p.x * cy + p.z * sy;
        const z = -p.x * sy + p.z * cy;
        const y = p.y * cx - z * sx;
        const depth = p.y * sx + z * cx;

        const perspective = 1 / (1 - depth * 0.2);
        const scale =
          (0.61 + (depth + 1) * 0.34) * perspective;

        node.style.transform =
          `translate(-50%, -50%) ` +
          `translate3d(${x * radius * perspective}px,` +
          `${y * radius * perspective}px,0) ` +
          `scale(${scale})`;

        node.style.opacity = String(
          0.36 + ((depth + 1) / 2) * 0.64
        );

        node.style.zIndex = String(
          Math.round((depth + 1) * 100)
        );

        node.style.pointerEvents =
          depth > -0.22 ? "auto" : "none";
      });
    };

    const tick = (time) => {
      raf = requestAnimationFrame(tick);

      if (
        time - last < 30 ||
        !inView ||
        document.hidden
      ) {
        return;
      }

      const delta = Math.min(time - last || 16, 60);
      last = time;

      if (!reduced && !gesture.current.down) {
        rotation.current.yaw += delta * 0.00018;
      }

      draw();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = Boolean(entries[0]?.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    observer.observe(stage);
    draw();

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, []);

  const onPointerDown = (e) => {
    gesture.current = {
      down: true,
      x: e.clientX,
      y: e.clientY,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g.down) return;

    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;

    if (Math.abs(dx) + Math.abs(dy) > 3) {
      g.moved = true;
    }

    rotation.current.yaw += dx * 0.006;

    rotation.current.pitch = Math.max(
      -0.65,
      Math.min(
        0.65,
        rotation.current.pitch - dy * 0.003
      )
    );

    g.x = e.clientX;
    g.y = e.clientY;
  };

  const onPointerUp = () => {
    gesture.current.down = false;
  };

  return (
    <div className="globe-shell">
      <div className="globe-ring ring-one" />
      <div className="globe-ring ring-two" />

      <div
        className="globe-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        aria-label="Interactive rotating portfolio gallery"
      >
        {gallery.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="globe-photo"
            ref={(el) => {
              photoRefs.current[i] = el;
            }}
            onClick={() => {
              if (!gesture.current.moved) {
                onSelect(item);
              }
            }}
            aria-label={`View ${item.name} image ${item.id}`}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              draggable="false"
            />
          </button>
        ))}
      </div>

      <span className="globe-hint">
        DRAG TO EXPLORE <span>↗</span>
      </span>
    </div>
  );
}

// DEMO ENQUIRY FORM
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Modular Kitchen",
    message: "",
  });

  const [opened, setOpened] = useState(false);

  const submit = (event) => {
    event.preventDefault();

    const subject =
      `Interior consultation enquiry — ${form.name}`;

    const body =
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Interested in: ${form.type}\n` +
      `Project: ${form.message}`;

    window.location.href =
      `mailto:?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setOpened(true);
  };

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-top">
        <span>LET'S START YOUR PROJECT</span>
        <span>✳</span>
      </div>

      <h3>
        Tell us about
        <br />
        <em>your space.</em>
      </h3>

      <div className="form-fields">
        <label>
          Your name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Your full name"
          />
        </label>

        <label>
          Phone number
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            placeholder="Your phone number"
          />
        </label>

        <label>
          Looking for
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            {services.map((s) => (
              <option key={s.title}>
                {s.title}
              </option>
            ))}
            <option>Complete Home Interiors</option>
          </select>
        </label>

        <label>
          Project details
          <textarea
            rows="2"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            placeholder="What would you like to create?"
          />
        </label>
      </div>

      <button type="submit" className="submit-btn">
        PREPARE ENQUIRY <Arrow />
      </button>

      <small>
        {opened
          ? "An email draft was requested. Add the recipient and send it yourself."
          : "Demo form: opens an email draft; does not submit automatically."}
      </small>
    </form>
  );
}

// MAIN HOMEPAGE
export default function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const servicesRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(
        max ? (window.scrollY / max) * 100 : 0
      );
    };

    window.addEventListener("scroll", scroll, {
      passive: true,
    });

    scroll();

    return () =>
      window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menu || selected ? "hidden" : "";

    const escape = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setMenu(false);
      }
    };

    window.addEventListener("keydown", escape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", escape);
    };
  }, [menu, selected]);

  const shiftServices = (direction) => {
    servicesRef.current?.scrollBy({
      left: direction * 330,
      behavior: "smooth",
    });
  };

  return (
    <div className="tamilan-v4">
      {/* SCROLL PROGRESS */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
      />

      {/* HEADER */}
      <header className="v4-header">
        <a href="#home" className="v4-brand">
          <img
            src={logo}
            alt="Tamilan Interiors logo"
          />
          <span>
            TAMILAN
            <small>INTERIORS</small>
          </span>
        </a>

        <button
          className="hamburger"
          onClick={() => setMenu(true)}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* FULL SCREEN MENU */}
      <div
        className={`menu-overlay ${menu ? "is-open" : ""}`}
        aria-hidden={!menu}
      >
        <button
          className="menu-close"
          onClick={() => setMenu(false)}
          aria-label="Close menu"
        >
          ×
        </button>

        {[
          ["HOME", "#home"],
          ["OUR WORK", "#work"],
          ["SERVICES", "#services"],
          ["BOOK A CONSULTATION", "#contact"],
        ].map(([name, link]) => (
          <a
            key={name}
            tabIndex={menu ? 0 : -1}
            href={link}
            onClick={() => setMenu(false)}
          >
            {name}
            <Arrow size={24} />
          </a>
        ))}

        <span>THE ART OF LIVING WELL — HOSUR</span>
      </div>

      {/* HERO */}
      <section className="arch-hero" id="home">
        <div className="hero-noise" />
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />

        <div className="hero-copy-v4">
          <Reveal>
            <span className="micro-label">
              TAMILAN INTERIORS / HOSUR
            </span>

            <h1>
              YOUR SPACE.
              <br />
              <span>OUR ART.</span>
            </h1>

            <p>
              Thoughtful interiors, bold details,
              and spaces that feel unmistakably yours.
            </p>

            <a className="book-link" href="#contact">
              BOOK INTERIOR CONSULTATION
              <Arrow size={22} />
            </a>
          </Reveal>
        </div>

        <div className="hero-arch-wrap">
          <div className="outer-arch" />

          <div className="hero-arch">
            <img
              src={photos[0]}
              alt="Contemporary interior design"
            />
            <div className="arch-light" />
          </div>

          <div className="floating-label">
            DESIGNED
            <br />
            TO INSPIRE
            <span>✳</span>
          </div>
        </div>

        <div className="hero-bottom-text">
          <span>BEAUTIFUL SPACES. BOLD IDEAS.</span>
          <a href="#work">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      {/* 3D PHOTO GLOBE */}
      <section className="work-section" id="work">
        <Reveal className="section-title">
          <span className="micro-label">
            01 / THE PORTFOLIO
          </span>

          <h2>
            OUR <em>WORK.</em>
          </h2>

          <p>
            Move through our world of spaces. Drag
            the globe and tap any image to explore.
          </p>
        </Reveal>

        <PhotoGlobe onSelect={setSelected} />

        <div className="explore-rail">
          <span>←</span>

          <div className="rail-marquee">
            <div>
              EXPLORE OUR WORK ✳ SPACES WITH CHARACTER ✳
              EXPLORE OUR WORK ✳ SPACES WITH CHARACTER ✳
            </div>
          </div>

          <span>→</span>
        </div>
      </section>

      {/* ARCH SERVICE CAROUSEL */}
      <section className="arch-services" id="services">
        <Reveal className="services-top">
          <span className="micro-label">
            02 / WHAT WE DO
          </span>

          <h2>
            OUR <em>SERVICES.</em>
          </h2>

          <p>
            Spaces designed to look beautiful
            and work beautifully.
          </p>
        </Reveal>

        <div
          className="arch-service-list"
          ref={servicesRef}
        >
          {services.map((service, i) => (
            <a
              className="arch-service-card"
              key={service.title}
              href="#contact"
              style={{
                "--card-tint": service.tint,
              }}
            >
              <div className="service-photo">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
                <span className="service-shine" />
              </div>

              <div className="service-meta">
                <span>{service.tag}</span>
                <h3>{service.title}</h3>
                <Arrow size={20} />
              </div>

              <span className="service-big-no">
                0{i + 1}
              </span>
            </a>
          ))}
        </div>

        <div className="service-foot">
          <span>SWIPE TO EXPLORE OUR SERVICES</span>

          <div>
            <button
              onClick={() => shiftServices(-1)}
              aria-label="Scroll services left"
            >
              <Arrow direction="left" />
            </button>

            <button
              onClick={() => shiftServices(1)}
              aria-label="Scroll services right"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM REELS */}
      <section className="reels-section" id="reels">
        <Reveal>
          <span className="micro-label">
            03 / BEHIND THE SCENES
          </span>

          <h2>
            WATCH IT <em>COME ALIVE.</em>
          </h2>

          <p>
            Reels, details and interior transformations
            from the studio.
          </p>
        </Reveal>

        <div className="reels-grid">
          {reelUrls.map((url, index) => {
            const embed = reelEmbed(url);

            return (
              <div className="reel-tile" key={index}>
                {embed ? (
                  <iframe
                    title={`Tamilan Interiors reel ${index + 1}`}
                    src={embed}
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={photos[(index + 2) % photos.length]}
                      alt="Interior reel preview placeholder"
                      loading="lazy"
                    />
                    <span>
                      VIEW REELS ON INSTAGRAM ↗
                    </span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <a
          href={INSTAGRAM}
          className="reels-cta"
          target="_blank"
          rel="noreferrer"
        >
          @TAMILAN_INTERIORS_HOSUR
          <Arrow />
        </a>
      </section>

      {/* BOOK NOW */}
      <section className="book-banner">
        <div className="book-spark">✳</div>

        <Reveal>
          <span className="micro-label">
            04 / YOUR DREAM SPACE
          </span>

          <h2>
            LET'S MAKE
            <br />
            <em>IT REAL.</em>
          </h2>

          <p>
            From the first idea to the finishing detail.
          </p>

          <a href="#contact" className="book-circle">
            BOOK NOW
            <Arrow size={25} />
          </a>
        </Reveal>
      </section>

      {/* ENQUIRY */}
      <section className="enquiry-section" id="contact">
        <div className="enquiry-intro">
          <Reveal>
            <span className="micro-label">
              05 / SAY HELLO
            </span>

            <h2>
              HAVE AN
              <br />
              <em>IDEA?</em>
            </h2>

            <p>
              Tell us about the space you have in mind.
              The best interiors start with a conversation.
            </p>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              VISIT INSTAGRAM
              <Arrow size={20} />
            </a>

            <span className="enquiry-location">
              ⌖ HOSUR, TAMIL NADU
            </span>
          </Reveal>
        </div>

        <ContactForm />
      </section>

      {/* FOOTER */}
      <footer className="v4-footer">
        <div className="footer-main">
          <div>
            <img src={logo} alt="Tamilan Interiors" />
            <h3>
              TAMILAN
              <br />
              INTERIORS
            </h3>
            <p>We design your space.</p>
          </div>

          <div>
            <span>EXPLORE</span>
            <a href="#home">Home</a>
            <a href="#work">Our work</a>
            <a href="#services">Services</a>
          </div>

          <div>
            <span>CONNECT</span>
            <a href="#contact">Book consultation</a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <span>Hosur, Tamil Nadu</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} TAMILAN INTERIORS
          </span>
          <span>DEMO WEBSITE — CONCEPT DESIGN</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {/* FULL SCREEN GALLERY PREVIEW */}
      {selected && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image preview"
          onClick={() => setSelected(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className="lightbox-body"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.name}
            />

            <div>
              <span>DESIGN INSPIRATION / DEMO</span>
              <h3>{selected.name}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
