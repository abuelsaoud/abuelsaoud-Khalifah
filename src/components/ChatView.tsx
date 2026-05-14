import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { sendChatMessage } from '../services/ai';
import { useSpeech } from '../hooks/useSpeech';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  isAudioPlaying?: boolean;
}

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "مرحباً بك 👋\nأنا معلمك الذكي للغة الإنجليزية البريطانية. سأساعدك على تعلم الإنجليزية بطريقة احترافية وسهلة.\nكيف يمكنني مساعدتك اليوم؟ يمكنك الكتابة أو التحدث معي مباشرة."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { isListening, transcript, startListening, stopListening, speak, isSpeaking, stopSpeaking } = useSpeech();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    stopListening();
    stopSpeaking();

    const newUserMsg: Message = { id: uuidv4(), role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForAi = [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content }));
      const responseText = await sendChatMessage(historyForAi);
      
      const newAssistantMsg: Message = { id: uuidv4(), role: 'assistant', content: responseText };
      setMessages(prev => [...prev, newAssistantMsg]);
      
      // Auto-play the English parts of the response (simple heuristic: speak the whole text for now,
      // a more advanced implementation would parse English vs Arabic)
      // speak(responseText);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: uuidv4(), role: 'assistant', content: "❌ عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListen = () => {
    if (isListening) stopListening();
    else {
      setInput('');
      startListening();
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setMessages(prev => prev.map(m => ({ ...m, isAudioPlaying: false })));
      return;
    }

    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: true } : { ...m, isAudioPlaying: false }));
    speak(text, () => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: false } : m));
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen bg-[#F8F9FC] relative text-[#0A192F]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h2 className="font-display font-bold text-2xl text-[#0A192F]">Live Conversation</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time speaking & grammar correction</p>
        </div>
        <div className="flex items-center gap-2">
            {/* API Warning could go here if needed */}
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] md:max-w-[70%] rounded-[24px] p-6 shadow-sm relative group",
              msg.role === 'user' 
                ? "bg-[#0A192F] text-white rounded-br-sm" 
                : "bg-white border border-slate-100 text-[#0A192F] rounded-bl-sm"
            )}>
              <div className={cn("markdown-body", msg.role === 'user' && "text-white")}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              
              {msg.role === 'assistant' && (
                <button 
                  onClick={() => handleSpeak(msg.content, msg.id)}
                  className="absolute -bottom-4 -right-4 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-indigo-100"
                >
                  {msg.isAudioPlaying ? <Square size={14} /> : <Volume2 size={14} />}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <button
            onClick={toggleListen}
            className={cn(
              "p-4 rounded-full flex-shrink-0 transition-colors flex items-center justify-center",
              isListening 
                ? "bg-red-50 text-red-600 animate-pulse border border-red-100" 
                : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
            )}
          >
            {isListening ? <Square size={20} /> : <Mic size={20} />}
          </button>
          
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-[24px] px-6 py-3 flex items-center focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Type or speak (Arabic or English)..."
              className="w-full bg-transparent border-none focus:outline-none resize-none max-h-32 min-h-[44px] py-2 text-[#0A192F] placeholder:text-slate-400"
              rows={1}
            />
          </div>

          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="p-4 bg-indigo-600 text-white rounded-full flex-shrink-0 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center justify-center shadow-lg shadow-indigo-600/20"
          >
            <Send size={20} className="ml-1" />
          </button>
        </div>
        {isListening && (
          <p className="text-center text-xs text-slate-500 mt-2 font-medium animate-pulse">
            Listening... Speak clearly.
          </p>
        )}
      </div>
    </div>
  );
}
