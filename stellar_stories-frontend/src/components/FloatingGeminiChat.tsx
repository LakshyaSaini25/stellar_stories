import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import CourseGeminiChat from '@/components/CourseGeminiChat';
import type { CourseContext } from '@/lib/gemini';

interface FloatingChatProps {
  courseContext?: CourseContext;
  className?: string;
}

const FloatingGeminiChat: React.FC<FloatingChatProps> = ({ 
  courseContext,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Default course context if none provided
  const defaultContext: CourseContext = {
    title: 'General Learning',
    description: 'AI Tutor Chat',
    level: 'All Levels',
    tags: 'general, help, learning',
    currentTopic: 'General Discussion',
  };

  const contextToUse = courseContext || defaultContext;

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card
        className={`bg-white dark:bg-gray-800 shadow-2xl border-border/50 transition-all duration-300 flex flex-col overflow-hidden ${
          isMinimized
            ? 'w-80 h-16'
            : 'w-96 h-[80vh]'
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 border-b border-border/50 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium text-sm">AI Tutor</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-black bg-gray-200"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 bg-grey-400 text-black "
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <div className="flex-1">
            <CourseGeminiChat 
              courseContext={contextToUse}
              className="h-full"
            />
          </div>
        )}

        {/* Minimized State */}
        {isMinimized && (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-gray-600 dark:text-gray-300">Chat minimized - click to expand</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FloatingGeminiChat;