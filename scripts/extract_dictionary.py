from pypdf import PdfReader
import re
import json
from pathlib import Path

reader = PdfReader("public/recursos/diccionarios/neryru-guarani-espanol.pdf")
raw_pages = []
# Skip cover + notes pages
for page in reader.pages[2:]:
    text = page.extract_text() or ""
    text = re.sub(r"^\s*\d+\s*", "", text)
    raw_pages.append(text)

full = "\n".join(raw_pages)
lines = []
for line in full.splitlines():
    line = line.strip()
    if not line or re.fullmatch(r"\d+", line):
        continue
    lines.append(line)

joined = []
buf = ""
entry_start = re.compile(
    r"^[A-Za-zÁÉÍÓÚÜÑáéíóúüñÃẼĨÕŨỸãẽĩõũỹÂÊÔâêôÄËÏÖÜäëïöüŸÿ'’\-]+\s*:",
    re.UNICODE,
)

skip_prefixes = (
    "DE ESPAÑOL",
    "En la versión",
    "El editor",
    "ÑE",
    "SEPTIMBRE",
    "Edición:",
    "Fuente:",
    "Visite",
    "DICCION",
)
skip_contains = ("paraguay.gov.py",)

for line in lines:
    if line.startswith(skip_prefixes) or any(s in line for s in skip_contains):
        continue
    if entry_start.match(line):
        if buf:
            joined.append(buf)
        buf = line
    elif buf:
        buf += " " + line
if buf:
    joined.append(buf)

parsed = []
for item in joined:
    m = re.match(r"^(.+?):\s*(.+)$", item)
    if not m:
        continue
    head = m.group(1).strip().lower()
    meaning = re.sub(r"\s+", " ", m.group(2).strip())
    if len(head) < 2 or len(meaning) < 1 or len(head) > 40:
        continue
    if head in {"tips", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}:
        continue
    if "versión original" in meaning or "base de datos" in meaning or len(meaning) > 220:
        continue
    parsed.append({"es": head, "gn": meaning, "dir": "es-gn"})

uniq = {e["es"]: e for e in parsed}
parsed = list(uniq.values())

reverse: dict[str, set[str]] = {}
for e in parsed:
    for part in re.split(r",\s*", e["gn"]):
        p = part.strip().rstrip(".")
        if len(p) < 2:
            continue
        reverse.setdefault(p.lower(), set()).add(e["es"])

rev_entries = [
    {"gn": gn, "es": ", ".join(sorted(es_set)), "dir": "gn-es"}
    for gn, es_set in reverse.items()
]

out = {
    "source": "Ñe'ẽryru Español–Guaraní (Portal Software Público Py / MITIC)",
    "count_es_gn": len(parsed),
    "count_gn_es": len(rev_entries),
    "es_gn": parsed,
    "gn_es": rev_entries,
}

Path("public/data").mkdir(exist_ok=True)
path = Path("public/data/dictionary.json")
path.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print("es->gn", len(parsed), "gn->es", len(rev_entries))
print("sample es", parsed[:3])
print("sample gn", rev_entries[:3])
print("file MB", round(path.stat().st_size / 1e6, 2))
