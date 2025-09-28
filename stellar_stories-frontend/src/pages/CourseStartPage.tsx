// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { ArrowLeft, Volume2, VolumeX, Play, Pause, Settings, BookOpen, Brain, Users, Clock, Target, Award } from 'lucide-react';
// import CourseGeminiChat from '@/components/CourseGeminiChat';
// import CourseAvatar from '@/components/CourseAvatar';
// import type { CourseContext } from '@/lib/gemini';
// import { getCourseById } from '@/lib/api';

// interface Course {
//     id: string;
//     title?: string;
//     description?: string;
//     estimated_duration?: number;
//     level?: string;
//     tags?: string;
// }


// const CourseStartPage = () => {
//     const navigate = useNavigate();
//     const params = useParams();
//     const location = useLocation();
//     const [isRecording, setIsRecording] = useState(false);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [courseProgress, setCourseProgress] = useState(25);
//     const [currentTopic, setCurrentTopic] = useState('Introduction to React Components');
//     const [sessionTime, setSessionTime] = useState(0);
//     const [course, setCourse] = useState<Course | null>(null);
//     const [loadingCourse, setLoadingCourse] = useState(false);
//     const [courseError, setCourseError] = useState<string | null>(null);

//     // Avatar-specific states
//     const [lastAiResponse, setLastAiResponse] = useState<string>('');
//     const [totalInteractions, setTotalInteractions] = useState(0);
//     const [avatarSpeaking, setAvatarSpeaking] = useState(false);

//     // Session timer
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setSessionTime(prev => prev + 1);
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const formatTime = (seconds: number) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Prepare course context for Gemini chat
//     const courseContext: CourseContext = {
//         title: course?.title || currentTopic,
//         description: course?.description || 'Interactive learning session',
//         level: course?.level || 'Intermediate',
//         tags: course?.tags || '',
//         currentTopic: currentTopic,
//     };

//     // Handle AI responses - this will trigger avatar speech and motion
//     const handleAiResponse = (response: string) => {
//         setLastAiResponse(response);
//         setTotalInteractions(prev => prev + 1);
//         // Update course progress based on interactions
//         setCourseProgress(prev => Math.min(prev + 2, 100));
//     };

//     // Avatar speech event handlers
//     const handleAvatarSpeechStart = () => {
//         setAvatarSpeaking(true);
//     };

//     const handleAvatarSpeechEnd = () => {
//         setAvatarSpeaking(false);
//     };

//     // Fetch course by id or use location.state.course
//     useEffect(() => {
//         const idFromParams = params.id || (location.state && (location.state as any).course?.id);
//         if (!idFromParams) return; // nothing to fetch

//         let cancelled = false;
//         const fetchCourse = async () => {
//             setLoadingCourse(true);
//             setCourseError(null);
//             try {
//                 const data = await getCourseById(idFromParams as string);
//                 if (cancelled) return;
//                 setCourse(data as Course);
//                 if ((data as any).title) setCurrentTopic((data as any).title);
//             } catch (err: unknown) {
//                 const msg = err instanceof Error ? err.message : String(err);
//                 setCourseError(msg || 'Failed to load course');
//             } finally {
//                 if (!cancelled) setLoadingCourse(false);
//             }
//         };

//         // If location.state already had course, use it immediately
//         if (location.state && (location.state as any).course) {
//             const c = (location.state as any).course as Course;
//             setCourse(c);
//             if (c.title) setCurrentTopic(c.title);
//         }

//         fetchCourse();
//         return () => {
//             cancelled = true;
//         };
//     }, [params.id, location.state]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden flex flex-col">
//             {/* Animated Background Icons */}
//             <div className="absolute inset-0 pointer-events-none">
//                 <BookOpen className="absolute w-8 h-8 text-primary/20 animate-move-diagonal-1" style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
//                 <Brain className="absolute w-6 h-6 text-primary-glow/30 animate-move-circular" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
//                 <Users className="absolute w-7 h-7 text-primary/25 animate-move-wave" style={{ bottom: '25%', left: '10%', animationDelay: '4s' }} />
//                 <Target className="absolute w-5 h-5 text-primary-glow/20 animate-move-diagonal-2" style={{ top: '60%', right: '8%', animationDelay: '1s' }} />
//                 <Award className="absolute w-6 h-6 text-primary/30 animate-move-circular" style={{ bottom: '15%', right: '20%', animationDelay: '3s' }} />
//                 <Clock className="absolute w-8 h-8 text-primary-glow/25 animate-move-wave" style={{ top: '40%', left: '8%', animationDelay: '5s' }} />
//             </div>

