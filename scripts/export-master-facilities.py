# Export MoHS master facility list (.numbers → JSON for Find a Facility)

# Usage:
#   python3 scripts/export-master-facilities.py

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

from numbers_parser import Document

NUMBERS_PATH = Path.home() / "Documents" / "master_facility_list.numbers"
OUT_PATH = Path(__file__).resolve().parents[1] / "frontend" / "src" / "data" / "masterFacilities.json"

DISTRICT_BY_PREFIX = {
    "WAU": ("western-urban", "Western Area Urban"),
    "WAR": ("western-rural", "Western Area Rural"),
    "BOO": ("bo", "Bo"),
    "BOM": ("bombali", "Bombali"),
    "BON": ("bonthe", "Bonthe"),
    "KAI": ("kailahun", "Kailahun"),
    "KAM": ("kambia", "Kambia"),
    "KEN": ("kenema", "Kenema"),
    "KOI": ("koinadugu", "Koinadugu"),
    "KON": ("kono", "Kono"),
    "MOY": ("moyamba", "Moyamba"),
    "PLT": ("port-loko", "Port Loko"),
    "PUJ": ("pujehun", "Pujehun"),
    "TON": ("tonkolili", "Tonkolili"),
    "KAR": ("karene", "Karene"),
    "FAL": ("falaba", "Falaba"),
}

GOV_KNOWN = {
    "connaught hospital",
    "ola during children's hospital",
    "ola during childrens hospital",
    "princess christian maternity hospital",
    "bo childrens hospital",
    "bo children's hospital",
    "kingharman road hospital",
    "kingtom police hospital",
    "pademba correctional hospital",
    "njaluahun military hospital",
    "njala university hospital",
    "government maternity and children’s hospital hangha",
    "government maternity and children's hospital hangha",
}

FAITH_KW = re.compile(
    r"mission|catholic|adventist|church|faith|holy|st\.?\s|saint |baptist|methodist|"
    r"islamic|muslim|ahmadi|christian|jesus|mary|spirit|salvation|pentecost|"
    r"presbyterian|anglican|adra|umc\b|cms\b|wesleyan|ubc\b|good shepherd|"
    r"samaritan|mercy ships|new hope|lion heart|masanga|serabu|nixon|panguma",
    re.I,
)
GOV_KW = re.compile(
    r"government|\bgov\b|military|police|correctional|national referral|university hospital",
    re.I,
)
PRIV_KW = re.compile(
    r"private|memorial|foundation|choithram|willoughby|aberdeen women|ami |ahf|"
    r"blue shield|branda|davidson|edemsil|gilas|kindoya|life care|love bridge|"
    r"magbenteh|mariposa|nactib|paul sorie|shuman|abernita|emergency \(goderich\)|"
    r"henry kormoi|gbaneh|dasse|daru field|mamasa|mariama",
    re.I,
)


def categorize(name: str) -> str:
    nl = name.strip().lower()
    if re.search(r"\bmchp\b|\bphu\b", nl):
        return "phu"
    if re.search(r"\bchp\b|community health post", nl):
        return "chp"
    if re.search(r"\bchc\b|community health cen", nl):
        return "chc"
    if "hospital" in nl:
        if GOV_KW.search(nl) or nl in GOV_KNOWN:
            return "gov-hospital"
        if FAITH_KW.search(nl) or PRIV_KW.search(nl):
            return "private-mission"
        return "private-mission"
    if re.search(r"clinic|health centre|health center|dispensary", nl):
        return "private-mission"
    return "phu"


def main() -> None:
    doc = Document(str(NUMBERS_PATH))
    table = doc.sheets[0].tables[0]
    facilities = []
    counts: Counter[str] = Counter()

    for r in range(1, table.num_rows):
        id_, code, name, _level, lng, lat = [table.cell(r, c).value for c in range(6)]
        if not name:
            continue
        name = str(name).strip()
        code = str(code or "").strip()
        try:
            lat_f = float(lat)
            lng_f = float(lng)
        except (TypeError, ValueError):
            continue
        prefix = code[:3].upper() if code else ""
        district, district_label = DISTRICT_BY_PREFIX.get(prefix, ("other", "Other"))
        cat = categorize(name)
        counts[cat] += 1
        facilities.append(
            {
                "id": str(id_ or f"row-{r}"),
                "code": code,
                "name": name,
                "type": cat,
                "district": district,
                "districtLabel": district_label,
                "lat": round(lat_f, 6),
                "lng": round(lng_f, 6),
            }
        )

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(facilities, ensure_ascii=False, separators=(",", ":")))
    print(f"Wrote {len(facilities)} facilities → {OUT_PATH}")
    print("Categories:", dict(counts))


if __name__ == "__main__":
    main()
