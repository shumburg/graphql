import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://humburg.net",
];

function setCors(req, res) {
  const origin = req.headers.origin;

  // Set CORS headers BEFORE checking method
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "3600");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  return false;
}

export default async function handler(req, res) {
  // CORS must be first
  if (setCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const prompt = "Du bist ein professioneller Leveldesigner für ein Puzzle-Spiel.\n" +
      "\n" +
      "# AUFGABE\n" +
      "\n" +
      "Entwirf genau EINEN spielbaren Level.\n" +
      "\n" +
      "Der Level besteht aus einem Raster mit:\n" +
      "\n" +
      "- 22 Spalten\n" +
      "\n" +
      "- 13 Zeilen\n" +
      "\n" +
      "Das Raster besitzt daher exakt 286 Felder.\n" +
      "\n" +
      "Arbeite intern immer zeilenweise.\n" +
      "\n" +
      "Erzeuge zuerst ein Raster mit genau 13 Zeilen.\n" +
      "\n" +
      "Jede Zeile MUSS genau 22 Zeichen besitzen.\n" +
      "\n" +
      "Erst wenn alle 13 Zeilen korrekt sind, verbindest du sie ohne Zeilenumbrüche zu einem einzigen String.\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# SPIELELEMENTE\n" +
      "\n" +
      "**Punkte (nur mit passender Ballfarbe)**\n" +
      "\n" +
      "- B = Blauer Punkt (Punkte nur wenn Ball blau ist)\n" +
      "\n" +
      "- D = Grüner Punkt (Punkte nur wenn Ball grün ist)\n" +
      "\n" +
      "- E = Gelber Punkt (Punkte nur wenn Ball gelb ist)\n" +
      "\n" +
      "**Farbwechsler**\n" +
      "\n" +
      "- J = Wechsel zu Blau\n" +
      "\n" +
      "- K = Wechsel zu Grün\n" +
      "\n" +
      "- L = Wechsel zu Gelb\n" +
      "\n" +
      "**Lebenskostend**\n" +
      "\n" +
      "- C = Roter Stein (kostet 1 Leben)\n" +
      "\n" +
      "**Bewegliche Felder (nur mit passender Ballfarbe)**\n" +
      "\n" +
      "- T = Bewegliches Feld (bewegt sich nur wenn Ball blau ist)\n" +
      "\n" +
      "- U = Bewegliches Feld (bewegt sich nur wenn Ball grün ist)\n" +
      "\n" +
      "- V = Bewegliches Feld (bewegt sich nur wenn Ball gelb ist)\n" +
      "\n" +
      "**Barrieren (nur mit passender Ballfarbe passierbar)**\n" +
      "\n" +
      "- R = Barriere (nur mit blauem Ball passierbar)\n" +
      "\n" +
      "- S = Barriere (nur mit grünem Ball passierbar)\n" +
      "\n" +
      "- W = Barriere (nur mit gelbem Ball passierbar)\n" +
      "\n" +
      "**Mauern**\n" +
      "\n" +
      "- A = Feste Mauer (nicht passierbar, nicht zerstörbar)\n" +
      "\n" +
      "- M = Zerbrechliche Mauer (wird zerstört wenn ein bewegtes Feld dagegen prallt)\n" +
      "\n" +
      "**Spiel-Start**\n" +
      "\n" +
      "- 1 = Ball Start Position mit Blauer Farbe\n" +
      "\n" +
      "- 2 = Ball Start Position mit Grüner Farbe\n" +
      "\n" +
      "- 3 = Ball Start Position mit Gelber Farbe\n" +
      "\n" +
      "**Leer**\n" +
      "\n" +
      "- Z = Leeres Feld (frei begehbar)\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# ANFORDERUNGEN\n" +
      "\n" +
      "1. Genau 22x13 Zeichen (286 Zeichen)\n" +
      "\n" +
      "2. Genau ein Spielstart (1, 2 oder 3)\n" +
      "\n" +
      "3. Mindestens ein erreichbarer Weg\n" +
      "\n" +
      "4. Sinnvolle Struktur (nicht zufällig verteilt)\n" +
      "\n" +
      "5. Mindestens eine Spielmechanik (Farbwechsel ODER bewegliche Felder ODER Barrieren ODER zerbrechliche Mauern)\n" +
      "\n" +
      "6. Kein Level darf unmöglich sein\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# OUTPUT FORMAT\n" +
      "\n" +
      "Zurückgeben MUSS ein Level String sein.\n" +
      "\n" +
      "Der Level String MUSS zwischen [[ und ]] stehen.\n" +
      "\n" +
      "Keine Leerzeichen.\n" +
      "\n" +
      "Keine Zeilenumbrüche.\n" +
      "\n" +
      "Zwischen [[ und ]] muss sich genau ein String mit exakt 286 Zeichen ohne leerzeichen befinden.";

    if (!prompt) {
      return res.status(400).json({ error: "prompt fehlt" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    console.log(response.data);

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({ result: text });
  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.status(500).json({
      error: "Fehler beim Gemini API Call",
      details: err.response?.data || err.message,
    });
  }
}
