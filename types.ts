
export enum AppView {
  HOME = 'home',
  ADLAM = 'adlam',
  TECH = 'tech',
  HACKING = 'hacking',
  CYBER_SECURITY = 'cyber_security',
  AI_MENTOR = 'ai_mentor'
}

export interface AdlamLetter {
  char: string;
  name: string;
  latin: string;
  category: 'vowel' | 'consonant';
}

export interface Lesson {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'programming' | 'hacking' | 'computing';
  content: string;
  tasks: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}
