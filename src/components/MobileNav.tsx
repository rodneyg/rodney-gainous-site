import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

interface MobileNavProps {
  isScrolled: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#projects", label: "Projects" },
    { href: "#writing", label: "Writing" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-9 w-9 rounded-full"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="h-5 w-5" />
          </motion.div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <motion.h2 
              className="text-lg font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Navigation
            </motion.h2>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 py-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block text-2xl font-medium py-3 text-foreground hover:text-primary transition-colors border-b border-border/50 hover:border-primary/50"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Footer */}
          <motion.div 
            className="p-6 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Rodney Gainous Jr.
            </p>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;