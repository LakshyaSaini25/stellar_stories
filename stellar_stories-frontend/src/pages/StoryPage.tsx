// import React, { useState, useEffect, useRef } from 'react';
// import './StoryPage.css';
// import { ChevronLeft, ChevronRight, Play, Pause, User, Satellite, Zap, Cloud, Navigation, Sun, Activity } from 'lucide-react';

// // Types
// interface StoryStep {
//   id: number;
//   title: string;
//   content: string;
//   background: string;
//   character?: Character;
//   gif?: string;
//   icon: React.ElementType; // Icon for the flowchart dot
// }

// interface Character {
//   id: number;
//   name: string;
//   role: string;
//   image: string;
//   color: string;
//   message: string;
// }

// // Define characters first to avoid scope issues
// const characters: Character[] = [
//   {
//     id: 1,
//     name: "Raj Kumar",
//     role: "Farmer",
//     image: "👨‍🌾",
//     color: "#2ECC71",
//     message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized."
//   },
//   {
//     id: 2,
//     name: "Dr. Elena Rodriguez",
//     role: "Astronaut",
//     image: "👩‍🚀",
//     color: "#3498DB",
//     message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!"
//   },
//   {
//     id: 3,
//     name: "Mike Chen",
//     role: "Power Grid Operator",
//     image: "👨‍💼",
//     color: "#E74C3C",
//     message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions."
//   },
//   {
//     id: 4,
//     name: "Captain Sarah Johnson",
//     role: "Airline Pilot",
//     image: "👩‍✈",
//     color: "#9B59B6",
//     message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance."
//   }
// ];

// const storySteps: StoryStep[] = [
//   {
//     id: 1,
//     title: "The Sun Awakens: What is Space Weather?",
//     content: "Space weather is all the changes in space caused by the Sun, like solar flares and CMEs. It's a cosmic storm that can reach Earth!",
//     background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
//     gif: "https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif",
//     icon: Sun,
//   },
//   {
//     id: 2,
//     title: "Coronal Mass Ejection: The Storm Begins",
//     content: "A billion-ton cloud of plasma, a Coronal Mass Ejection (CME), is hurled toward Earth. This powerful burst of energy carries the potential to disrupt many systems on our planet.",
//     background: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
//     icon: Cloud,
//   },
//   {
//     id: 3,
//     title: "Earth's Magnetic Shield & Auroras",
//     content: "Our planet's magnetic field mostly protects us, but the remaining energy creates beautiful 'Northern Lights' (auroras) and also impacts systems on and around Earth.",
//     background: "linear-gradient(135deg, #007cf0 0%, #00dfd8 100%)",
//     gif: "https://media.giphy.com/media/3o7abGQa0aRsohveX6/giphy.gif",
//     icon: Satellite,
//   },
//   {
//     id: 4,
//     title: "Raj Kumar: Farmer's Navigation Chaos",
//     content: "Raj's satellite-based irrigation system fails due to GPS signal disruption caused by the storm. Accurate farming depends on accurate space technology!",
//     background: "linear-gradient(135deg, #2ecc71 0%, #3498db 100%)",
//     character: characters[0], // Farmer
//     icon: User,
//   },
//   {
//     id: 5,
//     title: "Dr. Rodriguez: Astronaut in Danger",
//     content: "Astronauts like Dr. Rodriguez must take shelter in radiation-shielded areas as the CME increases radiation exposure outside Earth's protective atmosphere.",
//     background: "linear-gradient(135deg, #e74c3c 0%, #ff0080 100%)",
//     character: characters[1], // Astronaut
//     icon: User,
//   },
//   {
//     id: 6,
//     title: "Mike Chen: Power Grid Protection",
//     content: "Mike, the power grid operator, works hard to prevent massive blackouts, as the geomagnetic storm induces currents that can fry transformers and power systems.",
//     background: "linear-gradient(135deg, #ff4b1f 0%, #ff9068 100%)",
//     character: characters[2], // Power Grid Operator
//     icon: Zap,
//   },
//   {
//     id: 7,
//     title: "Captain Johnson: Pilot Switches Gear",
//     content: "With GPS accuracy severely compromised, Captain Johnson relies on traditional navigation to safely land the plane. Communication systems are also affected!",
//     background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
//     character: characters[3], // Pilot
//     icon: Navigation,
//   },
//   {
//     id: 8,
//     title: "The Storm Passes: Lessons Learned",
//     content: "The space weather event subsides. Scientists worldwide share data, helping us understand and prepare better for the next solar storm. The cycle of the sun continues!",
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     gif: "https://media.giphy.com/media/l4HnKwiJJaJQB04Zq/giphy.gif",
//     icon: Activity,
//   }
// ];

// const StoryPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [direction, setDirection] = useState<'right' | 'left' | 'none'>('none');
//   const animationRef = useRef<number>();

//   // Auto-play and progress functionality (Kept from original, but simplified)
//   useEffect(() => {
//     // ... (same auto-play logic as original) ...
//     if (isPlaying) {
//       const stepDuration = 5000; // 5 seconds per step
//       let lastTime = performance.now();

//       const animateProgress = (time: number) => {
//         const delta = time - lastTime;
//         lastTime = time;

//         setProgress(prev => {
//           let newProgress = prev + (delta / stepDuration) * 100;
//           if (newProgress >= 100) {
//             handleNext();
//             return 0;
//           }
//           return newProgress;
//         });

//         animationRef.current = requestAnimationFrame(animateProgress);
//       };

//       animationRef.current = requestAnimationFrame(animateProgress);
//     } else {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPlaying]);


//   const handleNext = () => {
//     setDirection('left');
//     setCurrentStep(prev => (prev + 1) % storySteps.length);
//     setProgress(0);
//   };

//   const handlePrev = () => {
//     setDirection('right');
//     setCurrentStep(prev => (prev - 1 + storySteps.length) % storySteps.length);
//     setProgress(0);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const goToStep = (stepIndex: number) => {
//     if (stepIndex > currentStep) {
//       setDirection('left');
//     } else if (stepIndex < currentStep) {
//       setDirection('right');
//     } else {
//       setDirection('none');
//     }
//     setCurrentStep(stepIndex);
//     setProgress(0);
//     setIsPlaying(false);
//   };

//   const currentStory = storySteps[currentStep];
//   const animationClass = direction === 'left' ? 'slide-in-right' : direction === 'right' ? 'slide-in-left' : '';

//   // Custom Flowchart component
//   const FlowChart = () => (
//     <div className="flowchart-container">
//       {storySteps.map((step, index) => {
//         const Icon = step.icon;
//         const isActive = index === currentStep;
//         const isPast = index < currentStep;

//         return (
//           <React.Fragment key={step.id}>
//             <div 
//               className={flowchart-step ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}}
//               onClick={() => goToStep(index)}
//               title={step.title}
//             >
//               <div className="flowchart-dot">
//                 <Icon size={20} />
//               </div>
//               <span className="flowchart-label">Step {index + 1}</span>
//             </div>
//             {index < storySteps.length - 1 && (
//               <div 
//                 className={flowchart-connector ${isPast ? 'passed' : ''}}
//                 style={{ '--connector-progress': index === currentStep ? ${progress}% : '0%' } as React.CSSProperties}
//               >
//                 {/* Visual line/dots */}
//               </div>
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div className="story-container">
//       {/* Animated Background Stars & Moving Dots (Kept from original) */}
//       <div className="stars-background"></div>
//       <div className="moving-dots">
//         {[...Array(20)].map((_, i) => (
//           <div key={i} className="dot" style={{ animationDelay: ${i * 0.5}s, left: ${Math.random() * 100}vw, top: ${Math.random() * 100}vh }} />
//         ))}
//       </div>

//       <div className="story-content" style={{ background: currentStory.background }}>

