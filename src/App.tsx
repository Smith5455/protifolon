/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Articles from './components/Articles';
import Astronomers from './components/Astronomers';
import Observatories from './components/Observatories';
import StarCharts from './components/StarCharts';
import DidYouKnow from './components/DidYouKnow';
import Team from './components/Team';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-space-900 min-h-screen text-slate-300 font-sans selection:bg-gold-500/30 selection:text-gold-200">
      <Navbar />
      <main>
        <Hero />
        <Articles />
        <Astronomers />
        <Observatories />
        <StarCharts />
        <DidYouKnow />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
