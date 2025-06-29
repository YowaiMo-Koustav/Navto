'use client';
import { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { answerTransitQuestion } from '@/ai/flows/answer-transit-question';
import { suggestRelevantAlerts } from '@/ai/flows/suggest-relevant-alerts';
import type { ServiceAlert } from '@/types';

interface VoiceAssistantProps {
  allAlerts: ServiceAlert[];
  setRelevantAlerts: (alerts: ServiceAlert[]) => void;
}

export default function VoiceAssistant({ allAlerts, setRelevantAlerts }: VoiceAssistantProps) {
  const [query, setQuery] = useState('');
  const [interactionText, setInteractionText] = useState("Ask about your route, e.g., \"Is route 14 on time?\"");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || isLoading) return;

    setIsLoading(true);
    setInteractionText(`Thinking about "${query}"...`);

    try {
      // Fetch AI answer
      const answerPromise = answerTransitQuestion({ question: query });
      
      // Fetch relevant alerts
      const alertNames = allAlerts.map(a => a.title + ": " + a.message);
      const relevantAlertsPromise = suggestRelevantAlerts({ query, alerts: alertNames });

      const [answerResult, relevantAlertsResult] = await Promise.all([answerPromise, relevantAlertsPromise]);
      
      setInteractionText(answerResult.answer);

      const filteredAlerts = allAlerts.filter(alert => 
        relevantAlertsResult.some(relevantAlert => relevantAlert.startsWith(alert.title))
      );
      setRelevantAlerts(filteredAlerts);

    } catch (error) {
      console.error('Error with AI interaction:', error);
      setInteractionText("Sorry, I couldn't process that. Please try again.");
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "There was an issue communicating with the assistant.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card m-4 shadow-lg border-0">
      <CardContent className="p-4 flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 w-full">
           <div className="voice-assistant-icon flex-shrink-0">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <p className="text-center text-muted-foreground text-sm flex-grow min-w-0">{interactionText}</p>
        </div>
        <form onSubmit={handleQuery} className="mt-4 flex w-full max-w-lg items-center space-x-2">
          <Input 
            type="text"
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="bg-background"
          />
          <Button type="submit" size="icon" disabled={isLoading || !query}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
      <style jsx>{`
        .voice-assistant-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </Card>
  );
}
