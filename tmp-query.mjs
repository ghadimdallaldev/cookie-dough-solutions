import Database from "better-sqlite3";
const db = new Database("C:/Users/ghadi.mdallal/AppData/Roaming/Cursor/User/globalStorage/state.vscdb", { readonly: true });
const rows = db.prepare("SELECT key FROM ItemTable WHERE key LIKE '%higgs%' OR key LIKE '%plugin-higgsfield%' OR key LIKE '%mcp%' LIMIT 80").all();
for (const r of rows) console.log(r.key);
