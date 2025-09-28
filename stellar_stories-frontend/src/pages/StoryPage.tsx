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
            for (let i = 0; i < 50; i++) {
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