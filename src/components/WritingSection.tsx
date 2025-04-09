
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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
    <section id="writing" className="py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-8 text-center">Writing</h3>
        <p className="text-center mb-10">
          Read my Substack:{' '}
          <a 
            href="https://frommyview.substack.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium inline-flex items-center"
          >
            From My View <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </p>

        <ul className="space-y-5">
          {articles.map((article, index) => (
            <motion.li 
              key={index}
              className="border rounded-lg p-5 hover:shadow-md transition-shadow"
              whileHover={{ x: 5 }}
            >
              <a 
                href={article.link} 
                className="flex justify-between items-center"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div>
                  <h4 className="font-semibold text-lg">{article.title}</h4>
                  <p className="text-muted-foreground">{article.description}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default WritingSection;
