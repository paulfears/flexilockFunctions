import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.B08t6oNc.js","_app/immutable/chunks/scheduler.BbV0vdhS.js","_app/immutable/chunks/index.C1gd8lir.js"];
export const stylesheets = [];
export const fonts = [];
