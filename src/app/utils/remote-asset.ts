// src/app/utils/remote-asset.ts
declare const __webpack_public_path__: string;

/**
 * Build a full asset URL that resolves relative to the remote's origin.
 * Example: remoteAsset('logo.png') → http://localhost:4201/assets/logo.png
 */
export function remoteAsset(path: string): string {
  return __webpack_public_path__ + "assets/" + path;
}
