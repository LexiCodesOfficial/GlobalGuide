
import React from "react";

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="border-t py-4">
      <div className="container text-center">
        <span className="text-sm text-muted-foreground">© {year} GlobalGuide</span>
      </div>
    </footer>
  );
};

export default Footer;
