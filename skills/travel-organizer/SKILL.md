---
name: travel-organizer
description: >
  Use this skill whenever the user asks about travel planning, trip organization, travel folders,
  or managing travel-related content across Google Drive and Notion. Triggers include: viewing or
  summarizing trip folders in Google Drive, organizing or restructuring travel pages in Notion
  (creating year folders, moving destinations, building itineraries), reading travel documents
  (flights, hotels, itineraries, entry documents), creating KML map files for trips, or any request
  involving trips — past, current, or upcoming. Also use when the user mentions specific
  destinations, trip names, or references their "travels" structure. Content may be in Swedish or
  English — handle both naturally.
---

# Travel Organizer Skill

This project is a **personal travel planning and archiving system** for Anders (& Annicka) Harby.
Travel data lives across two systems: **Google Drive** (raw documents, PDFs, bookings, KML maps) and
**Notion** (structured trip pages, organized by destination and year).

---

## Connected Tools

| Tool | Purpose |
|---|---|
| Google Drive | Travel folders with documents: hotels, flights, itineraries, entry docs, KML maps |
| Notion | Structured travel database with past/upcoming trips organized by year |
| Gmail | Booking confirmations, correspondence with travel operators |
| Google Calendar | Trip dates, flight times, reminders |

> Google Photos is **not** accessible. If the user wants to share a photo, ask them to upload it directly or move it to Google Drive first.

---

## Known Structure

### Google Drive
Root travel folder: `12QhYmaULmX8QnZVZSVqoTpFvNOQv2Ugl`

For multi-stop road trips, the trip folder uses numbered sub-folders per stop:
- `1 Arlanda` — Pre-trip overnight at airport hotel
- `2 [City]` — First destination (may include a "Hotell" subfolder)
- `3 [City]` — Second destination
- etc.
- `Noteringar` — Planning notes

For single-destination trips, typical sub-folder naming (often in Swedish):
- `1 Hotell ny` — Hotels
- `2 Flyg viktigt` — Important flights
- `3 [Destination] bokad` — Bookings confirmed
- `4/5 Viktiga dokument` — Important documents (flights, entry)
- `15 Att göra per destination` — Things to do per destination
- `Viktiga lärdomar` — Lessons learned / post-trip notes
- `000 A utvärdering` — Trip evaluation/review

KML map files are stored in a **central, dedicated KML folder** — NOT inside individual trip folders:
- **Central KML folder:** https://drive.google.com/drive/folders/1FPz2gvw9QSAiCoyR_LtBGte99Ih4HcnI (ID: `1FPz2gvw9QSAiCoyR_LtBGte99Ih4HcnI`)
- Year subfolders inside it: e.g. `2025` → ID `1wPK6hGLoWbGC0t360OBWVwyyEY_ISEsj`
- File naming: `[Destination]_Karta_[Year].kml`

### Notion
Travel pages are organized under a **Travels** section:
- **Done** → **📅 2025** (year folder) → destination pages
- **Done** → **📅 2026** (year folder) → destination pages
- **Upcoming** → future trips

The 2025 year folder has Notion ID: `354e3c20a8ee81928b1ef344f4018977`

Destination page naming convention: `🇯🇵 Japan 2025`, `🏅 Milano Cortina 2026 – Winter Olympics`, etc.

Destination pages follow this standard structure (Glasgow 2025 is the reference page):
1. Byline: `**Anders Harby | [Dates]**`
2. `## 🗺️ Trip Overview` — table with destination, airline, booking code, duration
3. `## ✈️ Flights` — table with all flight legs, dates, times, seats
4. `## 🏨 Hotel` (or Hotels for multi-stop) — table with name, address, phone, stay dates, conf. #, price
5. `## 🗺️ Map` — link to KML file in Google Drive
6. `## 💳 Practical Information` — bullet points (adapter, currency, transport, weather)
7. Day-by-day sub-pages (optional, for detailed itineraries)

---

## Workflows

### Viewing a Drive Folder
1. Use `Google Drive:search_files` with `parentId = '<folder_id>'`
2. Summarize contents by category (hotels, flights, docs, etc.)
3. Offer to dive into specific sub-folders

### Creating a Notion Trip Page
1. Fetch the Glasgow 2025 page (`354e3c20a8ee819cb53ecd5660d7ed2f`) as a format reference
2. Create the page under the correct year folder using `Notion:notion-create-pages`
3. Parent for 2025 trips: `page_id = 354e3c20a8ee81928b1ef344f4018977`
4. Use the flag emoji of the destination country as the page icon
5. After creating the page, add a link to the KML file in the `## 🗺️ Map` section

### Creating a KML Map File
1. Collect all key locations: hotels (addresses + coordinates), airports, stations, notable stops
2. Use two marker styles:
   - `hotelIcon` — blue circle for hotels and accommodation
   - `activityIcon` — green circle for airports, stations, and points of interest
3. Build the KML using the template below
4. Name the file: `[Destination]_Karta_[Year].kml` (e.g. `Wales_UK_Karta_2025.kml`)
5. Write to `/home/claude/` using `create_file`, then upload via `Google Drive:create_file` to the correct year subfolder in the central KML folder (e.g. for 2025: parentId `1wPK6hGLoWbGC0t360OBWVwyyEY_ISEsj`)
6. In the Notion page under `## 🗺️ Map`, add a link to the **central KML folder** (not to the individual file): `[KML Map Files – Google Drive](https://drive.google.com/drive/folders/1FPz2gvw9QSAiCoyR_LtBGte99Ih4HcnI)`

