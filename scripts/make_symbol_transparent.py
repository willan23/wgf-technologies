"""Remove checkerboard/fake-transparency background; keep only the WGF symbol."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

SRC = Path(r"W:\sites\WGF Tecnologies\public\wgf-symbol-3d.png")
OUT = Path(r"W:\sites\WGF Tecnologies\public\wgf-symbol-3d.png")
OUT_BACKUP = Path(r"W:\sites\WGF Tecnologies\public\wgf-symbol-3d-checker.png")

im = Image.open(SRC).convert("RGB")
# backup original with checker if not already backed up
if not OUT_BACKUP.exists():
    im.save(OUT_BACKUP)

arr = np.array(im).astype(np.float32)
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
mx = np.maximum(np.maximum(r, g), b)
mn = np.minimum(np.minimum(r, g), b)
sat = mx - mn
bright = (r + g + b) / 3.0

# Checkerboard / neutral flat background: low saturation + fairly bright
bg = (sat < 22) & (bright > 155)
# also pure-ish whites
bg |= (bright > 235) & (sat < 35)

# Core logo: colorful strokes
logo_core = sat > 28

# Expand core so soft drop-shadows near the mark are kept
core_mask = Image.fromarray((logo_core.astype(np.uint8) * 255), mode="L")
core_dilated = core_mask.filter(ImageFilter.MaxFilter(9))
near_core = np.array(core_dilated) > 0

# Keep colorful pixels OR darker pixels that sit next to the logo (shadows)
shadow = near_core & (bright < 170) & (sat < 40)
keep = logo_core | shadow
keep &= ~((sat < 18) & (bright > 190))  # hard reject bright checker leftovers

alpha = np.where(keep, 255, 0).astype(np.uint8)

# Soften silhouette
alpha_img = Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(0.8))
alpha = np.array(alpha_img)

rgba = np.dstack([arr.astype(np.uint8), alpha])
out = Image.fromarray(rgba, "RGBA")

bbox = out.getbbox()
if bbox:
    x0, y0, x1, y1 = bbox
    pad = 24
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(out.width, x1 + pad)
    y1 = min(out.height, y1 + pad)
    cropped = out.crop((x0, y0, x1, y1))
else:
    cropped = out

side = max(cropped.size)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(cropped, ((side - cropped.width) // 2, (side - cropped.height) // 2), cropped)
canvas.save(OUT, optimize=True)
print("saved", OUT, canvas.size, "mode", canvas.mode)
print("transparent pct", float((np.array(canvas)[:, :, 3] < 5).mean() * 100))
