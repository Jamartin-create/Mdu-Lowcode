interface ImportMetaEnv {
    readonly VITE_MODE_NAME: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_ROUTER_MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}