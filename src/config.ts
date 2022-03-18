export const isLiveReloadEnabled = () => !!Deno.env.get("ENABLE_LIVE_RELOAD");
export const isDev = () => !!Deno.env.get("ENABLE_LIVE_RELOAD");
