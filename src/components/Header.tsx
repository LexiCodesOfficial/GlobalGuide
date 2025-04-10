
import React from "react";
import { MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GlobalGuide</span>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
