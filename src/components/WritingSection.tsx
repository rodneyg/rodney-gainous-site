import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Articles array - Substack remains as an item, alongside Medium articles.
const articles = [
  {
    title: "From My View (Substack)", // Keep Substack prominent here
    description: "My perspectives on AI, robotics, health tech, plus personal picks for shows, movies & more.",
    link: "https://rg2official.substack.com"
  },
  {
    title: "How I Made $200,000 When I Was 16",
    description: "The story of how I hit $200k before I was legally old enough to vote.",
    link: "https://medium.com/tech-product-and-life/how-i-made-200-000-when-i-was-16-years-old-304f0e87cfb6"
  },
  {
    title: "How a College Dropout Raised $1M in 2 Minutes",
    description: "Yeah, it was wild. Here's how I secured $1M in literally 120 seconds after leaving college.",
    link: "https://medium.com/tech-product-and-life/how-a-college-dropout-raised-1m-in-2-minutes-1629713747db"
  },
  {
    title: "250k Downloads — The High School Project That Blew Up",
    description: "What started as 'just a project' in high school ended up hitting a quarter-million downloads.",
    link: "https://rg2official.medium.com/150k-downloads-the-high-school-project-that-blew-up-db389a7ce1c9"
  },
  {
    title: "How I (Almost) Closed a Deal With Mark Cuban, With Only an E-mail",
    description: "Sometimes you just gotta shoot your shot. My story of cold-emailing Mark Cuban and *almost* closing.",
    link: "https://medium.com/tech-product-and-life/how-i-almost-closed-a-deal-with-mark-cuban-with-only-an-e-mail-d7eda956a7a7"
  },
  {
    title: "Book Notes — Never Split The Difference",
    description: "Breaking down the negotiation gold from Chris Voss's book – the stuff I actually use.",
    link: "https://medium.com/tech-product-and-life/book-notes-never-split-the-difference-96c732147e7c"
  }
  // Removed the duplicate Substack card from the end
];


const WritingSection = () => {
  // Current date: Sunday, April 13, 2025
  const currentYear = new Date().getFullYear(); // 2025

  return (
    <section id="writing" className="py-32 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3
          className="text-4xl font-bold mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-muted-foreground">Writing</span> & Thoughts
        </motion.h3>

        <motion.p
          className="text-center mb-16 text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Check out my thoughts on{' '}
          <a
            href="https://rg2official.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground transition-colors"
          >
            Substack
          </a>
          {' '}or browse more articles on{' '}
          <a
            href="https://medium.com/@rg2official"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground transition-colors"
          >
            Medium
          </a>.
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={article.link}
                className="block border border-border rounded-xl p-6 hover:bg-muted/30 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-lg mb-2">{article.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{article.description}</p>
                  </div>
                  <div className="text-muted-foreground flex-shrink-0 mt-1">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WritingSection;