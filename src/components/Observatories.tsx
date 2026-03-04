import React from 'react';
import { MapPin } from 'lucide-react';

const observatories = [
  {
    name: 'Ujjain Observatory',
    location: 'Madhya Pradesh',
    description: 'Also known as Vedh Shala, built by Maharaja Jai Singh II. Ujjain was considered the Greenwich of India, the prime meridian for ancient Hindu astronomers.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800&h=600', // Placeholder for Ujjain
  },
  {
    name: 'Delhi Jantar Mantar',
    location: 'New Delhi',
    description: 'Constructed in 1724, it houses 13 architectural astronomy instruments. The primary purpose was to compile astronomical tables and predict the times and movements of the sun, moon and planets.',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&q=80&w=800&h=600', // Placeholder for Delhi Jantar Mantar
  },
  {
    name: 'Jaipur Jantar Mantar',
    location: 'Rajasthan',
    description: 'A UNESCO World Heritage site featuring the world\'s largest stone sundial (Vrihat Samrat Yantra). It represents the culmination of ancient Indian observational astronomy.',
    image: 'https://images.unsplash.com/photo-1599661559684-d59473b38828?auto=format&fit=crop&q=80&w=800&h=600', // Placeholder for Jaipur Jantar Mantar
  },
];

export default function Observatories() {
  return (
    <section id="observatories" className="py-24 bg-space-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Ancient <span className="text-gold-400">Observatories</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Monumental structures built to measure the heavens with naked-eye precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {observatories.map((obs, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-space-800 border border-space-700">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img 
                  src={obs.image} 
                  alt={obs.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/60 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-gold-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">{obs.location}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{obs.name}</h3>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {obs.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
