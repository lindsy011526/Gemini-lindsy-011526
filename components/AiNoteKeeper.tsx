import React, { useState } from 'react';
import { transformToNotes, runAiMagic } from '../services/geminiService';
import { MagicType } from '../types';

interface AiNoteKeeperProps {
  lang: 'en' | 'zh-TW';
}

const AiNoteKeeper: React.FC<AiNoteKeeperProps> = ({ lang }) => {
  const [inputMode, setInputMode] = useState<'text' | 'preview'>('text');
  const [rawText, setRawText] = useState('');
  const [processedNote, setProcessedNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Parse markdown and inject coral color for bold text **text**
  const renderMarkdown = (text: string) => {
    // Basic Markdown parser for demo.
    // Replace **text** with coral spans
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const content = part.slice(2, -2);
            return <span key={index} className="text-coral font-bold">{content}</span>;
        }
        // Handle headers
        if (part.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{part.slice(2)}</h1>;
        if (part.startsWith('## ')) return <h2 key={index} className="text-xl font-bold mt-3 mb-1">{part.slice(3)}</h2>;
        if (part.startsWith('- ')) return <li key={index} className="ml-4">{part.slice(2)}</li>;
        
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  const handleTransform = async () => {
    if (!rawText) return;
    setIsLoading(true);
    const result = await transformToNotes(rawText);
    setProcessedNote(result);
    setInputMode('preview');
    setIsLoading(false);
  };

  const handleMagic = async (type: MagicType) => {
    if (!processedNote && !rawText) return;
    setIsLoading(true);
    const source = processedNote || rawText;
    const result = await runAiMagic(source, type);
    setProcessedNote(result); // Update the note with the magic result
    setInputMode('preview');
    setIsLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
            setRawText(text);
        }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-agent-blue flex items-center gap-2">
            <span className="text-2xl">📝</span> 
            {lang === 'en' ? 'AI Note Keeper' : 'AI 筆記助手'}
        </h2>
        
        <div className="flex gap-2">
           <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition">
               {lang === 'en' ? 'Upload File' : '上傳文件'}
               <input type="file" className="hidden" accept=".txt,.md,.csv,.json" onChange={handleFileUpload} />
           </label>
           <button 
             onClick={() => setInputMode(inputMode === 'text' ? 'preview' : 'text')}
             className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition"
           >
              {inputMode === 'text' ? 'View Preview' : 'Edit Raw'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow h-[500px]">
        {/* Editor Area */}
        <div className={`flex flex-col space-y-2 ${inputMode === 'preview' ? 'hidden md:flex' : 'flex'}`}>
            <textarea
                className="w-full h-full p-4 rounded-xl glass-panel bg-opacity-20 bg-black resize-none focus:outline-none focus:ring-2 focus:ring-coral text-sm font-mono"
                placeholder={lang === 'en' ? "Paste text, notes, or mission logs here..." : "在此貼上文字、筆記或任務日誌..."}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
            />
            <button
                onClick={handleTransform}
                disabled={isLoading}
                className="w-full py-3 bg-agent-blue text-black font-bold rounded-xl hover:brightness-110 transition disabled:opacity-50"
            >
                {isLoading ? (lang === 'en' ? 'Processing...' : '處理中...') : (lang === 'en' ? 'Organize with AI' : 'AI 智能整理')}
            </button>
        </div>

        {/* Preview / Results Area */}
        <div className={`flex flex-col space-y-2 ${inputMode === 'text' ? 'hidden md:flex' : 'flex'}`}>
            <div className="w-full h-full p-6 rounded-xl glass-panel overflow-y-auto bg-white/5 prose prose-invert max-w-none">
                {processedNote ? (
                    <div>{renderMarkdown(processedNote)}</div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 italic">
                        {lang === 'en' ? 'AI output will appear here...' : 'AI 輸出將顯示於此...'}
                    </div>
                )}
            </div>
            
            {/* AI Magic Toolbar */}
            <div className="grid grid-cols-3 gap-2">
                {(['SUMMARIZE', 'ACTION_ITEMS', 'CRITIQUE', 'POETIFY', 'ELI5', 'TRANSLATE_ZH'] as MagicType[]).map((magic) => (
                    <button
                        key={magic}
                        onClick={() => handleMagic(magic)}
                        disabled={isLoading}
                        className="p-2 text-xs bg-gray-800 hover:bg-coral hover:text-white rounded transition truncate"
                    >
                        ✨ {magic.replace('_', ' ')}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiNoteKeeper;