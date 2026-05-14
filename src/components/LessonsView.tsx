import React, { useState } from 'react';
import { BookOpen, CheckCircle, Lock, PlayCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateGrammarLesson } from '../services/ai';
import ReactMarkdown from 'react-markdown';

export function LessonsView({ onNavigate }: { onNavigate: (v: 'home' | 'chat' | 'lessons' | 'progress') => void }) {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const lessons = [
    { id: '1', title: 'Present Simple vs Continuous', level: 'Beginner', status: 'completed' },
    { id: '2', title: 'Present Perfect', level: 'Intermediate', status: 'available' },
    { id: '3', title: 'Conditionals (If logic)', level: 'Intermediate', status: 'locked' },
    { id: '4', title: 'Passive Voice in Business', level: 'Advanced', status: 'locked' },
  ];

  const handleLessonSelect = async (title: string, status: string) => {
    if (status === 'locked') return;
    
    setActiveLesson(title);
    setIsLoading(true);
    setLessonContent('');
    
    try {
      const content = await generateGrammarLesson(title);
      setLessonContent(content);
    } catch (e) {
      setLessonContent("❌ حدث خطأ أثناء تحضير الدرس. يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  if (activeLesson) {
    return (
      <div className="p-8 md:p-12 max-w-6xl mx-auto pb-24">
        <button 
          onClick={() => setActiveLesson(null)}
          className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-8 hover:underline flex items-center gap-2"
        >
          ← Back to Lessons
        </button>
        
        <div className="bg-white rounded-[32px] p-10 md:p-16 shadow-sm border border-slate-100 min-h-[500px]">
          <h2 className="font-display text-4xl font-bold text-[#0A192F] mb-12 pb-6 border-b border-slate-100">{activeLesson}</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p>يتم الآن تحضير الدرس خصيصاً لك...</p>
            </div>
          ) : (
            <div className="markdown-body prose max-w-none text-slate-800">
              <ReactMarkdown>{lessonContent}</ReactMarkdown>
            </div>
          )}
          
          {!isLoading && (
             <div className="mt-16 pt-8 border-t border-slate-100 flex justify-end">
               <button 
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-[#0A192F] text-white rounded-2xl font-bold transition-transform hover:scale-105"
               >
                 Practice in Conversation
               </button>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto pb-24">
       <header className="mb-16">
        <p className="text-indigo-600 font-semibold tracking-widest text-xs uppercase mb-2">Curriculum • المنهج</p>
        <h1 className="font-display text-5xl font-light text-[#0A192F]">Grammar <span className="font-bold">Core.</span></h1>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {lessons.map((lesson) => (
           <div 
             key={lesson.id}
             onClick={() => handleLessonSelect(lesson.title, lesson.status)}
             className={cn(
               "rounded-[32px] p-8 border transition-all cursor-pointer flex flex-col justify-between h-56 group",
               lesson.status === 'completed' ? "bg-white border-green-200 shadow-sm" :
               lesson.status === 'available' ? "bg-white border-indigo-100 shadow-sm hover:border-indigo-300 hover:shadow-lg transform hover:-translate-y-1" :
               "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
             )}
           >
             <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest",
                    lesson.level === 'Beginner' ? "bg-green-100 text-green-700" :
                    lesson.level === 'Intermediate' ? "bg-indigo-100 text-indigo-700" :
                    "bg-purple-100 text-purple-700"
                  )}>
                    {lesson.level}
                  </span>
                  
                  {lesson.status === 'completed' && <CheckCircle className="text-green-500" size={24} />}
                  {lesson.status === 'available' && <PlayCircle className="text-indigo-500 group-hover:scale-110 transition-transform" size={28} />}
                  {lesson.status === 'locked' && <Lock className="text-slate-400" size={24} />}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A192F] mt-auto">{lesson.title}</h3>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}