//             {/* Header */}
//             <div className="relative z-10 p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm flex-shrink-0">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => navigate(-1)}
//                             className="hover:bg-primary/10 transition-all duration-300"
//                         >
//                             <ArrowLeft className="h-5 w-5" />
//                         </Button>
//                         <div>
//                             <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
//                                 {currentTopic}{loadingCourse ? ' (loading...)' : ''}
//                             </h1>
//                             <p className="text-muted-foreground text-sm">
//                                 Interactive Learning Session 
//                                 {avatarSpeaking && (
//                                     <span className="ml-2 text-blue-600 animate-pulse">🎙️ Avatar Speaking</span>
//                                 )}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <Badge variant="secondary" className="px-3 py-1">
//                             <Clock className="w-4 h-4 mr-1" />
//                             {formatTime(sessionTime)}
//                         </Badge>
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-muted-foreground">Progress:</span>
//                             <div className="w-24">
//                                 <Progress value={courseProgress} className="h-2" />
//                             </div>
//                             <span className="text-sm font-medium">{courseProgress}%</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="relative z-10 p-6 flex-1 overflow-auto">
//                 {courseError && (
//                     <div className="mb-4 text-sm text-red-600">Failed to load course: {courseError}</div>
//                 )}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-full">
//                     {/* Left Side - AI Teacher Avatar */}
//                     <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant h-fit">
//                         <CardHeader className="pb-4">
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="flex items-center gap-2">
//                                     <div className={`w-3 h-3 rounded-full ${
//                                         avatarSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse'
//                                     }`} />
//                                     AI Instructor {avatarSpeaking ? 'Speaking' : 'Live'}
//                                 </CardTitle>
//                                 <div className="flex items-center gap-2">
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setIsMuted(!isMuted)}
//                                         className="hover:bg-primary/10"
//                                         title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
//                                     >
//                                         {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//                                     </Button>
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setIsPlaying(!isPlaying)}
//                                         className="hover:bg-primary/10"
//                                         title={isPlaying ? "Pause Avatar" : "Resume Avatar"}
//                                     >
//                                         {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                                     </Button>
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         className="hover:bg-primary/10"
//                                         title="Avatar Settings"
//                                     >
//                                         <Settings className="h-4 w-4" />
//                                     </Button>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             {/* 3D Avatar Component with AI Response Integration */}
//                             <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
//                                 <CourseAvatar 
//                                     className="h-full"
//                                     aiResponse={lastAiResponse} // Pass AI response for automatic speech
//                                     onSpeechStart={handleAvatarSpeechStart}
//                                     onSpeechEnd={handleAvatarSpeechEnd}
//                                 />
//                             </div>

//                             {/* AI Response Indicator */}
//                             {lastAiResponse && (
//                                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                                         <span className="text-sm font-medium text-blue-700">Latest AI Response</span>
//                                     </div>
//                                     <p className="text-xs text-blue-600 line-clamp-2">{lastAiResponse}</p>
//                                 </div>
//                             )}

//                             {/* Learning Controls */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Card className="p-4 bg-primary/5 border-primary/20">
//                                     <div className="text-center">
//                                         <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
//                                         <p className="text-sm font-medium">Current Focus</p>
//                                         <p className="text-xs text-muted-foreground mt-1">
//                                             {course?.level || 'Component Lifecycle'}
//                                         </p>
//                                     </div>
//                                 </Card>
//                                 <Card className="p-4 bg-primary-glow/5 border-primary-glow/20">
//                                     <div className="text-center">
//                                         <Award className="w-6 h-6 mx-auto mb-2 text-primary-glow" />
//                                         <p className="text-sm font-medium">XP Earned</p>
//                                         <p className="text-xs text-muted-foreground mt-1">
//                                             +{totalInteractions * 25} Points
//                                         </p>
//                                     </div>
//                                 </Card>
//                             </div>

//                             {/* Enhanced Learning Stats */}
//                             <div className="space-y-3">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-muted-foreground">Comprehension Level</span>
//                                     <Badge variant="secondary">{course?.level || 'Intermediate'}</Badge>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-muted-foreground">AI Interactions</span>
//                                     <span className="text-sm font-medium">{totalInteractions}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-muted-foreground">Speech Status</span>
//                                     <span className={`text-sm font-medium ${
//                                         avatarSpeaking ? 'text-red-600' : 
//                                         isMuted ? 'text-gray-500' : 'text-green-600'
//                                     }`}>
//                                         {avatarSpeaking ? '🎙️ Speaking' : 
//                                          isMuted ? '🔇 Muted' : '✓ Ready'}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-muted-foreground">Session Duration</span>
//                                     <span className="text-sm font-medium">{formatTime(sessionTime)}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-muted-foreground">Course Tags</span>
//                                     <span className="text-xs text-muted-foreground max-w-32 truncate">
//                                         {course?.tags || 'react, components'}
//                                     </span>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Right Side - Gemini AI Chat with Avatar Integration */}
//                     <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant flex flex-col min-h-[600px]">
//                         <CourseGeminiChat 
//                             courseContext={courseContext}
//                             className="h-full"
//                             onAiResponse={handleAiResponse} // Connect AI responses to avatar
//                         />
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CourseStartPage;









// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { ArrowLeft, Volume2, VolumeX, Play, Pause, Rocket, Star, Telescope, Brain, Target, Award, Clock } from 'lucide-react';
// import CourseGeminiChat from '@/components/CourseGeminiChat';
// import CourseAvatar from '@/components/CourseAvatar';
// import type { CourseContext } from '@/lib/gemini';
// import { getCourseById } from '@/lib/api';

// interface Course {
//     id: string;
//     title?: string;
//     description?: string;
//     estimated_duration?: number;
//     level?: string;
//     tags?: string;
// }

// // Space-themed system instruction for Gemini
// const SPACE_SYSTEM_INSTRUCTION = `You are 'Starlight,' a friendly, encouraging, and highly knowledgeable Space Navigator designed specifically to help curious children (ages 6-12) explore the universe.

// Your core mission is to resolve space-related doubts in a way that is simple, exciting, and easy to understand.
// Use analogies, fun facts, and an enthusiastic tone to foster a love for science and space exploration. Always maintain a positive and patient demeanor.

// SPECIFIC RULES:
// 1. Keep explanations concise (max 3-4 sentences per turn) and focused on the child's level.
// 2. Always provide accurate, up-to-date information about space topics.
// 3. When relevant, mention specific NASA resources, videos, or documentation available on nasa.gov
// 4. If a video reference is available, mention it clearly and describe what the child will see.
// 5. Start with a friendly space-themed greeting for new conversations.
// 6. For non-space questions, gently guide back to space topics with enthusiasm.
// 7. Use emojis occasionally to make it more engaging for children.

// EXAMPLE RESPONSES:
// "🚀 Hello young astronaut! That's a fantastic question about black holes! Let me explain it like a cosmic vacuum cleaner..."
// "🌟 Great question! NASA has an amazing video showing real footage of Mars. You can see the red planet up close!"
// "📡 Ooh, I love talking about telescopes! Did you know NASA's Hubble telescope has taken pictures of galaxies far, far away?"`;

// const CourseStartPage = () => {
//     const navigate = useNavigate();
//     const params = useParams();
//     const location = useLocation();
//     const [isMuted, setIsMuted] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [courseProgress, setCourseProgress] = useState(0);
//     const [currentTopic, setCurrentTopic] = useState('Space Explorer Session');
//     const [sessionTime, setSessionTime] = useState(0);
//     const [course, setCourse] = useState<Course | null>(null);
//     const [loadingCourse, setLoadingCourse] = useState(false);
//     const [courseError, setCourseError] = useState<string | null>(null);

//     // Avatar-specific states
//     const [lastAiResponse, setLastAiResponse] = useState<string>('');
//     const [totalInteractions, setTotalInteractions] = useState(0);
//     const [avatarSpeaking, setAvatarSpeaking] = useState(false);
//     const [hasWelcomed, setHasWelcomed] = useState(false);

//     // Session timer
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setSessionTime(prev => prev + 1);
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const formatTime = (seconds: number) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Prepare course context for Gemini chat - remove systemInstruction if not in CourseContext type
//     const courseContext: CourseContext = {
//         title: 'Space Exploration for Kids',
//         description: 'Interactive space education session with NASA references',
//         level: 'Beginner',
//         tags: 'space, nasa, planets, stars, astronomy, kids',
//         currentTopic: currentTopic,
//         // Remove systemInstruction if it's not part of the CourseContext type
//         // systemInstruction: SPACE_SYSTEM_INSTRUCTION
//     };

//     // Handle AI responses - with welcome prevention
//     const handleAiResponse = (response: string) => {
//         // Prevent repetitive welcomes
//         if (!hasWelcomed && response.toLowerCase().includes('welcome')) {
//             setHasWelcomed(true);
//         }

//         // Filter out repetitive welcome messages
//         if (hasWelcomed && response.toLowerCase().includes('welcome') && totalInteractions > 0) {
//             return; // Skip setting the response
//         }

//         setLastAiResponse(response);
//         setTotalInteractions(prev => prev + 1);

//         // Update course progress based on interactions (capped at 90% until manual completion)
//         if (courseProgress < 90) {
//             setCourseProgress(prev => Math.min(prev + 5, 90));
//         }
//     };

