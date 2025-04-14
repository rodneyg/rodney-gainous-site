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

        {/* Updated paragraph linking clearly to both platforms */}
        <motion.p
          className="text-center mb-8 text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Check out my thoughts on{' '}
          <a
            href="https://rg2official.substack.com" // Link to Substack
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline inline-flex items-center"
          >
            Substack <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          {' '}or browse more articles on{' '}
          <a
            href="https://medium.com/@rg2official" // Link to Medium Profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline inline-flex items-center"
          >
            Medium <ExternalLink className="ml-1 h-4 w-4" />
          </a>.
        </motion.p>

        {/* The cards list remains, including the Substack entry at the top */}
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
                    className="flex justify-between items-center p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex-1 mr-4">
                      <h4 className="font-bold text-xl mb-1">{article.title}</h4>
                      <p className="text-muted-foreground">{article.description}</p>
                    </div>
                    <div className="bg-primary/10 rounded-full p-2 text-primary flex-shrink-0">
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