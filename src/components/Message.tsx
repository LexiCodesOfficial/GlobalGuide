
import React from "react";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
}

const Message: React.FC<MessageProps> = ({ content, isUser, timestamp = new Date() }) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg animate-fade-in message-transition",
        isUser ? "bg-chat-user" : "bg-chat-ai border border-chat-border"
      )}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={16} className="text-blue-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-purple-600" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">
            {isUser ? "You" : "GlobalGuide"}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
};

export default Message;