//     // Avatar speech event handlers
//     const handleAvatarSpeechStart = () => {
//         setAvatarSpeaking(true);
//     };

//     const handleAvatarSpeechEnd = () => {
//         setAvatarSpeaking(false);
//     };

//     // Fetch course data (minimal changes for space theme)
//     useEffect(() => {
//         const idFromParams = params.id || (location.state && (location.state as any).course?.id);

//         let cancelled = false;
//         const fetchCourse = async () => {
//             if (!idFromParams) {
//                 // Set default space-themed course
//                 setCourse({
//                     id: 'space-explorer',
//                     title: 'Space Adventure with Starlight',
//                     description: 'Explore the universe with our friendly AI space guide!',
//                     level: 'All Ages',
//                     tags: 'space, nasa, planets, stars, astronomy'
//                 });
//                 setLoadingCourse(false);
//                 return;
//             }

//             setLoadingCourse(true);
//             setCourseError(null);
//             try {
//                 const data = await getCourseById(idFromParams as string);
//                 if (cancelled) return;
//                 setCourse(data as Course);
//                 if ((data as any).title) setCurrentTopic((data as any).title);
//             } catch (err: unknown) {
//                 const msg = err instanceof Error ? err.message : String(err);
//                 setCourseError(msg || 'Failed to load course');
//                 // Set default space course on error
//                 setCourse({
//                     id: 'space-default',
//                     title: 'Space Explorer Session',
//                     description: 'Learn about space with NASA resources',
//                     level: 'Beginner',
//                     tags: 'space, astronomy'
//                 });
//             } finally {
//                 if (!cancelled) setLoadingCourse(false);
//             }
//         };

//         if (location.state && (location.state as any).course) {
//             const c = (location.state as any).course as Course;
//             setCourse(c);
//             if (c.title) setCurrentTopic(c.title);
//         } else {
//             fetchCourse();
//         }

//         return () => {
//             cancelled = true;
//         };
//     }, [params.id, location.state]);

//     // Auto-complete progress when session is long enough
//     useEffect(() => {
//         if (sessionTime > 300 && courseProgress < 100) { // 5 minutes
//             setCourseProgress(100);
//         }
//     }, [sessionTime, courseProgress]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden flex flex-col">
//             {/* Space-themed Animated Background */}
//             <div className="absolute inset-0 pointer-events-none">
//                 {/* Stars */}
//                 <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>

//                 {/* Animated Space Elements */}
//                 <Rocket className="absolute w-8 h-8 text-yellow-400 animate-bounce" style={{ top: '15%', left: '5%', animationDelay: '0s' }} />
//                 <Star className="absolute w-6 h-6 text-yellow-200 animate-ping" style={{ bottom: '30%', left: '15%', animationDelay: '2s' }} />
//                 <Telescope className="absolute w-8 h-8 text-purple-400 animate-pulse" style={{ top: '60%', right: '8%', animationDelay: '3s' }} />
//                 <Brain className="absolute w-7 h-7 text-cyan-400 animate-bounce" style={{ bottom: '20%', right: '20%', animationDelay: '4s' }} />

//                 {/* Shooting Stars */}
//                 <div className="absolute w-2 h-2 bg-white rounded-full animate-shooting-star" style={{ top: '10%', left: '-20px' }}></div>
//                 <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-shooting-star" style={{ top: '40%', left: '-30px', animationDelay: '5s' }}></div>
//             </div>

//             {/* Header */}
//             <div className="relative z-10 p-6 border-b border-blue-500/30 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => navigate(-1)}
//                             className="hover:bg-blue-500/20 transition-all duration-300 text-white"
//                         >
//                             <ArrowLeft className="h-5 w-5" />
//                         </Button>
//                         <div>
//                             <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
//                                 🚀 {currentTopic}
//                             </h1>
//                             <p className="text-blue-200 text-sm">
//                                 Interactive Space Learning with Starlight
//                                 {avatarSpeaking && (
//                                     <span className="ml-2 text-green-400 animate-pulse">🎙️ Speaking</span>
//                                 )}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <Badge variant="secondary" className="px-3 py-1 bg-blue-500/20 text-blue-200 border-blue-400/30">
//                             <Clock className="w-4 h-4 mr-1" />
//                             {formatTime(sessionTime)}
//                         </Badge>
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-blue-200">Progress:</span>
//                             <div className="w-24">
//                                 <Progress value={courseProgress} className="h-2 bg-blue-900/50" />
//                             </div>
//                             <span className="text-sm font-medium text-white">{courseProgress}%</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="relative z-10 p-6 flex-1 overflow-auto">
//                 {courseError && (
//                     <div className="mb-4 p-3 bg-red-900/50 border border-red-500/30 rounded-lg text-red-200 text-sm">
//                         Note: Using default space explorer mode. {courseError}
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-full">
//                     {/* Left Side - AI Space Guide Avatar */}
//                     <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/30 shadow-xl h-fit">
//                         <CardHeader className="pb-4 border-b border-blue-500/20">
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="flex items-center gap-2 text-white">
//                                     <div className={`w-3 h-3 rounded-full ${
//                                         avatarSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
//                                     }`} />
//                                     🌟 Starlight - Your Space Guide
//                                 </CardTitle>
//                                 <div className="flex items-center gap-2">
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setIsMuted(!isMuted)}
//                                         className="hover:bg-blue-500/20 text-white"
//                                         title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
//                                     >
//                                         {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//                                     </Button>
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setIsPlaying(!isPlaying)}
//                                         className="hover:bg-blue-500/20 text-white"
//                                         title={isPlaying ? "Pause Avatar" : "Resume Avatar"}
//                                     >
//                                         {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="space-y-4 pt-4">
//                             {/* 3D Avatar Component */}
//                             <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30">
//                                 <CourseAvatar
//                                     className="h-full"
//                                     aiResponse={lastAiResponse}
//                                     onSpeechStart={handleAvatarSpeechStart}
//                                     onSpeechEnd={handleAvatarSpeechEnd}
//                                     // Remove autoSpeak if it's not a valid prop
//                                 />
//                             </div>

//                             {/* AI Response Indicator */}
//                             {lastAiResponse && (
//                                 <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
//                                         <span className="text-sm font-medium text-cyan-300">Latest Space Fact</span>
//                                     </div>
//                                     <p className="text-xs text-blue-200 line-clamp-3">{lastAiResponse}</p>
//                                 </div>
//                             )}

//                             {/* Space Learning Stats */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Card className="p-4 bg-blue-500/10 border-blue-500/20">
//                                     <div className="text-center">
//                                         <Target className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
//                                         <p className="text-sm font-medium text-white">Current Focus</p>
//                                         <p className="text-xs text-blue-200 mt-1">
//                                             Space Exploration
//                                         </p>
//                                     </div>
//                                 </Card>
//                                 <Card className="p-4 bg-purple-500/10 border-purple-500/20">
//                                     <div className="text-center">
//                                         <Award className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
//                                         <p className="text-sm font-medium text-white">Space XP</p>
//                                         <p className="text-xs text-purple-200 mt-1">
//                                             +{totalInteractions * 50} Points
//                                         </p>
//                                     </div>
//                                 </Card>
//                             </div>

//                             {/* Enhanced Learning Stats */}
//                             <div className="space-y-3 bg-gray-900/50 rounded-lg p-4">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-blue-200">Mission Level</span>
//                                     <Badge variant="secondary" className="bg-green-500/20 text-green-300">
//                                         {course?.level || 'Space Cadet'}
//                                     </Badge>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-blue-200">Space Queries</span>
//                                     <span className="text-sm font-medium text-white">{totalInteractions}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-blue-200">Guide Status</span>
//                                     <span className={`text-sm font-medium ${
//                                         avatarSpeaking ? 'text-green-400' :
//                                         isMuted ? 'text-gray-400' : 'text-cyan-400'
//                                     }`}>
//                                         {avatarSpeaking ? '🎙️ Explaining' :
//                                          isMuted ? '🔇 Silent' : '✅ Ready'}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm text-blue-200">Mission Time</span>
//                                     <span className="text-sm font-medium text-white">{formatTime(sessionTime)}</span>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Right Side - Space Chat with Gemini */}
//                     <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/30 shadow-xl flex flex-col min-h-[600px]">
//                         <CardHeader className="border-b border-blue-500/20 pb-4">
//                             <CardTitle className="text-white flex items-center gap-2">
//                                 <Telescope className="w-5 h-5 text-cyan-400" />
//                                 Chat with Starlight 🌌
//                             </CardTitle>
//                             <p className="text-sm text-blue-200">
//                                 Ask me anything about space! I'll show you NASA videos and cool facts!
//                             </p>
//                         </CardHeader>
//                         <CardContent className="flex-1 p-0">
//                             <CourseGeminiChat
//                                 courseContext={courseContext}
//                                 className="h-full"
//                                 onAiResponse={handleAiResponse}
//                                 // Remove showWelcomeMessage if it's not a valid prop
//                                 customSystemInstruction={SPACE_SYSTEM_INSTRUCTION} // Pass as custom prop if needed
//                             />
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>

