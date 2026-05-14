import React from 'react';
import { Target, TrendingUp, Award, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function ProgressView() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <p className="text-indigo-600 font-semibold tracking-widest text-xs uppercase mb-2">Analytics • التحليلات</p>
          <h1 className="text-5xl font-display font-light text-[#0A192F]">Learning <span className="font-bold">Profile.</span></h1>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="col-span-2 bg-[#0A192F] rounded-[32px] p-10 text-white relative overflow-hidden">
           <div className="relative z-10">
               <span className="bg-white/10 px-4 py-1.5 text-[10px] font-bold rounded-full mb-6 inline-block uppercase tracking-widest border border-white/10">Current Level</span>
               <h3 className="font-display text-7xl font-light mb-2">B1</h3>
               <p className="text-indigo-200 text-xl mb-12 font-medium">Intermediate</p>

               <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                 <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '45%' }}></div>
               </div>
               <p className="text-xs font-bold text-white/50 uppercase tracking-widest">450 / 1000 XP to reaching B2 (Upper Intermediate)</p>
           </div>
           
           <div className="absolute -right-16 -bottom-16 opacity-5">
              <TrendingUp size={300} />
           </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Estimated Time to B2</h4>
            <div className="flex items-center gap-5">
                <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                    <Clock size={32} />
                </div>
                <div>
                   <p className="text-3xl font-display font-bold text-[#0A192F]">3 Months</p>
                   <p className="text-xs text-slate-500 mt-1 font-medium italic">at current pace (20 mins/day)</p>
                </div>
            </div>
            
            <hr className="border-slate-100 my-4" />

            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-3">
               <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-100">Reading</span>
               <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-100">Present Tenses</span>
            </div>
        </div>
      </div>

      <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">Skill Breakdown</h3>
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 mb-8 space-y-8">
         <SkillBar label="Vocabulary" score={65} color="bg-purple-500" />
         <SkillBar label="Grammar" score={45} color="bg-blue-500" />
         <SkillBar label="Speaking" score={30} color="bg-orange-500" />
         <SkillBar label="Listening" score={55} color="bg-green-500" />
      </div>
    </div>
  );
}

function SkillBar({ label, score, color }: { label: string, score: number, color: string }) {
   return (
      <div>
          <div className="flex justify-between mb-3">
             <span className="font-bold text-sm text-[#0A192F]">{label}</span>
             <span className="font-bold text-sm text-slate-400">{score}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
             <div className={cn("h-full rounded-full", color)} style={{ width: `${score}%` }}></div>
          </div>
      </div>
   )
}
