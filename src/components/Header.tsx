
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import MobileNav from '@/components/MobileNav';

const Header = () => {
  return (
    <header className="relative z-10 flex min-w-0 items-center justify-between border-b bg-background px-6 py-2 pt-[calc(0.5rem+env(safe-area-inset-top))]">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold md:text-2xl"
      >
        Rodney Gainous Jr.
      </motion.h1>
      <motion.nav 
        className="hidden items-center gap-8 lg:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="#projects" className="nav-link font-medium">Projects</a>
        <a href="#ai-research" className="nav-link font-medium">Research</a>
        <a href="#experience" className="nav-link font-medium">Experience</a>
        <a href="#writing" className="nav-link font-medium">Writing</a>
        <a href="#podcast" className="nav-link font-medium">Podcast</a>
        <a href="#contact" className="nav-link font-medium">Contact</a>
      </motion.nav>
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <MobileNav />
      </motion.div>
    </header>
  );
};

export default Header;
