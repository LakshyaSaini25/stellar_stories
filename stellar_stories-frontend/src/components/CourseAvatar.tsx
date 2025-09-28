// import React, { useRef, useEffect, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, useFBX } from "@react-three/drei";
// import * as THREE from "three";
// import { Button } from "@/components/ui/button";
// import { Volume2, VolumeX, Play, Pause } from "lucide-react";

// interface AvatarModelProps {
//   talking: boolean;
// }

// const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
//   const group = useRef<THREE.Group>(null);

//   // Main avatar model (GLB)
//   const { scene } = useGLTF(
//     "https://models.readyplayer.me/68cea2f5665bc541b1398552.glb"
//   ) as { scene: THREE.Group };

//   // Animations (FBX)
//   const idleAnim = useFBX("/Standing_Idle.fbx");
//   const talkingAnim = useFBX("/Talking.fbx");

//   const mixer = useRef<THREE.AnimationMixer | null>(null);
//   const idleAction = useRef<THREE.AnimationAction | null>(null);
//   const talkingAction = useRef<THREE.AnimationAction | null>(null);

//   // Initialize animations when FBX loads
//   useEffect(() => {
//     if (scene && idleAnim.animations.length && talkingAnim.animations.length) {
//       mixer.current = new THREE.AnimationMixer(scene);

//       idleAction.current = mixer.current.clipAction(idleAnim.animations[0], scene);
//       talkingAction.current = mixer.current.clipAction(talkingAnim.animations[0], scene);

//       idleAction.current.play();
//     }
//   }, [scene, idleAnim, talkingAnim]);

//   // Switch between idle/talking
//   useEffect(() => {
//     if (!mixer.current) return;

//     if (talking) {
//       idleAction.current?.fadeOut(0.3);
//       talkingAction.current?.reset().fadeIn(0.3).play();
//     } else {
//       talkingAction.current?.fadeOut(0.3);
//       idleAction.current?.reset().fadeIn(0.3).play();
//     }
//   }, [talking]);

//   // Update mixer each frame
//   useFrame((_, delta) => mixer.current?.update(delta));

//   // Keep model oriented correctly - exactly same as Model.tsx
//   useEffect(() => {
//     if (group.current) { 
//       group.current.rotation.set(1.5, Math.PI, 3); 
//       group.current.position.y = -1.9;
//       group.current.position.z = 0.1; 
//       group.current.position.x = 0.1; 
//     }
//   }, [scene]);

//   return <primitive ref={group} object={scene} scale={2} />;
// };

// interface CourseAvatarProps {
//   className?: string;
// }

// const CourseAvatar: React.FC<CourseAvatarProps> = ({ className = "" }) => {
//   const [talking, setTalking] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

//   // Load available voices
//   useEffect(() => {
//     const handleVoicesChanged = () => {
//       const voices = window.speechSynthesis.getVoices();
//       console.log("Voices found:", voices.map(v => v.name));

//       // Prefer male English voices
//       const maleVoiceNames = ["google uk english male", "microsoft david", "alex"];
//       let voiceToSelect = voices.find(v =>
//         maleVoiceNames.some(name => v.name.toLowerCase().includes(name))
//       );
//       if (!voiceToSelect) {
//         voiceToSelect = voices.find(v => v.lang.includes("en-"));
//       }
//       setSelectedVoice(voiceToSelect || voices[0] || null);
//     };

//     speechSynthesis.onvoiceschanged = handleVoicesChanged;
//     handleVoicesChanged();
//   }, []);

//   // Speech synthesis handler
//   const handleSpeak = () => {
//     if (!talking && !isMuted) {
//       if (!selectedVoice) {
//         console.warn("No voice available for speech synthesis");
//         return;
//       }

//       const text = "Hello students, today we will learn about Artificial Intelligence. 21st century skills like critical thinking, creativity, and collaboration are essential for success. Let's explore how AI is shaping our future.";

//       const utterance = new SpeechSynthesisUtterance(text);
      
//       utterance.voice = selectedVoice;
//       utterance.lang = selectedVoice.lang;
//       utterance.rate = 0.9; // Slightly slower for educational content
//       utterance.pitch = 1.0;

//       utterance.onstart = () => setTalking(true);
//       utterance.onend = () => setTalking(false);
//       utterance.onerror = () => setTalking(false);

//       speechSynthesis.speak(utterance);
//     } else if (talking) {
//       speechSynthesis.cancel();
//       setTalking(false);
//     }
//   };

//   const toggleMute = () => {
//     if (talking) {
//       speechSynthesis.cancel();
//       setTalking(false);
//     }
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div className={`relative h-full w-full ${className}`}>
//       {/* 3D Avatar Canvas */}
//       <div className="absolute inset-0">
//         <Canvas
//           camera={{ position: [0, 1.5, 4], fov: 50 }}
//           style={{ background: "transparent" }}
//         >
//           <ambientLight intensity={0.8} />
//           <directionalLight position={[2, 4, 5]} intensity={1.2} />
//           <directionalLight position={[-2, 2, 2]} intensity={0.6} />
//           <AvatarModel talking={talking} />
//         </Canvas>
//       </div>

//       {/* Speech Controls Overlay */}
//       <div className="absolute top-4 right-4 flex gap-2 z-10">
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={toggleMute}
//           className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
//         >
//           {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
//         </Button>
        
//         <Button
//           variant={talking ? "destructive" : "default"}
//           size="sm"
//           onClick={handleSpeak}
//           disabled={isMuted}
//           className={`${
//             talking 
//               ? "bg-red-500 hover:bg-red-600" 
//               : "bg-blue-600 hover:bg-blue-700"
//           } text-white backdrop-blur-sm`}
//         >
//           {talking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//         </Button>
//       </div>

//       {/* Avatar Status Indicator */}
//       <div className="absolute bottom-4 left-4 z-10">
//         <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
//           <div className={`w-3 h-3 rounded-full ${talking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
//           <span className="text-sm font-medium">
//             {talking ? "Speaking..." : "AI Instructor Ready"}
//           </span>
//         </div>
//       </div>

//       {/* Loading Fallback */}
//       {!selectedVoice && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm z-20">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//             <p className="text-sm text-gray-600">Loading AI Instructor...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseAvatar;


import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AvatarModelProps {
  talking: boolean;
}

const AvatarModel: React.FC<AvatarModelProps> = ({ talking }) => {
  const group = useRef<THREE.Group>(null);

  // Main avatar model (GLB)
  const { scene } = useGLTF(
    "https://models.readyplayer.me/68cea2f5665bc541b1398552.glb",
    true
  ) as { scene: THREE.Group };

  // Animations (FBX)
  const idleAnim = useFBX("/Standing_Idle.fbx");
  const talkingAnim = useFBX("/Talking.fbx");

  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const idleAction = useRef<THREE.AnimationAction | null>(null);
  const talkingAction = useRef<THREE.AnimationAction | null>(null);

  // Initialize animations
  useEffect(() => {
    if (scene && idleAnim.animations.length && talkingAnim.animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);

      idleAction.current = mixer.current.clipAction(idleAnim.animations[0], scene);
      talkingAction.current = mixer.current.clipAction(talkingAnim.animations[0], scene);

      // Start with idle animation initially
      idleAction.current?.play();
    }
  }, [scene, idleAnim, talkingAnim]);

  // Switch between idle/talking
  useEffect(() => {
    if (!mixer.current) return;

    if (talking) {
      idleAction.current?.fadeOut(0.3);
      talkingAction.current?.reset().fadeIn(0.3).play();
    } else {
      talkingAction.current?.fadeOut(0.3);
      idleAction.current?.reset().fadeIn(0.3).play();
    }
  }, [talking]);

  // Update mixer each frame
  useFrame((_, delta) => mixer.current?.update(delta));

  // Model positioning
  useEffect(() => {
    if (group.current) { 
      group.current.rotation.set(1.5, Math.PI, 3); 
      group.current.position.y = -1.9;
      group.current.position.z = 0.1; 
      group.current.position.x = 0.1; 
    }
  }, [scene]);

  return <primitive ref={group} object={scene} scale={2} />;
};

interface CourseAvatarProps {
  className?: string;
  aiResponse?: string;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  autoStart?: boolean;
  initialSpeechText?: string; // New prop for initial speech text
}

const CourseAvatar: React.FC<CourseAvatarProps> = ({ 
  className = "", 
  aiResponse,
  onSpeechStart,
  onSpeechEnd,
  autoStart = true,
  initialSpeechText = "Hello students! Welcome to Space Weather Explorer. I'm your AI instructor. Today we'll learn about solar flares, coronal mass ejections, and how space weather affects our daily lives on Earth. Let's begin our exciting journey through space weather phenomena!"
}) => {
  const [talking, setTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [hasSpokenInitial, setHasSpokenInitial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        console.log("Voices loaded:", voices.map(v => v.name));
        
        // Voice selection logic
        const preferredVoices = [
          "Microsoft David Desktop",
          "Google UK English Male",
          "Alex",
          "Microsoft Mark",
          "Google US English"
        ];
        
        let voiceToSelect = voices.find(v => 
          preferredVoices.some(name => v.name.includes(name))
        );
        
        if (!voiceToSelect) {
          voiceToSelect = voices.find(v => v.lang.includes("en-"));
        }
        
        if (!voiceToSelect && voices.length > 0) {
          voiceToSelect = voices[0];
        }
        
        setSelectedVoice(voiceToSelect);
        setVoicesLoaded(true);
        setIsLoading(false);
        
        // Auto-start speaking if enabled
        if (autoStart && !hasSpokenInitial && !isMuted && voiceToSelect) {
          // Small delay to ensure everything is ready
          setTimeout(() => {
            speakText(initialSpeechText);
            setHasSpokenInitial(true);
          }, 500);
        }
      }
    };

    // Check if voices are already available
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Fallback: if voices don't load within 3 seconds, proceed anyway
    const timeoutId = setTimeout(() => {
      if (!voicesLoaded) {
        console.log("Voice loading timeout - proceeding with default");
        setIsLoading(false);
        setVoicesLoaded(true);
        
        if (autoStart && !hasSpokenInitial && !isMuted) {
          setTimeout(() => {
            speakText(initialSpeechText);
            setHasSpokenInitial(true);
          }, 500);
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [autoStart, hasSpokenInitial, isMuted, initialSpeechText, voicesLoaded]);

  // Auto-speak AI responses
  useEffect(() => {
    if (aiResponse && !isMuted && selectedVoice && !talking && voicesLoaded) {
      speakText(aiResponse);
    }
  }, [aiResponse, isMuted, selectedVoice, talking, voicesLoaded]);

  // Text to speech function
  const speakText = (text: string) => {
    if (isMuted) {
      console.log("Speech muted, not speaking");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = 'en-US';
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      console.log("Speech started");
      setTalking(true);
      onSpeechStart?.();
    };
    
    utterance.onend = () => {
      console.log("Speech ended");
      setTalking(false);
      onSpeechEnd?.();
    };
    
    utterance.onerror = (event) => {
      console.error("Speech error:", event);
      setTalking(false);
      onSpeechEnd?.();
    };

    console.log("Attempting to speak:", text.substring(0, 50) + "...");
    window.speechSynthesis.speak(utterance);
  };

  // Manual speech control
  const handleManualSpeak = () => {
    if (talking) {
      window.speechSynthesis.cancel();
      setTalking(false);
    } else {
      const manualText = "Welcome back! I'm ready to help you explore the fascinating world of space weather. What would you like to learn about today?";
      speakText(manualText);
    }
  };

  const toggleMute = () => {
    if (talking) {
      window.speechSynthesis.cancel();
      setTalking(false);
    }
    setIsMuted(!isMuted);
  };

  // Force start speaking if it hasn't started after loading
  useEffect(() => {
    if (voicesLoaded && autoStart && !hasSpokenInitial && !isMuted && !isLoading) {
      const forceStartTimer = setTimeout(() => {
        if (!talking && !hasSpokenInitial) {
          console.log("Force starting speech");
          speakText(initialSpeechText);
          setHasSpokenInitial(true);
        }
      }, 1000);

      return () => clearTimeout(forceStartTimer);
    }
  }, [voicesLoaded, autoStart, hasSpokenInitial, isMuted, isLoading, talking, initialSpeechText]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* 3D Avatar Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 50 }}
          style={{
            backgroundImage: 'url("background4.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={2.8} />
          <directionalLight position={[2, 4, 5]} intensity={1.2} />
          <directionalLight position={[-2, 2, 2]} intensity={0.6} />
          <AvatarModel talking={talking} />
        </Canvas>
      </div>

      {/* Speech Controls Overlay */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleMute}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-300"
          title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <Button
          variant={talking ? "destructive" : "default"}
          size="sm"
          onClick={handleManualSpeak}
          disabled={isMuted}
          className={`${
            talking 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white backdrop-blur-sm border-0`}
          title={talking ? "Stop Speaking" : "Manual Speak"}
        >
          {talking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Avatar Status Indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-300">
          <div className={`w-3 h-3 rounded-full ${
            talking ? 'bg-red-500 animate-pulse' : 
            isLoading ? 'bg-yellow-500 animate-pulse' : 
            'bg-green-500'
          }`} />
          <span className="text-sm font-medium text-gray-700">
            {isLoading ? "Loading..." : 
             talking ? "Speaking..." : 
             hasSpokenInitial ? "Ready" : "Initializing..."}
          </span>
        </div>
      </div>

  
     
      {/* Loading Fallback */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/30 backdrop-blur-sm z-20">
          <div className="text-center bg-white/80 rounded-lg p-4 border border-gray-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-medium">Initializing AI Instructor...</p>
            <p className="text-xs text-gray-600 mt-1">Loading voices and preparing speech</p>
          </div>
        </div>
      )}

      {/* Auto-start Message */}
      {autoStart && !hasSpokenInitial && !isLoading && voicesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-4">
            <h3 className="text-white font-semibold text-lg mb-2">🚀 Starting Space Weather Lesson</h3>
            <p className="text-white/90 text-sm">Your AI instructor will begin speaking momentarily...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Preload the model
useGLTF.preload("https://models.readyplayer.me/68cea2f5665bc541b1398552.glb");

export default CourseAvatar;