//             {/* Custom CSS for animations */}
//             <style>{`
//                 @keyframes shooting-star {
//                     0% { transform: translateX(0) translateY(0); opacity: 1; }
//                     100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
//                 }
//                 .animate-shooting-star {
//                     animation: shooting-star 3s linear infinite;
//                 }
//                 @keyframes spin {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }
//                 .animate-spin-slow {
//                     animation: spin 20s linear infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default CourseStartPage;








import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Volume2, VolumeX, Play, Pause, Rocket, Star, Telescope, Brain, Target, Award, Clock, ExternalLink, Video } from 'lucide-react';
import CourseGeminiChat from '@/components/CourseGeminiChat';
import CourseAvatar from '@/components/CourseAvatar';
import type { CourseContext } from '@/lib/gemini';
import { getCourseById } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Course {
    id: string;
    title?: string;
    description?: string;
    estimated_duration?: number;
    level?: string;
    tags?: string;
}

// Enhanced Space-themed system instruction for Gemini with video references
const SPACE_SYSTEM_INSTRUCTION = `You are 'Starlight,' a friendly, encouraging, and highly knowledgeable Space Navigator designed specifically to help curious children (ages 6-12) explore the universe.

Your core mission is to resolve space-related doubts in a way that is simple, exciting, and easy to understand.
Use analogies, fun facts, and an enthusiastic tone to foster a love for science and space exploration. Always maintain a positive and patient demeanor.

CRITICAL RULES:
1. For EVERY user question, you MUST provide at least one relevant NASA video link or educational resource.
2. Keep explanations concise (max 3-4 sentences per turn) and focused on the child's level.
3. Always provide accurate, up-to-date information about space topics.
4. Format video links clearly with emojis and descriptions.
5. Start with a friendly space-themed greeting for new conversations only.
6. Use emojis occasionally to make it more engaging for children.

NASA VIDEO RESOURCES TO USE:
- Black Holes: "https://www.youtube.com/watch?v=kOEDG3j1bjs"
- Solar System: "https://www.youtube.com/watch?v=libKVRa01L8"
- Mars Rover: "https://www.youtube.com/watch?v=rzmd7RouGrM"
- International Space Station: "https://www.youtube.com/watch?v=vgfWH3g9kpY"
- Moon Landing: "https://www.youtube.com/watch?v=RMINSD7MmT4"
- Hubble Telescope: "https://www.youtube.com/watch?v=PWx8sNaaDc8"
- Solar Flares: "https://www.youtube.com/watch?v=oHHSSJDJ4oo"
- Earth from Space: "https://www.youtube.com/watch?v=CFrP6QfbC2g"
- Astronaut Training: "https://www.youtube.com/watch?v=H6u9VDn9-4s"
- Rocket Launch: "https://www.youtube.com/watch?v=z9gHuAwxwAs"

RESPONSE FORMAT EXAMPLE:
"🚀 Hello young astronaut! That's a fantastic question about black holes! Let me explain it like a cosmic vacuum cleaner...

🌟 Check out this amazing NASA video showing real black hole data: [Watch: Black Holes Explained](${"https://www.youtube.com/watch?v=kOEDG3j1bjs"})

Did you know black holes can bend light around them?"`;

const CourseStartPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [courseProgress, setCourseProgress] = useState(0);
    const [currentTopic, setCurrentTopic] = useState('Space Explorer Session');
    const [sessionTime, setSessionTime] = useState(0);
    const [course, setCourse] = useState<Course | null>(null);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [courseError, setCourseError] = useState<string | null>(null);

    // Avatar-specific states
    const [lastAiResponse, setLastAiResponse] = useState<string>('');
    const [lastVideoLinks, setLastVideoLinks] = useState<string[]>([]);
    const [totalInteractions, setTotalInteractions] = useState(0);
    const [avatarSpeaking, setAvatarSpeaking] = useState(false);
    const [hasWelcomed, setHasWelcomed] = useState(false);
    const [hasSpokenCurrent, setHasSpokenCurrent] = useState(false);

    // Session timer
    useEffect(() => {
        const timer = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Extract video links from AI response
    const extractVideoLinks = (text: string): string[] => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = text.match(urlRegex) || [];
        return urls.filter(url =>
            url.includes('youtube.com') ||
            url.includes('youtu.be') ||
            url.includes('nasa.gov') ||
            url.includes('space.com')
        );
    };

    // Prepare course context for Gemini chat
    const courseContext: CourseContext = {
        title: 'Space Exploration for Kids',
        description: 'Interactive space education session with NASA references',
        level: 'Beginner',
        tags: 'space, nasa, planets, stars, astronomy, kids',
        currentTopic: currentTopic,
    };

    // Handle AI responses - with welcome prevention and speech control
    const handleAiResponse = (response: string) => {
        // Prevent repetitive welcomes
        if (!hasWelcomed && response.toLowerCase().includes('welcome')) {
            setHasWelcomed(true);
        }

        // Filter out repetitive welcome messages
        if (hasWelcomed && response.toLowerCase().includes('welcome') && totalInteractions > 0) {
            return; // Skip setting the response
        }

        // Extract video links from the response
        const videoLinks = extractVideoLinks(response);
        setLastVideoLinks(videoLinks);

        setLastAiResponse(response);
        setTotalInteractions(prev => prev + 1);

        // Reset speech flag for new response
        setHasSpokenCurrent(false);

        // Update course progress based on interactions (capped at 90% until manual completion)
        if (courseProgress < 90) {
            setCourseProgress(prev => Math.min(prev + 5, 90));
        }
    };

    // Avatar speech event handlers with single-speak logic
    const handleAvatarSpeechStart = () => {
        setAvatarSpeaking(true);
        setHasSpokenCurrent(true);
    };

    const handleAvatarSpeechEnd = () => {
        setAvatarSpeaking(false);
    };

    // Modified avatar props to prevent repetitive speech
    const getAvatarResponse = () => {
        if (!hasSpokenCurrent) {
            return lastAiResponse;
        }
        return ''; // Return empty string if already spoken to prevent re-speaking
    };

    // Fetch course data
    useEffect(() => {
        const idFromParams = params.id || (location.state && (location.state as any).course?.id);

        let cancelled = false;
        const fetchCourse = async () => {
            if (!idFromParams) {
                // Set default space-themed course
                setCourse({
                    id: 'space-explorer',
                    title: 'Space Adventure with Starlight',
                    description: 'Explore the universe with our friendly AI space guide!',
                    level: 'All Ages',
                    tags: 'space, nasa, planets, stars, astronomy'
                });
                setLoadingCourse(false);
                return;
            }

            setLoadingCourse(true);
            setCourseError(null);
            try {
                const data = await getCourseById(idFromParams as string);
                if (cancelled) return;
                setCourse(data as Course);
                if ((data as any).title) setCurrentTopic((data as any).title);
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                setCourseError(msg || 'Failed to load course');
                // Set default space course on error
                setCourse({
                    id: 'space-default',
                    title: 'Space Explorer Session',
                    description: 'Learn about space with NASA resources',
                    level: 'Beginner',
                    tags: 'space, astronomy'
                });
            } finally {
                if (!cancelled) setLoadingCourse(false);
            }
        };

        if (location.state && (location.state as any).course) {
            const c = (location.state as any).course as Course;
            setCourse(c);
            if (c.title) setCurrentTopic(c.title);
        } else {
            fetchCourse();
        }

        return () => {
            cancelled = true;
        };
    }, [params.id, location.state]);

    // Auto-complete progress when session is long enough
    useEffect(() => {
        if (sessionTime > 300 && courseProgress < 100) { // 5 minutes
            setCourseProgress(100);
        }
    }, [sessionTime, courseProgress]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden flex flex-col">
            {/* Space-themed Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Stars */}
                <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>

                {/* Animated Space Elements */}
                <Rocket className="absolute w-8 h-8 text-yellow-400 animate-bounce" style={{ top: '15%', left: '5%', animationDelay: '0s' }} />
                <Star className="absolute w-6 h-6 text-yellow-200 animate-ping" style={{ bottom: '30%', left: '15%', animationDelay: '2s' }} />
                <Telescope className="absolute w-8 h-8 text-purple-400 animate-pulse" style={{ top: '60%', right: '8%', animationDelay: '3s' }} />
                <Brain className="absolute w-7 h-7 text-cyan-400 animate-bounce" style={{ bottom: '20%', right: '20%', animationDelay: '4s' }} />

                {/* Shooting Stars */}
                <div className="absolute w-2 h-2 bg-white rounded-full animate-shooting-star" style={{ top: '10%', left: '-20px' }}></div>
                <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-shooting-star" style={{ top: '40%', left: '-30px', animationDelay: '5s' }}></div>
            </div>

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-blue-500/30 bg-gray-900/80 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(-1)}
                            className="hover:bg-blue-500/20 transition-all duration-300 text-white"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                                🚀 {currentTopic}
                            </h1>
                            <p className="text-blue-200 text-sm">
                                Interactive Space Learning with Starlight
                                {avatarSpeaking && (
                                    <span className="ml-2 text-green-400 animate-pulse">🎙️ Speaking</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="px-3 py-1 bg-blue-500/20 text-blue-200 border-blue-400/30">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(sessionTime)}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-200">Progress:</span>
                            <div className="w-24">
                                <Progress value={courseProgress} className="h-2 bg-blue-900/50" />
                            </div>
                            <span className="text-sm font-medium text-white">{courseProgress}%</span>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 flex-1 overflow-auto">
                {courseError && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500/30 rounded-lg text-red-200 text-sm">
                        Note: Using default space explorer mode. {courseError}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-full">
                    {/* Left Side - AI Space Guide Avatar */}
                    <Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/30 shadow-xl h-fit">
                        <CardHeader className="pb-4 border-b border-blue-500/20">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <div className={`w-3 h-3 rounded-full ${avatarSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                                        }`} />
                                    🌟 Starlight - Your Space Guide
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="hover:bg-blue-500/20 text-white"
                                        title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
                                    >
                                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="hover:bg-blue-500/20 text-white"
                                        title={isPlaying ? "Pause Avatar" : "Resume Avatar"}
                                    >
                                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {/* 3D Avatar Component */}
                            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30">
                                <CourseAvatar
                                    className="h-full"
                                    aiResponse={getAvatarResponse()}
                                    onSpeechStart={handleAvatarSpeechStart}
                                    onSpeechEnd={handleAvatarSpeechEnd}
                                />
                            </div>

                            {/* Video Links Section */}
                            {lastVideoLinks.length > 0 && (
                                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Video className="w-4 h-4 text-purple-300" />
                                        <span className="text-sm font-medium text-purple-300">Recommended NASA Videos</span>
                                    </div>
                                    <div className="space-y-2">
                                        {lastVideoLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 p-2 bg-purple-800/20 rounded text-xs text-purple-200 hover:bg-purple-700/30 transition-colors"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                <span className="truncate flex-1">
                                                    {link.includes('youtube') ? 'YouTube: ' : 'NASA: '}
                                                    {link.replace('https://', '').split('/')[1]}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* AI Response Indicator */}
                            {lastAiResponse && (
                                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-cyan-300">Latest Space Fact</span>
                                    </div>
                                    <p className="text-xs text-blue-200 line-clamp-3">{lastAiResponse}</p>
                                </div>
                            )}

                            {/* Space Learning Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                                    <div className="text-center">
                                        <Target className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                                        <p className="text-sm font-medium text-white">Current Focus</p>
                                        <p className="text-xs text-blue-200 mt-1">
                                            Space Exploration
                                        </p>
                                    </div>
                                </Card>
                                <Card className="p-4 bg-purple-500/10 border-purple-500/20">
                                    <div className="text-center">
                                        <Award className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                                        <p className="text-sm font-medium text-white">Space XP</p>
                                        <p className="text-xs text-purple-200 mt-1">
                                            +{totalInteractions * 50} Points
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Enhanced Learning Stats */}
                            <div className="space-y-3 bg-gray-900/50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-blue-200">Mission Level</span>
                                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                                        {course?.level || 'Space Cadet'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-blue-200">Space Queries</span>
                                    <span className="text-sm font-medium text-white">{totalInteractions}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-blue-200">Guide Status</span>
                                    <span className={`text-sm font-medium ${avatarSpeaking ? 'text-green-400' :
                                            isMuted ? 'text-gray-400' : 'text-cyan-400'
                                        }`}>
                                        {avatarSpeaking ? '🎙️ Explaining' :
                                            isMuted ? '🔇 Silent' : '✅ Ready'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-blue-200">Mission Time</span>
                                    <span className="text-sm font-medium text-white">{formatTime(sessionTime)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    
                    {/* Right Side - Space Chat with Gemini - Fixed Height Scrollable */}
<Card className="bg-gray-800/80 backdrop-blur-sm border-blue-500/30 shadow-xl flex flex-col" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
    <CardHeader className="border-b border-blue-500/20 pb-4 flex-shrink-0">
        <CardTitle className="text-white flex items-center gap-2">
            <Telescope className="w-5 h-5 text-cyan-400" />
            Chat with Starlight 🌌
        </CardTitle>
        <p className="text-sm text-blue-200">
            Ask me anything about space! I'll show you NASA videos and cool facts!
        </p>
    </CardHeader>
    <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="h-full flex flex-col">
            <CourseGeminiChat
                courseContext={courseContext}
                className="flex-1 min-h-0 overflow-auto" // Yahan overflow-auto add karo
                onAiResponse={handleAiResponse}
                customSystemInstruction={SPACE_SYSTEM_INSTRUCTION}
            />
        </div>
    </CardContent>
</Card>

                </div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes shooting-star {
                    0% { transform: translateX(0) translateY(0); opacity: 1; }
                    100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
                }
                .animate-shooting-star {
                    animation: shooting-star 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default CourseStartPage;