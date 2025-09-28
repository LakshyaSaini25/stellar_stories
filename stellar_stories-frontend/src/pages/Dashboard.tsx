// import React, { useEffect, useState } from 'react';
// import logo from '../../public/favicon.png';
// import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
// import { DashboardStats } from '../components/DashboardStats';
// import { QuickActions } from '../components/QuickActions';
// import { UpcomingInterviews } from '../components/UpcomingInterviews';
// import { RecentActivity } from '../components/RecentActivity';
// import { ThemeToggle } from '../components/ThemeToggle';
// import { auth } from '@/components/auth/firebase';
// import api from '@/lib/api';
// import { useNavigate } from 'react-router-dom';

// export const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState<any | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('it_user_meta') || 'null')?.email;
//         if (!email) return;
//         const res = await api.get(`/users/by-email?email=${encodeURIComponent(email)}`);
//         setProfile(res);
//       } catch (err) {
//         console.warn('Failed to load profile:', err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
//       {/* Header */}
//       <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="gradient-primary p-2 rounded-lg">
//                 <img src={logo} alt="Intellecto Logo" className="w-8 h-8 object-contain" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-foreground">Intellecto</h1>
//                 <p className="text-sm text-muted-foreground">Student Interview Portal</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               {/* Search */}
//               <div className="relative hidden md:block">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search candidates, interviews..."
//                   className="pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
//                 />
//               </div>

//               {/* Theme Toggle */}
//               <ThemeToggle />

//               {/* Notifications */}
//               <button className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale relative">
//                 <Bell className="w-5 h-5 text-muted-foreground transition-colors" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-soft"></span>
//               </button>

//               {/* Settings */}
//               <button onClick={() => navigate('/settings')} className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
//                 <Settings className="w-5 h-5 text-muted-foreground transition-colors" />
//               </button>

//               {/* User Menu */}
//               <button onClick={() => navigate('/profile')} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
//                     <User className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="hidden md:block">
//                     <p className="text-sm font-medium text-foreground">{profile?.full_name || auth.currentUser?.displayName || auth.currentUser?.email || "User"}</p>
//                     <p className="text-xs text-muted-foreground">{profile?.role ? `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} · Student` : 'Computer Science Student'}</p>
//                   </div>
//                 </div>
//               </button>
//               <div>
//                 <button onClick={() => auth.signOut()} className="p-1 rounded hover:bg-accent transition-colors">
//                   <LogOut className="w-4 h-4 text-muted-foreground" ></LogOut>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8 animate-fade-up">
//           <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, {profile?.full_name || auth.currentUser?.displayName} 👋</h2>
//           <p className="text-muted-foreground">Ready to ace your upcoming interviews? Let's get started!</p>
//         </div>

//         {/* Stats Grid */}
//         <DashboardStats />

//         {/* Quick Actions */}
//         <QuickActions />

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <UpcomingInterviews />
//           <RecentActivity />
//         </div>

//         {/* Additional Insights */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.8s' }}>
//             <h3 className="text-lg font-semibold text-foreground mb-4">My Performance</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-muted-foreground">Course Completion Rate</span>
//                 <span className="text-sm font-medium text-foreground">87.5%</span>
//               </div>
//               <div className="w-full bg-accent rounded-full h-2">
//                 <div className="gradient-primary h-2 rounded-full" style={{ width: '87.5%' }}></div>
//               </div>
//             </div>
//             <div className="space-y-3 mt-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-muted-foreground">Average Project Rating</span>
//                 <span className="text-sm font-medium text-foreground">4.6/5</span>
//               </div>
//               <div className="w-full bg-accent rounded-full h-2">
//                 <div className="gradient-primary h-2 rounded-full" style={{ width: '92%' }}></div>
//               </div>
//             </div>
//           </div>

//           <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.9s' }}>
//             <h3 className="text-lg font-semibold text-foreground mb-4">My Stats</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">Courses Enrolled</span>
//                 <span className="text-lg font-bold text-primary">6</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">Modules Completed</span>
//                 <span className="text-lg font-bold text-primary">4</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">Practice Hours This Month</span>
//                 <span className="text-lg font-bold text-primary">42h</span>
//               </div>
//             </div>
//           </div>