//         {/* Flowchart Overlay */}
//         <FlowChart />

//         {/* Story Card - Apply 'car window' animation class */}
//         <div className={story-card ${animationClass}} key={currentStep}>

//           {/* Animated GIF/Tile */}
//           {currentStory.gif && (
//             <div className="story-gif">
//               <img src={currentStory.gif} alt={currentStory.title} />
//             </div>
//           )}

//           {/* Content */}
//           <div className="story-text">
//             <h2 className="story-title">{currentStory.title}</h2>
//             <p className="story-description">{currentStory.content}</p>
//           </div>

//           {/* Character Spotlight */}
//           {currentStory.character && (
//             <div className="character-spotlight">
//               <div className="spotlight-backdrop"></div>
//               <div className="character-card" style={{ borderColor: currentStory.character.color }}>
//                 <div className="character-avatar" style={{ backgroundColor: currentStory.character.color }}>
//                   {currentStory.character.image}
//                 </div>
//                 <div className="character-info">
//                   <h4>{currentStory.character.name}</h4>
//                   <span>{currentStory.character.role}</span>
//                 </div>
//                 <div className="character-message">
//                   <div className="message-bubble" style={{ backgroundColor: currentStory.character.color }}>
//                     {currentStory.character.message}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Controls */}
//         <div className="story-controls">
//           <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
//             <ChevronLeft size={24} />
//           </button>

//           <button onClick={togglePlay} className="play-btn">
//             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//           </button>

//           <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Progress Bar (Visible only when playing) */}
//         {isPlaying && (
//             <div className="progress-container">
//                 <div 
//                 className="progress-bar" 
//                 style={{ width: ${progress}% }}
//                 ></div>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StoryPage;

















// import React, { useState, useEffect, useRef } from 'react';
// import './StoryPage.css';
// import { ChevronLeft, ChevronRight, Play, Pause, User, Satellite, Zap, Cloud, Navigation, Sun, Activity, ArrowRight } from 'lucide-react';

// // Types
// interface StoryStep {
//   id: number;
//   title: string;
//   content: string;
//   background: string;
//   character?: Character;
//   gif?: string;
//   icon: React.ElementType; 
// }

// interface Character {
//   id: number;
//   name: string;
//   role: string;
//   image: string;
//   color: string;
//   message: string;
// }

// // Define characters first
// const characters: Character[] = [
//   {
//     id: 1,
//     name: "Raj Kumar",
//     role: "Farmer",
//     image: "👨‍🌾",
//     color: "#2ECC71",
//     message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized."
//   },
//   {
//     id: 2,
//     name: "Dr. Elena Rodriguez",
//     role: "Astronaut",
//     image: "👩‍🚀",
//     color: "#3498DB",
//     message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!"
//   },
//   {
//     id: 3,
//     name: "Mike Chen",
//     role: "Power Grid Operator",
//     image: "👨‍💼",
//     color: "#E74C3C",
//     message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions."
//   },
//   {
//     id: 4,
//     name: "Captain Sarah Johnson",
//     role: "Airline Pilot",
//     image: "👩‍✈",
//     color: "#9B59B6",
//     message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance."
//   }
// ];

// // Story data with unique backgrounds and icons
// const storySteps: StoryStep[] = [
//   {
//     id: 1,
//     title: "The Sun Awakens: What is Space Weather?",
//     content: "Space weather is all the changes in space caused by the Sun, like solar flares and CMEs. It's a cosmic storm that can reach Earth!",
//     background: "#ff6b35", // Solid color for simpler transition
//     gif: "https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif",
//     icon: Sun,
//   },
//   {
//     id: 2,
//     title: "Coronal Mass Ejection: The Storm Begins",
//     content: "A billion-ton cloud of plasma, a Coronal Mass Ejection (CME), is hurled toward Earth. This powerful burst of energy carries the potential to disrupt many systems.",
//     background: "#8e2de2",
//     icon: Cloud,
//   },
//   {
//     id: 3,
//     title: "Earth's Magnetic Shield & Auroras",
//     content: "Our magnetic field mostly protects us, but the remaining energy creates beautiful 'Northern Lights' (auroras) and also impacts systems on and around Earth.",
//     background: "#007cf0",
//     gif: "https://media.giphy.com/media/3o7abGQa0aRsohveX6/giphy.gif",
//     icon: Satellite,
//   },
//   {
//     id: 4,
//     title: "Raj Kumar: Farmer's Navigation Chaos",
//     content: "Raj's satellite-based irrigation system fails due to GPS signal disruption caused by the storm. Accurate farming depends on accurate space technology!",
//     background: "#2ecc71",
//     character: characters[0], 
//     icon: User,
//   },
//   {
//     id: 5,
//     title: "Dr. Rodriguez: Astronaut in Danger",
//     content: "Astronauts like Dr. Rodriguez must take shelter in radiation-shielded areas as the CME increases radiation exposure outside Earth's protective atmosphere.",
//     background: "#e74c3c",
//     character: characters[1], 
//     icon: User,
//   },
//   {
//     id: 6,
//     title: "Mike Chen: Power Grid Protection",
//     content: "Mike, the power grid operator, works hard to prevent massive blackouts, as the geomagnetic storm induces currents that can fry transformers.",
//     background: "#ff4b1f",
//     character: characters[2], 
//     icon: Zap,
//   },
//   {
//     id: 7,
//     title: "Captain Johnson: Pilot Switches Gear",
//     content: "With GPS accuracy compromised, Captain Johnson relies on traditional navigation to safely land the plane. Communication systems are also affected!",
//     background: "#11998e",
//     character: characters[3], 
//     icon: Navigation,
//   },
//   {
//     id: 8,
//     title: "The Storm Passes: Lessons Learned",
//     content: "The space weather event subsides. Scientists worldwide share data, helping us understand and prepare better for the next solar storm. The cycle continues!",
//     background: "#667eea",
//     gif: "https://media.giphy.com/media/l4HnKwiJJaJQB04Zq/giphy.gif",
//     icon: Activity,
//   }
// ];

// const stepWidth = 900; // Define a consistent width for steps to calculate transform

// const StoryPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const animationRef = useRef<number>();

//   // Auto-play and progress functionality
//   useEffect(() => {
//     if (isPlaying) {
//       const stepDuration = 5000; // 5 seconds per step
//       let lastTime = performance.now();

//       const animateProgress = (time: number) => {
//         const delta = time - lastTime;
//         lastTime = time;

//         setProgress(prev => {
//           let newProgress = prev + (delta / stepDuration) * 100;
//           if (newProgress >= 100) {
//             handleNext();
//             return 0;
//           }
//           return newProgress;
//         });

//         animationRef.current = requestAnimationFrame(animateProgress);
//       };

//       animationRef.current = requestAnimationFrame(animateProgress);
//     } else {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPlaying]);


