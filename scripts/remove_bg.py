from PIL import Image
from collections import deque
import os

src = r"C:\Users\Usuario\.cursor\projects\c-Users-Usuario-Documents-Git-aprendiendoguarani\assets\c__Users_Usuario_AppData_Roaming_Cursor_User_workspaceStorage_0cb6ee9feef5e098edff03450e4d4847_images_image-960c6d41-975d-419a-a418-4ec988957456-5110fb26-9315-4997-b792-bbd72e8e9ea0.jpg"
out = r"c:\Users\Usuario\Documents\Git\aprendiendoguarani\public\images\yaguarete.png"

img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size


def is_bg(r, g, b, a=255):
    if a < 10:
        return True
    # white / near-white
    if min(r, g, b) >= 245:
        return True
    if min(r, g, b) >= 232 and abs(r - g) < 10 and abs(g - b) < 10:
        return True
    # light tan ground shadow under paws
    mx, mn = max(r, g, b), min(r, g, b)
    if mn >= 195 and mx >= 215 and (mx - mn) <= 45 and r >= g >= b - 5:
        return True
    if mn >= 180 and mx <= 235 and (r - b) <= 40 and (r - b) >= 8 and abs(r - g) <= 25:
        # soft beige / cream
        return True
    return False


mask = Image.new("L", (w, h), 0)
mp = mask.load()
q = deque()
dirs = ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, 1), (1, -1), (-1, -1))

for x in range(w):
    for y in (0, h - 1):
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b, a):
            q.append((x, y))
            mp[x, y] = 255
for y in range(h):
    for x in (0, w - 1):
        if mp[x, y]:
            continue
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b, a):
            q.append((x, y))
            mp[x, y] = 255

while q:
    x, y = q.popleft()
    for dx, dy in dirs:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and mp[nx, ny] == 0:
            r, g, b, a = pixels[nx, ny]
            if is_bg(r, g, b, a):
                mp[nx, ny] = 255
                q.append((nx, ny))

out_px = img.copy()
op = out_px.load()
for y in range(h):
    for x in range(w):
        if mp[x, y] == 255:
            r, g, b, _ = op[x, y]
            op[x, y] = (r, g, b, 0)

# Soften white fringe next to transparency (don't eat interior white markings)
for _ in range(3):
    changed = False
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            r, g, b, a = op[x, y]
            if a == 0:
                continue
            near_t = any(op[x + dx, y + dy][3] == 0 for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))
            if not near_t:
                continue
            # near-white fringe
            if min(r, g, b) >= 238:
                op[x, y] = (r, g, b, 0)
                changed = True
                continue
            # light tan fringe under feet
            if min(r, g, b) >= 190 and max(r, g, b) <= 240 and (r - b) >= 5:
                op[x, y] = (r, g, b, 0)
                changed = True
    if not changed:
        break

bbox = out_px.getbbox()
if bbox:
    pad = 4
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    out_px = out_px.crop((left, top, right, bottom))

out_px.save(out, "PNG", optimize=True)
print("saved", out, out_px.size, os.path.getsize(out))
