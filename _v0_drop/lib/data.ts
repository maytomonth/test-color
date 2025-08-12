import type { Question, ColorType } from "./types"

export const questions: Question[] = [
  {
    id: 0,
    text: {
      en: "What is your natural hair color?",
      es: "¿Cuál es tu color de cabello natural?",
      fr: "Quelle est votre couleur de cheveux naturelle?",
      de: "Was ist Ihre natürliche Haarfarbe?",
    },
    choices: [
      {
        id: 0,
        text: {
          en: "Platinum blonde, white, or silver",
          es: "Rubio platino, blanco o plateado",
          fr: "Blond platine, blanc ou argenté",
          de: "Platinblond, weiß oder silber",
        },
        palette: ["#F5F5DC", "#E6E6FA", "#C0C0C0"],
        weights: { summer: 3, winter: 2, spring: 1, autumn: 0 },
      },
      {
        id: 1,
        text: {
          en: "Golden blonde or strawberry blonde",
          es: "Rubio dorado o rubio fresa",
          fr: "Blond doré ou blond fraise",
          de: "Goldblond oder erdbeerblond",
        },
        palette: ["#DAA520", "#FFB347", "#FF69B4"],
        weights: { spring: 3, autumn: 2, summer: 1, winter: 0 },
      },
      {
        id: 2,
        text: {
          en: "Light to medium brown",
          es: "Castaño claro a medio",
          fr: "Châtain clair à moyen",
          de: "Hellbraun bis mittelbraun",
        },
        palette: ["#8B4513", "#A0522D", "#CD853F"],
        weights: { autumn: 2, summer: 2, spring: 1, winter: 1 },
      },
      {
        id: 3,
        text: {
          en: "Dark brown or black",
          es: "Castaño oscuro o negro",
          fr: "Châtain foncé ou noir",
          de: "Dunkelbraun oder schwarz",
        },
        palette: ["#2F1B14", "#000000", "#1C1C1C"],
        weights: { winter: 3, autumn: 2, summer: 1, spring: 0 },
      },
    ],
    tip: {
      en: "Consider your natural, untreated hair color",
      es: "Considera tu color de cabello natural, sin tratar",
      fr: "Considérez votre couleur de cheveux naturelle, non traitée",
      de: "Berücksichtigen Sie Ihre natürliche, unbehandelte Haarfarbe",
    },
  },
  {
    id: 1,
    text: {
      en: "What is your natural eye color?",
      es: "¿Cuál es tu color de ojos natural?",
      fr: "Quelle est votre couleur d'yeux naturelle?",
      de: "Was ist Ihre natürliche Augenfarbe?",
    },
    choices: [
      {
        id: 0,
        text: {
          en: "Light blue, gray, or green",
          es: "Azul claro, gris o verde",
          fr: "Bleu clair, gris ou vert",
          de: "Hellblau, grau oder grün",
        },
        palette: ["#87CEEB", "#708090", "#90EE90"],
        weights: { summer: 3, winter: 2, spring: 1, autumn: 0 },
      },
      {
        id: 1,
        text: {
          en: "Bright blue or clear green",
          es: "Azul brillante o verde claro",
          fr: "Bleu vif ou vert clair",
          de: "Leuchtend blau oder klares Grün",
        },
        palette: ["#0000FF", "#00FF00", "#00CED1"],
        weights: { winter: 3, spring: 2, summer: 1, autumn: 0 },
      },
      {
        id: 2,
        text: {
          en: "Warm brown or hazel",
          es: "Marrón cálido o avellana",
          fr: "Brun chaud ou noisette",
          de: "Warmes Braun oder Haselnuss",
        },
        palette: ["#8B4513", "#CD853F", "#DEB887"],
        weights: { autumn: 3, spring: 2, summer: 1, winter: 0 },
      },
      {
        id: 3,
        text: {
          en: "Dark brown or black",
          es: "Marrón oscuro o negro",
          fr: "Brun foncé ou noir",
          de: "Dunkelbraun oder schwarz",
        },
        palette: ["#2F1B14", "#000000", "#1C1C1C"],
        weights: { winter: 2, autumn: 2, summer: 1, spring: 1 },
      },
    ],
  },
  {
    id: 2,
    text: {
      en: "How would you describe your skin tone?",
      es: "¿Cómo describirías tu tono de piel?",
      fr: "Comment décririez-vous votre teint?",
      de: "Wie würden Sie Ihren Hautton beschreiben?",
    },
    choices: [
      {
        id: 0,
        text: {
          en: "Cool undertones (pink, red, or blue)",
          es: "Subtonos fríos (rosa, rojo o azul)",
          fr: "Sous-tons froids (rose, rouge ou bleu)",
          de: "Kühle Untertöne (rosa, rot oder blau)",
        },
        palette: ["#FFB6C1", "#FF69B4", "#E6E6FA"],
        weights: { summer: 3, winter: 2, spring: 0, autumn: 0 },
      },
      {
        id: 1,
        text: {
          en: "Warm undertones (yellow, peach, or golden)",
          es: "Subtonos cálidos (amarillo, durazno o dorado)",
          fr: "Sous-tons chauds (jaune, pêche ou doré)",
          de: "Warme Untertöne (gelb, pfirsich oder golden)",
        },
        palette: ["#FFFF00", "#FFCCCB", "#DAA520"],
        weights: { spring: 3, autumn: 3, summer: 0, winter: 0 },
      },
      {
        id: 2,
        text: {
          en: "Neutral undertones",
          es: "Subtonos neutros",
          fr: "Sous-tons neutres",
          de: "Neutrale Untertöne",
        },
        palette: ["#F5DEB3", "#DDD8C7", "#E8E8E8"],
        weights: { summer: 1, winter: 1, spring: 1, autumn: 1 },
      },
      {
        id: 3,
        text: {
          en: "Olive or deep undertones",
          es: "Subtonos oliva o profundos",
          fr: "Sous-tons olive ou profonds",
          de: "Olive oder tiefe Untertöne",
        },
        palette: ["#808000", "#556B2F", "#2F4F4F"],
        weights: { autumn: 2, winter: 2, summer: 1, spring: 0 },
      },
    ],
    tip: {
      en: "Look at the veins on your wrist - blue/purple = cool, green = warm",
      es: "Mira las venas de tu muñeca - azul/púrpura = frío, verde = cálido",
      fr: "Regardez les veines de votre poignet - bleu/violet = froid, vert = chaud",
      de: "Schauen Sie sich die Adern an Ihrem Handgelenk an - blau/lila = kühl, grün = warm",
    },
  },
  // Add more questions following the same pattern...
]

