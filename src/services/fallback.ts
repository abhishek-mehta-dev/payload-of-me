import fallbackData from '@/data/fallback-responses.json';
import { githubService } from './github';

interface FallbackResponse {
  text: string;
  isFromFallback: boolean;
  category?: string;
}

class FallbackService {
  private responses = fallbackData.responses;
  private quickResponses = fallbackData.quickResponses;
  
  private getRandomResponse(category: keyof typeof fallbackData.responses): string {
    const responses = this.responses[category];
    if (!responses || responses.length === 0) {
      return this.responses.default[0];
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Skills and technologies
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || 
        lowerMessage.includes('tech') || lowerMessage.includes('programming') ||
        lowerMessage.includes('language') || lowerMessage.includes('framework')) {
      return lowerMessage.includes('technology') || lowerMessage.includes('tech') ? 'technologies' : 'skills';
    }
    
    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || 
        lowerMessage.includes('portfolio') || lowerMessage.includes('dahn') ||
        lowerMessage.includes('taxificient') || lowerMessage.includes('docuai')) {
      return 'projects';
    }
    
    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('job') || 
        lowerMessage.includes('career') || lowerMessage.includes('professional') ||
        lowerMessage.includes('developer') || lowerMessage.includes('mern')) {
      return 'experience';
    }
    
    // Education
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || 
        lowerMessage.includes('university') || lowerMessage.includes('degree') ||
        lowerMessage.includes('mca') || lowerMessage.includes('chandigarh')) {
      return 'education';
    }
    
    // GitHub
    if (lowerMessage.includes('github') || lowerMessage.includes('repository') || 
        lowerMessage.includes('repo') || lowerMessage.includes('code') ||
        lowerMessage.includes('contribution')) {
      return 'github';
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || 
        lowerMessage.includes('hire') || lowerMessage.includes('email') ||
        lowerMessage.includes('phone') || lowerMessage.includes('connect')) {
      return 'contact';
    }
    
    // About
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || 
        lowerMessage.includes('background') || lowerMessage.includes('story') ||
        lowerMessage.includes('journey')) {
      return 'about';
    }
    
    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('hey') || lowerMessage.includes('start') ||
        lowerMessage.length < 10) {
      return 'greeting';
    }
    
    return 'default';
  }
  
  async getFallbackResponse(message: string): Promise<FallbackResponse> {
    const intent = this.detectIntent(message);
    
    // Special handling for GitHub-related queries
    if (intent === 'github') {
      try {
        const githubInfo = await githubService.getEnhancedProfile();
        return {
          text: githubInfo,
          isFromFallback: true,
          category: 'github'
        };
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fall back to static GitHub response
        return {
          text: this.getRandomResponse('github'),
          isFromFallback: true,
          category: 'github'
        };
      }
    }
    
    const responseText = this.getRandomResponse(intent as keyof typeof fallbackData.responses);
    
    return {
      text: responseText,
      isFromFallback: true,
      category: intent
    };
  }
  
  getQuickResponses(): Array<{ text: string; category: string }> {
    return Object.entries(this.quickResponses).map(([category, text]) => ({
      text,
      category
    }));
  }
  
  getErrorResponse(): FallbackResponse {
    return {
      text: this.getRandomResponse('error'),
      isFromFallback: true,
      category: 'error'
    };
  }
  
  // Enhanced response with GitHub data when available
  async getEnhancedResponse(message: string): Promise<FallbackResponse> {
    const intent = this.detectIntent(message);
    let baseResponse = this.getRandomResponse(intent as keyof typeof fallbackData.responses);
    
    // Add GitHub data for relevant queries
    if (intent === 'about' || intent === 'skills' || intent === 'projects') {
      try {
        const [user, repos] = await Promise.all([
          githubService.getUserProfile(),
          githubService.getUserRepositories(5)
        ]);
        
        if (user && repos) {
          const githubSummary = `\n\n📊 **Live GitHub Stats:**\n• ${user.public_repos} repositories\n• ${user.followers} followers\n• Last updated: ${new Date(user.updated_at).toLocaleDateString()}`;
          baseResponse += githubSummary;
        }
      } catch (error) {
        console.error('Error enhancing response with GitHub data:', error);
      }
    }
    
    return {
      text: baseResponse,
      isFromFallback: true,
      category: intent
    };
  }
}

export const fallbackService = new FallbackService();
export type { FallbackResponse };