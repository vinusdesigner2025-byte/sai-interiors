
import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

// =========================================
// SAI INTERIORS CONFIGURATION
// =========================================

const BRAND = "Sai Interiors";
const LOCATION = "Sholinganallur, Chennai";
const PHONE = "08056073989";

const INSTAGRAM =
  "https://www.instagram.com/saiinteriors_chennai/";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sai%20Interiors%20Village%20High%20Road%20Sholinganallur%20Chennai";

// Demo photos - replace with real client project photos.
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

// =========================================
// SERVICES
// =========================================

const services = [
  {
    title: "Modular Kitchen",
    tag: "01 / KITCHENS",
    image: photos[2],
    tint: "#ff9c74",
  },
  {
    title: "Wardrobes",
    tag: "02 / STORAGE",
    image: photos[4],
    tint: "#ffd16e",
  },
  {
    title: "False Ceiling",
    tag: "03 / CEILING",
    image: photos[5],
    tint: "#9cbcaf",
  },
  {
    title: "TV Cabinet",
    tag: "04 / LIVING",
    image: photos[3],
    tint: "#a8baf1",
  },
  {
    title: "Pooja Cabinet",
    tag: "05 / POOJA",
    image: photos[6],
    tint: "#f5b7b3",
  },
  {
    title: "Crockery Unit",
    tag: "06 / DINING",
    image: photos[1],
    tint: "#e4c8fa",
  },
  {
    title: "Wall Papers",
    tag: "07 / WALL DECOR",
    image: photos[7],
    tint: "#b8d5bc",
  },
];

// =========================================
// PROJECT GALLERY
// =========================================

const projectNames = [
  "Living Spaces",
  "Modular Kitchen",
  "TV Cabinets",
  "Wardrobes",
  "False Ceiling",
  "Custom Interiors",
];

const gallery = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  name: projectNames[i % projectNames.length],
  image: photos[(i * 3 + Math.floor(i / 6)) % photos.length],
}));

// =========================================
// GOOGLE CUSTOMER REVIEW EXCERPTS
// From supplied Google listing screenshots
// =========================================

const customerReviews = [
  {
    quote:
      "Material quality was good and finished the work well ahead of promised time.",
    stars: 5,
    name: "Google Customer Review",
    source: "Review excerpt",
  },
  {
    quote:
      "The quality of materials, finishing, and workmanship exceeded our expectations.",
    stars: 5,
    name: "Google Customer Review",
    source: "Review excerpt",
  },
  {
    quote:
      "The only thing we want was to make our new home look classy and elegant.",
    stars: 5,
    name: "Google Customer Review",
    source: "Review excerpt",
  },
];

// =========================================
// ANIMATED COUNTERS
// Figures shown in client business screenshots
// =========================================

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    description: "Spaces transformed with care",
    decimals: 0,
  },
  {
    value: 52,
    suffix: "",
    label: "Google Reviews",
    description: "Customer feedback on Google",
    decimals: 0,
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Google Rating",
    description: "Customer satisfaction",
    decimals: 1,
  },
  {
    value: 7,
    suffix: "",
    label: "Specialised Services",
    description: "Interior solutions for every home",
    decimals: 0,
  },
];

// =========================================
// ARROW ICON
// =========================================

