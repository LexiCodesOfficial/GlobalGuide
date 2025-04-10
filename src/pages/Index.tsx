
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-6 md:py-8">
        <div className="max-w-3xl mx-auto glass p-4 rounded-lg shadow-sm border h-[75vh]">
          <ChatInterface />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
