
import React, { useState, useEffect } from 'react';
import { AppView, Lesson } from './types';
import { TECH_LESSONS } from './constants';
import { getGeminiResponse } from './services/geminiService';
import Terminal from './components/Terminal';
import AdlamAlphabet from './components/AdlamAlphabet';
import TechQuiz from './components/TechQuiz';
import { 
  Book, 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  MessageSquare, 
  ChevronRight, 
  Code,
  Cpu,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Gamepad2,
  ShieldCheck,
  Lock,
  Globe,
  Database,
  Key,
  Shield
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiChat, setAiChat] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [userInput, setUserInput] = useState("");
  
  // Persistence state for completed lessons
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('adlam_tech_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem('adlam_tech_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setUserInput("");
    setAiChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiLoading(true);

    const response = await getGeminiResponse(userMsg);
    setAiChat(prev => [...prev, { role: 'model', text: response }]);
    setAiLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Adlam-Tech Academy
        </h1>
        <p className="text-xl text-slate-400">
          La fusion de la culture millénaire et de la technologie futuriste. 
          Maîtrisez l'Adlam, devenez développeur et protégez le cyber-espace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Alphabet Adlam", 
            icon: <Book className="w-8 h-8 text-emerald-400" />, 
            desc: "Apprenez à lire et écrire en 𞤀𞤣𞤤𞤢𞤥.",
            target: AppView.ADLAM
          },
          { 
            title: "Développement", 
            icon: <Code className="w-8 h-8 text-blue-400" />, 
            desc: "Devenez expert en programmation moderne.",
            target: AppView.TECH
          },
          { 
            title: "Fondamentaux Cyber", 
            icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />, 
            desc: "Cryptographie et protection des données.",
            target: AppView.CYBER_SECURITY
          },
          { 
            title: "Cyber-Défense", 
            icon: <ShieldAlert className="w-8 h-8 text-red-400" />, 
            desc: "Hacking éthique et tests d'intrusion.",
            target: AppView.HACKING
          },
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentView(item.target)}
            className="group bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all text-left hover:bg-slate-900 shadow-lg"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">{item.desc}</p>
            <div className="flex items-center text-emerald-400 text-sm font-bold">
              Explorer <ChevronRight className="ml-1 w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-indigo-900/20 to-emerald-900/20 border border-emerald-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <BrainCircuit className="mr-2 text-emerald-400" /> 
            Le Mentor IA Adlam
          </h2>
          <p className="text-slate-300">
            Posez vos questions sur la programmation ou l'Adlam à notre IA spécialisée. 
            Elle vous guidera dans vos exercices de hacking éthique.
          </p>
          <button 
            onClick={() => setCurrentView(AppView.AI_MENTOR)}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Discuter avec le Mentor
          </button>
        </div>
        <div className="w-full md:w-1/3">
           <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="Cyber Security" />
        </div>
      </div>
    </div>
  );

  const renderCyberSecurity = () => (
    <div className="space-y-12 animate-fadeIn pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-500/20 rounded-xl">
          <ShieldCheck className="text-indigo-400 w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Fondamentaux de la Cybersécurité</h2>
          <p className="text-slate-400">Comprendre les piliers de la protection numérique.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cryptography */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 hover:border-indigo-500/30 transition-all">
          <div className="p-4 bg-indigo-500/10 rounded-2xl w-fit">
            <Lock className="text-indigo-400 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Cryptographie</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            L'art de sécuriser les communications. Apprenez comment les données sont transformées en codes illisibles pour les intrus.
          </p>
          <ul className="space-y-3">
            {[
              { title: "Chiffrement Symétrique", desc: "Une seule clé pour crypter et décrypter (ex: AES)." },
              { title: "Chiffrement Asymétrique", desc: "Utilise une clé publique et une clé privée (ex: RSA)." },
              { title: "Hachage", desc: "Création d'une empreinte unique pour vérifier l'intégrité." }
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <Key className="text-indigo-500 w-4 h-4 shrink-0 mt-1" />
                <div>
                  <h4 className="text-indigo-300 font-bold text-xs uppercase">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Secure Networks */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 hover:border-blue-500/30 transition-all">
          <div className="p-4 bg-blue-500/10 rounded-2xl w-fit">
            <Globe className="text-blue-400 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Réseaux Sécurisés</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Comment les informations circulent sur Internet sans être interceptées ou modifiées.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/10">
              <h4 className="text-blue-400 font-bold text-sm mb-1 italic">Firewalls & IDS</h4>
              <p className="text-slate-500 text-xs">Surveillance et filtrage du trafic réseau entrant et sortant.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/10">
              <h4 className="text-blue-400 font-bold text-sm mb-1 italic">VPN & Tunnels</h4>
              <p className="text-slate-500 text-xs">Création de chemins privés et sécurisés à travers des réseaux publics.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/10">
              <h4 className="text-blue-400 font-bold text-sm mb-1 italic">Zero Trust</h4>
              <p className="text-slate-500 text-xs">"Ne jamais faire confiance, toujours vérifier" - même à l'intérieur du réseau.</p>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 hover:border-emerald-500/30 transition-all">
          <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit">
            <Database className="text-emerald-400 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Protection des Données</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Stratégies pour garantir la confidentialité et la disponibilité de vos informations sensibles.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-500/5 p-4 rounded-2xl text-center border border-emerald-500/10">
              <Shield className="mx-auto text-emerald-500 mb-2" size={20} />
              <span className="text-[10px] text-slate-300 font-bold block">MFA / 2FA</span>
            </div>
            <div className="bg-emerald-500/5 p-4 rounded-2xl text-center border border-emerald-500/10">
              <Database className="mx-auto text-emerald-500 mb-2" size={20} />
              <span className="text-[10px] text-slate-300 font-bold block">Backup</span>
            </div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/20">
             <h4 className="text-emerald-400 font-bold text-xs uppercase mb-2">Principe de moindres privilèges</h4>
             <p className="text-slate-500 text-[11px]">
               Chaque utilisateur ou processus ne doit avoir accès qu'aux ressources strictement nécessaires à sa fonction.
             </p>
          </div>
        </div>
      </div>

      {/* Interactive Exploration with AI */}
      <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-white">Approfondir un concept ?</h3>
          <p className="text-slate-400">
            Le Mentor IA est prêt à vous expliquer n'importe quel concept de cybersécurité en détail. 
            Qu'est-ce qu'une attaque Man-in-the-Middle ? Comment fonctionne le protocole HTTPS ?
          </p>
          <button 
            onClick={() => setCurrentView(AppView.AI_MENTOR)}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all"
          >
            Interroger le Mentor Cyber
          </button>
        </div>
        <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-500/20 font-mono text-xs text-indigo-400 shadow-inner">
          <div className="mb-2">// Exemple de hachage SHA-256</div>
          <div>const hash = crypto.createHash('sha256')</div>
          <div>.update('AdlamTechAcademy')</div>
          <div>.digest('hex');</div>
          <div className="mt-2 text-indigo-200">f7a8...e4d1</div>
        </div>
      </div>
    </div>
  );

  const renderTech = () => (
    <div className="space-y-12 animate-fadeIn pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <Cpu className="text-blue-400 w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Informatique & Programmation</h2>
          <p className="text-slate-400">Parcours structuré pour maîtriser les outils modernes.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold mb-4 flex items-center"><Book className="mr-2 w-5 h-5" /> Leçons de Code</h3>
          {TECH_LESSONS.filter(l => l.category === 'programming').map(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
                className={`bg-slate-900 border p-6 rounded-xl transition-all group relative ${
                  isCompleted ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toggleLesson(lesson.id)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                      ) : (
                        <Circle className="text-slate-600 group-hover:text-blue-400 w-6 h-6" />
                      )}
                    </button>
                    <h3 className={`text-xl font-bold ${isCompleted ? 'text-emerald-300' : 'text-blue-300'}`}>
                      {lesson.title}
                    </h3>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded uppercase font-bold tracking-widest">
                    {lesson.level}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{lesson.content}</p>
                <div className="space-y-2">
                  {lesson.tasks.map((task, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-500">
                      <div className={`w-1 h-1 rounded-full mr-2 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center"><TerminalIcon className="mr-2 w-5 h-5" /> Bac à sable de code</h3>
            <Terminal systemMessage="Bienvenue dans l'environnement de développement Adlam-Tech..." />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center"><Gamepad2 className="mr-2 w-5 h-5 text-blue-400" /> Testez vos connaissances</h3>
            <TechQuiz />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHacking = () => (
    <div className="space-y-8 animate-fadeIn">
       <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-red-500/20 rounded-xl">
          <ShieldAlert className="text-red-400 w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Techniques de Hacking Éthique</h2>
          <p className="text-slate-400">De l'initiation aux techniques de pénétration avancées.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           {TECH_LESSONS.filter(l => l.category === 'hacking').map(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
                className={`bg-slate-900 border p-6 rounded-xl transition-all group relative ${
                  isCompleted ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 hover:border-red-500/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toggleLesson(lesson.id)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                      ) : (
                        <Circle className="text-slate-600 group-hover:text-red-400 w-6 h-6" />
                      )}
                    </button>
                    <h3 className={`text-xl font-bold ${isCompleted ? 'text-emerald-300' : 'text-red-300'}`}>
                      {lesson.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 ${lesson.level === 'advanced' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'} text-[10px] rounded uppercase font-bold tracking-widest`}>
                    {lesson.level}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{lesson.content}</p>
                <ul className="space-y-2 list-disc list-inside text-xs text-slate-500">
                  {lesson.tasks.map((task, i) => <li key={i}>{task}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="space-y-6">
          <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-xl">
            <h4 className="font-bold text-red-400 mb-2">⚠ CODE D'ÉTHIQUE</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le hacking appris ici doit être utilisé uniquement dans des environnements contrôlés (CTF, PenTesting autorisé). 
              L'usage malveillant est strictement interdit.
            </p>
          </div>
          <Terminal systemMessage="Console de Sécurité Offensive initialisée..." />
        </div>
      </div>
    </div>
  );

  const renderAIMentor = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-emerald-400">Le Mentor IA</h2>
        <p className="text-slate-400 italic">"Gandal ko ɗum ñalɗi" (Le savoir est un long chemin)</p>
      </div>

      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl h-[500px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {aiChat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <MessageSquare className="w-12 h-12 opacity-20" />
              <p>Posez n'importe quelle question sur l'Adlam, le Hacking ou Python.</p>
            </div>
          )}
          {aiChat.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-slate-950 rounded-tr-none font-medium' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-emerald-500/20'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-emerald-500/20 animate-pulse">
                Le mentor réfléchit...
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleAskAI} className="p-4 bg-slate-950 border-t border-emerald-500/20 flex gap-2">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ex: Comment dit-on 'Hacker' en Adlam ?"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          />
          <button 
            type="submit"
            disabled={aiLoading}
            className="p-3 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setCurrentView(AppView.HOME)}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
              𞤀
            </div>
            <span className="text-xl font-bold tracking-tight">ADLAM-TECH</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-6">
            {[
              { id: AppView.ADLAM, label: 'Adlam', icon: <Book size={18} /> },
              { id: AppView.TECH, label: 'Prog', icon: <Code size={18} /> },
              { id: AppView.CYBER_SECURITY, label: 'Cyber Bases', icon: <ShieldCheck size={18} /> },
              { id: AppView.HACKING, label: 'Cyber Défense', icon: <ShieldAlert size={18} /> },
              { id: AppView.AI_MENTOR, label: 'IA Mentor', icon: <BrainCircuit size={18} /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  currentView === item.id 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-mono text-emerald-500/70 uppercase">Server Active</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {currentView === AppView.HOME && renderHome()}
        {currentView === AppView.ADLAM && <AdlamAlphabet />}
        {currentView === AppView.TECH && renderTech()}
        {currentView === AppView.HACKING && renderHacking()}
        {currentView === AppView.CYBER_SECURITY && renderCyberSecurity()}
        {currentView === AppView.AI_MENTOR && renderAIMentor()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
               <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-xs text-white">𞤀</div>
               <span className="font-bold text-lg">Adlam-Tech Academy</span>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Une initiative éducative pour préserver le patrimoine Adlam tout en formant les leaders technologiques de demain.
              Le savoir n'a pas de frontières, il a des scripts.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Liens</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setCurrentView(AppView.ADLAM)}>Alphabet Adlam</li>
              <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setCurrentView(AppView.TECH)}>Documentation Python</li>
              <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setCurrentView(AppView.HACKING)}>Ethical Hacking</li>
              <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setCurrentView(AppView.AI_MENTOR)}>AI Mentor</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Contact</h4>
            <p className="text-sm text-slate-500">
              contact@adlam-tech.academy<br />
              Conakry, Guinée / Global
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; 2024 Adlam-Tech Academy. Tous droits réservés. Construit pour le futur.
        </div>
      </footer>
    </div>
  );
};

export default App;
