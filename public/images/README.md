# Higgsfield images for this site

Generate in Cursor with **/higgs** (Higgsfield must be connected in Settings → MCP).

## 1. Cookie Dough hero → `hero-cookie-dough.jpg`

> Cinematic wide hero, golden hour in a modern restaurant kitchen, chef and manager reviewing orders on a tablet, fresh ingredients, shallow depth of field, warm caramel tones, editorial advertising photography, no text, 16:9

## 2. Supplify hero → `hero-supplify.jpg`

> Cinematic hero, restaurant back-of-house meeting supplier delivery, fresh produce crates, subtle violet accent light, trustworthy B2B mood, editorial photography, no text, 16:9

## 3. Kitchen scene → `scene-kitchen.jpg`

> Elegant restaurant dining room at service, warm ambient light, editorial, no text, 16:9

## 4. Supply scene → `scene-supply.jpg`

> Food supplier warehouse, organized shelves, morning light, editorial, no text, 16:9

## Download into the repo

1. Open each result in Higgsfield and copy the **rawUrl**.
2. Paste URLs into `manifest.json` (same filenames as above).
3. Run:

```bash
npm run assets:sync
```

Refresh the site — heroes load from `public/images/` only (no stock photos).
