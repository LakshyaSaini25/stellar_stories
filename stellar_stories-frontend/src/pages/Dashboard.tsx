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
import { Bell, Search, Settings, User, BookOpen, Globe, Satellite, Zap, Navigation, Cloud } from 'lucide-react';
import CourseAvatar from '@/components/CourseAvatar';

// Types for our story cards
interface StoryCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animationDelay: string;
  stats?: string;
}

const Dashboard: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Story cards data with Lucide icons
  const storyCards: StoryCard[] = [
    {
      id: 1,
      title: "Solar Flares",
      description: "Explore how massive explosions on the Sun affect our technology",
      icon: <Zap className="w-6 h-6" />,
      color: "#FF6B6B",
      animationDelay: "0s",
      stats: "X-Class Events: 12"
    },
    {
      id: 2,
      title: "Coronal Mass Ejections",
      description: "Learn about billion-ton clouds of plasma traveling to Earth",
      icon: <Cloud className="w-6 h-6" />,
      color: "#9B59B6",
      animationDelay: "0.1s",
      stats: "Active CMEs: 3"
    },
    {
      id: 3,
      title: "Aurora Adventures",
      description: "Discover the beautiful lights created by space weather",
      icon: <Globe className="w-6 h-6" />,
      color: "#3498DB",
      animationDelay: "0.2s",
      stats: "Aurora Alerts: 8"
    },
    {
      id: 4,
      title: "GPS Impacts",
      description: "See how space weather affects navigation systems",
      icon: <Navigation className="w-6 h-6" />,
      color: "#2ECC71",
      animationDelay: "0.3s",
      stats: "Signal Disruptions: 5"
    },
    {
      id: 5,
      title: "Power Grid Effects",
      description: "Understand the impact on our electrical systems",
      icon: <Satellite className="w-6 h-6" />,
      color: "#F39C12",
      animationDelay: "0.4s",
      stats: "Grid Alerts: 2"
    },
    {
      id: 6,
      title: "Space Weather Science",
      description: "Learn about space weather from scientific perspective",
      icon: <BookOpen className="w-6 h-6" />,
      color: "#E74C3C",
      animationDelay: "0.5s",
      stats: "Research Papers: 47"
    }
  ];

  // Mock user data
  const userProfile = {
    name: "Dr. Sarah Johnson",
    role: "Space Weather Educator",
    email: "s.johnson@space.edu"
  };

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

    // Create multiple stars for the background
    for (let i = 0; i < 150; i++) {
      createStar();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent relative overflow-hidden">
      {/* Twinkling Stars Background for entire page */}
      <div className="stars-background absolute inset-0 pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-2 rounded-lg">
<<<<<<< HEAD
                <img src={logo} alt="Stellar Stories Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Stellar Stories</h1>
                <p className="text-sm text-muted-foreground">Student Interview Portal</p>
=======
                <div className="w-8 h-8 flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SpaceWeather Explorer</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Portal</p>
>>>>>>> 76f6b47444501d439100ee02b71872f38e16fb9f
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

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <Settings className="w-5 h-5 text-muted-foreground transition-colors" />
              </button>

              {/* User Menu */}
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-foreground">{userProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{userProfile.role}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Space Weather Explorer, {userProfile.name}!
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
                  onClick={() => setActiveCard(card.id)}
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
    </div>
  );
};

export default Dashboard;