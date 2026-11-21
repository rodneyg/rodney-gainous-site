import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#projects", label: "Projects" },
    { href: "#ai-research", label: "Research" },
    { href: "#experience", label: "Experience" },
    { href: "#writing", label: "Writing" },
    { href: "#podcast", label: "Podcast" },
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
          className="size-10 rounded-full lg:hidden"
          aria-label="Open navigation menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="size-5" />
          </motion.div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0" aria-describedby={undefined}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6 pr-16">
            <SheetTitle>Navigation</SheetTitle>
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
                    className="block min-h-10 border-b border-border/50 py-3 text-2xl font-medium text-foreground transition-[color,border-color] hover:border-primary/50 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Footer */}
          <motion.div 
            className="border-t p-6"
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
