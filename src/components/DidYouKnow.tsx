import React from 'react';

const facts = [
  "The Rigveda mentions the concept of a heliocentric universe long before Copernicus.",
  "Ancient Indian astronomers accurately calculated the length of a solar year as 365.258756 days.",
  "The concept of 'Zero' (Shunya) as a number originated in India, revolutionizing mathematics and astronomy.",
  "Jantar Mantar in Jaipur has a sundial that can tell the local time with an accuracy of 2 seconds."
];

export default function DidYouKnow() {
  return (
    <section className="py-20 bg-gold-500/10 border-y border-gold-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1920&h=1080')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-space-900/80 backdrop-blur-md border border-gold-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-8">
            Did You <span className="text-gold-400 italic">Know?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facts.map((fact, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/50 text-gold-400 font-serif font-bold">
                  {index + 1}
                </div>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
