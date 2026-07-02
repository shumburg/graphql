import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("API läuft");
});


const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY,
});




const client = new OpenAI({

  apiKey: process.env.GROQ_API_KEY,

  baseURL: "https://api.groq.com/openai/v1",

});



const PORT = 3000;

app.post("/api/gemini", async (req, res) => {
  try {
    //const { prompt } = req.body;

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
      "A = unzerstörbare Wand\n" +
      "\n" +
      "M = zerstörbare Wand\n" +
      "\n" +
      "(kann nur zerstört werden, wenn ein beweglicher Block dagegen geschoben wird)\n" +
      "\n" +
      "Z = leeres Feld\n" +
      "\n" +
      "B = blauer Punkt\n" +
      "\n" +
      "D = grüner Punkt\n" +
      "\n" +
      "E = gelber Punkt\n" +
      "\n" +
      "C = roter Stein (kostet ein Leben)\n" +
      "\n" +
      "J = Farbwechsel auf Blau\n" +
      "\n" +
      "K = Farbwechsel auf Grün\n" +
      "\n" +
      "L = Farbwechsel auf Gelb\n" +
      "\n" +
      "T = beweglicher Block (blau)\n" +
      "\n" +
      "U = beweglicher Block (grün)\n" +
      "\n" +
      "V = beweglicher Block (gelb)\n" +
      "\n" +
      "R = blaue Barriere\n" +
      "\n" +
      "S = grüne Barriere\n" +
      "\n" +
      "W = gelbe Barriere\n" +
      "\n" +
      "1 = Ball startet Blau\n" +
      "\n" +
      "2 = Ball startet Grün\n" +
      "\n" +
      "3 = Ball startet Gelb\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# REGELN\n" +
      "\n" +
      "Erlaubte Zeichen:\n" +
      "\n" +
      "A B C D E J K L M R S T U V W Z 1 2 3\n" +
      "\n" +
      "Andere Zeichen sind verboten.\n" +
      "\n" +
      "Es darf GENAU EIN Startfeld geben.\n" +
      "\n" +
      "Das bedeutet:\n" +
      "\n" +
      "Genau einmal entweder\n" +
      "\n" +
      "1\n" +
      "\n" +
      "oder\n" +
      "\n" +
      "2\n" +
      "\n" +
      "oder\n" +
      "\n" +
      "3\n" +
      "\n" +
      "Alle anderen Startzeichen dürfen nicht vorkommen.\n" +
      "\n" +
      "Das Level muss spielbar wirken.\n" +
      "\n" +
      "Es muss mindestens einen erreichbaren Weg geben.\n" +
      "\n" +
      "Keine zufällige Verteilung.\n" +
      "\n" +
      "Nutze mindestens EINE Spielmechanik:\n" +
      "\n" +
      "- Farbwechsel\n" +
      "\n" +
      "- Barriere\n" +
      "\n" +
      "- beweglicher Block\n" +
      "\n" +
      "- zerstörbare Wand\n" +
      "\n" +
      "Leere Bereiche werden mit Z gefüllt.\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# DENKE SCHRITTWEISE\n" +
      "\n" +
      "1. Entwirf das Layout.\n" +
      "\n" +
      "2. Erzeuge daraus 13 Zeilen.\n" +
      "\n" +
      "3. Prüfe jede Zeile auf genau 22 Zeichen.\n" +
      "\n" +
      "4. Prüfe, dass genau 13 Zeilen existieren.\n" +
      "\n" +
      "5. Prüfe:\n" +
      "\n" +
      "13 × 22 = 286\n" +
      "\n" +
      "6. Entferne anschließend die Zeilenumbrüche.\n" +
      "\n" +
      "7. Gib den finalen String aus.\n" +
      "\n" +
      "Wenn eine Prüfung fehlschlägt, korrigiere den Level VOR der Ausgabe.\n" +
      "\n" +
      "---\n" +
      "\n" +
      "# AUSGABEFORMAT\n" +
      "\n" +
      "Antworte ausschließlich mit\n" +
      "\n" +
      "[[LEVELSTRING]]\n" +
      "\n" +
      "Keine Erklärungen.\n" +
      "\n" +
      "Keine Überschrift.\n" +
      "\n" +
      "Kein JSON.\n" +
      "\n" +
      "Kein Markdown.\n" +
      "\n" +
      "Keine Leerzeichen.\n" +
      "\n" +
      "Keine Zeilenumbrüche.\n" +
      "\n" +
      "Zwischen [[ und ]] muss sich genau ein String mit exakt 286 Zeichen ohne leerzeichen befinden."

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


    res.json({
      result: text,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "Fehler beim Gemini API Call",
      details: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});




app.post("/api/levels/ai", async (req, res) => {

  const message= "Zwischen [[ und ]] muss sich genau ein String mit exakt 286 Zeichen ohne leerzeichen befinden.";

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(response.choices[0].message);

    res.json(response.choices[0].message.content);

  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Fehler bei Groq Anfrage");
  }


  /*const response = await ai.models.generateContent({
    model: "gemini-2-flash-lite-001",
    contents: "Du bist Leveldesigner.\n\n\nBeschreibung:\nDie matrix ist 22x13, es wird für den Level ein String erwartet.\nEs gibt Felder die Punkte bringen mit B (blau), D (Grün) und E(Gelb), aber nur \nwenn der Ball die aktuelle Farbe hat.\n\nEs gibt farbwechsler J (zu blau), K (zu grün) und L (zu gelb), die die Farbe des balls wechseln können.\nEin C (roter stein) kostet ein leben.\n\nEs gibt Felder, die bewegt werden können:\nT (blau), U (grün) und V(gelb), aber nur wenn der Ball die korrekte Farbe hat.\nEin leerfeld ist Z.\n\nInitial kann der Ball eine Farbe haben: 1 für blau, 2 für grün, 3 für gelb\n\nEs gibt barrienfelder, die nur mit der richtigen Farbe des Balls passiert werden können:\nR (blau), S (grün) und W (gelb)\n\nEin Feld, was wie eine Mauer ist und nicht passierbar ist A\nEin Feld, was eine Mauer ist, aber nicht passiert werden kann ist M, allerding zersört werden kann, wenn ein bewegtes Feld dranstößt.\n\nErzeuge ein gültiges Level mit exakt 22x13 Zeichen.\n\nRegeln:\n\n- 22 Spalten pro Zeile\n\n- 13 Zeilen\n\n- nur folgende Zeichen erlaubt:\n\n  B C D E M J K L T U V R S W Z 1 2 3\n  \n  Pflicht:\n\n- genau ein Spieler (1)\n\n- mindestens ein erreichbarer Weg\n\n- sinnvolle Struktur (keine zufällige Verteilung)\n\n- mindestens eine Spielmechanik verwenden wie         \n    *Converter (J/K/L)\n    * Mover (T/U/V)\n    * Barrier (R/S/W)\n    * Zerbrechliche Mauern\n    \n    Erzeuge ausschließlich JSON.\n\n{\n\"title\":\"\",\n\"difficulty\":\"\",\n\"level\":\"\"\n}\n\ntrage für das attribut den levelstring ein.\n\ngute Beispiele für mover und converter:\n\nAAAAAAAZZCCCZZZAAAAAAAABBCBBAZZZZZZZZABZKZBAABZZZBAZZZZZZZZABZZZBAABZZZBAZZZZZZZZABZZZBAAAATAAAZZZZZZZZAAATAAAZZZZZZZZZZZZZZZZZZZZZZZZZZZZ1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZAAAUAAAZZZZZZZZAAAUAAAAZZZZZAZZZZZZZZADZZZDAAZZZZZAZZZZZZZZADZZZDAAZZZZZAZZZZZZZZADZJZDAAAAAAAAZZZZZZZZAAAAAAA\n\nZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZBBZZZZZZZZZZZZZZZZZZZBBBBZZZZZZZZZZZZZZZZZDDDDDDZZZZZZZZZZZZZZZDDDDDDDKZZZZZZZZZZZZZCCCCCCCCCCZZZZZZZZZZZZZDDDDDDDDZZZZZZZZZZZZZZZDDDDDDZZZZZZZZZZZZZZZZZBBBBZZZZZZZZZZZZZZZZZZZBBZZZZZ1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ\n\nOder für Zerbrechliche Mauern:\n\nZZZZZZZZZZZZZZZZZZZZZKZZZZZZZZZZZZZZZZZZZZZBAAAAAAAAAAAMAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZZZZZZ1ZZUZZZZZTZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZAAAAAAAMAAAAAAAAAAAAAZZZZZZAZZZBAZZZZZABBCAZZZTZZAZZZBAZZZZZMZZZAZZZZZZMZZZBMZZZZZAZZZAZZZZZZAAAAAAAAAMAAZZZAZZZZZZBBBBBBBBBBBABCBAJZZZZZZZZZZZZZZZZAAAAA\n"
  });

  console.log(response.text);
  return res.json({
    result: response.text
  });*/
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/levels/generate", async (req, res) => {

  const { prompt } = req.body;

  try {

    const completion = await openai.responses.create({

      model: "gpt-4.1",

      input: `
Du bist Leveldesigner.


Beschreibung:
Die matrix ist 22x13, es wird für den Level ein String erwartet.
Es gibt Felder die Punkte bringen mit B (blau), D (Grün) und E(Gelb), aber nur 
wenn der Ball die aktuelle Farbe hat.

Es gibt farbwechsler J (zu blau), K (zu grün) und L (zu gelb), die die Farbe des balls wechseln können.
Ein C (roter stein) kostet ein leben.

Es gibt Felder, die bewegt werden können:
T (blau), U (grün) und V(gelb), aber nur wenn der Ball die korrekte Farbe hat.
Ein leerfeld ist Z.

Initial kann der Ball eine Farbe haben: 1 für blau, 2 für grün, 3 für gelb

Es gibt barrienfelder, die nur mit der richtigen Farbe des Balls passiert werden können:
R (blau), S (grün) und W (gelb)

Ein Feld, was wie eine Mauer ist und nicht passierbar ist A
Ein Feld, was eine Mauer ist, aber nicht passiert werden kann ist M, allerding zersört werden kann, wenn ein bewegtes Feld dranstößt.

Erzeuge ein gültiges Level mit exakt 22x13 Zeichen.

Regeln:

- 22 Spalten pro Zeile

- 13 Zeilen

- nur folgende Zeichen erlaubt:

  B C D E M J K L T U V R S W Z 1 2 3
  
  Pflicht:

- genau ein Spieler (1)

- mindestens ein erreichbarer Weg

- sinnvolle Struktur (keine zufällige Verteilung)

- mindestens eine Spielmechanik verwenden wie         
    *Converter (J/K/L)
    * Mover (T/U/V)
    * Barrier (R/S/W)
    * Zerbrechliche Mauern
    
    Erzeuge ausschließlich JSON für die Response, wo auch daine Beschreibung integriert ist und nichts außerhalb des JSON:

{
"beschreibung":"",
"title":"",
"difficulty":"",
"level":""
}

trage für das attribut den levelstring ein.

gute Beispiele für mover und converter:

AAAAAAAZZCCCZZZAAAAAAAABBCBBAZZZZZZZZABZKZBAABZZZBAZZZZZZZZABZZZBAABZZZBAZZZZZZZZABZZZBAAAATAAAZZZZZZZZAAATAAAZZZZZZZZZZZZZZZZZZZZZZZZZZZZ1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZAAAUAAAZZZZZZZZAAAUAAAAZZZZZAZZZZZZZZADZZZDAAZZZZZAZZZZZZZZADZZZDAAZZZZZAZZZZZZZZADZJZDAAAAAAAAZZZZZZZZAAAAAAA

ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZBBZZZZZZZZZZZZZZZZZZZBBBBZZZZZZZZZZZZZZZZZDDDDDDZZZZZZZZZZZZZZZDDDDDDDKZZZZZZZZZZZZZCCCCCCCCCCZZZZZZZZZZZZZDDDDDDDDZZZZZZZZZZZZZZZDDDDDDZZZZZZZZZZZZZZZZZBBBBZZZZZZZZZZZZZZZZZZZBBZZZZZ1ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

Oder für Zerbrechliche Mauern:

ZZZZZZZZZZZZZZZZZZZZZKZZZZZZZZZZZZZZZZZZZZZBAAAAAAAAAAAMAAAAAAAAAAZZZZZZZZZZZZZZZZZZZZZZZZZZ1ZZUZZZZZTZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZAAAAAAAMAAAAAAAAAAAAAZZZZZZAZZZBAZZZZZABBCAZZZTZZAZZZBAZZZZZMZZZAZZZZZZMZZZBMZZZZZAZZZAZZZZZZAAAAAAAAAMAAZZZAZZZZZZBBBBBBBBBBBABCBAJZZZZZZZZZZZZZZZZAAAAA

${prompt}

            `
    });

    res.json(JSON.parse(completion.output_text));

  } catch(err) {

    res.status(500).json({
      error: err.message
    });

  }

});