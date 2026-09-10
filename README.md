# Pizzeria Ghiottone

Sito ufficiale realizzato con React + Vite e CSS, senza backend o librerie UI. Design responsive, navigazione mobile, barra rapida, carosello di recensioni, menu esterno, orari, contatti e dati strutturati Restaurant (sottotipo LocalBusiness).

## Sviluppo

Richiede Node.js 22 e npm.

```sh
npm ci
npm run dev
```

## Build statica

```sh
npm run build
npm run preview
```

Pubblicare la cartella `dist/` su un hosting statico. `base: './'` supporta anche sottocartelle e repository GitHub Pages. Non servono variabili d’ambiente o chiavi API.

## GitHub Pages

1. Caricare il progetto su un repository GitHub con branch `main`.
2. In Settings → Pages, selezionare GitHub Actions come sorgente.
3. Il workflow `.github/workflows/deploy.yml` compila e pubblica a ogni push su `main`; può anche essere avviato manualmente.

La configurazione Vite usa percorsi relativi (`base: './'`), quindi il sito funziona sia all’indirizzo `https://utente.github.io/nome-repository/` sia su un eventuale dominio personalizzato. Il file `public/.nojekyll` viene incluso nella build per impedire l’elaborazione Jekyll degli asset.

Il sito è pronto per la pubblicazione; nessun account o repository remoto viene creato automaticamente.

## Modifiche

- `src/data.js`: telefono, Maps, recensioni, orari e categorie generiche.
- `src/menuData.js`: ordine e descrizione delle otto pagine del menu sfogliabile.
- `src/main.jsx`: componenti e testi delle sezioni. `MenuPreview` può essere sostituito con un menu interno senza modificare il resto del sito.
- `src/styles.css`: palette, tipografia, layout e breakpoint.
- `index.html`: title, description, Open Graph e JSON-LD. Aggiornare anche questi dati quando cambiano i contatti o gli orari.
- `public/images/`: logo ufficiale, fotografie autentiche e pagine del menu, ottimizzati e serviti localmente.

I font DM Sans e Barlow Condensed vengono caricati da Google Fonts; sono previsti fallback locali. La navigazione non usa tracciamento, cookie, embed Maps o backend. I link esterni aprono una nuova scheda con `noopener noreferrer`.

## Contenuti e fotografie

Le cinque recensioni e le informazioni commerciali sono quelle fornite nel brief. Il menu, il logo e le tre fotografie delle pizze sono gli asset originali forniti da Pizzeria Ghiottone. Il menu si apre nel sito, con navigazione tramite frecce, miniature, tastiera e swipe su mobile.

Prima della pubblicazione definitiva, aggiungere URL canonico e `og:url` con il dominio effettivo. Nessun dominio, ragione sociale o partita IVA è stato inventato; eventuali informazioni legali reali possono essere aggiunte al footer.

## Accessibilità e verifiche

HTML semantico, lingua italiana, skip link, focus visibile, pulsanti etichettati, navigazione richiudibile con Escape, carosello manuale scorribile con tastiera/touch e rispetto di `prefers-reduced-motion`. La build di produzione è stata verificata. Non sono stati eseguiti test visuali in un browser reale.

## Restyling brand

Palette rosso #ed1c24, nero #211f1f, bianco; titoli Barlow Condensed e testi DM Sans. Il logo ufficiale è usato nell’header e nel footer. Instagram è collegato tramite l’handle fornito nel brief.
