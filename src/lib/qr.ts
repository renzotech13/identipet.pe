import QRCode from "qrcode";

/** Genera un código QR como data URL (PNG) para incrustar en <img src>. */
export async function qrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 240,
    margin: 2,
    color: { dark: "#1e2a52", light: "#ffffff" },
  });
}