//   const handleNext = () => {
//     if (currentStep < storySteps.length - 1) {
//       setCurrentStep(prev => prev + 1);
//       setProgress(0);
//     } else {
//         setIsPlaying(false);
//         setProgress(100); // Stay at the end
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 0) {
//       setCurrentStep(prev => prev - 1);
//       setProgress(0);
//     }
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const goToStep = (stepIndex: number) => {
//     setCurrentStep(stepIndex);
//     setProgress(0);
//     setIsPlaying(false);
//   };

//   // Calculate the CSS transform value for the Story Map Container
//   // We offset by 50vw to center the current step in the viewport (assuming stepWidth is less than 100vw)
//   const translateX = calc(-${currentStep * stepWidth}px + 50vw - ${stepWidth / 2}px);

//   return (
//     <div className="story-container">
//       {/* Animated Background Stars & Moving Dots */}
//       <div className="stars-background"></div>
//       <div className="moving-dots">
//         {[...Array(30)].map((_, i) => (
//           <div 
//             key={i} 
//             className="dot" 
//             style={{ 
//               animationDelay: ${i * 0.3}s, 
//               left: ${Math.random() * 100}vw, 
//               top: ${Math.random() * 100}vh,
//               animationDuration: ${3 + Math.random() * 2}s
//             }} 
//           />
//         ))}
//       </div>

//       {/* --- Fixed Controls and UI (Always Visible) --- */}
//       <div className="fixed-ui-wrapper">

//         {/* Controls */}
//         <div className="story-controls">
//           <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
//             <ChevronLeft size={24} />
//           </button>

//           <button onClick={togglePlay} className="play-btn">
//             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//           </button>

//           <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Progress Bar (Global story progress) */}
//         <div className="global-progress-container">
//           <div 
//             className="global-progress-bar" 
//             style={{ width: ${((currentStep) / (storySteps.length - 1)) * 100}% }}
//           ></div>
//         </div>
//       </div>


//       {/* --- The Dynamic Story Map --- */}
//       <div 
//         className="story-map-container" 
//         style={{ transform: translateX(${translateX}) }}
//       >
//         {storySteps.map((step, index) => {
//           const isCurrent = index === currentStep;
//           const StepIcon = step.icon;

//           return (
//             <React.Fragment key={step.id}>
//               {/* Individual Story Block */}
//               <div 
//                 className={story-block ${isCurrent ? 'active' : ''}}
//                 style={{ 
//                     '--step-bg-color': step.background,
//                     width: ${stepWidth}px
//                 } as React.CSSProperties}
//                 onClick={() => goToStep(index)}
//               >
//                 <div className="block-content">
//                   <div className="block-icon">
//                     <StepIcon size={40} color={isCurrent ? '#667eea' : 'white'} />
//                   </div>
//                   <h2 className="block-title">{step.title}</h2>
//                   <p className="block-description">{step.content}</p>
//                 </div>

//                 {/* Character Spotlight */}
//                 {step.character && (
//                   <div className="character-spotlight" style={{ borderColor: step.character.color }}>
//                     <div className="character-avatar" style={{ backgroundColor: step.character.color }}>
//                       {step.character.image}
//                     </div>
//                     <div className="character-message-box">
//                         <span style={{ color: step.character.color }}>{step.character.name}: </span>
//                         {step.character.message}
//                     </div>
//                   </div>
//                 )}

//                 {/* Animated GIF/Tile */}
//                 {step.gif && (
//                   <div className="story-gif">
//                     <img src={step.gif} alt={step.title} />
//                   </div>
//                 )}

//                 {/* Local Step Progress Bar */}
//                 {isCurrent && (
//                     <div className="local-progress-container">
//                         <div 
//                         className="local-progress-bar" 
//                         style={{ width: ${progress}% }}
//                         ></div>
//                     </div>
//                 )}
//               </div>

//               {/* Connector Arrow */}
//               {index < storySteps.length - 1 && (
//                 <div className={connector-arrow ${index < currentStep ? 'passed' : ''}}>
//                     <ArrowRight size={60} color="rgba(255, 255, 255, 0.7)" />
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default StoryPage;
















// // src/components/StoryPage.tsx

// import React, { useState, useEffect, useRef } from 'react';
// // './StoryPage.css' import is handled below
// import { ChevronLeft, ChevronRight, Play, Pause, User, Satellite, Zap, Cloud, Navigation, Sun, Activity, ArrowRight } from 'lucide-react';
// import './StoryPage.css'; // Ensure this is imported

// // --- TYPES & DATA (Kept as provided) ---
// interface StoryStep {
//     id: number;
//     title: string;
//     content: string;
//     background: string; // Solid color for the card
//     character?: Character;
//     gif?: string;
//     icon: React.ElementType;
// }

// interface Character {
//     id: number;
//     name: string;
//     role: string;
//     image: string;
//     color: string;
//     message: string;
// }

// const characters: Character[] = [
//     { id: 1, name: "Raj Kumar", role: "Farmer", image: "👨‍🌾", color: "#2ECC71", message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized." },
//     { id: 2, name: "Dr. Elena Rodriguez", role: "Astronaut", image: "👩‍🚀", color: "#3498DB", message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!" },
//     { id: 3, name: "Mike Chen", role: "Power Grid Operator", image: "👨‍💼", color: "#E74C3C", message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions." },
//     { id: 4, name: "Captain Sarah Johnson", role: "Airline Pilot", image: "👩‍✈", color: "#9B59B6", message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance." }
// ];

// const storySteps: StoryStep[] = [
//     { id: 1, title: "The Sun Awakens: What is Space Weather?", content: "Space weather is all the changes in space caused by the Sun, like solar flares and CMEs. It's a cosmic storm that can reach Earth!", background: "#ff6b35", gif: "https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif", icon: Sun },
//     { id: 2, title: "Coronal Mass Ejection: The Storm Begins", content: "A billion-ton cloud of plasma, a Coronal Mass Ejection (CME), is hurled toward Earth. This powerful burst of energy carries the potential to disrupt many systems.", background: "#8e2de2", icon: Cloud },
//     { id: 3, title: "Earth's Magnetic Shield & Auroras", content: "Our magnetic field mostly protects us, but the remaining energy creates beautiful 'Northern Lights' (auroras) and also impacts systems on and around Earth.", background: "#007cf0", gif: "https://media.giphy.com/media/3o7abGQa0aRsohveX6/giphy.gif", icon: Satellite },
//     { id: 4, title: "Raj Kumar: Farmer's Navigation Chaos", content: "Raj's satellite-based irrigation system fails due to GPS signal disruption caused by the storm. Accurate farming depends on accurate space technology!", background: "#2ecc71", character: characters[0], icon: User },
//     { id: 5, title: "Dr. Rodriguez: Astronaut in Danger", content: "Astronauts like Dr. Rodriguez must take shelter in radiation-shielded areas as the CME increases radiation exposure outside Earth's protective atmosphere.", background: "#e74c3c", character: characters[1], icon: User },
//     { id: 6, title: "Mike Chen: Power Grid Protection", content: "Mike, the power grid operator, works hard to prevent massive blackouts, as the geomagnetic storm induces currents that can fry transformers.", background: "#ff4b1f", character: characters[2], icon: Zap },
//     { id: 7, title: "Captain Johnson: Pilot Switches Gear", content: "With GPS accuracy compromised, Captain Johnson relies on traditional navigation to safely land the plane. Communication systems are also affected!", background: "#11998e", character: characters[3], icon: Navigation },
//     { id: 8, title: "The Storm Passes: Lessons Learned", content: "The space weather event subsides. Scientists worldwide share data, helping us understand and prepare better for the next solar storm. The cycle continues!", background: "#667eea", gif: "https://media.giphy.com/media/l4HnKwiJJaJQB04Zq/giphy.gif", icon: Activity }
// ];

// const STORY_CARD_WIDTH = 450; // Card width for desktop view
// const CONNECTOR_WIDTH = 100; // Space between cards

// const StoryPage: React.FC = () => {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const animationRef = useRef<number>();

//     // --- BUG FIX 1: Auto-play/Progress Logic (Same as previous correct logic) ---
//     useEffect(() => {
//         if (isPlaying) {
//             const stepDuration = 5000;
//             let lastTime = performance.now();

//             const animateProgress = (time: number) => {
//                 const delta = time - lastTime;
//                 lastTime = time;

//                 setProgress(prev => {
//                     let newProgress = prev + (delta / stepDuration) * 100;
//                     if (newProgress >= 100) {
//                         handleNext();
//                         return 0;
//                     }
//                     return newProgress;
//                 });

//                 animationRef.current = requestAnimationFrame(animateProgress);
//             };

//             animationRef.current = requestAnimationFrame(animateProgress);
//         } else {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         }

//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         };
//     }, [isPlaying]);


//     const handleNext = () => {
//         if (currentStep < storySteps.length - 1) {
//             setCurrentStep(prev => prev + 1);
//             setProgress(0);
//         } else {
//             setIsPlaying(false);
//             setProgress(100);
//         }
//     };

//     const handlePrev = () => {
//         if (currentStep > 0) {
//             setCurrentStep(prev => prev - 1);
//             setProgress(0);
//         }
//     };

//     const togglePlay = () => {
//         setIsPlaying(!isPlaying);
//     };

//     const goToStep = (stepIndex: number) => {
//         setCurrentStep(stepIndex);
//         setProgress(0);
//         setIsPlaying(false);
//     };

//     // --- BUG FIX 2: Centering Logic ---
//     // Translation logic corrected:
//     // To center the CURRENT step (index), we need to shift the container left by:
//     // (currentStep * (CARD_WIDTH + CONNECTOR_WIDTH)) - (Viewport_Center - CARD_WIDTH/2)
//     // The full width of a step-block (card + connector) is (STORY_CARD_WIDTH + CONNECTOR_WIDTH)
//     // The offset to center the card is 50vw - (STORY_CARD_WIDTH / 2)
//     const stepFullWidth = STORY_CARD_WIDTH + CONNECTOR_WIDTH;

//     // Calculate the start of the current step from the left (distance to move)
//     const offset = currentStep * stepFullWidth;

//     // Adjust the calculated offset to place the card exactly in the center of the viewport
//     const translateX = calc(-${offset}px + 50vw - ${STORY_CARD_WIDTH / 2}px);


//     // --- FEATURE ADDITION: Twinkling Stars Setup ---
//     useEffect(() => {
//         const createStar = () => {
//             const star = document.createElement('div');
//             star.className = 'background-star';
//             star.style.left = ${Math.random() * 100}%;
//             star.style.top = ${Math.random() * 100}%;
//             star.style.animationDelay = ${Math.random() * 5}s;
//             star.style.width = ${Math.random() * 3 + 1}px;
//             star.style.height = star.style.width;
//             document.querySelector('.stars-background')?.appendChild(star);
//         };

//         const starsContainer = document.querySelector('.stars-background');
//         // Clear existing stars to prevent duplicates if component re-renders unexpectedly
//         if (starsContainer) {
//             starsContainer.innerHTML = '';
//         }

//         for (let i = 0; i < 150; i++) {
//             createStar();
//         }
//     }, []);


//     return (
//         <div className="story-container">

//             {/* --- BACKGROUND FIX: Twinkling Stars (Added logic from Dashboard) --- */}
//             <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>

//             {/* --- Fixed Controls and UI (Always Visible) --- */}
//             <div className="fixed-ui-wrapper">

//                 {/* Controls */}
//                 <div className="story-controls">
//                     <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
//                         <ChevronLeft size={24} />
//                     </button>

//                     <button onClick={togglePlay} className="play-btn">
//                         {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                     </button>

//                     <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
//                         <ChevronRight size={24} />
//                     </button>
//                 </div>

//                 {/* Progress Bar (Global story progress) */}
//                 <div className="global-progress-container">
//                     <div
//                         className="global-progress-bar"
//                         style={{ width: ${((currentStep) / (storySteps.length - 1)) * 100}% }}
//                     ></div>
//                 </div>
//             </div>


//             {/* --- The Dynamic Story Map (Now centered and properly spaced) --- */}
//             <div
//                 className="story-map-container"
//                 style={{ transform: translateX(${translateX}) }}
//             >
//                 {storySteps.map((step, index) => {
//                     const isCurrent = index === currentStep;
//                     const StepIcon = step.icon;

//                     return (
//                         <React.Fragment key={step.id}>
//                             {/* Individual Story Block */}
//                             <div
//                                 className={story-block ${isCurrent ? 'active' : ''}}
//                                 style={{
//                                     backgroundColor: step.background, // Use background for the block itself
//                                     width: ${STORY_CARD_WIDTH}px, // Use constant width
//                                     minWidth: ${STORY_CARD_WIDTH}px
//                                 } as React.CSSProperties}
//                                 onClick={() => goToStep(index)}
//                             >
//                                 <div className="block-content">
//                                     {/* ... (Block content kept same) ... */}
//                                     <div className="block-icon">
//                                         <StepIcon size={40} color={isCurrent ? 'white' : 'rgba(255,255,255,0.8)'} />
//                                     </div>
//                                     <h2 className="block-title">{step.title}</h2>
//                                     <p className="block-description">{step.content}</p>
//                                 </div>

//                                 {/* Character Spotlight */}
//                                 {step.character && (
//                                     <div className="character-spotlight" style={{ borderColor: step.character.color }}>
//                                         <div className="character-avatar" style={{ backgroundColor: step.character.color }}>
//                                             {step.character.image}
//                                         </div>
//                                         <div className="character-message-box">
//                                             <span style={{ color: step.character.color }}>{step.character.name}: </span>
//                                             {step.character.message}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Animated GIF/Tile */}
//                                 {step.gif && (
//                                     <div className="story-gif">
//                                         <img src={step.gif} alt={step.title} />
//                                     </div>
//                                 )}

//                                 {/* Local Step Progress Bar */}
//                                 {isCurrent && (
//                                     <div className="local-progress-container">
//                                         <div
//                                             className="local-progress-bar"
//                                             style={{ width: ${progress}% }}
//                                         ></div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Connector Arrow - FIX 3: Arrow spacing is now handled by the connector div width */}
//                             {index < storySteps.length - 1 && (
//                                 <div
//                                     className={connector-arrow ${index < currentStep ? 'passed' : ''}}
//                                     style={{ width: ${CONNECTOR_WIDTH}px }}
//                                 >
//                                     <ArrowRight size={30} color="rgba(255, 255, 255, 0.7)" />
//                                 </div>
//                             )}
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default StoryPage;








// // src/components/StoryPage.tsx

// import React, { useState, useEffect, useRef } from 'react';
// import './StoryPage.css';
// import { ChevronLeft, ChevronRight, Play, Pause, User, Satellite, Zap, Cloud, Navigation, Sun, Activity, ArrowRight } from 'lucide-react';

// // --- CONSTANTS ---
// const STORY_CARD_WIDTH = 450; 
// const CONNECTOR_WIDTH = 100;
// const TOTAL_STEP_WIDTH = STORY_CARD_WIDTH + CONNECTOR_WIDTH;

// // --- DATA (kept same) ---
// interface StoryStep { /* ... types ... */ }
// interface Character { /* ... types ... */ }

// const characters = [
//     { id: 1, name: "Raj Kumar", role: "Farmer", image: "👨‍🌾", color: "#2ECC71", message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized." },
//     { id: 2, name: "Dr. Elena Rodriguez", role: "Astronaut", image: "👩‍🚀", color: "#3498DB", message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!" },
//     { id: 3, name: "Mike Chen", role: "Power Grid Operator", image: "👨‍💼", color: "#E74C3C", message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions." },
//     { id: 4, name: "Captain Sarah Johnson", role: "Airline Pilot", image: "👩‍✈", color: "#9B59B6", message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance." }
// ];

// const storySteps = [
//     { id: 1, title: "The Sun Awakens: What is Space Weather?", content: "Space weather is all the changes in space caused by the Sun, like solar flares and CMEs. It's a cosmic storm that can reach Earth!", background: "#ff6b35", gif: "https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif", icon: Sun },
//     { id: 2, title: "Coronal Mass Ejection: The Storm Begins", content: "A billion-ton cloud of plasma, a Coronal Mass Ejection (CME), is hurled toward Earth. This powerful burst of energy carries the potential to disrupt many systems.", background: "#8e2de2", icon: Cloud },
//     { id: 3, title: "Earth's Magnetic Shield & Auroras", content: "Our magnetic field mostly protects us, but the remaining energy creates beautiful 'Northern Lights' (auroras) and also impacts systems on and around Earth.", background: "#007cf0", gif: "https://media.giphy.com/media/3o7abGQa0aRsohveX6/giphy.gif", icon: Satellite },
//     { id: 4, title: "Raj Kumar: Farmer's Navigation Chaos", content: "Raj's satellite-based irrigation system fails due to GPS signal disruption caused by the storm. Accurate farming depends on accurate space technology!", background: "#2ecc71", character: characters[0], icon: User },
//     { id: 5, title: "Dr. Rodriguez: Astronaut in Danger", content: "Astronauts like Dr. Rodriguez must take shelter in radiation-shielded areas as the CME increases radiation exposure outside Earth's protective atmosphere.", background: "#e74c3c", character: characters[1], icon: User },
//     { id: 6, title: "Mike Chen: Power Grid Protection", content: "Mike, the power grid operator, works hard to prevent massive blackouts, as the geomagnetic storm induces currents that can fry transformers.", background: "#ff4b1f", character: characters[2], icon: Zap },
//     { id: 7, title: "Captain Johnson: Pilot Switches Gear", content: "With GPS accuracy compromised, Captain Johnson relies on traditional navigation to safely land the plane. Communication systems are also affected!", background: "#11998e", character: characters[3], icon: Navigation },
//     { id: 8, title: "The Storm Passes: Lessons Learned", content: "The space weather event subsides. Scientists worldwide share data, helping us understand and prepare better for the next solar storm. The cycle continues!", background: "#667eea", gif: "https://media.giphy.com/media/l4HnKwiJJaJQB04Zq/giphy.gif", icon: Activity }
// ];


// const StoryPage: React.FC = () => {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const animationRef = useRef<number>();

//     // --- Auto-play Logic (Kept same) ---
//     useEffect(() => {
//         // ... (existing auto-play logic)
//         if (isPlaying) {
//             const stepDuration = 5000;
//             let lastTime = performance.now();
            
//             const animateProgress = (time: number) => {
//                 const delta = time - lastTime;
//                 lastTime = time;
                
//                 setProgress(prev => {
//                     let newProgress = prev + (delta / stepDuration) * 100;
//                     if (newProgress >= 100) {
//                         handleNext();
//                         return 0;
//                     }
//                     return newProgress;
//                 });
                
//                 animationRef.current = requestAnimationFrame(animateProgress);
//             };
            
//             animationRef.current = requestAnimationFrame(animateProgress);
//         } else {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         }

//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         };
//     }, [isPlaying]);


//     const handleNext = () => {
//         if (currentStep < storySteps.length - 1) {
//             setCurrentStep(prev => prev + 1);
//             setProgress(0);
//         } else {
//             setIsPlaying(false);
//             setProgress(100);
//         }
//     };

//     const handlePrev = () => {
//         if (currentStep > 0) {
//             setCurrentStep(prev => prev - 1);
//             setProgress(0);
//         }
//     };

//     const togglePlay = () => {
//         setIsPlaying(!isPlaying);
//     };

//     const goToStep = (stepIndex: number) => {
//         setCurrentStep(stepIndex);
//         setProgress(0);
//         setIsPlaying(false);
//     };

//     // --- FIX 1: Centering Logic ---
//     // The Story Map Container needs to move so the active card aligns with the viewport center.
//     // The total offset for the current step is: currentStep * (CardWidth + ConnectorWidth)
//     // We adjust this by 50vw - (CardWidth / 2) to center the card.
    
//     // We only have N-1 connectors. The offset needs to stop before the last connector.
//     let offset = currentStep * TOTAL_STEP_WIDTH;
    
//     // The translateX value to center the current step
//     const translateX = calc(-${offset}px + 50vw - ${STORY_CARD_WIDTH / 2}px);

    
//     // --- FIX 4: Twinkling Stars Setup ---
//     useEffect(() => {
//         const createStar = () => {
//             const star = document.createElement('div');
//             star.className = 'background-star';
//             star.style.left = ${Math.random() * 100}%;
//             star.style.top = ${Math.random() * 100}%;
//             star.style.animationDelay = ${Math.random() * 5}s;
//             star.style.width = ${Math.random() * 3 + 1}px;
//             star.style.height = star.style.width;
//             star.style.animationDuration = ${5 + Math.random() * 5}s; // Randomized duration for better effect

//             // Find the correct container
//             const starsContainer = document.querySelector('.stars-background');
//             if (starsContainer) {
//                 starsContainer.appendChild(star);
//             }
//         };

//         const starsContainer = document.querySelector('.stars-background');
//         if (starsContainer) {
//             // Clear existing stars to prevent duplicates
//             starsContainer.innerHTML = '';
//             for (let i = 0; i < 150; i++) {
//                 createStar();
//             }
//         }
//     }, []);


//     return (
//         <div className="story-container">
            
//             {/* --- FIX 4: Twinkling Stars Background --- */}
//             <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>
            
//             {/* --- Fixed Controls and UI (Always Visible) --- */}
//             <div className="fixed-ui-wrapper">
//                 {/* Controls */}
//                 <div className="story-controls">
//                     <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
//                         <ChevronLeft size={24} />
//                     </button>
                    
//                     <button onClick={togglePlay} className="play-btn">
//                         {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                     </button>
                    
//                     <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
//                         <ChevronRight size={24} />
//                     </button>
//                 </div>

//                 {/* Progress Bar (Global story progress) */}
//                 <div className="global-progress-container">
//                     <div 
//                         className="global-progress-bar" 
//                         style={{ width: ${((currentStep) / (storySteps.length - 1)) * 100}% }}
//                     ></div>
//                 </div>
//             </div>


//             {/* --- The Dynamic Story Map (Now centered and properly spaced) --- */}
//             <div 
//                 className="story-map-container" 
//                 style={{ transform: translateX(${translateX}) }}
//             >
//                 {storySteps.map((step, index) => {
//                     const isCurrent = index === currentStep;
//                     const StepIcon = step.icon;
                    
//                     return (
//                         <React.Fragment key={step.id}>
//                             {/* Individual Story Block */}
//                             <div 
//                                 className={story-block ${isCurrent ? 'active' : ''}}
//                                 style={{ 
//                                     backgroundColor: step.background, 
//                                     width: ${STORY_CARD_WIDTH}px, 
//                                     minWidth: ${STORY_CARD_WIDTH}px,
//                                     // FIX 2: Added margin-right to the last step to ensure centering
//                                     marginRight: index === storySteps.length - 1 ? calc(50vw - ${STORY_CARD_WIDTH / 2}px) : '0',
//                                     // FIX 2: Added margin-left to the first step to ensure centering
//                                     marginLeft: index === 0 ? calc(50vw - ${STORY_CARD_WIDTH / 2}px) : '0',
//                                 } as React.CSSProperties}
//                                 onClick={() => goToStep(index)}
//                             >
//                                 <div className="block-content">
//                                     <div className="block-icon">
//                                         <StepIcon size={40} color={isCurrent ? 'white' : 'rgba(255,255,255,0.8)'} />
//                                     </div>
//                                     <h2 className="block-title">{step.title}</h2>
//                                     <p className="block-description">{step.content}</p>
//                                 </div>

//                                 {/* Character Spotlight (Now has better overflow handling in CSS) */}
//                                 {step.character && (
//                                     <div className="character-spotlight" style={{ borderColor: step.character.color }}>
//                                         <div className="character-avatar" style={{ backgroundColor: step.character.color }}>
//                                             {step.character.image}
//                                         </div>
//                                         <div className="character-message-box">
//                                             <span style={{ color: step.character.color }}>{step.character.name}: </span>
//                                             {step.character.message}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Animated GIF/Tile */}
//                                 {step.gif && (
//                                     <div className="story-gif">
//                                         <img src={step.gif} alt={step.title} />
//                                     </div>
//                                 )}

//                                 {/* Local Step Progress Bar */}
//                                 {isCurrent && (
//                                     <div className="local-progress-container">
//                                         <div 
//                                             className="local-progress-bar" 
//                                             style={{ width: ${progress}% }}
//                                         ></div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Connector Arrow */}
//                             {index < storySteps.length - 1 && (
//                                 <div 
//                                     className={connector-arrow ${index < currentStep ? 'passed' : ''}}
//                                     style={{ width: ${CONNECTOR_WIDTH}px }}
//                                 >
//                                     <ArrowRight size={30} color="rgba(255, 255, 255, 0.7)" />
//                                 </div>
//                             )}
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default StoryPage;
















































// // src/components/StoryPage.tsx

// // src/components/StoryPage.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import './StoryPage.css';
// import { ChevronLeft, ChevronRight, Play, Pause, User, Satellite, Zap, Cloud, Navigation, Sun, Activity, ArrowRight } from 'lucide-react';

// // --- CONSTANTS ---
// const STORY_CARD_WIDTH = 450; 
// const CONNECTOR_WIDTH = 100;
// const TOTAL_STEP_WIDTH = STORY_CARD_WIDTH + CONNECTOR_WIDTH;

// // --- DATA ---
// interface StoryStep { 
//     id: number;
//     title: string;
//     content: string;
//     background: string;
//     gif?: string;        // GIF support
//     video?: string;      // NEW: Video support
//     // icon: React.ElementType;
//     character?: Character;
// }

// interface Character { 
//     id: number;
//     name: string;
//     role: string;
//     image: string;
//     color: string;
//     message: string;
// }

// const characters: Character[] = [
//     { id: 1, name: "Raj Kumar", role: "Farmer", image: "👨‍🌾", color: "#2ECC71", message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized." },
//     { id: 2, name: "Dr. Elena Rodriguez", role: "Astronaut", image: "👩‍🚀", color: "#3498DB", message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!" },
//     { id: 3, name: "Mike Chen", role: "Power Grid Operator", image: "👨‍💼", color: "#E74C3C", message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions." },
//     { id: 4, name: "Captain Mohan Kumar", role: "Airline Pilot", image: "👩‍✈️", color: "#9B59B6", message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance." }
// ];

// const storySteps: StoryStep[] = [
//   { 
//     id: 1, 
//     title: "The Solar Flare Awakens", 
//     content: "On the Sun’s fiery surface, a powerful solar flare erupts, releasing massive radiation and energy into space.", 
//     background: "#ff9800", 
//     video: "grok-video-b76c7541-c1f8-4b13-a214-47e3330679da-5.mp4",
//   },
//   { 
//     id: 2, 
//     title: "The Flare Travels to Earth", 
//     content: "The solar flare races through space. While most people on Earth don’t notice, scientists and astronauts prepare for its impact.", 
//     background: "#ff5722", 
//     video: "grok-video-ddb9595c-4aa3-414b-a4c3-8ec54124bdf4-1.mp4",
//   },
//   { 
//     id: 3, 
//     title: "Astronaut’s Warning – Dr. Rodriguez", 
//     content: "Astronaut Dr. Rodriguez aboard the ISS gets an alert. She quickly moves into a shielded module to avoid harmful radiation.", 
//     background: "#e91e63", 
//     video: "astronautVideo.mp4",
//     character: characters[0], 
//   },
//   {
//     id: 4, 
//     title: "Farmer’s Challenge – Raj Kumar", 
//     content: "Down on Earth, Raj Kumar’s GPS-guided irrigation system suddenly malfunctions because the solar flare disrupts satellite signals.", 
//     background: "#2ecc71", 
//     video: "grok-video-721c6896-e111-4171-bb03-82362752d227.mp4",
//     character: characters[1], 
//   },
//   { 
//     id: 5, 
//     title: "Pilot’s Struggle – Captain Johnson", 
//     content: "Captain Johnson is flying over the Atlantic when radio communication weakens. He relies on old-school navigation to land safely.", 
//     background: "#2196f3", 
//     video: "secondVideo.mp4",
//     character: characters[2], 
//   },
//   { 
//     id: 6, 
//     title: "Engineer’s Duty – Mike Chen", 
//     content: "Mike Chen, a power grid engineer, works overnight to protect transformers from geomagnetic currents triggered by the storm.", 
//     background: "#ff4b1f", 
//     video: "grok-video-b76c7541-c1f8-4b13-a214-47e3330679da-520p.mp4",
//     character: characters[3], 
//   },
//   { 
//     id: 7, 
//     title: "Auroras & Lessons Learned", 
//     content: "As the solar flare fades, the sky glows with auroras. Communities realize the importance of space weather forecasting to protect lives and technology.", 
//     background: "#607d8b", 
//     video: "grok-video-b76c7541-c1f8-4b13-a214-47e3330679da-520p.mp4",
//   }
// ];

// const StoryPage: React.FC = () => {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const animationRef = useRef<number>();

//     // Auto-play Logic
//     useEffect(() => {
//         if (isPlaying) {
//             const stepDuration = 5000;
//             let lastTime = performance.now();
            
//             const animateProgress = (time: number) => {
//                 const delta = time - lastTime;
//                 lastTime = time;
                
//                 setProgress(prev => {
//                     let newProgress = prev + (delta / stepDuration) * 100;
//                     if (newProgress >= 100) {
//                         handleNext();
//                         return 0;
//                     }
//                     return newProgress;
//                 });
                
//                 animationRef.current = requestAnimationFrame(animateProgress);
//             };
            
//             animationRef.current = requestAnimationFrame(animateProgress);
//         } else {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         }

//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         };
//     }, [isPlaying]);

//     const handleNext = () => {
//         if (currentStep < storySteps.length - 1) {
//             setCurrentStep(prev => prev + 1);
//             setProgress(0);
//         } else {
//             setIsPlaying(false);
//             setProgress(100);
//         }
//     };

//     const handlePrev = () => {
//         if (currentStep > 0) {
//             setCurrentStep(prev => prev - 1);
//             setProgress(0);
//         }
//     };

//     const togglePlay = () => {
//         setIsPlaying(!isPlaying);
//     };

//     const goToStep = (stepIndex: number) => {
//         setCurrentStep(stepIndex);
//         setProgress(0);
//         setIsPlaying(false);
//     };

//     // Centering Logic
//     const offset = currentStep * TOTAL_STEP_WIDTH;
//     const translateX = `translateX(calc(-${offset}px + 50vw - ${STORY_CARD_WIDTH / 2}px))`;

//     // Twinkling Stars Setup
//     useEffect(() => {
//         const createStar = () => {
//             const star = document.createElement('div');
//             star.className = 'background-star';
//             star.style.left = `${Math.random() * 100}%`;
//             star.style.top = `${Math.random() * 100}%`;
//             star.style.animationDelay = `${Math.random() * 5}s`;
//             star.style.width = `${Math.random() * 3 + 1}px`;
//             star.style.height = star.style.width;
//             star.style.animationDuration = `${5 + Math.random() * 5}s`;

//             const starsContainer = document.querySelector('.stars-background');
//             if (starsContainer) {
//                 starsContainer.appendChild(star);
//             }
//         };

//         const starsContainer = document.querySelector('.stars-background');
//         if (starsContainer) {
//             starsContainer.innerHTML = '';
//             for (let i = 0; i < 150; i++) {
//                 createStar();
//             }
//         }
//     }, []);

//     return (
//         <div className="story-container">
//             {/* Twinkling Stars Background */}
//             <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>
            
//             {/* Fixed Controls and UI */}
//             <div className="fixed-ui-wrapper">
//                 <div className="story-controls">
//                     <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
//                         <ChevronLeft size={24} />
//                     </button>
                    
//                     <button onClick={togglePlay} className="play-btn">
//                         {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                     </button>
                    
//                     <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
//                         <ChevronRight size={24} />
//                     </button>
//                 </div>

//                 <div className="global-progress-container">
//                     <div 
//                         className="global-progress-bar" 
//                         style={{ width: `${((currentStep) / (storySteps.length - 1)) * 100}%` }}
//                     ></div>
//                 </div>
//             </div>

//             {/* The Dynamic Story Map */}
//             <div 
//                 className="story-map-container" 
//                 style={{ transform: translateX }}
//             >
//                 {storySteps.map((step, index) => {
//                     const isCurrent = index === currentStep;
                    
//                     return (
//                         <React.Fragment key={step.id}>
                            
//                             {/* Individual Story Block */}
//                             <div 
//                                 className={`story-block ${isCurrent ? 'active' : ''}`}
//                                 style={{ 
//                                     backgroundColor: step.background, 
//                                     width: `${STORY_CARD_WIDTH}px`, 
//                                     minWidth: `${STORY_CARD_WIDTH}px`,
//                                     minHeight: '650px',
//                                 }}
//                                 onClick={() => goToStep(index)}
//                             >
//                                 {step.video && (
//                                     <div className="story-video">
//                                         <video 
//                                             src={`/${step.video}`} 
//                                             autoPlay 
//                                             loop 
//                                             muted 
//                                             playsInline 
//                                             controls
//                                             style={{ width: "450px", borderRadius: "12px", height: "250px" }}
//                                         />
//                                     </div>
//                                 )}
//                                 <div className="block-content">
//                                     <h2 className="block-title">{step.title}</h2>
//                                     <p className="block-description">{step.content}</p>
//                                 </div>
                                

//                                 {/* Media (GIF or Video) */}
//                                 {step.gif && (
//                                     <div className="story-gif">
//                                         <img src={step.gif} alt={step.title} />
//                                     </div>
//                                 )}

                                

//                                 {/* Local Step Progress Bar */}
//                                 {isCurrent && (
//                                     <div className="local-progress-container">
//                                         <div 
//                                             className="local-progress-bar" 
//                                             style={{ width: `${progress}%` }}
//                                         ></div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Connector Arrow */}
//                             {index < storySteps.length - 1 && (
//                                 <div 
//                                     className={`connector-arrow ${index < currentStep ? 'passed' : ''}`}
//                                     style={{ width: `${CONNECTOR_WIDTH}px` }}
//                                 >
//                                     <img src="/right-down.png" alt="arrow" className='bg-white-600 text-white'/>
//                                     {/* <ArrowRight size={30} color="rgba(255, 255, 255, 0.7)" /> */}
//                                 </div>
//                             )}
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div> 
//     );
// };

// export default StoryPage;





// src/components/StoryPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryPage.css';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// --- CONSTANTS ---
const STORY_CARD_WIDTH = 450; 
const CONNECTOR_WIDTH = 100;
const TOTAL_STEP_WIDTH = STORY_CARD_WIDTH + CONNECTOR_WIDTH;

// --- DATA ---
interface StoryStep { 
    id: number;
    title: string;
    content: string;
    background: string;
    gif?: string;
    video?: string;
    character?: Character;
}

interface Character { 
    id: number;
    name: string;
    role: string;
    image: string;
    color: string;
    message: string;
}

const characters: Character[] = [
    { id: 1, name: "Raj Kumar", role: "Farmer", image: "👨‍🌾", color: "#2ECC71", message: "My satellite-based irrigation system went offline! Without accurate weather data, I can't plan my crops properly. Space weather affects my livelihood more than I realized." },
    { id: 2, name: "Dr. Elena Rodriguez", role: "Astronaut", image: "👩‍🚀", color: "#3498DB", message: "Up here on the Space Station, we had to take shelter in the radiation-shielded module. Solar radiation is no joke when you're outside Earth's atmosphere!" },
    { id: 3, name: "Mike Chen", role: "Power Grid Operator", image: "👨‍💼", color: "#E74C3C", message: "We're seeing unusual currents in the grid. Had to implement safety protocols to prevent transformer damage. One major solar storm could black out entire regions." },
    { id: 4, name: "Captain Mohan Kumar", role: "Airline Pilot", image: "👩‍✈️", color: "#9B59B6", message: "GPS accuracy dropped significantly during the flight. We had to switch to traditional navigation methods. Communication systems were also affected by the ionospheric disturbance." }
];

const storySteps: StoryStep[] = [
  { 
    id: 1, 
    title: "The Solar Flare Awakens", 
    content: "On the Sun's fiery surface, a powerful solar flare erupts, releasing massive radiation and energy into space.", 
    background: "#ff9800", 
    video: "grok-video-b76c7541-c1f8-4b13-a214-47e3330679da-5.mp4",
  },
  { 
    id: 2, 
    title: "The Flare Travels to Earth", 
    content: "The solar flare races through space. While most people on Earth don't notice, scientists and astronauts prepare for its impact.", 
    background: "#ff5722", 
    video: "grok-video-ddb9595c-4aa3-414b-a4c3-8ec54124bdf4-1.mp4",
  },
  { 
    id: 3, 
    title: "Astronaut's Warning – Dr. Rodriguez", 
    content: "Astronaut Dr. Rodriguez aboard the ISS gets an alert. She quickly moves into a shielded module to avoid harmful radiation.", 
    background: "red", 
    video: "thirdVideo.mp4",
    character: characters[1], 
  },
  {
    id: 4, 
    title: "Farmer's Challenge – Raj Kumar", 
    content: "Down on Earth, Raj Kumar's GPS-guided irrigation system suddenly malfunctions because the solar flare disrupts satellite signals.", 
    background: "#23a458ff", 
    video: "grok-video-721c6896-e111-4171-bb03-82362752d227.mp4",
    character: characters[0], 
  },
  { 
    id: 5, 
    title: "Pilot's Struggle – Captain Johnson", 
    content: "Captain Johnson is flying over the Atlantic when radio communication weakens. He relies on old-school navigation to land safely.", 
    background: "#2196f3", 
    video: "secondVideo.mp4",
    character: characters[3], 
  },
  { 
    id: 6, 
    title: "Auroras & Lessons Learned", 
    content: "As the solar flare fades, the sky glows with auroras. Communities realize the importance of space weather forecasting to protect lives and technology.", 
    background: "#607d8b", 
    video: "fourthVideo.mp4",
  },
  { 
    id: 7, 
    title: "Summary", 
    content: "This is the full summary about the story", 
    background: "#ff4b1f", 
    video: "fifthVideo.mp4",
    character: characters[2], 
  },
  
];

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [hasSpokenCurrent, setHasSpokenCurrent] = useState(false);
    
    const animationRef = useRef<number>();
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Text-to-Speech Function
    const speakText = (text: string, onSpeechEnd?: () => void) => {
        if (isMuted || hasSpokenCurrent) return;
        
        // Stop any ongoing speech
        if (speechRef.current) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Medium speed
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setHasSpokenCurrent(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            // Speech complete hone par hi next step par jao
            if (onSpeechEnd) {
                onSpeechEnd();
            }
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
            // Error case mein bhi next step par jao
            if (onSpeechEnd) {
                onSpeechEnd();
            }
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    // Stop speech function
    const stopSpeech = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // Auto-play next step only after speech completes
    const autoPlayNextStep = () => {
        if (isPlaying && currentStep < storySteps.length - 1) {
            // Speech complete hone ke baad next step par jao
            handleNext();
        } else if (currentStep === storySteps.length - 1) {
            // Last step par auto-play stop karo
            setIsPlaying(false);
        }
    };

    // Auto-play Logic - Ab sirf progress bar ke liye, auto-next ke liye nahi
    useEffect(() => {
        if (isPlaying) {
            const stepDuration = 60000; // Long duration - speech complete hone tak
            let lastTime = performance.now();
            
            const animateProgress = (time: number) => {
                const delta = time - lastTime;
                lastTime = time;
                
                setProgress(prev => {
                    let newProgress = prev + (delta / stepDuration) * 100;
                    if (newProgress >= 100) {
                        return 100; // Progress bar full ho jaye par auto-next nahi karenge
                    }
                    return newProgress;
                });
                
                animationRef.current = requestAnimationFrame(animateProgress);
            };
            
            animationRef.current = requestAnimationFrame(animateProgress);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying]);

    // Speech effect - speak when step changes
    useEffect(() => {
        stopSpeech(); // Stop previous speech
        setHasSpokenCurrent(false); // Reset speech flag for new step
        setProgress(0); // Reset progress bar
        
        const currentStepData = storySteps[currentStep];
        if (currentStepData && !isMuted && isPlaying) {
            // Combine title and content for speech
            const speechText = `${currentStepData.title}. ${currentStepData.content}${
                currentStepData.character ? ` ${currentStepData.character.message}` : ''
            }`;
            
            // Small delay to ensure smooth transition
            const speechTimer = setTimeout(() => {
                speakText(speechText, autoPlayNextStep);
            }, 500);
            
            return () => clearTimeout(speechTimer);
        }
    }, [currentStep, isMuted, isPlaying]);

    // Cleanup speech on component unmount
    useEffect(() => {
        return () => {
            stopSpeech();
        };
    }, []);

    const handleNext = () => {
        stopSpeech(); // Stop current speech
        
        if (currentStep < storySteps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setProgress(0);
            setHasSpokenCurrent(false); // Reset for new step
        } else {
            setIsPlaying(false);
            setProgress(100);
        }
    };

    const handlePrev = () => {
        stopSpeech(); // Stop current speech
        
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setProgress(0);
            setHasSpokenCurrent(false); // Reset for new step
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            // Pause karte time speech stop karo
            stopSpeech();
            setIsPlaying(false);
        } else {
            // Play karte time current step ka speech start karo
            setIsPlaying(true);
            setHasSpokenCurrent(false); // Reset speech flag
            
            const currentStepData = storySteps[currentStep];
            if (currentStepData && !isMuted) {
                const speechText = `${currentStepData.title}. ${currentStepData.content}${
                    currentStepData.character ? ` ${currentStepData.character.message}` : ''
                }`;
                
                // Small delay then start speech
                setTimeout(() => {
                    speakText(speechText, autoPlayNextStep);
                }, 300);
            }
        }
    };

    const toggleMute = () => {
        if (!isMuted) {
            stopSpeech(); // Stop speech when muting
        }
        setIsMuted(!isMuted);
    };

    const goToStep = (stepIndex: number) => {
        stopSpeech(); // Stop current speech
        setCurrentStep(stepIndex);
        setProgress(0);
        setIsPlaying(false);
        setHasSpokenCurrent(false); // Reset for new step
    };

    // Centering Logic
    const offset = currentStep * TOTAL_STEP_WIDTH;
    const translateX = `translateX(calc(-${offset}px + 50vw - ${STORY_CARD_WIDTH / 2}px))`;

    // Twinkling Stars Setup
    useEffect(() => {
        const createStar = () => {
            const star = document.createElement('div');
            star.className = 'background-star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${5 + Math.random() * 5}s`;

            const starsContainer = document.querySelector('.stars-background');
            if (starsContainer) {
                starsContainer.appendChild(star);
            }
        };

        const starsContainer = document.querySelector('.stars-background');
        if (starsContainer) {
            starsContainer.innerHTML = '';
            for (let i = 0; i < 150; i++) {
                createStar();
            }
        }
    }, []);

    return (
        <div className="story-container">
            {/* Twinkling Stars Background */}
            <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>
            
            {/* Fixed Controls and UI */}
            <div className="fixed-ui-wrapper">
                <div className="story-controls">
                    <button onClick={handlePrev} className="control-btn" disabled={currentStep === 0}>
                        <ChevronLeft size={24} />
                    </button>
                    
                    <button onClick={togglePlay} className="play-btn">
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    
                    <button onClick={handleNext} className="control-btn" disabled={currentStep === storySteps.length - 1}>
                        <ChevronRight size={24} />
                    </button>

                    {/* Mute/Unmute Button */}
                    <button 
                        onClick={toggleMute} 
                        className={`mute-btn ${isMuted ? 'muted' : ''}`}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                {/* Speech Indicator */}
                {isSpeaking && (
                    <div className="speech-indicator">
                        <div className="speaking-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span className="speech-text">Reading...</span>
                    </div>
                )}

                <div className="global-progress-container">
                    <div 
                        className="global-progress-bar" 
                        style={{ width: `${((currentStep) / (storySteps.length - 1)) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* The Dynamic Story Map */}
            <div 
                className="story-map-container" 
                style={{ transform: translateX }}
            >
                {storySteps.map((step, index) => {
                    const isCurrent = index === currentStep;
                    
                    return (
                        <React.Fragment key={step.id}>
                            {/* Individual Story Block */}
                            <div 
                                className={`story-block ${isCurrent ? 'active' : ''}`}
                                style={{ 
                                    backgroundColor: step.background, 
                                    width: `${STORY_CARD_WIDTH}px`, 
                                    minWidth: `${STORY_CARD_WIDTH}px`,
                                    minHeight: '650px',
                                }}
                                onClick={() => goToStep(index)}
                            >
                                {step.video && (
                                    <div className="story-video">
                                        <video 
                                            src={`/${step.video}`} 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline 
                                            controls
                                            style={{ width: "450px", borderRadius: "12px", height: "250px" }}
                                        />
                                    </div>
                                )}
                                
                                <div className="block-content scroll-smooth overflow-y-auto max-h-60">
                                    <h2 className="block-title">{step.title}</h2>
                                    <p className="block-description text-black">{step.content}</p>
                                    
                                    {/* Character Message */}
                                    
                                    {step.character && (
                                        <div className="character-message text-black" style={{ borderLeftColor: step.character.color }}>
                                            <div className="character-info">
                                                <span className="character-avatar" style={{ backgroundColor: step.character.color }}>
                                                    {step.character.image}
                                                </span>
                                                <div>
                                                    <strong style={{ color: step.character.color }}>{step.character.name}</strong>
                                                    <br />
                                                    <small>{step.character.role}</small>
                                                </div>
                                            </div>
                                            <p className="character-text">{step.character.message}</p>
                                        </div>
                                    )}
                                </div>

                                {/* GIF Support */}
                                {step.gif && (
                                    <div className="story-gif">
                                        <img src={step.gif} alt={step.title} />
                                    </div>
                                )}

                                {/* Local Step Progress Bar */}
                                {isCurrent && (
                                    <div className="local-progress-container">
                                        <div 
                                            className="local-progress-bar" 
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                )}

                                {/* Speech Status Indicator */}
                                {isCurrent && isSpeaking && (
                                    <div className="speech-status">
                                        <div className="pulse-animation"></div>
                                        🔊 Reading
                                    </div>
                                )}
                            </div>

                            {/* Connector Arrow */}
                            {index < storySteps.length - 1 && (
                                <div 
                                    className={`connector-arrow ${index < currentStep ? 'passed' : ''}`}
                                    style={{ width: `${CONNECTOR_WIDTH}px` }}
                                >
                                    <img src="/right-down.png" alt="arrow" className='bg-white-600 text-white'/>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div> 
    );
};

export default StoryPage;