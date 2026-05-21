import Database from "better-sqlite3";
const db = new Database("C:/Users/ghadi.mdallal/AppData/Roaming/Cursor/User/globalStorage/state.vscdb", { readonly: true });
const key = 'secret://{"extensionId":"anysphere.cursor-mcp","key":"[url:aHR0cHM6Ly9tY3AuaGlnZ3NmaWVsZC5haS9tY3A] mcp_tokens"}';
const row = db.prepare("SELECT value FROM ItemTable WHERE key = ?").get(key);
if (!row) { console.log('NO_ROW'); process.exit(1); }
const v = row.value.toString();
// print only whether access_token exists, not full token
try {
  const j = JSON.parse(v);
  console.log('keys:', Object.keys(j));
  console.log('has_access:', !!j.access_token);
  console.log('expires:', j.expires_in || j.expiry || 'n/a');
} catch {
  console.log('value_len', v.length, 'prefix', v.slice(0,20));
}