#### KML Template
```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>[Trip Name]</name>
    <description>[Traveller] | [Dates]</description>

    <Style id="hotelIcon">
      <IconStyle>
        <color>ff0000ff</color>
        <scale>1.2</scale>
        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/blu-circle.png</href></Icon>
      </IconStyle>
      <LabelStyle><scale>1.0</scale></LabelStyle>
    </Style>

    <Style id="activityIcon">
      <IconStyle>
        <color>ff00ff00</color>
        <scale>1.1</scale>
        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon>
      </IconStyle>
      <LabelStyle><scale>1.0</scale></LabelStyle>
    </Style>

    <Placemark>
      <name>[Location Name]</name>
      <description><![CDATA[
        <b>[Name]</b><br/>
        [Address]<br/>
        Tel: [Phone]<br/><br/>
        <b>Stay:</b> [Dates] – Conf. [Number]<br/>
        Check-in from [Time] | Check-out by [Time]
      ]]></description>
      <styleUrl>#hotelIcon</styleUrl>
      <Point><coordinates>[lng],[lat],0</coordinates></Point>
    </Placemark>

  </Document>
</kml>
```

> Coordinates are `longitude,latitude,0`. Use 4 decimal places. Use knowledge of well-known locations; for hotels, estimate from the street address.

---

### ⚠️ Concatenating Multiple KML Files into a Summary Map
> **This is a separate, standalone procedure — NOT part of the workflow for creating a new destination page.**
> Only run this when explicitly requested by the user.

1. **List files** in the source folder using `Google Drive:search_files` with `mimeType = 'application/vnd.google-earth.kml+xml'`
2. **Download all files** using `Google Drive:download_file_content` — returns base64-encoded content
3. **Build the combined KML in one Python script** via `bash_tool`:
   - Decode each base64 string
   - Extract all `<Placemark>` blocks using regex (`re.findall(r'<Placemark>.*?</Placemark>', xml, re.DOTALL)`)
   - Wrap each trip's placemarks in a `<Folder>` with the trip name and dates
   - Output a single KML document with shared styles at the top
4. **Upload** using `Google Drive:create_file` with `textContent`, `contentMimeType = application/vnd.google-earth.kml+xml`, and `disableConversionToGoogleType = true`

#### Python Script Pattern
```python
import base64
import xml.etree.ElementTree as ET

KML_NS = 'http://www.opengis.net/kml/2.2'
ET.register_namespace('', KML_NS)  # Register once at module level

files = [
    ("Trip Name", "Dates", "base64_content_string"),
    # ...
]

def extract_placemarks(b64):
    xml_str = base64.b64decode(b64).decode('utf-8')
    root = ET.fromstring(xml_str)
    return [
        ET.tostring(pm, encoding='unicode')
        for pm in root.findall(f'.//{{{KML_NS}}}Placemark')
    ]

out = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<kml xmlns="http://www.opengis.net/kml/2.2">',
       '  <Document>',
       '    <name>Summary Map Title</name>',
       # shared styles (hotelIcon, activityIcon, venueIcon, airportIcon)
       '']

for name, dates, b64 in files:
    placemarks = extract_placemarks(b64)
    out.append(f'    <Folder>')
    out.append(f'      <name>{name}</name>')
    out.append(f'      <description>{dates}</description>')
    for pm in placemarks:
        out.append('    ' + pm.strip())
    out.append('    </Folder>')
    out.append('')

out += ['  </Document>', '</kml>']

with open('/home/claude/Summary.kml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
```

- File naming convention: `All_Trips_Summary_[Year].kml`
- Upload to the same folder the source KML files are in

### Organizing Notion Trip Pages
1. Use `Notion:notion-search` or `Notion:notion-fetch` to find current structure
2. Propose a clear reorganization plan — show it as a table before acting
3. Get user confirmation before making changes
4. Use `Notion:notion-create-pages` for new folders/pages
5. Use `Notion:notion-move-pages` to restructure

### Reading Travel Documents
1. Use `Google Drive:read_file_content` for text-based docs
2. Use `Google Drive:download_file_content` for PDFs (then parse)
3. Summarize key info: dates, hotel names, confirmation numbers, addresses

### Cross-referencing
- If the user asks about a trip, check **both** Drive (raw docs) and Notion (structured overview)
- For upcoming trips, also check Google Calendar for scheduled dates

---

## Language Notes
- Folder and document names are often in **Swedish** — translate naturally when summarizing
- Some documents (especially Japan-related) include content in **Japanese** — provide English translations alongside
- Respond in the same language the user uses (typically English)

---

## Key Trips on Record
- 🏴󠁧󠁢󠁷󠁬󠁳󠁿 **Wales & UK 2025** — Mar 14–Apr 3, road trip: Cardiff, Brecon, Rhayader, Llandudno, Liverpool, London
- 🇯🇵 **Japan 2025** — Oct 26–Nov 9, guided Albatros tour, 5 cities (Tokyo, Kyoto, Hiroshima, Kagoshima, Osaka)
- 🏅 **Milano Cortina 2026** — Winter Olympics
- 🇩🇪 **Bayern 2026** — April 2026
- 🇮🇸 **Iceland – Reykjavik 2025** — Apr 10–13
- 🏴󠁧󠁢󠁳󠁣󠁴󠁿 **Glasgow 2025** — Jan 23–28
- 🇨🇭 **Schweiz – Genève 2025**
- 🇮🇹 **Toscana – New Year 2025** (departed Dec 30, 2024)
