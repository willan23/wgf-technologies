from PIL import Image
import numpy as np
from pathlib import Path

src = Path(r"W:\sites\WGF Tecnologies\Gemini_Generated_Image_ajqxskajqxskajqx_compressed.png")
out = Path(r"W:\sites\WGF Tecnologies\public\wgf-symbol-cutout.png")

im = Image.open(src).convert("RGBA")
arr = np.array(im)
rgb = arr[:, :, :3].astype(np.float32)
r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
brightness = (r + g + b) / 3.0
saturation = np.max(rgb, axis=2) - np.min(rgb, axis=2)

bg = (brightness > 170) & (saturation < 28)
bg |= (brightness > 210) & (saturation < 40)

alpha = arr[:, :, 3].astype(np.float32)
alpha[bg] = 0

out_im = Image.fromarray(
    np.dstack([arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], alpha.astype(np.uint8)]),
    "RGBA",
)

bbox = out_im.getbbox()
if bbox:
    x0, y0, x1, y1 = bbox
    pad = 12
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(out_im.width, x1 + pad)
    y1 = min(out_im.height, y1 + pad)
    out_im = out_im.crop((x0, y0, x1, y1))

# Crop text area below symbol if remaining (bottom ~28%)
# Heuristic: keep upper part where the network mark sits
h = out_im.height
symbol = out_im.crop((0, 0, out_im.width, int(h * 0.62)))

side = max(symbol.size)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
ox = (side - symbol.width) // 2
oy = (side - symbol.height) // 2
canvas.paste(symbol, (ox, oy), symbol)
canvas.save(out, optimize=True)
print("saved", out, canvas.size)
