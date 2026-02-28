
import { AdlamLetter, Lesson, QuizQuestion } from './types';

export const ADLAM_ALPHABET: AdlamLetter[] = [
  { char: '𞤀', name: 'Alif', latin: 'A', category: 'vowel' },
  { char: '𞤁', name: 'Dali', latin: 'D', category: 'consonant' },
  { char: '𞤂', name: 'Lyam', latin: 'L', category: 'consonant' },
  { char: '𞤃', name: 'Mim', latin: 'M', category: 'consonant' },
  { char: '𞤄', name: 'Ba', latin: 'B', category: 'consonant' },
  { char: '𞤅', name: 'Sinnyii', latin: 'S', category: 'consonant' },
  { char: '𞤆', name: 'Pe', latin: 'P', category: 'consonant' },
  { char: '𞤇', name: 'Bhe', latin: 'Bh', category: 'consonant' },
  { char: '𞤈', name: 'Ra', latin: 'R', category: 'consonant' },
  { char: '𞤉', name: 'E', latin: 'E', category: 'vowel' },
  { char: '𞤊', name: 'Fa', latin: 'F', category: 'consonant' },
  { char: '𞤋', name: 'I', latin: 'I', category: 'vowel' },
  { char: '𞤌', name: 'O', latin: 'O', category: 'vowel' },
  { char: '𞤍', name: 'Dha', latin: 'Dh', category: 'consonant' },
  { char: '𞤎', name: 'Yii', latin: 'Y', category: 'consonant' },
  { char: '𞤏', name: 'Wawu', latin: 'W', category: 'consonant' },
];

export const TECH_LESSONS: Lesson[] = [
  {
    id: 'prog-1',
    title: 'Introduction à Python',
    level: 'beginner',
    category: 'programming',
    content: "Python est un langage de programmation polyvalent et facile à lire. Idéal pour débuter.",
    tasks: ["Installer Python", "Écrire 'Hello World'", "Comprendre les variables"]
  },
  {
    id: 'prog-2',
    title: 'Introduction à HTML/CSS',
    level: 'beginner',
    category: 'programming',
    content: "Apprenez à structurer vos pages web avec HTML et à les mettre en forme avec CSS pour un design professionnel.",
    tasks: ["Comprendre la structure d'un document HTML", "Utiliser les balises de base (titres, paragraphes, liens)", "Modifier les couleurs et les polices avec CSS"]
  },
  {
    id: 'hack-1',
    title: 'Les bases de la Cybersécurité',
    level: 'beginner',
    category: 'hacking',
    content: "Apprenez les principes de la CIA (Confidentialité, Intégrité, Disponibilité).",
    tasks: ["Définir le hacking éthique", "Comprendre les vecteurs d'attaque", "Les mots de passe sécurisés"]
  },
  {
    id: 'hack-adv-1',
    title: 'Injection SQL & Exploitation Web',
    level: 'advanced',
    category: 'hacking',
    content: "Techniques avancées pour identifier les vulnérabilités dans les bases de données SQL.",
    tasks: ["Tester les formulaires", "Exploitation via UNION", "Prévention via requêtes préparées"]
  }
];

export const HTML_CSS_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: "Que signifie HTML ?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Tool Machine Learning",
      "Hyperlinks and Text Management Lines"
    ],
    correctAnswer: 0,
    explanation: "HTML est le langage standard de balisage pour créer des pages web."
  },
  {
    id: 'q2',
    question: "Quelle balise est utilisée pour créer un lien hypertexte ?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1,
    explanation: "La balise <a> (anchor) est utilisée avec l'attribut href pour définir un lien."
  },
  {
    id: 'q3',
    question: "Quelle propriété CSS change la couleur de fond d'un élément ?",
    options: ["color", "font-background", "bgcolor", "background-color"],
    correctAnswer: 3,
    explanation: "background-color est la propriété correcte. 'color' change la couleur du texte."
  },
  {
    id: 'q4',
    question: "En CSS, comment sélectionner un élément avec l'id 'header' ?",
    options: [".header", "header", "#header", "*header"],
    correctAnswer: 2,
    explanation: "Le symbole '#' est utilisé pour sélectionner un élément par son ID unique."
  }
];
