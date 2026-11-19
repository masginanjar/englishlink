"""Siapkan foto hero: python3 tools/prep-hero.py foto1.jpg foto2.jpg foto3.jpg
Foto studio (orang di tengah, latar polos) digeser ke kanan dengan memperpanjang latar di kiri,
lalu disimpan sebagai WebP. Warna latar dicatat supaya menyatu dengan slide."""
import sys, json
import numpy as np
from PIL import Image, ImageFilter
PAD, CROP_R, OUT_W = 860, 260, 1800
out = []
for n, f in enumerate(sys.argv[1:4], 1):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    s = w / 1920
    pad, crop = round(PAD * s), round(CROP_R * s)
    a = np.asarray(im).astype(np.float32)
    col = a[:, :40].mean(axis=1, keepdims=True)                      # warna tepi kiri per baris
    col = np.asarray(Image.fromarray(col.astype(np.uint8)).filter(ImageFilter.GaussianBlur(12))).astype(np.float32)
    fill = np.repeat(col, pad, axis=1)
    body = a[:, : w - crop].copy()
    k = 160                                                           # baur sambungan
    alpha = np.linspace(0, 1, k)[None, :, None]
    body[:, :k] = np.repeat(col, k, axis=1) * (1 - alpha) + body[:, :k] * alpha
    full = Image.fromarray(np.concatenate([fill, body], axis=1).astype(np.uint8))
    full = full.resize((OUT_W, round(full.height * OUT_W / full.width)), Image.LANCZOS)
    r, g, b = [int(v) for v in np.asarray(full)[:, :200].reshape(-1, 3).mean(axis=0)]
    lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    full.save(f'src/img/hero-{n}.webp', 'WEBP', quality=82, method=6)
    out.append({'file': f'hero-{n}.webp', 'bg': '#%02x%02x%02x' % (r, g, b), 'light': lum > 0.45, 'w': full.width, 'h': full.height})
json.dump(out, open('src/img/hero.json', 'w'), indent=1)
print(out)
