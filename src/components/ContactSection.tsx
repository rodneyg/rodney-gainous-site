
import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const contacts = [
  {
    type: "Email",
    value: "rodney@safer.email",
    href: "mailto:rodney@safer.email",
    icon: Mail
  },
  {
    type: "GitHub",
    value: "@rodneygainous",
    href: "https://github.com/rodneygainous",
    icon: Github
  },
  {
    type: "Twitter",
    value: "@rodneygainous",
    href: "https://twitter.com/rodneygainous",
    icon: Twitter
  }
];

const ContactSection = () => {
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
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contacts.map((contact, index) => (
            <motion.div 
              key={index}
              className="flex items-center gap-4 bg-card hover:bg-slate-50 p-4 rounded-xl transition-colors"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Button variant="outline" size="icon" className="bg-white text-primary border-primary/20" asChild>
                <a 
                  href={contact.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={contact.type}
                >
                  <contact.icon className="h-5 w-5" />
                </a>
              </Button>
              <a 
                href={contact.href} 
                className="text-lg font-medium hover:text-primary transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
