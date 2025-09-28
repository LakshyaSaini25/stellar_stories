import { GoogleGenerativeAI } from '@google/generative-ai';

// Character limits
export const CHAR_LIMITS = {
  USER_MESSAGE: 1000,
  TOTAL_CONTEXT: 10000,
} as const;

// Use available models from your API response
const AVAILABLE_MODELS = {
  FLASH: 'models/gemini-2.0-flash-001', // Stable version
  FLASH_LATEST: 'models/gemini-2.5-flash', // Latest version
  PRO: 'models/gemini-2.5-pro' // Pro version for complex tasks
};

// Initialize Gemini AI
const getGeminiAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CourseContext {
  title?: string;
  description?: string;
  level?: string;
  tags?: string;
  currentTopic?: string;
}

// Truncate text to specified limit
const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit - 3) + '...';
};

// Build context prompt for Gemini
const buildContextPrompt = (courseContext: CourseContext, recentMessages: ChatMessage[]): string => {
  let prompt = `You are an AI stellar story teller:Space weather Through the eyes of Earthlings . Here's the course context:
}



`;

  // Add recent messages for context (last 5 messages)
  const contextMessages = recentMessages.slice(-5);
  contextMessages.forEach(msg => {
    prompt += `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.content}\n`;
  });

  prompt += `\nPlease respond as a helpful AI tutor. Keep responses concise, educational, and relevant to the course context.`;

  return truncateText(prompt, CHAR_LIMITS.TOTAL_CONTEXT);
};

// Enhanced API call with model fallback
export const callGeminiAPI = async (
  userMessage: string,
  courseContext: CourseContext,
  recentMessages: ChatMessage[] = []
): Promise<string> => {
  try {
    console.log('🚀 Starting Gemini API call with available models...');

    // Validate and truncate user message
    if (!userMessage.trim()) {
      throw new Error('Message cannot be empty');
    }

    const truncatedMessage = truncateText(userMessage.trim(), CHAR_LIMITS.USER_MESSAGE);
    
    // Initialize Gemini
    const genAI = getGeminiAI();

    // Try different available models
    const modelsToTry = [
      AVAILABLE_MODELS.FLASH, // Primary - most stable
      AVAILABLE_MODELS.FLASH_LATEST, // Fallback - latest version
      AVAILABLE_MODELS.PRO // Final fallback - pro version
    ];

    let lastError: Error | null = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Trying model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          }
        });

        // Build context
        const contextPrompt = buildContextPrompt(courseContext, recentMessages);
        
        // Create the full prompt
        const fullPrompt = `${contextPrompt}\n\nStudent Question: ${truncatedMessage}\n\nTutor Response:`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();

        if (!text) {
          throw new Error('Empty response from Gemini API');
        }

        console.log(`✅ Success with model: ${modelName}`);
        return text.trim();

      } catch (modelError) {
        console.warn(`❌ Model ${modelName} failed:`, modelError);
        lastError = modelError as Error;
        // Continue to next model
      }
    }

    // If all models failed, throw the last error
    throw lastError || new Error('All available models failed');

  } catch (error) {
    console.error('🔴 Gemini API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return 'Configuration Error: Gemini API key issue. Please check your environment settings.';
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return 'API Limit Reached: The Gemini API quota has been exceeded. Please try again later.';
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Network Error: Unable to connect to Gemini API. Please check your internet connection.';
      }
      if (error.message.includes('model') || error.message.includes('not found')) {
        return 'Model Error: The requested AI model is not available. Please try again.';
      }
      return `Error: ${error.message}`;
    }
    
    return 'An unexpected error occurred while getting response from AI tutor. Please try again.';
  }
};

// Test function to verify which models work
export const testAvailableModels = async (): Promise<{ model: string; success: boolean; error?: string }[]> => {
  const results = [];
  const genAI = getGeminiAI();
  
  const testModels = [
    AVAILABLE_MODELS.FLASH,
    AVAILABLE_MODELS.FLASH_LATEST, 
    AVAILABLE_MODELS.PRO
  ];

  for (const modelName of testModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello, respond with "OK"');
      const response = result.response.text();
      
      results.push({
        model: modelName,
        success: true,
        error: undefined
      });
      console.log(`✅ ${modelName}: Working`);
    } catch (error) {
      results.push({
        model: modelName,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log(`❌ ${modelName}: Failed - ${error}`);
    }
  }
  
  return results;
};

// Generate unique message ID
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate message before sending
export const validateMessage = (message: string): { isValid: boolean; error?: string } => {
  if (!message.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (message.length > CHAR_LIMITS.USER_MESSAGE) {
    return { 
      isValid: false, 
      error: `Message too long. Maximum ${CHAR_LIMITS.USER_MESSAGE} characters allowed. Current: ${message.length}` 
    };
  }

  return { isValid: true };
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};