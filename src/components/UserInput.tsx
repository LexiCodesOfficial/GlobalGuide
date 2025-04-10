
import React, { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send, Mic } from "lucide-react";

interface UserInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 bg-background p-4 rounded-lg border">
      <textarea
        className="flex-grow min-h-[40px] max-h-[120px] bg-transparent border-0 focus:outline-none resize-none p-2"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        rows={1}
        style={{ height: Math.min(120, Math.max(40, message.split('\n').length * 24)) + 'px' }}
      />
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          disabled={isProcessing}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
          className="rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
