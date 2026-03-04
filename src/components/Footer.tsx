import React from 'react';
import { Moon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-space-900 border-t border-space-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Moon className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-white tracking-wide">প্রতিফলন</h2>
              <p className="text-sm text-gold-400 font-sans uppercase tracking-widest">Pratiphalon</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-slate-300 font-medium mb-1">Department of Physics</p>
            <p className="text-slate-400 text-sm">Bhattadev University</p>
          </div>
        </div>
        
        <div className="border-t border-space-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; 2026 Bhattadev University Physics Department. All rights reserved.</p>
          <p>University Week Edition</p>
        </div>
      </div>
    </footer>
  );
}
