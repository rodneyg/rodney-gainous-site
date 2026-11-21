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
    <section id="contact" className="px-6 py-20 md:py-24">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3
          className="mb-10 text-balance text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's <span className="text-muted-foreground">Connect</span>
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href={contact.href}
                className="surface-card flex min-h-16 items-center gap-4 rounded-xl p-5 hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <contact.icon className="size-5 text-muted-foreground" />
                <span className="font-medium">
                  {contact.value}
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-12 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Based in Los Angeles, CA (Pacific Time)
        </motion.p>

      </motion.div>
    </section>
  );
};

export default ContactSection;
