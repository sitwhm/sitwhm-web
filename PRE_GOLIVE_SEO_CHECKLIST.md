# Pre-Golive SEO Checklist

Diese Änderungen wurden bewusst für die Staging-Phase eingebaut, um eine Indexierung durch Suchmaschinen zu verhindern. **Vor dem Go-Live müssen alle Punkte rückgängig gemacht werden.**

---

## Pflicht: Vor Go-Live rückgängig machen

### 1. `public/robots.txt` wiederherstellen

**Datei:** `public/robots.txt`

Inhalt ersetzen durch:

```
User-agent: *
Allow: /

Sitemap: https://sitwhm.de/sitemap.xml
```

---

### 2. Passwort-Gate deaktivieren

**Datei:** `.gitlab-ci.yml`

Diese Zeilen entfernen:

```yaml
  variables:
    # TODO GOLIVE: Remove this variable - disables the password gate automatically on production (GitHub)
    NEXT_PUBLIC_PREVIEW_PASSWORD_HASH: "ebc244c879199d8d0e4e958e9838c1bf6dd2ede60b5e4a05771116919bfbff42"
```

> Das Gate ist auf GitHub/Produktion automatisch inaktiv, solange die Variable nicht gesetzt ist. Trotzdem sauber entfernen.

---

### 3. `noindex` Meta-Tag aus Layout entfernen

**Datei:** `app/layout.tsx`

Diese Zeile entfernen (inkl. Kommentar):

```tsx
{/* TODO GOLIVE: Remove this meta tag - staging-only, blocks all search indexing */}
<meta name="robots" content="noindex, nofollow" />
```

---

## Empfohlen: Nach Go-Live einrichten

- [ ] Google Search Console: Property für `sitwhm.de` anlegen und verifizieren
- [ ] Sitemap bei Google einreichen: `https://sitwhm.de/sitemap.xml`
- [ ] Bing Webmaster Tools: Property anlegen + Sitemap einreichen
- [ ] Open Graph Bild (`/og-image.jpg`) prüfen - tatsächlich vorhanden?
- [ ] Lighthouse SEO Score checken (Ziel: 100)
- [ ] Core Web Vitals in Search Console beobachten (erste Daten nach ~4 Wochen)

---

> Erstellt: 2026-04-02 | Grund: Staging-Preview sollte nicht öffentlich indexiert werden
