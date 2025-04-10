
import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import UserInput from "./UserInput";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDa0g_V29aXl238dDWOZGFDwIBaU_fx1lc");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

interface MessageType {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      content: "Hello! I'm GlobalGuide. Ask me anything and I'll do my best to help you.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const userMessage: MessageType = {
      content: message,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    const result = await model.generateContent(["You are an AI named GlobalGuide, an AI that teaches kids from all around the world. Make an answer not using bullet points or paragraph titles. Do not make it so simple or childish sounding either as this is meant to serve children of the ages of 7+. But also don't make it so complicated sounding to confuse them, make it in simple words that they can understand. Make the answer that for a student so that they may learn from it. State as much information as possible without overloading the information onto them. Their question is: " + userMessage.content]);
    setTimeout(() => {
      const aiMessage: MessageType = {
        content: result.response.text(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        content: "Hello! I'm GlobalGuide. Ask me anything and I'll do my best to help you.",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chat</h2>
        <Button variant="outline" size="sm" onClick={handleClearChat} className="flex gap-2">
          <RefreshCcw className="h-4 w-4" /> New Chat
        </Button>
      </div>

      <ScrollArea className="flex-grow pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          {isProcessing && (
            <div className="flex gap-2 items-center px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <UserInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatInterface;