//           <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '1s' }}>
//             <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">AI Professor Status</span>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
//                   <span className="text-sm font-medium text-green-600">Excellent</span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">3D Avatar Engine</span>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
//                   <span className="text-sm font-medium text-green-600">Online</span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-muted-foreground">Code Sandbox</span>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
//                   <span className="text-sm font-medium text-green-600">Ready</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };


















































// // Dashboard.tsx
// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// // Types for our story cards
// interface StoryCard {
//   id: number;
//   title: string;
//   description: string;
//   icon: string;
//   color: string;
//   animationDelay: string;
// }

// const Dashboard: React.FC = () => {
//   const [activeCard, setActiveCard] = useState<number | null>(null);
  
//   // Story cards data
//   const storyCards: StoryCard[] = [
//     {
//       id: 1,
//       title: "Solar Flares",
//       description: "Explore how massive explosions on the Sun affect our technology",
//       icon: "☀️",
//       color: "#FF6B6B",
//       animationDelay: "0s"
//     },
//     {
//       id: 2,
//       title: "Coronal Mass Ejections",
//       description: "Learn about billion-ton clouds of plasma traveling to Earth",
//       icon: "🌌",
//       color: "#9B59B6",
//       animationDelay: "0.1s"
//     },
//     {
//       id: 3,
//       title: "Aurora Adventures",
//       description: "Discover the beautiful lights created by space weather",
//       icon: "🌈",
//       color: "#3498DB",
//       animationDelay: "0.2s"
//     },
//     {
//       id: 4,
//       title: "GPS Impacts",
//       description: "See how space weather affects navigation systems",
//       icon: "🧭",
//       color: "#2ECC71",
//       animationDelay: "0.3s"
//     },
//     {
//       id: 5,
//       title: "Power Grid Effects",
//       description: "Understand the impact on our electrical systems",
//       icon: "⚡",
//       color: "#F39C12",
//       animationDelay: "0.4s"
//     },
//     {
//       id: 6,
//       title: "Astronaut Stories",
//       description: "Learn about space weather from space perspective",
//       icon: "👨‍🚀",
//       color: "#E74C3C",
//       animationDelay: "0.5s"
//     }
//   ];

//   // Animation for stars background
//   useEffect(() => {
//     const createStar = () => {
//       const star = document.createElement('div');
//       star.className = 'star';
//       star.style.left = `${Math.random() * 100}%`;
//       star.style.top = `${Math.random() * 100}%`;
//       star.style.animationDelay = `${Math.random() * 5}s`;
//       document.querySelector('.stars-background')?.appendChild(star);
//     };

//     // Create multiple stars
//     for (let i = 0; i < 100; i++) {
//       createStar();
//     }
//   }, []);

//   return (
//     <div className="dashboard-container">
//       {/* Animated stars background */}
//       <div className="stars-background"></div>
      
//       {/* Floating particles animation */}
//       <div className="floating-particles">
//         {[...Array(20)].map((_, i) => (
//           <div key={i} className="particle" style={{
//             animationDelay: `${Math.random() * 5}s`,
//             left: `${Math.random() * 100}%`
//           }}></div>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {/* Left Side - Teacher Section */}
//         <div className="teacher-section">
//           <div className="classroom-container">
//             <div className="classroom-background">
//               <div className="interactive-board">
//                 <div className="board-content">
//                   <h3 className="board-title">Space Weather Classroom</h3>
//                   <div className="solar-system">
//                     <div className="sun"></div>
//                     <div className="earth-orbit">
//                       <div className="earth"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="teacher-character">
//                 <div className="teacher-head"></div>
//                 <div className="teacher-body"></div>
//                 <div className="teacher-arm"></div>
//                 <div className="teacher-pointer"></div>
//               </div>
              
//               <div className="students-group">
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i} className="student" style={{ animationDelay: `${i * 0.2}s` }}>
//                     <div className="student-head"></div>
//                     <div className="student-body"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Story Cards */}
//         <div className="cards-section">
//           <div className="section-header">
//             <h1 className="dashboard-title">Space Weather Adventures</h1>
//             <p className="dashboard-subtitle">Explore how the Sun affects our daily lives</p>
//           </div>
          
