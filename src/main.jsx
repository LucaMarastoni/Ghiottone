import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { business, reviews, hours, menuCategories } from './data';
import { menuPages } from './menuData';
import './styles.css';

function Icon({ name, size = 22, ...props }) {
  const paths = {
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 2.7 3Z" />,
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <><path d="M5 4h14v17H5zM8 8h8M8 12h8M8 16h5"/></>,
    wheat: <><path d="m5 21 14-18M9 16c-6 0-5-6-5-6 5 0 6 3 5 6Zm4-5c-5 0-4-6-4-6 4 1 5 3 4 6Zm-4 5c1-5 7-4 7-4 0 5-4 5-7 4Zm5-6c1-5 7-4 7-4 0 5-4 5-7 4Z"/></>,
    leaf: <><path d="M20 3c0 0-16-2-16 10a7 7 0 0 0 7 7C23 20 20 3 20 3ZM4 21 16 9"/></>,
    bag: <><path d="M5 7h14l2 14H3L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
function LinkButton({ children, href, secondary = false, external = false, icon = 'arrow', onClick, ...props }) {
  const content = <>{children}<Icon name={icon} size={19}/></>;
  if (onClick) return <button className={`button ${secondary ? 'button-outline' : ''}`} type="button" onClick={onClick} {...props}>{content}</button>;
  return <a className={`button ${secondary ? 'button-outline' : ''}`} href={href} {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})} {...props}>{content}</a>;
}
function Brand({ inverted = false }) { return <img className={`brand-logo ${inverted ? 'brand-logo-inverted' : ''}`} src="./images/logo-ghiottone.png" width="225" height="225" alt="Pizzeria Ghiottone d’asporto"/>; }
function Header({ onOpenMenu }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => { const close = e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);
  return <header className="header"><div className="nav-wrap"><a className="brand-link" href="#home" aria-label="Pizzeria Ghiottone, home" onClick={() => setOpen(false)}><Brand/></a><nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navigazione principale">{[['Home','home'],['Chi siamo','chi-siamo'],['Recensioni','recensioni'],['Contatti','contatti']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<button type="button" onClick={() => { setOpen(false); onOpenMenu(); }}>Menu</button></nav><a className="nav-call button" href={business.phoneHref}><Icon name="phone" size={17}/>Chiama ora</a><button ref={toggle} className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Chiudi navigazione' : 'Apri navigazione'}><span className={open ? 'hamburger active' : 'hamburger'}><i/><i/></span></button></div></header>;
}
const pizzaSlides = ['./images/pizza-01.webp', './images/pizza-02.webp', './images/pizza-03.webp'];

function PizzaCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const show = index => setActive((index + pizzaSlides.length) % pizzaSlides.length);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActive(index => (index + 1) % pizzaSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);
  return <div className="pizza-carousel" role="region" aria-roledescription="carosello" aria-label="Pizze di Pizzeria Ghiottone" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onTouchStart={event => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={event => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1)); }}>
    <div className="pizza-carousel-track" aria-live="polite">{pizzaSlides.map((src, index) => <img key={src} className={index === active ? 'active' : ''} src={src} width="1170" height="1170" alt={index === active ? `Pizza preparata da Pizzeria Ghiottone, foto ${index + 1} di ${pizzaSlides.length}` : ''} fetchPriority={index === 0 ? 'high' : 'auto'}/>)}</div>
    <button className="pizza-arrow pizza-arrow-prev" type="button" onClick={() => show(active - 1)} aria-label="Pizza precedente"><Icon name="arrow" size={22}/></button>
    <button className="pizza-arrow pizza-arrow-next" type="button" onClick={() => show(active + 1)} aria-label="Pizza successiva"><Icon name="arrow" size={22}/></button>
    <div className="pizza-dots" aria-label="Seleziona una foto">{pizzaSlides.map((src, index) => <button key={src} className={index === active ? 'active' : ''} type="button" onClick={() => show(index)} aria-label={`Mostra foto ${index + 1}`} aria-current={index === active ? 'true' : undefined}/>)}</div>
    <div className="image-caption">Una buona serata comincia così.</div>
  </div>;
}

