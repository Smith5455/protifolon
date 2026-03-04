import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const astronomers = [
  {
    name: 'Aryabhata',
    years: '476–550 CE',
    contribution: 'Proposed Earth\'s rotation on its axis and provided accurate calculations for eclipses and planetary positions in the Aryabhatiya.',
    details: 'Aryabhata was the first of the major mathematician-astronomers from the classical age of Indian mathematics and Indian astronomy. His major work, Aryabhatiya, a compendium of mathematics and astronomy, was extensively referred to in the Indian mathematical literature and has survived to modern times. He explicitly mentioned that the earth rotates about its axis, thereby causing what appears to be an apparent movement of the stars. He also calculated the value of pi accurately to four decimal places and correctly explained the causes of solar and lunar eclipses.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'Varahamihira',
    years: '505–587 CE',
    contribution: 'Authored the Pancha Siddhantika, synthesizing five major astronomical treatises, and made significant contributions to trigonometry.',
    details: 'Varahamihira was an ancient Indian astrologer, astronomer, and polymath who lived in Ujjain. His most famous work is the Brihat Samhita, an encyclopedic work on architecture, temples, planetary motions, eclipses, timekeeping, astrology, seasons, cloud formation, rainfall, agriculture, mathematics, gemology, perfumes and many other topics. His Pancha Siddhantika ("Treatise on the Five Astronomical Canons") gives us information about older Indian texts which are now lost. His work bridged indigenous knowledge with Hellenistic astronomy.',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'Brahmagupta',
    years: '598–668 CE',
    contribution: 'First to give rules to compute with zero. Authored Brahmasphutasiddhanta, detailing planetary motions and eclipses.',
    details: 'Brahmagupta was an Indian mathematician and astronomer. He is the author of two early works on mathematics and astronomy: the Brahmasphutasiddhanta, a theoretical treatise, and the Khandakhadyaka, a more practical text. He was the first to give rules to compute with zero. In astronomy, he made significant contributions to the methods of calculating the position of heavenly bodies, their rising and setting, conjunctions, and the calculation of solar and lunar eclipses. He also argued that the Earth is spherical and attracts objects to itself.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'Bhaskara I',
    years: 'c. 600–680 CE',
    contribution: 'First to write numbers in the Hindu decimal system with a circle for zero. Wrote commentaries on Aryabhata\'s work.',
    details: 'Bhaskara I was a 7th-century Indian mathematician and astronomer who was the first to write numbers in the Hindu decimal system with a circle for the zero, and who gave a unique and remarkable rational approximation of the sine function in his commentary on Aryabhata\'s work. His most important astronomical works are the Mahabhaskariya and the Laghubhaskariya. He was a follower of the Aryabhata school of astronomy and helped popularize Aryabhata\'s astronomical system.',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    name: 'Bhaskara II',
    years: '1114–1185 CE',
    contribution: 'Authored Siddhanta Shiromani. Made significant discoveries in calculus and astronomy, calculating the time taken for Earth to orbit the sun.',
    details: 'Bhaskara II, also known as Bhaskaracharya, was an Indian mathematician and astronomer. His main work Siddhanta Shiromani ("Crown of Treatises") is divided into four parts called Lilavati, Bijaganita, Grahaganita and Goladhyaya, which are also sometimes considered four independent works. These four sections deal with arithmetic, algebra, mathematics of the planets, and spheres respectively. He made significant discoveries in the principles of differential calculus and its application to astronomical problems and computations.',
    image: 'https://images.unsplash.com/photo-1539321908154-04927596764d?auto=format&fit=crop&q=80&w=400&h=400',
  },
];

export default function Astronomers() {
  const [selectedAstronomer, setSelectedAstronomer] = useState<typeof astronomers[0] | null>(null);

  return (
    <section id="astronomers" className="py-24 bg-space-800 relative border-y border-space-700 overflow-hidden">
      {/* Decorative background stars */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-gold-400 rounded-full opacity-30 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Prominent <span className="text-gold-400">Astronomers</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The brilliant minds who mapped the heavens and laid the mathematical foundations of modern astronomy.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {astronomers.map((astronomer, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedAstronomer(astronomer)}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] group relative bg-space-900 rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-space-700 to-space-900 group-hover:from-gold-500/50 group-hover:to-space-900 transition-colors duration-500"></div>
              
              <div className="bg-space-900 h-full rounded-[23px] p-8 flex flex-col relative overflow-hidden z-10">
                {/* Subtle background glow on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-space-700 group-hover:border-gold-400 transition-colors duration-500 mb-4 relative">
                    <div className="absolute inset-0 bg-gold-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                    <img 
                      src={astronomer.image} 
                      alt={astronomer.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors duration-300">{astronomer.name}</h3>
                  <div className="flex items-center gap-1.5 mt-2 bg-space-800 px-3 py-1 rounded-full border border-space-700 group-hover:border-gold-500/30 transition-colors duration-300">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    <p className="text-gold-400 text-xs font-mono tracking-wider uppercase">{astronomer.years}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-space-700 group-hover:via-gold-500/30 to-transparent mb-6 transition-colors duration-500"></div>

                <p className="text-slate-400 text-sm leading-relaxed flex-grow relative z-10 group-hover:text-slate-300 transition-colors duration-300 text-center">
                  {astronomer.contribution}
                </p>
                
                <div className="mt-6 text-center">
                  <span className="text-gold-500 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Read More</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedAstronomer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAstronomer(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-900/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-space-800 border border-space-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedAstronomer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-space-700/50 text-slate-300 hover:text-white hover:bg-space-700 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-space-800 to-transparent z-10"></div>
                  <img 
                    src={selectedAstronomer.image} 
                    alt={selectedAstronomer.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-8 md:w-3/5 relative z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <p className="text-gold-400 text-sm font-mono tracking-wider uppercase">{selectedAstronomer.years}</p>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-6">{selectedAstronomer.name}</h3>
                  
                  <div className="space-y-4">
                    <p className="text-slate-300 font-medium leading-relaxed">
                      {selectedAstronomer.contribution}
                    </p>
                    <div className="w-12 h-px bg-gold-500/30"></div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {selectedAstronomer.details}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