function Arrow({ direction = "right", size = 20 }) {
  const rotation =
    {
      right: 0,
      left: 180,
      up: -90,
      down: 90,
    }[direction] ?? 0;

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
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("visible");
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
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

// =========================================
// AUTO COUNT-UP ANIMATION
// =========================================

function CountUp({
  to,
  suffix = "",
  decimals = 0,
}) {
  const elementRef = useRef(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    let animationFrame;
    let observer;
    let started = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const startAnimation = () => {
      if (started) return;

      started = true;

      if (reducedMotion) {
        setCount(to);
        return;
      }

      let startTime;

      const animate = (time) => {
        if (startTime === undefined) {
          startTime = time;
        }

        const progress = Math.min(
          (time - startTime) / 2000,
          1
        );

        const eased =
          1 - Math.pow(1 - progress, 4);

        const value = to * eased;

        setCount(
          Number(value.toFixed(decimals))
        );

        if (progress < 1) {
          animationFrame =
            requestAnimationFrame(animate);
        }
      };

      animationFrame =
        requestAnimationFrame(animate);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        {
          threshold: 0.25,
        }
      );

      observer.observe(element);
    } else {
      startAnimation();
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [to, decimals]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : count.toLocaleString("en-IN");

  return (
    <span
      ref={elementRef}
      className="stat-number"
    >
      {formatted}
      <span className="stat-suffix">
        {suffix}
      </span>
    </span>
  );
}

// =========================================
// INTERACTIVE ROTATING 3D PHOTO GLOBE
// =========================================

function PhotoGlobe({ onSelect }) {
  const stageRef = useRef(null);
  const photoRefs = useRef([]);

  const gesture = useRef({
    down: false,
    x: 0,
    y: 0,
    moved: false,
  });

  const rotation = useRef({
    yaw: 0.3,
    pitch: 0.1,
  });

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

    const points = gallery.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle =
        i * Math.PI * (3 - Math.sqrt(5));

      return {
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
      };
    });

    const draw = () => {
      const radius =
        stage.clientWidth * 0.33;

      const { yaw, pitch } =
        rotation.current;

      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);

      const cx = Math.cos(pitch);
      const sx = Math.sin(pitch);

      points.forEach((p, i) => {
        const node = photoRefs.current[i];

        if (!node) return;

        const x = p.x * cy + p.z * sy;
        const z = -p.x * sy + p.z * cy;

        const y = p.y * cx - z * sx;
        const depth = p.y * sx + z * cx;

        const perspective =
          1 / (1 - depth * 0.2);

        const scale =
          (0.61 + (depth + 1) * 0.34) *
          perspective;

        node.style.transform =
          `translate(-50%, -50%) ` +
          `translate3d(${
            x * radius * perspective
          }px, ${
            y * radius * perspective
          }px, 0) ` +
          `scale(${scale})`;

        node.style.opacity = String(
          0.36 +
            ((depth + 1) / 2) * 0.64
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

      const delta = Math.min(
        time - last || 16,
        60
      );

      last = time;

      if (
        !reduced &&
        !gesture.current.down
      ) {
        rotation.current.yaw +=
          delta * 0.00018;
      }

      draw();
    };

    let observer;

    if (
      "IntersectionObserver" in window
    ) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        {
          rootMargin: "150px",
        }
      );

      observer.observe(stage);
    }

    draw();

    raf = requestAnimationFrame(tick);

    window.addEventListener(
      "resize",
      draw
    );

    return () => {
      cancelAnimationFrame(raf);

      observer?.disconnect();

      window.removeEventListener(
        "resize",
        draw
      );
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
    const current = gesture.current;

    if (!current.down) return;

    const dx =
      e.clientX - current.x;

    const dy =
      e.clientY - current.y;

    if (
      Math.abs(dx) + Math.abs(dy) > 3
    ) {
      current.moved = true;
    }

    rotation.current.yaw +=
      dx * 0.006;

    rotation.current.pitch =
      Math.max(
        -0.65,
        Math.min(
          0.65,
          rotation.current.pitch -
            dy * 0.003
        )
      );

    current.x = e.clientX;
    current.y = e.clientY;
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
            type="button"
            key={item.id}
            className="globe-photo"
            ref={(node) => {
              photoRefs.current[i] = node;
            }}
            onClick={() => {
              if (
                !gesture.current.moved
              ) {
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
        DRAG TO EXPLORE
        <span>↗</span>
      </span>
    </div>
  );
}

// =========================================
// CUSTOMER REVIEWS SLIDER
// =========================================

function ReviewsSection() {
  const [index, setIndex] = useState(0);

  const current =
    customerReviews[index];

  const previousReview = () => {
    setIndex(
      (i) =>
        (i - 1 +
          customerReviews.length) %
        customerReviews.length
    );
  };

  const nextReview = () => {
    setIndex(
      (i) =>
        (i + 1) %
        customerReviews.length
    );
  };

  return (
    <section
      className="customer-reviews"
      id="reviews"
    >
      <div className="reviews-halo halo-one" />
      <div className="reviews-halo halo-two" />

      <Reveal className="reviews-heading">
        <span className="micro-label">
          04 / CLIENT EXPERIENCES
        </span>

        <h2>
          WORDS THAT
          <em> MATTER.</em>
        </h2>

        <p>
          Genuine customer feedback
          from Google. Built on trust,
          quality and craftsmanship.
        </p>
      </Reveal>

      <div className="review-rating-summary">
        <span className="rating-big">
          4.9
        </span>

        <div>
          <span className="rating-stars">
            ★★★★★
          </span>

          <p>52 Google Reviews</p>
        </div>
      </div>

      <div
        className="testimonial-card"
        key={index}
      >
        <span className="review-quote-symbol">
          “
        </span>

        <span className="testimonial-stars">
          {"★".repeat(current.stars)}
        </span>

        <blockquote>
          “{current.quote}”
        </blockquote>

        <div className="testimonial-bottom">
          <div>
            <strong>
              {current.name}
            </strong>

            <small>
              {current.source}
            </small>
          </div>

          <div className="review-arrows">
            <button
              type="button"
              onClick={previousReview}
              aria-label="Previous review"
            >
              <Arrow direction="left" />
            </button>

            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      <div className="review-dots">
        {customerReviews.map((_, i) => (
          <button
            key={i}
            type="button"
            className={
              index === i ? "active" : ""
            }
            aria-label={`Show review ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <a
        className="google-review-link"
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        EXPLORE GOOGLE REVIEWS
        <Arrow size={19} />
      </a>
    </section>
  );
}

// =========================================
// ENQUIRY FORM (DEMO)
// =========================================

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: services[0].title,
    message: "",
  });

  const [opened, setOpened] =
    useState(false);

  const submit = (e) => {
    e.preventDefault();

    const subject =
      `Interior consultation enquiry - ${form.name}`;

    const body =
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Interested in: ${form.type}\n` +
      `Project: ${form.message}`;

    window.location.href =
      `mailto:?subject=${encodeURIComponent(
        subject
      )}` +
      `&body=${encodeURIComponent(
        body
      )}`;

    setOpened(true);
  };

  return (
    <form
      className="enquiry-form"
      onSubmit={submit}
    >
      <div className="form-top">
        <span>
          LET'S START YOUR PROJECT
        </span>
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
            placeholder="Your full name"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </label>

        <label>
          Phone number
          <input
            required
            type="tel"
            value={form.phone}
            placeholder="Your phone number"
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />
        </label>

        <label>
          Looking for
          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            {services.map((service) => (
              <option
                key={service.title}
                value={service.title}
              >
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Project details
          <textarea
            rows={2}
            value={form.message}
            placeholder="What would you like to create?"
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
          />
        </label>
      </div>

      <button
        type="submit"
        className="submit-btn"
      >
        PREPARE ENQUIRY
        <Arrow />
      </button>

      <small>
        {opened
          ? "Email draft opened. Add the recipient and send."
          : "Demo form: opens an email draft only."}
      </small>
    </form>
  );
}

// =========================================
// PREMIUM ACCORDION FOOTER
// =========================================

function SaiFooter() {
  const [openSection, setOpenSection] =
    useState(null);

  const footerGroups = [
    {
      title: "INFORMATION",
      links: [
        {
          label: "Home",
          href: "#home",
        },
        {
          label: "Our Work",
          href: "#work",
        },
        {
          label: "Our Services",
          href: "#services",
        },
        {
          label: "Customer Reviews",
          href: "#reviews",
        },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        {
          label: "Book Consultation",
          href: "#contact",
        },
        {
          label: "Contact Us",
          href: "#contact",
        },
        {
          label: "Call Now",
          href: `tel:${PHONE}`,
        },
        {
          label: "Google Reviews",
          href: GOOGLE_REVIEWS_URL,
          external: true,
        },
      ],
    },
    {
      title: "GET IN TOUCH",
      links: [
        {
          label: "080560 73989",
          href: `tel:${PHONE}`,
        },
        {
          label: "Sholinganallur, Chennai",
          href: GOOGLE_REVIEWS_URL,
          external: true,
        },
        {
          label: "Get Directions ↗",
          href: GOOGLE_REVIEWS_URL,
          external: true,
        },
      ],
    },
    {
      title: "FOLLOW OUR WORK",
      links: [
        {
          label: "Instagram ↗",
          href: INSTAGRAM,
          external: true,
        },
        {
          label: "Google Customer Reviews ↗",
          href: GOOGLE_REVIEWS_URL,
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="sai-premium-footer">
      {/* LOGO */}

      <div className="sai-footer-brand">
        <img
          src={logo}
          alt="Sai Interiors logo"
        />

        <div className="sai-footer-brand-text">
          <h2>
            SAI INTERIORS
          </h2>

          <span>
            DESIGN YOUR DREAM HOME
          </span>
        </div>
      </div>

      {/* FOOTER GROUPS */}

      <div className="sai-footer-groups">
        {footerGroups.map(
          (group, index) => (
            <div
              key={group.title}
              className={`sai-footer-group ${
                openSection === index
                  ? "is-open"
                  : ""
              }`}
            >
              <h3 className="sai-footer-desktop-title">
                {group.title}
              </h3>

              <button
                type="button"
                className="sai-footer-mobile-title"
                onClick={() =>
                  setOpenSection(
                    openSection === index
                      ? null
                      : index
                  )
                }
                aria-expanded={
                  openSection === index
                }
                aria-controls={`sai-footer-panel-${index}`}
              >
                <span>
                  {group.title}
                </span>

                <span
                  className="sai-footer-chevron"
                  aria-hidden="true"
                />
              </button>

              <div
                className="sai-footer-links"
                id={`sai-footer-panel-${index}`}
              >
                {group.links.map(
                  (link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        link.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={() => {
                        if (!link.external) {
                          setOpenSection(null);
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* COPYRIGHT */}

      <div className="sai-footer-bottom">
        <span
          className="sai-footer-watermark"
          aria-hidden="true"
        >
          SI
        </span>

        <p>
          © {new Date().getFullYear()}{" "}
          Sai Interiors.
          All rights reserved.
        </p>

        <h2>
          Design Your Dream Home.
        </h2>

        <a
          href="#home"
          className="sai-back-to-top"
        >
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  );
}

// =========================================
// MAIN APP
// =========================================

export default function App() {
  const [menu, setMenu] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  const servicesRef = useRef(null);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    const scroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(
        max > 0
          ? (window.scrollY / max) * 100
          : 0
      );
    };

    window.addEventListener(
      "scroll",
      scroll,
      {
        passive: true,
      }
    );

    scroll();

    return () =>
      window.removeEventListener(
        "scroll",
        scroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menu || selected ? "hidden" : "";

    const escape = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        setSelected(null);
      }
    };

    window.addEventListener(
      "keydown",
      escape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        escape
      );
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
        style={{
          width: `${progress}%`,
        }}
      />

      {/* HEADER */}

      <header className="v4-header">
        <a
          href="#home"
          className="v4-brand"
        >
          <img
            src={logo}
            alt={`${BRAND} logo`}
          />

          <span>
            SAI
            <small>
              INTERIORS
            </small>
          </span>
        </a>

        <button
          type="button"
          className="hamburger"
          onClick={() =>
            setMenu(true)
          }
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* FULL SCREEN MENU */}

      <div
        className={`menu-overlay ${
          menu ? "is-open" : ""
        }`}
        aria-hidden={!menu}
      >
        <button
          type="button"
          className="menu-close"
          onClick={() =>
            setMenu(false)
          }
          aria-label="Close menu"
        >
          ×
        </button>

        {[
          ["HOME", "#home"],
          ["OUR WORK", "#work"],
          ["SERVICES", "#services"],
          ["REVIEWS", "#reviews"],
          ["CONTACT", "#contact"],
        ].map(([name, link]) => (
          <a
            key={name}
            href={link}
            tabIndex={menu ? 0 : -1}
            onClick={() =>
              setMenu(false)
            }
          >
            {name}
            <Arrow size={24} />
          </a>
        ))}

        <span>
          THE ART OF LIVING WELL — CHENNAI
        </span>
      </div>

      {/* HERO */}

      <section
        className="arch-hero"
        id="home"
      >
        <div className="hero-noise" />

        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />

        <div className="hero-copy-v4">
          <Reveal>
            <span className="micro-label">
              SAI INTERIORS / CHENNAI
            </span>

            <h1>
              YOUR SPACE.
              <br />
              <span>
                OUR ART.
              </span>
            </h1>

            <p>
              Thoughtful interiors,
              bold details, and spaces
              that feel unmistakably yours.
            </p>

            <a
              className="book-link"
              href="#contact"
            >
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
          <span>
            BEAUTIFUL SPACES.
            BOLD IDEAS.
          </span>

          <a href="#work">
            SCROLL TO EXPLORE ↓
          </a>
        </div>
      </section>

      {/* OUR WORK - 3D GALLERY */}

      <section
        className="work-section"
        id="work"
      >
        <Reveal className="section-title">
          <span className="micro-label">
            01 / THE PORTFOLIO
          </span>

          <h2>
            OUR <em>WORK.</em>
          </h2>

          <p>
            Move through our world of
            spaces. Drag the globe and
            tap any image to explore.
          </p>
        </Reveal>

        <PhotoGlobe
          onSelect={setSelected}
        />

        <div className="explore-rail">
          <span>←</span>

          <div className="rail-marquee">
            <div>
              EXPLORE OUR WORK ✳ SPACES
              WITH CHARACTER ✳ EXPLORE
              OUR WORK ✳ SPACES WITH
              CHARACTER ✳
            </div>
          </div>

          <span>→</span>
        </div>
      </section>

      {/* SERVICES */}

      <section
        className="arch-services"
        id="services"
      >
        <Reveal className="services-top">
          <span className="micro-label">
            02 / WHAT WE DO
          </span>

          <h2>
            OUR <em>SERVICES.</em>
          </h2>

          <p>
            Beautiful, functional
            interiors designed around
            your lifestyle.
          </p>
        </Reveal>

        <div
          className="arch-service-list"
          ref={servicesRef}
        >
          {services.map(
            (service, i) => (
              <a
                key={service.title}
                className="arch-service-card"
                href="#contact"
                style={{
                  "--card-tint":
                    service.tint,
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
                  <span>
                    {service.tag}
                  </span>

                  <h3>
                    {service.title}
                  </h3>

                  <Arrow size={20} />
                </div>

                <span className="service-big-no">
                  {String(
                    i + 1
                  ).padStart(2, "0")}
                </span>
              </a>
            )
          )}
        </div>

        <div className="service-foot">
          <span>
            SWIPE TO EXPLORE
            OUR SERVICES
          </span>

          <div>
            <button
              type="button"
              onClick={() =>
                shiftServices(-1)
              }
              aria-label="Scroll services left"
            >
              <Arrow direction="left" />
            </button>

            <button
              type="button"
              onClick={() =>
                shiftServices(1)
              }
              aria-label="Scroll services right"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </section>

      {/* ANIMATED NUMBERS */}

      <section className="numbers-section">
        <div className="numbers-glow" />

        <Reveal className="numbers-heading">
          <span className="micro-label">
            03 / OUR JOURNEY
          </span>

          <h2>
            OUR IMPACT
            <em> IN NUMBERS.</em>
          </h2>

          <p>
            Every project tells a story.
            Every detail makes a difference.
          </p>
        </Reveal>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card"
            >
              <span className="stat-index">
                0{i + 1}
              </span>

              <CountUp
                to={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />

              <h3>
                {stat.label}
              </h3>

              <p>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}

      <ReviewsSection />

      {/* BOOK NOW */}

      <section className="book-banner">
        <div className="book-spark">
          ✳
        </div>

        <Reveal>
          <span className="micro-label">
            05 / YOUR DREAM SPACE
          </span>

          <h2>
            LET'S MAKE
            <br />
            <em>IT REAL.</em>
          </h2>

          <p>
            From the first idea
            to the finishing detail.
          </p>

          <a
            href="#contact"
            className="book-circle"
          >
            BOOK NOW
            <Arrow size={25} />
          </a>
        </Reveal>
      </section>

      {/* ENQUIRY */}

      <section
        className="enquiry-section"
        id="contact"
      >
        <div className="enquiry-intro">
          <Reveal>
            <span className="micro-label">
              06 / SAY HELLO
            </span>

            <h2>
              HAVE AN
              <br />
              <em>IDEA?</em>
            </h2>

            <p>
              Tell us about the space
              you have in mind.
              The best interiors start
              with a conversation.
            </p>

            <a
              href={`tel:${PHONE}`}
            >
              CALL NOW
              <Arrow size={20} />
            </a>

            <span className="enquiry-location">
              ⌖ {LOCATION.toUpperCase()}
            </span>
          </Reveal>
        </div>

        <ContactForm />
      </section>

      {/* PREMIUM ACCORDION FOOTER */}

      <SaiFooter />

      {/* PHOTO LIGHTBOX */}

      {selected && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image preview"
          onClick={() =>
            setSelected(null)
          }
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() =>
              setSelected(null)
            }
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className="lightbox-body"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <img
              src={selected.image}
              alt={selected.name}
            />

            <div>
              <span>
                DESIGN INSPIRATION / DEMO
              </span>

              <h3>
                {selected.name}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
