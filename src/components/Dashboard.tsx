import React, { useState } from 'react';
import { MessageCircle, BookOpen, User, Trophy, Play, ChevronRight, Star, Flame } from 'lucide-react';
import { cn } from '../lib/utils';
import { ChatView } from './ChatView';
import { LessonsView } from './LessonsView';
import { ProgressView } from './ProgressView';

export function Dashboard() {
  const [activeView, setActiveView] = useState<'home' | 'chat' | 'lessons' | 'progress'>('home');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FC] text-[#0A192F] font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-[#0A192F] text-white h-screen border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="font-display font-light tracking-wide text-xl text-white">المستر</h1>
              <p className="text-xs text-white/50 uppercase tracking-widest">British English</p>
            </div>
          </div>

          <div className="space-y-1">
            <NavItem icon={<User size={20} />} label="Home" active={activeView === 'home'} onClick={() => setActiveView('home')} />
            <NavItem icon={<MessageCircle size={20} />} label="Chat & Practice" active={activeView === 'chat'} onClick={() => setActiveView('chat')} />
            <NavItem icon={<BookOpen size={20} />} label="Lessons & Grammar" active={activeView === 'lessons'} onClick={() => setActiveView('lessons')} />
            <NavItem icon={<Trophy size={20} />} label="My Progress" active={activeView === 'progress'} onClick={() => setActiveView('progress')} />
          </div>
        </div>

        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Level</span>
            <span className="text-[10px] font-bold text-indigo-200 bg-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-widest">Intermediate</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-3">
            <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-white/50 text-center italic">450 / 1000 XP to Advanced</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full h-screen">
        {activeView === 'home' && <HomeView onNavigate={setActiveView} />}
        {activeView === 'chat' && <ChatView />}
        {activeView === 'lessons' && <LessonsView onNavigate={setActiveView} />}
        {activeView === 'progress' && <ProgressView />}
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-100 flex justify-around p-3 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
          <MobileNavItem icon={<User size={24} />} active={activeView === 'home'} onClick={() => setActiveView('home')} />
          <MobileNavItem icon={<MessageCircle size={24} />} active={activeView === 'chat'} onClick={() => setActiveView('chat')} />
          <MobileNavItem icon={<BookOpen size={24} />} active={activeView === 'lessons'} onClick={() => setActiveView('lessons')} />
          <MobileNavItem icon={<Trophy size={24} />} active={activeView === 'progress'} onClick={() => setActiveView('progress')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors duration-200 text-left",
        active 
          ? "bg-white/10 text-white font-medium" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn(active ? "text-indigo-400" : "text-white/40")}>{icon}</span>
      {label}
    </button>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-3 rounded-2xl transition-all duration-200",
        active ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:bg-slate-50"
      )}
    >
      {icon}
    </button>
  );
}

function HomeView({ onNavigate }: { onNavigate: (view: 'home' | 'chat' | 'lessons' | 'progress') => void }) {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <p className="text-indigo-600 font-semibold tracking-widest text-xs uppercase mb-2">Welcome Back • مرحباً بك</p>
          <h1 className="text-5xl font-display font-light text-[#0A192F]">Good morning, <span className="font-bold">Omar.</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">B1 Intermediate</span>
          </div>
          <div className="bg-indigo-600 px-6 py-3 rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-3 text-white">
            <span className="text-sm font-bold">2,450 XP</span>
          </div>
        </div>
      </header>

      {/* Gamification Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Flame className="text-orange-500" size={24} />} value="5 Days" label="Active Streak" />
        <StatCard icon={<MessageCircle className="text-indigo-500" size={24} />} value="12" label="Conversations" />
        <StatCard icon={<Star className="text-yellow-500" size={24} />} value="14" label="Lessons Passed" />
        <StatCard icon={<BookOpen className="text-purple-500" size={24} />} value="B1" label="CEFR Level" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Action */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <MessageCircle size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Live Chat</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0A192F] mb-3">Ordering at a Pub</h3>
              <p className="text-slate-500 mb-8 max-w-[280px]">Simulate a real-life scenario at a classic London gastro-pub. Practice vocabulary and politeness markers.</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Takes ~5 mins</span>
              <button 
                onClick={() => onNavigate('chat')}
                className="py-4 px-8 bg-[#0A192F] hover:scale-105 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform"
              >
                Start Practice
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Lesson */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-20 -mt-20 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Grammar Focus</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0A192F] mb-3">Present Perfect</h3>
              <p className="text-slate-500 mb-8 max-w-[280px]">Understand when to use "I have been" vs "I went" with practical British context.</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Intermediate B1</span>
              <button 
                 onClick={() => onNavigate('lessons')}
                className="py-4 px-8 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors"
              >
                Review Lesson
                <Play size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-5">
      <div className="bg-[#F8F9FC] p-4 rounded-2xl border border-slate-100 text-[#0A192F]">
        {icon}
      </div>
      <div>
        <p className="font-bold text-2xl text-[#0A192F]">{value}</p>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{label}</p>
      </div>
    </div>
  )
}
