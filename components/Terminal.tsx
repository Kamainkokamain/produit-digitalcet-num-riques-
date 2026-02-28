
import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';

interface TerminalProps {
  onCommand?: (cmd: string) => void;
  systemMessage?: string;
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, systemMessage }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: systemMessage || "Adlam-Tech OS v1.0.0 initialized...", type: 'output' },
    { text: "Tapez 'help' pour la liste des commandes.", type: 'output' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { text: `> ${input}`, type: 'input' } as TerminalLine];
    
    // Simple local commands
    if (cmd === 'help') {
      newHistory.push({ text: "Commandes disponibles: help, clear, whoami, adlam, hack --start", type: 'output' });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'whoami') {
      newHistory.push({ text: "User: Student_Of_Adlam | Permissions: Read/Write/Execute", type: 'success' });
    } else if (cmd === 'adlam') {
      newHistory.push({ text: "Initialisation du module linguistique Adlam (𞤀𞤣𞤤𞤢𞤥)...", type: 'output' });
    } else if (cmd === 'hack --start') {
      newHistory.push({ text: "[!] Scanning targets...", type: 'error' });
      newHistory.push({ text: "[+] Target: local_network_node_01", type: 'success' });
      newHistory.push({ text: "[*] Port 80 open (HTTP). Vulnerability: Potential SQLi", type: 'output' });
    } else {
      newHistory.push({ text: `Commande inconnue: ${cmd}`, type: 'error' });
    }

    setHistory(newHistory);
    if (onCommand) onCommand(input);
    setInput('');
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[500px]">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-emerald-500/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-mono text-slate-400">bash — adlam-academy</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
        {history.map((line, idx) => (
          <div key={idx} className={`
            ${line.type === 'input' ? 'text-blue-400' : ''}
            ${line.type === 'output' ? 'text-slate-300' : ''}
            ${line.type === 'error' ? 'text-red-400' : ''}
            ${line.type === 'success' ? 'text-emerald-400' : ''}
          `}>
            {line.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleCommand} className="p-4 bg-slate-950 border-t border-emerald-500/20 flex items-center">
        <span className="text-emerald-500 mr-2 font-mono">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-emerald-400 font-mono flex-1 focus:ring-0"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
