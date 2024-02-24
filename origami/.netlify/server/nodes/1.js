

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Bub0XWau.js","_app/immutable/chunks/scheduler.BbV0vdhS.js","_app/immutable/chunks/index.C1gd8lir.js","_app/immutable/chunks/entry.D5E101tR.js"];
export const stylesheets = [];
export const fonts = [];