function Hero({ onOpenMenu }) { return <section className="hero container" id="home"><div className="hero-copy"><span className="eyebrow"><span className="small-dot"/> PIZZERIA D’ASPORTO · BASSON</span><h1>La pizza<br/>che ti fa<br/><em>tornare.</em></h1><div className="hero-buttons"><LinkButton onClick={onOpenMenu}>Scopri il menu</LinkButton><a href={business.phoneHref} className="text-call"><Icon name="phone" size={19}/><span>Chiama per ordinare<small>{business.phone}</small></span></a></div><div className="hero-note"><span>Da asporto</span><span className="small-dot"/><span>A casa tua</span><span className="note-line"/></div></div><div className="hero-visual"><PizzaCarousel/></div></section>; }
function MenuPreview({ onOpenMenu }) { return <section id="menu" className="menu-section"><div className="container menu-layout"><div className="menu-photo"><img src="./images/pizza-02.webp" alt="Una pizza preparata da Pizzeria Ghiottone" width="1170" height="1170" loading="lazy"/><span className="photo-label"><Icon name="menu" size={18}/> IL MENU GHIOTTONE</span></div><div className="menu-copy"><span className="eyebrow">C’È SEMPRE UNA BUONA SCUSA</span><h2>Cosa mangiamo<br/><em>stasera?</em></h2><p>La risposta la conosci già. Sfoglia il nostro menu e trova la pizza per la tua serata.</p><div className="category-list">{menuCategories.map((label,i) => <button key={label} type="button" onClick={() => onOpenMenu(i === 1 ? 7 : i === 2 ? 2 : 4)}><img src={`./images/pizza-0${i+1}.webp`} alt="" loading="lazy" width="400" height="400"/><span className="category-number">0{i+1}</span><span>{label}</span><Icon name="arrow"/></button>)}</div><LinkButton onClick={onOpenMenu}>Sfoglia il menu completo</LinkButton></div></div></section>; }
function Reviews() {
 const rail = useRef(null);
 const [page, setPage] = useState(0);
 const [end, setEnd] = useState(false);
 const update = () => { const el = rail.current; if (!el) return; setPage(Math.round(el.scrollLeft / (el.firstElementChild.offsetWidth + 20))); setEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5); };
 useEffect(() => { const el=rail.current; const observer = new ResizeObserver(update); observer.observe(el); return () => observer.disconnect(); }, []);
 const move = direction => { const el = rail.current; el.scrollBy({left: direction * (el.firstElementChild.offsetWidth + 20), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); };
 return <section id="recensioni" className="reviews-section container"><div className="section-heading"><div><span className="eyebrow">LE PAROLE PIÙ BELLE SONO LE VOSTRE</span><h2>Dicono <em>di noi.</em></h2></div><div className="carousel-buttons"><button aria-label="Recensioni precedenti" onClick={() => move(-1)} disabled={page === 0}><Icon name="arrow" style={{transform:'rotate(180deg)'}}/></button><button aria-label="Recensioni successive" onClick={() => move(1)} disabled={end}><Icon name="arrow"/></button></div></div><div ref={rail} onScroll={update} className="reviews-rail" tabIndex="0" aria-label="Recensioni Google, scorri per leggerle tutte">{reviews.map(r => <article className="review-card" key={r.name}><div className="stars" aria-label="5 su 5 stelle">★★★★★</div><blockquote>“{r.text}”</blockquote><div className="review-author"><span className="avatar">{r.name.split(' ').map(s=>s[0]).join('')}</span><div><strong>{r.name}</strong><small>Recensione Google</small></div><span className="google-letter" aria-hidden="true">G</span></div></article>)}</div><div className="review-bottom"><span>La pizza passa. La voglia di tornare resta.</span><span className="swipe-hint">Scorri le recensioni <Icon name="arrow" size={16}/></span></div></section>;
}
function About() { return <section id="chi-siamo" className="about-section"><div className="container about-layout"><img className="about-image" src="./images/pizza-03.webp" alt="Una pizza preparata da Pizzeria Ghiottone" width="1170" height="1170" loading="lazy"/><div><span className="eyebrow">PIACERE, GHIOTTONE.</span><h2>La tua pizzeria.<br/><em>Qui, a Basson.</em></h2></div><div className="about-copy"><p>Una pizza buona, un sorriso e la voglia di tornare. È così che ci racconta chi ci sceglie.</p><p>Un team giovane, un servizio cortese e tanta attenzione alla pizza. Per chi passa a prenderla e per chi ci aspetta a casa: siamo la pizzeria di tante serate, qui in zona.</p><a className="underlined-link" href="#contatti">Ci vediamo in pizzeria <Icon name="arrow" size={18}/></a></div></div></section>; }
function Contact() { return <section id="contatti" className="contact-section container"><div className="location"><span className="eyebrow">LA PIZZA È VICINA</span><h2>Ci trovi <em>qui.</em></h2><div className="address-block"><span className="icon-box"><Icon name="pin"/></span><div><h3>Pizzeria Ghiottone</h3><address>Via Bassone, 30a<br/>37139 Basson VR</address></div></div><LinkButton href={business.maps} external secondary icon="pin">Apri su Google Maps</LinkButton><a className="contact-phone" href={business.phoneHref}><Icon name="phone" size={19}/>{business.phone}</a></div><div className="hours"><div className="hours-title"><h3>Quando sforniamo</h3><Icon name="clock"/></div><dl>{hours.map(({day,time}) => <div key={day} className={time==='Chiuso'?'closed':''}><dt>{day}</dt><dd>{time}</dd></div>)}</dl><span className="hours-note">Ci vediamo a cena.</span></div></section>; }
function FinalCTA({ onOpenMenu }) { return <section className="final-cta"><div className="container cta-layout"><div><span className="eyebrow">LA SERATA PRENDE GUSTO</span><h2>Hai già scelto la pizza?</h2><p>Tu scegli la compagnia. Alla pizza pensiamo noi.</p></div><div className="final-buttons"><a className="final-phone" href={business.phoneHref}>045 85 11 527</a><LinkButton href={business.phoneHref} icon="phone">Chiama {business.phone}</LinkButton><button className="underlined-link menu-text-button" type="button" onClick={onOpenMenu}>Guarda il menu <Icon name="arrow" size={18}/></button></div></div></section>; }
function Footer({ onOpenMenu }) { return <><footer className="footer container"><div className="footer-top"><a className="brand-link footer-brand" href="#home" aria-label="Pizzeria Ghiottone, torna all’inizio"><Brand inverted/></a><div>Via Bassone, 30a — Basson VR<br/><a href={business.phoneHref}>{business.phone}</a></div><div>Martedì – Domenica · 18:00–21:30<br/>Lunedì chiuso</div><nav aria-label="Link nel footer"><button type="button" onClick={onOpenMenu}>Menu <span>↗</span></button><a href={business.maps} target="_blank" rel="noopener noreferrer">Google Maps <span>↗</span></a><a href="#contatti">Contatti</a><a href="https://www.instagram.com/pizzeriaghiottone/" target="_blank" rel="noopener noreferrer">@pizzeriaghiottone</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Pizzeria Ghiottone</span><span>Foto e menu originali.</span><span>Fatta per farti tornare.</span></div></footer><nav className="mobile-actions" aria-label="Azioni rapide"><button type="button" onClick={onOpenMenu}><Icon name="menu" size={20}/>Menu</button><a href={business.phoneHref}><Icon name="phone" size={20}/>Chiama</a><a href={business.maps} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={20}/>Maps</a></nav></>; }