export const colorTypes: ColorType[] = [
  {
    id: "spring",
    name: {
      en: "Bright Spring",
      es: "Primavera Brillante",
      fr: "Printemps Éclatant",
      de: "Heller Frühling",
    },
    description: {
      en: "You have warm, clear, and bright coloring. Your best colors are vibrant and energetic.",
      es: "Tienes una coloración cálida, clara y brillante. Tus mejores colores son vibrantes y energéticos.",
      fr: "Vous avez un teint chaud, clair et lumineux. Vos meilleures couleurs sont vibrantes et énergiques.",
      de: "Sie haben eine warme, klare und helle Färbung. Ihre besten Farben sind lebendig und energisch.",
    },
    palette: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"],
    characteristics: {
      en: ["Warm undertones", "Clear and bright", "High contrast", "Vibrant colors"],
      es: ["Subtonos cálidos", "Claro y brillante", "Alto contraste", "Colores vibrantes"],
      fr: ["Sous-tons chauds", "Clair et lumineux", "Contraste élevé", "Couleurs vibrantes"],
      de: ["Warme Untertöne", "Klar und hell", "Hoher Kontrast", "Lebendige Farben"],
    },
  },
  {
    id: "summer",
    name: {
      en: "Cool Summer",
      es: "Verano Fresco",
      fr: "Été Frais",
      de: "Kühler Sommer",
    },
    description: {
      en: "You have cool, soft, and muted coloring. Your best colors are gentle and sophisticated.",
      es: "Tienes una coloración fresca, suave y apagada. Tus mejores colores son suaves y sofisticados.",
      fr: "Vous avez un teint frais, doux et tamisé. Vos meilleures couleurs sont douces et sophistiquées.",
      de: "Sie haben eine kühle, weiche und gedämpfte Färbung. Ihre besten Farben sind sanft und raffiniert.",
    },
    palette: ["#B19CD9", "#87CEEB", "#F0E68C", "#DDA0DD", "#98FB98", "#F5DEB3", "#E6E6FA", "#AFEEEE"],
    characteristics: {
      en: ["Cool undertones", "Soft and muted", "Low contrast", "Gentle colors"],
      es: ["Subtonos fríos", "Suave y apagado", "Bajo contraste", "Colores suaves"],
      fr: ["Sous-tons froids", "Doux et tamisé", "Faible contraste", "Couleurs douces"],
      de: ["Kühle Untertöne", "Weich und gedämpft", "Niedriger Kontrast", "Sanfte Farben"],
    },
  },
  {
    id: "autumn",
    name: {
      en: "Deep Autumn",
      es: "Otoño Profundo",
      fr: "Automne Profond",
      de: "Tiefer Herbst",
    },
    description: {
      en: "You have warm, rich, and deep coloring. Your best colors are earthy and luxurious.",
      es: "Tienes una coloración cálida, rica y profunda. Tus mejores colores son terrosos y lujosos.",
      fr: "Vous avez un teint chaud, riche et profond. Vos meilleures couleurs sont terreuses et luxueuses.",
      de: "Sie haben eine warme, reiche und tiefe Färbung. Ihre besten Farben sind erdig und luxuriös.",
    },
    palette: ["#8B4513", "#CD853F", "#DAA520", "#B22222", "#228B22", "#4682B4", "#9932CC", "#FF8C00"],
    characteristics: {
      en: ["Warm undertones", "Rich and deep", "Medium contrast", "Earthy colors"],
      es: ["Subtonos cálidos", "Rico y profundo", "Contraste medio", "Colores terrosos"],
      fr: ["Sous-tons chauds", "Riche et profond", "Contraste moyen", "Couleurs terreuses"],
      de: ["Warme Untertöne", "Reich und tief", "Mittlerer Kontrast", "Erdige Farben"],
    },
  },
  {
    id: "winter",
    name: {
      en: "Clear Winter",
      es: "Invierno Claro",
      fr: "Hiver Clair",
      de: "Klarer Winter",
    },
    description: {
      en: "You have cool, clear, and dramatic coloring. Your best colors are bold and striking.",
      es: "Tienes una coloración fresca, clara y dramática. Tus mejores colores son audaces y llamativos.",
      fr: "Vous avez un teint frais, clair et dramatique. Vos meilleures couleurs sont audacieuses et frappantes.",
      de: "Sie haben eine kühle, klare und dramatische Färbung. Ihre besten Farben sind kühn und auffällig.",
    },
    palette: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#800080", "#008000", "#FF1493", "#00FFFF"],
    characteristics: {
      en: ["Cool undertones", "Clear and dramatic", "High contrast", "Bold colors"],
      es: ["Subtonos fríos", "Claro y dramático", "Alto contraste", "Colores audaces"],
      fr: ["Sous-tons froids", "Clair et dramatique", "Contraste élevé", "Couleurs audacieuses"],
      de: ["Kühle Untertöne", "Klar und dramatisch", "Hoher Kontrast", "Kühne Farben"],
    },
  },
]
