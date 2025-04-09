
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
    <section id="contact" className="py-20 px-6">
      <motion.div
        className="max-w-md mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-10">Contact</h3>
        
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center gap-4"
              whileHover={{ x: 5 }}
            >
              <Button variant="outline" size="icon" asChild>
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
                className="text-lg hover:text-primary transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
