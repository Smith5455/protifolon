import React from 'react';
import { BookOpen, Star, Clock, Compass, Sun, Moon } from 'lucide-react';

const articles = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: <BookOpen className="w-6 h-6 text-gold-400" />,
    content: 'Ancient Indian astronomy, rooted in the Vedas, represents one of the earliest systematic attempts to understand the cosmos. It evolved from simple observations for ritual timing to complex mathematical models of planetary motion.',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'vedic',
    title: 'Vedic Astronomy',
    icon: <Sun className="w-6 h-6 text-gold-400" />,
    content: 'The Surya Siddhanta is a foundational text detailing the movements of celestial bodies. The Adita Mantra reflects the deep spiritual connection ancient Indians had with the sun and the cosmos.',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'aryabhata',
    title: 'Aryabhata (476 CE)',
    icon: <Star className="w-6 h-6 text-gold-400" />,
    content: 'A pioneering mathematician and astronomer. He proposed that the Earth rotates on its axis, accurately calculated the value of Pi, and explained the true causes of solar and lunar eclipses.',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'varahamihira',
    title: 'Varahamihira',
    icon: <Moon className="w-6 h-6 text-gold-400" />,
    content: 'Author of the Pancha Siddhantika, which summarizes five earlier astronomical treatises. His work bridged indigenous knowledge with Hellenistic astronomy, significantly advancing Indian astronomical thought.',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'time',
    title: 'Concept of Time',
    icon: <Clock className="w-6 h-6 text-gold-400" />,
    content: 'Indian timekeeping is vast, ranging from microseconds (Truti) to billions of years (Kalpas). The concept of Yugas (cycles of ages) reflects a cyclical view of time and the universe.',
    colSpan: 'md:col-span-2',
  },
  {
    id: 'instruments',
    title: 'Ancient Instruments',
    icon: <Compass className="w-6 h-6 text-gold-400" />,
    content: 'Before telescopes, astronomers used ingenious tools like the Shanku Yantra (gnomon), Ghati Yantra (water clock), and Chakrapati Yantra to measure time, track stars, and calculate planetary positions.',
    colSpan: 'md:col-span-1',
  },
];

export default function Articles() {
  return (
    <section id="articles" className="py-24 bg-space-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Wisdom of the <span className="text-gold-400">Ancients</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Dive into the core topics featured in our wall magazine, expanding on the rich heritage of Indian astronomical science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className={`bg-space-800/50 border border-space-700 p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300 group ${article.colSpan}`}
            >
              <div className="w-12 h-12 rounded-full bg-space-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {article.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-0"></div>
    </section>
  );
}
