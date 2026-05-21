import Database from "better-sqlite3";
const db = new Database("C:/Users/ghadi.mdallal/AppData/Roaming/Cursor/User/globalStorage/state.vscdb", { readonly: true });
const keys = [
  'secret://{"extensionId":"anysphere.cursor-mcp","key":"[project-0-cookie-dough-solutions-higgsfield] mcp_tokens"}',
  'secret://{"extensionId":"anysphere.cursor-mcp","key":"[plugin-higgsfield-higgsfield] mcp_tokens"}'
];
for (const key of keys) {
  const row = db.prepare("SELECT value FROM ItemTable WHERE key = ?").get(key);
  console.log(key.split('key":"')[1].split('"')[0], row ? 'found' : 'missing');
}
