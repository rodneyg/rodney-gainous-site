import React from 'react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react'; // Ensure Linkedin is imported
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const contacts = [
  {
    type: "Email",
    value: "rodney.gainous@gmail.com",
    href: "mailto:rodney.gainous@gmail.com",
    icon: Mail
  },
  {
    type: "GitHub",
    value: "@rodneyg",
    href: "https://github.com/rodneyg",
    icon: Github
  },
  {
    type: "X",
    value: "@Rg2official",
    href: "https://x.com/Rg2official",
    icon: Twitter
  },
  {
    type: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/rodneygainous/",
    icon: Linkedin
  }
];

const ContactSection = () => {
  // Current date: Sunday, April 13, 2025 at 5:46 PM PDT
  const currentYear = new Date().getFullYear(); // 2025

  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's <span className="text-primary">Connect</span>
        </motion.h3>

        {/* Removed flex-wrap to prevent wrapping issues */}
        <motion.div
          className="flex flex-row justify-center items-center gap-6" // Removed flex-wrap
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 bg-card hover:bg-slate-50 dark:hover:bg-slate-800 p-4 rounded-xl transition-colors"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Button variant="outline" size="icon" className="bg-background text-primary border-primary/20 hover:bg-accent" asChild>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Link to ${contact.type}`}
                >
                  <contact.icon className="h-5 w-5" />
                </a>
              </Button>
              <a
                href={contact.href}
                className="text-lg font-medium hover:text-primary transition-colors whitespace-nowrap" // Added whitespace-nowrap to link text
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Added centered time zone text below the contact links */}
        <motion.p
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }} // Slightly delayed appearance
        >
          Based in Los Angeles, CA (Pacific Time)
        </motion.p>

      </motion.div>
    </section>
  );
};

export default ContactSection;