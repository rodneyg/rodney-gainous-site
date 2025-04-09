
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const articles = [
  {
    title: "How I Made $200k Before 16",
    description: "The viral story of AutoFighter Pro",
    link: "#"
  },
  {
    title: "Systems, cyber, health, power, and control",
    description: "Thoughts from the edge",
    link: "#"
  }
];

const WritingSection = () => {
  return (
    <section id="writing" className="py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3 
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary">Writing</span> & Thoughts
        </motion.h3>
        
        <motion.p
          className="text-center mb-8 text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Read my Substack:{' '}
          <a 
            href="https://frommyview.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline inline-flex items-center"
          >
            From My View <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </motion.p>

        <motion.div 
          className="space-y-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <a 
                    href={article.link} 
                    className="flex justify-between items-center p-6 hover:bg-slate-50 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div>
                      <h4 className="font-bold text-xl mb-1">{article.title}</h4>
                      <p className="text-muted-foreground">{article.description}</p>
                    </div>
                    <div className="bg-primary/10 rounded-full p-2 text-primary">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WritingSection;