//           <div className="cards-grid">
//             {storyCards.map((card) => (
//               <div
//                 key={card.id}
//                 className={`story-card ${activeCard === card.id ? 'active' : ''}`}
//                 style={{
//                   animationDelay: card.animationDelay,
//                   '--card-color': card.color
//                 } as React.CSSProperties}
//                 onMouseEnter={() => setActiveCard(card.id)}
//                 onMouseLeave={() => setActiveCard(null)}
//                 onClick={() => setActiveCard(card.id)}
//               >
//                 <div className="card-icon" style={{ backgroundColor: card.color }}>
//                   {card.icon}
//                 </div>
//                 <div className="card-content">
//                   <h3 className="card-title">{card.title}</h3>
//                   <p className="card-description">{card.description}</p>
//                 </div>
//                 <div className="card-glow" style={{ backgroundColor: card.color }}></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

































// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Bell, Search, Settings, User, BookOpen, Globe, Satellite, Zap, Navigation, Cloud, LogOut, X, Play } from 'lucide-react';
import CourseAvatar from '@/components/CourseAvatar';
import { auth } from '@/components/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

// Types for our story cards
interface StoryCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animationDelay: string;
  stats?: string;
  summary: string;
  impacts: string[];
}

const Dashboard: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<StoryCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('it_user_meta') || 'null')?.email;
        if (!email) return;
        setProfile({
          full_name: "Mr. Mohan Kumar",
          role: "Space Weather Educator",
          email: email
        });
      } catch (err) {
        console.warn('Failed to load profile:', err);
        setProfile({
          full_name: "Dr. Sarah Johnson",
          role: "Space Weather Educator",
          email: auth.currentUser?.email || "s.johnson@space.edu"
        });
      }
    };
    fetchProfile();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('it_user_meta');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Story cards data with detailed information
  const storyCards: StoryCard[] = [
    {
      id: 1,
      title: "Solar Flares",
      description: "Explore how massive explosions on the Sun affect our technology",
      icon: <Zap className="w-6 h-6" />,
      color: "#FF6B6B",
      animationDelay: "0s",
      stats: "X-Class Events: 12",
      summary: "Solar flares are sudden flashes of increased brightness on the Sun, often associated with sunspots. They release enormous amounts of energy across the electromagnetic spectrum, from radio waves to gamma rays. These powerful bursts can reach Earth in just 8 minutes and have significant impacts on our technology and daily lives.",
      impacts: [
        "🌌 Astronauts: Need special protection from radiation exposure",
        "✈️ Pilots: May experience communication blackouts during flights",
        "👨‍🌾 Farmers: GPS-dependent equipment can malfunction affecting precision agriculture",
        "⚡ Power Grid Operators: Potential transformer damage and grid instability",
        "📡 Satellite Operators: Risk of electronic system failures and reduced lifespan"
      ]
    },
    {
      id: 2,
      title: "Coronal Mass Ejections",
      description: "Learn about billion-ton clouds of plasma traveling to Earth",
      icon: <Cloud className="w-6 h-6" />,
      color: "#9B59B6",
      animationDelay: "0.1s",
      stats: "Active CMEs: 3",
      summary: "Coronal Mass Ejections are massive bursts of solar wind and magnetic fields rising above the solar corona or being released into space. These billion-ton clouds of plasma can travel at speeds up to 3,000 km/s and take 1-3 days to reach Earth, creating spectacular auroras and potential technological disruptions.",
      impacts: [
        "🚀 Astronauts: Serious radiation hazard requiring shelter in shielded areas",
        "🛩️ Airlines: May reroute polar flights to avoid radiation exposure",
        "📊 Satellite Operators: Risk of complete system failures and orbital degradation",
        "👨‍👩‍👧‍👦 General Public: Can see beautiful auroras at lower latitudes",
        "🔬 Scientists: Opportunities to study space weather phenomena"
      ]
    },
    {
      id: 3,
      title: "Aurora Adventures",
      description: "Discover the beautiful lights created by space weather",
      icon: <Globe className="w-6 h-6" />,
      color: "#3498DB",
      animationDelay: "0.2s",
      stats: "Aurora Alerts: 8",
      summary: "Auroras are natural light displays in Earth's sky, predominantly seen in high-latitude regions around the Arctic and Antarctic. They occur when charged particles from the Sun collide with atoms in Earth's atmosphere, creating stunning displays of green, pink, and purple lights that dance across the night sky.",
      impacts: [
        "📸 Tourists: Spectacular viewing opportunities in northern regions",
        "🎨 Photographers: Unique photography chances for stunning natural displays",
        "🔭 Scientists: Research opportunities for atmospheric interactions",
        "🏞️ Indigenous Communities: Cultural and spiritual significance",
        "🏨 Local Businesses: Economic benefits from aurora tourism"
      ]
    },
    {
      id: 4,
      title: "GPS Impacts",
      description: "See how space weather affects navigation systems",
      icon: <Navigation className="w-6 h-6" />,
      color: "#2ECC71",
      animationDelay: "0.3s",
      stats: "Signal Disruptions: 5",
      summary: "Space weather can cause significant disruptions to GPS signals by affecting the ionosphere, leading to positioning errors and signal degradation. These disruptions can impact everything from smartphone navigation to critical infrastructure, making understanding space weather essential for modern technology.",
      impacts: [
        "👨‍🌾 Farmers: Precision agriculture equipment affected, reducing efficiency",
        "✈️ Pilots: Navigation system errors requiring alternative methods",
        "🚢 Shipping: Maritime navigation issues affecting global trade",
        "🚑 Emergency Services: Location accuracy reduced during critical operations",
        "📱 General Public: Smartphone navigation and timing services disrupted"
      ]
    },
    {
      id: 5,
      title: "Power Grid Effects",
      description: "Understand the impact on our electrical systems",
      icon: <Satellite className="w-6 h-6" />,
      color: "#F39C12",
      animationDelay: "0.4s",
      stats: "Grid Alerts: 2",
      summary: "Geomagnetically induced currents can flow through power grids during space weather events, potentially causing transformer damage and widespread blackouts. These currents are created when changing magnetic fields induce electric currents in long conductors like power lines.",
      impacts: [
        "🏭 Power Companies: Equipment protection and monitoring essential",
        "🏥 Hospitals: Backup power systems critical for patient care",
        "🏠 Homeowners: Potential extended power outages affecting daily life",
        "💼 Businesses: Economic impacts from operational downtime",
        "🔧 Engineers: Design challenges for grid resilience"
      ]
    },
    {
      id: 6,
      title: "Space Weather Science",
      description: "Learn about space weather from scientific perspective",
      icon: <BookOpen className="w-6 h-6" />,
      color: "#E74C3C",
      animationDelay: "0.5s",
      stats: "Research Papers: 47",
      summary: "Space weather science involves studying the Sun-Earth system and how solar activity affects our technological infrastructure and daily lives. This interdisciplinary field combines astronomy, physics, and engineering to predict and mitigate space weather impacts.",
      impacts: [
        "🔬 Researchers: New discoveries about Sun-Earth connections",
        "🎓 Students: Educational opportunities in STEM fields",
        "🏛️ Policy Makers: Disaster preparedness and planning guidance",
        "👨‍👩‍👧‍👦 General Public: Increased awareness and safety knowledge",
        "🌍 Global Community: International collaboration for space weather monitoring"
      ]
    }
  ];

  // Handle card click to open dialog
  const handleCardClick = (card: StoryCard) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
    setActiveCard(card.id);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null);
    setIsSpeaking(false);
    speechSynthesis.cancel();
  };

  // Speak the summary
  const handleSpeakSummary = () => {
    if (!selectedCard) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`
      ${selectedCard.title}. 
      ${selectedCard.summary}
      Impacts include: ${selectedCard.impacts.map(impact => impact.replace(/[🌌✈️👨‍🌾⚡📡🚀🛩️📊👨‍👩‍👧‍👦🔬📸🎨🔭🏞️🏨🚢🚑📱🏭🏥🏠💼🔧🎓🏛️🌍]/g, '')).join('. ')}
    `);
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  };

  // Start the story (navigate to story page)
  const handleStartStory = () => {
    console.log('Starting story for:', selectedCard);
    // if (selectedCard) {
      // Navigate to the story page
      navigate(`/story/${selectedCard?.id}`);
    // }
  };

  // Close dialog on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDialogOpen) {
        handleCloseDialog();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDialogOpen]);

  // Create twinkling stars for the entire page background
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'background-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      document.querySelector('.stars-background')?.appendChild(star);
    };

    for (let i = 0; i < 150; i++) {
      createStar();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent relative overflow-hidden">
      {/* Twinkling Stars Background */}
      <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-2 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SpaceWeather Explorer</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search topics, modules..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale relative">
                <Bell className="w-5 h-5 text-muted-foreground transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-soft"></span>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Settings */}
              <button onClick={() => navigate('/settings')} className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <Settings className="w-5 h-5 text-muted-foreground transition-colors" />
              </button>

              {/* User Menu */}
              <button onClick={() => navigate('/profile')} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-foreground">
                      {profile?.full_name || auth.currentUser?.displayName || auth.currentUser?.email || "Space Explorer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.role ? `${profile.role} · Educator` : 'Space Weather Educator'}
                    </p>
                  </div>
                </div>
              </button>
              
              {/* Logout Button */}
              <div>
                <button 
                  onClick={handleLogout} 
                  className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-muted-foreground transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up glass rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Space Weather Explorer, {profile?.full_name || auth.currentUser?.displayName || "Explorer"}!
            <span className="text-2xl ml-2">🌌</span>
          </h2>
          <p className="text-muted-foreground">Explore how solar activity impacts our daily lives and technology</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - 3D Avatar Classroom */}
          <div className="glass rounded-xl p-6 animate-fade-up">
            <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Space Classroom</h3>
            <div className="classroom-container relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <CourseAvatar/>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-primary/80 transition-all duration-300 flex items-center space-x-2"
              onClick={() => {
              speechSynthesis.cancel();
              setIsSpeaking(false);
              navigate('/course-start');
              }}
            >
              <Globe className="w-5 h-5 mr-2" />
              Resolve all your doubts
            </button>
          </div>

          {/* Right Side - Learning Modules */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-foreground mb-4">Space Weather Learning Modules</h3>
            <div className="grid grid-cols-1 gap-4">
              {storyCards.map((card) => (
                <div
                  key={card.id}
                  className={`glass rounded-lg p-4 transition-all duration-300 hover-scale cursor-pointer border-2 ${
                    activeCard === card.id ? 'border-primary/50' : 'border-transparent'
                  }`}
                  onMouseEnter={() => setActiveCard(card.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={() => handleCardClick(card)}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-3 rounded-lg transition-all duration-300"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <div style={{ color: card.color }}>
                        {card.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{card.title}</h4>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{card.stats}</span>
                        <div className="w-20 bg-accent rounded-full h-1">
                          <div 
                            className="h-1 rounded-full transition-all duration-500"
                            style={{ 
                              backgroundColor: card.color,
                              width: activeCard === card.id ? '100%' : '60%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <br />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Solar Flares</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="p-3 rounded-full bg-red-500/10">
                <Zap className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CME Events Today</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500/10">
                <Cloud className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aurora Alerts</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500/10">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Modules</p>
                <p className="text-2xl font-bold text-foreground">6</p>
              </div>
              <div className="p-3 rounded-full bg-green-500/10">
                <BookOpen className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Course Completion</span>
                <span className="text-sm font-medium text-foreground">75%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Module Mastery</span>
                <span className="text-sm font-medium text-foreground">68%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Real-time Data Feed</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Live</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">3D Visualization</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Educational Tools</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Story Card Dialog - Fixed z-index and proper container */}
      {isDialogOpen && selectedCard && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseDialog}
        >
          <div 
            className="glass rounded-xl max-w-6xl w-full max-h-[85vh] overflow-hidden animate-scale-in dialog-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center space-x-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${selectedCard.color}20` }}
                >
                  <div style={{ color: selectedCard.color }}>
                    {selectedCard.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedCard.title}</h2>
                  <p className="text-muted-foreground">{selectedCard.description}</p>
                </div>
              </div>
              <button
                onClick={handleCloseDialog}
                className="p-2 rounded-lg hover:bg-accent transition-all duration-300"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - 3D Model with proper container */}
                    <CourseAvatar />
                  {/* Speaking Indicator */}
                  {isSpeaking && (
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 rounded-full px-3 py-2 backdrop-blur-sm">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-green-400 font-medium">Speaking</span>
                    </div>
                  )}

                {/* Right Side - Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">What You'll Learn</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedCard.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Impacts on Different People</h3>
                    <ul className="space-y-3">
                      {selectedCard.impacts.map((impact, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm">
                          <span className="text-lg flex-shrink-0 mt-0.5">{impact.split(' ')[0]}</span>
                          <span className="text-muted-foreground">{impact.split(' ').slice(1).join(' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border/50">
              <button
                onClick={handleSpeakSummary}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 hover-scale ${
                  isSpeaking 
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30' 
                    : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Stop Listening</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">Listen to Summary</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStartStory}
                className="flex items-center space-x-3 px-8 py-3 gradient-primary rounded-lg text-white hover-scale transition-all duration-300 font-medium shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Start Story Adventure</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;