function MenuReader({ open, initialPage = 0, onClose }) {
  const [page, setPage] = useState(initialPage);
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const previousFocus = useRef(null);
  useEffect(() => { if (open) setPage(initialPage); }, [open, initialPage]);
  useEffect(() => {
    if (!open) return undefined;
    previousFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setPage(value => Math.min(value + 1, menuPages.length - 1));
      if (event.key === 'ArrowLeft') setPage(value => Math.max(value - 1, 0));
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previousFocus.current?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  const changePage = nextPage => setPage(Math.max(0, Math.min(nextPage, menuPages.length - 1)));
  return <div className="menu-reader" role="dialog" aria-modal="true" aria-labelledby="menu-reader-title" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="menu-reader-panel">
      <header className="menu-reader-header"><div><span className="reader-kicker">PIZZERIA GHIOTTONE</span><h2 id="menu-reader-title">Il nostro menu</h2></div><div className="reader-counter" aria-live="polite">{page + 1} / {menuPages.length}</div><button ref={closeRef} className="reader-close" type="button" onClick={onClose} aria-label="Chiudi il menu">×</button></header>
      <div className="menu-page-stage" onTouchStart={event => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={event => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) changePage(page + (delta < 0 ? 1 : -1)); }}>
        <button className="reader-arrow reader-prev" type="button" onClick={() => changePage(page - 1)} disabled={page === 0} aria-label="Pagina precedente"><Icon name="arrow" size={25}/></button>
        <img className="menu-page-image" src={menuPages[page].src} alt={`Menu Ghiottone, pagina ${page + 1}: ${menuPages[page].label}`} width="891" height="1252"/>
        <button className="reader-arrow reader-next" type="button" onClick={() => changePage(page + 1)} disabled={page === menuPages.length - 1} aria-label="Pagina successiva"><Icon name="arrow" size={25}/></button>
      </div>
      <div className="reader-footer"><div className="menu-thumbnails" aria-label="Seleziona una pagina">{menuPages.map((item, index) => <button type="button" className={index === page ? 'active' : ''} key={item.src} onClick={() => changePage(index)} aria-label={`Vai a pagina ${index + 1}: ${item.label}`} aria-current={index === page ? 'page' : undefined}><img src={item.src} alt="" width="71" height="100" loading="lazy"/><span>{index + 1}</span></button>)}</div><a className="reader-call" href={business.phoneHref}><Icon name="phone" size={19}/> Ordina: {business.phone}</a></div>
    </div>
  </div>;
}

function App() {
  const [menuState, setMenuState] = useState({ open: false, page: 0 });
  const openMenu = (page = 0) => setMenuState({ open: true, page: typeof page === 'number' ? page : 0 });
  const closeMenu = () => setMenuState(state => ({ ...state, open: false }));
  return <><a className="skip-link" href="#main">Vai al contenuto</a><Header onOpenMenu={openMenu}/><main id="main"><Hero onOpenMenu={openMenu}/><MenuPreview onOpenMenu={openMenu}/><Reviews/><About/><Contact/><FinalCTA onOpenMenu={openMenu}/></main><Footer onOpenMenu={openMenu}/><MenuReader open={menuState.open} initialPage={menuState.page} onClose={closeMenu}/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
