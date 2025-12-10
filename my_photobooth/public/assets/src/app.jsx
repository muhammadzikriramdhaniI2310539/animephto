import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, Check, Star, Zap, Flame, Users, User, Camera, Image as ImageIcon } from 'lucide-react';

const App = () => {
  // ==================================================================================
  // 🟢 1. KONFIGURASI DATA (EDIT BAGIAN INI UNTUK CUSTOM KONTEN)
  // ==================================================================================

  // A. Pilihan Layout (Strip Foto)
  const layouts = [
    { 
      id: 'classic', 
      name: 'The Classic', 
      type: 'vertical', 
      desc: 'Vertical 4-cut strip.' // Strip memanjang ke bawah
    },
    { 
      id: 'grid', 
      name: 'The Grid', 
      type: 'grid', 
      desc: '2x2 Collage.' // Kotak 2 baris 2 kolom
    },
    { 
      id: 'cinema', 
      name: 'The Cinema', 
      type: 'horizontal', 
      desc: 'Wide 4-shot sequence.' // Strip memanjang ke samping
    }
  ];

  // B. Pilihan Mode (Polos vs Karakter)
  const modes = [
    { 
      id: 'original', 
      name: 'Aestho Original', 
      desc: 'Minimalist blank canvas.', 
      icon: <Star className="w-8 h-8"/>, 
      style: 'bg-white text-black border-gray-200' 
    },
    { 
      id: 'character', 
      name: 'Character Collab', 
      desc: 'Pose with idols & anime chars.', 
      icon: <Users className="w-8 h-8"/>, 
      style: 'bg-black text-white border-black hover:shadow-xl' 
    }
  ];

  // C. DATA ANIME & FRAME LOKAL
  // 🔴 PENTING: Pastikan file gambar (.png) sudah ada di folder public/assets/frames/...
  const animeOptions = [
    {
      id: 'jjk', 
      name: 'Jujutsu Kaisen', 
      // Logo URL bisa diganti dengan path lokal juga jika mau
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Jujutsu_Kaisen_logo.svg/1280px-Jujutsu_Kaisen_logo.svg.png',
      color: 'hover:shadow-purple-900/50', 
      icon: <Flame className="text-purple-800"/>,
      characters: [
        // Ganti 'frameImg' dengan lokasi file Anda di komputer (folder public)
        { id: 'gojo', name: 'Gojo Satoru', frameImg: '/assets/frames/jjk/gojo.png', theme: 'bg-purple-50' }, 
        { id: 'yuji', name: 'Yuji Itadori', frameImg: '/assets/frames/jjk/yuji.png', theme: 'bg-red-50' },
        { id: 'nobara', name: 'Nobara Kugisaki', frameImg: '/assets/frames/jjk/nobara.png', theme: 'bg-orange-50' },
        { id: 'megumi', name: 'Megumi Fushiguro', frameImg: '/assets/frames/jjk/megumi.png', theme: 'bg-blue-50' }
      ]
    },
    {
      id: 'genshin', 
      name: 'Genshin Impact', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_logo.svg/2560px-Genshin_Impact_logo.svg.png',
      color: 'hover:shadow-blue-400/50', 
      icon: <Star className="text-blue-500"/>,
      characters: [
        { id: 'furina', name: 'Furina', frameImg: '/assets/frames/genshin/furina.png', theme: 'bg-blue-50' },
        { id: 'zhongli', name: 'Zhongli', frameImg: '/assets/frames/genshin/zhongli.png', theme: 'bg-yellow-50' },
        { id: 'raiden', name: 'Raiden Shogun', frameImg: '/assets/frames/genshin/raiden.png', theme: 'bg-purple-50' },
        { id: 'nahida', name: 'Nahida', frameImg: '/assets/frames/genshin/nahida.png', theme: 'bg-green-50' }
      ]
    },
    {
      id: 'bluelock', 
      name: 'Blue Lock', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blue_Lock_Logo.svg/1200px-Blue_Lock_Logo.svg.png', 
      color: 'hover:shadow-cyan-600/50', 
      icon: <Zap className="text-cyan-600"/>,
      characters: [
        { id: 'isagi', name: 'Yoichi Isagi', frameImg: '/assets/frames/bluelock/isagi.png', theme: 'bg-cyan-50' },
        { id: 'bachira', name: 'Meguru Bachira', frameImg: '/assets/frames/bluelock/bachira.png', theme: 'bg-yellow-100' },
        { id: 'nagi', name: 'Seishiro Nagi', frameImg: '/assets/frames/bluelock/nagi.png', theme: 'bg-gray-100' },
        { id: 'rin', name: 'Rin Itoshi', frameImg: '/assets/frames/bluelock/rin.png', theme: 'bg-teal-50' }
      ]
    }
  ];

  // ==================================================================================
  // 🔵 2. LOGIC APLIKASI (JANGAN UBAH KECUALI PAHAM REACT)
  // ==================================================================================

  const [currentView, setCurrentView] = useState('home'); // home -> layout -> mode -> anime -> frame
  const [started, setStarted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // State Pilihan User
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  // Helper Data
  const currentLayoutData = layouts.find(l => l.id === selectedLayout);
  const currentAnimeData = animeOptions.find(a => a.id === selectedAnime);

  // Transisi Halaman
  const triggerTransition = (callback) => {
    setStarted(true);
    setTimeout(() => {
      callback();
      setStarted(false);
    }, 800);
  };

  // Navigasi Handlers
  const handleStart = () => triggerTransition(() => setCurrentView('layout'));
  
  const handleLayoutConfirm = () => {
    if (selectedLayout) triggerTransition(() => setCurrentView('mode'));
  };

  const handleModeConfirm = () => {
    if (selectedMode === 'original') {
      // Disini logika masuk ke kamera untuk mode original
      // alert("Memulai Sesi Original (Tanpa Karakter)...");
      triggerTransition(() => setCurrentView('camera-placeholder')); // Placeholder view logic
    } else if (selectedMode === 'character') {
      triggerTransition(() => setCurrentView('anime'));
    }
  };

  const handleAnimeSelect = (animeId) => {
    setSelectedAnime(animeId);
    triggerTransition(() => setCurrentView('frame'));
  };

  const handleFrameConfirm = () => {
    // alert(`SIAP MEMOTRET!\nLayout: ${selectedLayout}\nAnime: ${selectedAnime}\nKarakter: ${selectedFrame}`);
    // Disini logika masuk ke kamera sesungguhnya
    triggerTransition(() => setCurrentView('camera-placeholder'));
  };

  // Back Handlers
  const handleBackToHome = () => { setCurrentView('home'); setSelectedLayout(null); };
  const handleBackToLayout = () => { setCurrentView('layout'); setSelectedMode(null); };
  const handleBackToMode = () => { setCurrentView('mode'); setSelectedAnime(null); };
  const handleBackToAnime = () => { setCurrentView('anime'); setSelectedFrame(null); };

  // ==================================================================================
  // 🟠 3. TAMPILAN (RENDER)
  // ==================================================================================
  return (
    <div className="relative w-full h-screen bg-[#FDFDFD] overflow-hidden font-sans selection:bg-black selection:text-white">
      
      {/* Styles & Fonts Internal */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Niconne&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Syncopate:wght@400;700&display=swap');
        .font-title { font-family: 'Niconne', cursive; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-modern { font-family: 'Syncopate', sans-serif; }
        
        .grain-overlay {
          position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; pointer-events: none; z-index: 40; opacity: 0.09;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
        }
        @keyframes grain { 0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-5%, -10%); } 50% { transform: translate(-15%, 10%); } }
        @keyframes flash { 0% { opacity: 1; } 50% { opacity: 1; background: white; } 100% { opacity: 0; } }
        .camera-flash { animation: flash 1s ease-in-out forwards; }
        
        /* Animation Utilities */
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Background FX */}
      <div className="grain-overlay mix-blend-multiply"></div>
      <div className="absolute inset-4 md:inset-8 border border-black/10 pointer-events-none z-20 flex flex-col justify-between p-4">
        <div className="flex justify-between w-full opacity-50"><Plus size={16}/><Plus size={16}/></div>
        <div className="flex justify-between w-full opacity-50"><Plus size={16}/><Plus size={16}/></div>
      </div>

      {/* --- VIEW 1: HOME --- */}
      {currentView === 'home' && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full text-center animate-fade-in">
           <div className="relative mb-4 cursor-default select-none">
               <h1 className="font-title text-[6rem] md:text-[8rem] leading-none text-black z-10 relative">Aestho</h1>
               <h1 className="font-title text-[6rem] md:text-[8rem] leading-none text-black/5 absolute top-2 left-2 blur-sm">Aestho</h1>
           </div>
           <p className="font-serif text-xl text-black/70 mb-12 italic tracking-wider">"Collecting moments, frame by frame."</p>
           <button onClick={handleStart} className="group relative px-6 py-2 uppercase font-modern text-sm tracking-[0.3em] border-b border-black/20 hover:border-black transition-all">
             Enter Studio
           </button>
        </main>
      )}

      {/* --- VIEW 2: LAYOUT SELECTION --- */}
      {currentView === 'layout' && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full w-full px-6 animate-fade-in-up">
            <h2 className="font-serif text-4xl italic text-black mb-12">Choose Canvas</h2>
            <div className="flex gap-8 items-center justify-center mb-16 flex-wrap">
                {layouts.map((l) => (
                    <div key={l.id} onClick={() => setSelectedLayout(l.id)} 
                      className={`cursor-pointer flex flex-col items-center gap-4 transition-all duration-300 ${selectedLayout === l.id ? 'scale-105 opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                        <div className={`border border-gray-300 bg-white p-2 shadow-sm ${l.type === 'vertical' ? 'w-20 h-56 flex flex-col gap-1' : l.type === 'grid' ? 'w-40 h-40 grid grid-cols-2 gap-1' : 'w-56 h-20 flex gap-1'}`}>
                             {[...Array(4)].map((_,i) => <div key={i} className="w-full h-full bg-gray-100 border border-dashed border-gray-200"></div>)}
                        </div>
                        <span className="font-modern text-[10px] tracking-widest uppercase">{l.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex gap-8">
                 <button onClick={handleBackToHome} className="font-modern text-[10px] text-gray-400 hover:text-black uppercase">Back</button>
                 {selectedLayout && <button onClick={handleLayoutConfirm} className="bg-black text-white px-6 py-2 font-modern text-[10px] uppercase hover:bg-gray-800">Next</button>}
            </div>
        </main>
      )}

      {/* --- VIEW 3: MODE SELECTION --- */}
      {currentView === 'mode' && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full w-full px-6 animate-fade-in-up">
            <h2 className="font-serif text-4xl italic text-black mb-12">Select Style</h2>
            <div className="flex gap-6 mb-16 flex-wrap justify-center">
                {modes.map((m) => (
                      <div key={m.id} onClick={() => setSelectedMode(m.id)} 
                        className={`cursor-pointer border rounded-xl p-8 w-64 text-center transition-all ${m.style} ${selectedMode === m.id ? 'ring-2 ring-offset-2 ring-gray-300 scale-105' : 'opacity-70 hover:opacity-100'}`}>
                        <div className="mb-4 flex justify-center">{m.icon}</div>
                        <h3 className="font-modern text-sm font-bold uppercase mb-2">{m.name}</h3>
                        <p className="font-serif text-sm italic opacity-80">{m.desc}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-8">
                 <button onClick={handleBackToLayout} className="font-modern text-[10px] text-gray-400 hover:text-black uppercase">Back</button>
                 {selectedMode && <button onClick={handleModeConfirm} className="bg-black text-white px-6 py-2 font-modern text-[10px] uppercase hover:bg-gray-800">Next</button>}
            </div>
        </main>
      )}

      {/* --- VIEW 4: ANIME SELECTION --- */}
      {currentView === 'anime' && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full w-full px-6 animate-fade-in-up">
            <h2 className="font-serif text-4xl italic text-black mb-12">Pick Partner</h2>
            <div className="flex gap-6 mb-16 flex-wrap justify-center">
                {animeOptions.map((a) => (
                    <div key={a.id} onClick={() => handleAnimeSelect(a.id)} 
                        className={`cursor-pointer border border-gray-200 rounded-xl p-6 w-48 h-56 flex flex-col items-center justify-between bg-white transition-all ${a.color} hover:border-black hover:scale-105`}>
                         <div className="opacity-50">{a.icon}</div>
                         <img src={a.logoUrl} alt={a.name} className="max-w-[80%] max-h-20 object-contain grayscale hover:grayscale-0 transition-all"/>
                         <span className="font-modern text-[10px] font-bold uppercase tracking-widest">{a.name}</span>
                    </div>
                ))}
            </div>
            <button onClick={handleBackToMode} className="font-modern text-[10px] text-gray-400 hover:text-black uppercase">Back</button>
        </main>
      )}

      {/* --- VIEW 5: FRAME SELECTION (LOCAL ASSETS VISUALIZER) --- */}
      {currentView === 'frame' && currentAnimeData && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full w-full px-4 md:px-12 animate-fade-in-up">
            
            <div className="text-center mb-8">
                <p className="font-modern text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-2">Selected Layout: {currentLayoutData?.name}</p>
                <h2 className="font-serif text-4xl italic text-black">Choose {currentAnimeData.name} Frame</h2>
            </div>

            {/* STRIP CONTAINER - SCROLLABLE */}
            <div className="w-full overflow-x-auto pb-8 flex justify-center">
                <div className="flex gap-8 md:gap-12 px-4">
                    {currentAnimeData.characters.map((char) => (
                        <div key={char.id} onClick={() => setSelectedFrame(char.id)} className="group cursor-pointer flex flex-col items-center gap-4 min-w-max">
                            
                            {/* VISUALISASI FRAME UTAMA */}
                            <div className={`
                                relative bg-white shadow-lg transition-all duration-300 overflow-hidden
                                ${selectedFrame === char.id ? 'ring-4 ring-black scale-105 shadow-2xl' : 'ring-1 ring-gray-200 shadow-md hover:shadow-xl'}
                                
                                /* UKURAN CONTAINER SESUAI LAYOUT YANG DIPILIH */
                                ${currentLayoutData.id === 'classic' ? 'w-24 h-[400px]' : ''}
                                ${currentLayoutData.id === 'grid' ? 'w-64 h-64' : ''}
                                ${currentLayoutData.id === 'cinema' ? 'w-[400px] h-28' : ''}
                            `}>
                                
                                {/* A. Layer Bawah: Placeholder Foto User (Abu-abu) */}
                                <div className={`absolute inset-0 w-full h-full z-0 
                                    ${currentLayoutData.id === 'classic' ? 'flex flex-col' : ''}
                                    ${currentLayoutData.id === 'grid' ? 'grid grid-cols-2' : ''}
                                    ${currentLayoutData.id === 'cinema' ? 'flex flex-row' : ''}
                                `}>
                                     {[...Array(4)].map((_, i) => (
                                         <div key={i} className="flex-1 w-full h-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                                              <Camera size={12} className="text-gray-300"/>
                                         </div>
                                     ))}
                                </div>

                                {/* B. Layer Atas: Frame Gambar Lokal (Transparan) */}
                                <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                                    <img 
                                        src={char.frameImg} 
                                        alt={char.name} 
                                        className="w-full h-full object-cover"
                                        // Handle Error Jika Gambar Belum Diupload
                                        onError={(e) => {
                                          e.target.style.display = 'none'; 
                                          e.target.parentNode.innerHTML = `<div class='flex items-center justify-center h-full w-full bg-red-50 text-red-500 text-[8px] p-2 text-center font-mono border-2 border-red-200'>MISSING FILE:<br/>${char.frameImg}</div>`;
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Label Nama Karakter */}
                            <div className="text-center">
                                <h3 className={`font-serif italic text-lg transition-colors ${selectedFrame === char.id ? 'text-black font-bold' : 'text-gray-400'}`}>
                                    {char.name}
                                </h3>
                                {selectedFrame === char.id && <div className="mt-1 w-1 h-1 bg-black rounded-full mx-auto"></div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-10 left-0 w-full flex justify-center gap-8 items-center bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4">
                 <button onClick={handleBackToAnime} className="font-modern text-[10px] text-gray-400 hover:text-black uppercase flex items-center gap-2">
                    <ArrowLeft size={12}/> Select Series
                 </button>
                {selectedFrame && (
                    <button onClick={handleFrameConfirm} className="bg-black text-white px-10 py-3 font-modern text-xs tracking-[0.2em] uppercase hover:bg-gray-800 shadow-xl transition-all hover:scale-105 flex items-center gap-3">
                        Start Session <ArrowRight size={12}/>
                    </button>
                )}
            </div>

        </main>
      )}

      {/* --- MOCKUP CAMERA VIEW (PLACEHOLDER) --- */}
      {currentView === 'camera-placeholder' && (
        <main className="relative z-30 flex flex-col items-center justify-center h-full w-full bg-black text-white">
            <h2 className="font-modern text-2xl animate-pulse">Camera Active</h2>
            <p className="text-gray-500 mt-2 font-mono text-xs">Simulating hardware access...</p>
            <div className="mt-8 flex gap-4">
                <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest">
                    Restart
                </button>
            </div>
        </main>
      )}

      {/* --- FLASH OVERLAY EFFECT --- */}
      {started && <div className="fixed inset-0 z-[100] camera-flash pointer-events-none bg-white"></div>}
    </div>
  );
};

export default App;