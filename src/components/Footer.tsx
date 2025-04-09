
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 border-t text-center text-sm text-muted-foreground">
      &copy; {currentYear} Rodney Gainous Jr. All rights reserved.
    </footer>
  );
};

export default Footer;
