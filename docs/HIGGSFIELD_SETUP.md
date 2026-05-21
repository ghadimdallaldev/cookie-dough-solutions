# Higgsfield setup (Cookie Dough site)

Image generation for marketing heroes uses the **Higgsfield** Cursor plugin. Auth is tied to your **Cursor account**, not this repo — the same login works in `supplify_erp` and `cookie-dough-solutions` once connected.

## 1. Enable the plugin (this workspace)

This folder includes:

- `.cursor/settings.json` — enables the Higgsfield plugin
- `.cursor/mcp.json` — points at `https://mcp.higgsfield.ai/mcp`

**Open this folder as the Cursor workspace root** (File → Open Folder → `cookie-dough-solutions`), not only as a nested path inside another project.

## 2. Connect / re-authenticate

1. **Cursor Settings** → **MCP & Integrations**
2. Find **Higgsfield** (or `higgsfield` / `plugin-higgsfield-higgsfield`)
3. If status is red or tools return **User not found**:
   - Click **Connect** / **Sign in** / **Reconnect**
   - Complete OAuth in the browser (Higgsfield account)
4. Confirm a **green** connected indicator

Also check **Settings → Plugins** → **Higgsfield** is installed and enabled.

## 3. Verify in chat

Ask the agent:

```text
/higgs How many credits do I have?
```

Or: *“Call Higgsfield balance tool.”*

If that works, image generation for the site will work too.

## 4. Reload if needed

`Cmd/Ctrl + Shift + P` → **Developer: Reload Window**

## 5. After images are generated

Save downloads into:

```text
public/images/hero-cookie-dough.jpg
public/images/hero-supplify.jpg
public/images/scene-partnership.jpg
```

The site references these paths; until they exist, CSS gradients are used as fallback.

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| `User not found` | Reconnect MCP OAuth (step 2) |
| MCP server missing | Open `cookie-dough-solutions` as workspace root; reload window |
| Plugin disabled | Enable Higgsfield under Settings → Plugins |
| No credits | Higgsfield → Plans / top-up in app or via `/higgs` |

Official docs: [higgsfield.ai/mcp](https://higgsfield.ai/mcp) · [cursor-plugin README](https://github.com/higgsfield-ai/cursor-plugin)
