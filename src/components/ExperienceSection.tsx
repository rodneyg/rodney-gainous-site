import React from 'react';
import { motion } from 'framer-motion';

// Job experience data structured from the issue description
const experiences = [
  {
    id: 1,
    title: "Software Engineer (iOS)",
    company: "Nexient",
    location: "Michigan, USA",
    startDate: "June 2013",
    endDate: "December 2014",
    duration: "1 yr 7 mos",
    type: "Full time",
    icon: "📱",
    color: "bg-muted"
  },
  {
    id: 2,
    title: "Software Engineer (iOS)",
    company: "Ford Motor Company",
    location: "Michigan, USA", 
    startDate: "January 2015",
    endDate: "December 2016",
    duration: "2 yrs",
    type: "Full time",
    icon: "🚗",
    color: "bg-muted"
  },
  {
    id: 3,
    title: "Software Engineer (Android & iOS)",
    company: "Nima Labs",
    location: "San Francisco, CA, USA",
    startDate: "February 2017",
    endDate: "January 2018", 
    duration: "1 yr",
    type: "Full time",
    icon: "🧪",
    color: "bg-muted"
  },
  {
    id: 4,
    title: "Senior Software Engineer",
    company: "Bird",
    location: "Los Angeles, CA, USA",
    startDate: "February 2018",
    endDate: "April 2020",
    duration: "2 yrs 3 mos", 
    type: "Full time",
    icon: "🛴",
    color: "bg-muted"
  },
  {
    id: 5,
    title: "Founding Principal Engineer",
    company: "Safe",
    location: "Los Angeles, CA, USA",
    startDate: "May 2020",
    endDate: "Present",
    duration: "5 yrs 4 mos",
    type: "Founder",
    icon: "🔐",
    color: "bg-foreground"
  },
  {
    id: 6,
    title: "Entrepreneur in Residence",
    company: "Upfront Ventures", 
    location: "Los Angeles, CA, USA",
    startDate: "November 2020",
    endDate: "April 2021",
    duration: "6 mos",
    type: "Contract",
    icon: "💼",
    color: "bg-muted",
    isParallel: true // This overlaps with Safe role
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional <span className="text-muted-foreground">Journey</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Over a decade of building software across industries—from automotive to mobility, health tech to security.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2 hidden md:block" />
          
          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {experiences.filter(exp => !exp.isParallel).map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Node (simplified, no icon) */}
                <div className="relative md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                  <motion.div
                    className={`w-4 h-4 ${experience.color} rounded-full shadow-lg mb-4 md:mb-0 mx-auto relative z-10`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>

                {/* Experience Card */}
                <motion.div
                  className="border border-border rounded-xl p-8 relative"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      className={`w-12 h-12 ${experience.color} rounded-full flex items-center justify-center text-xl ${experience.color === 'bg-foreground' ? 'text-background' : 'text-foreground'}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {experience.icon}
                    </motion.div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {experience.startDate} - {experience.endDate}
                  </div>
                  <h3 className="font-semibold text-lg mb-3 leading-tight">
                    {experience.title}
                  </h3>
                  <div className="text-muted-foreground mb-4">
                    <div className="font-medium text-foreground">{experience.company}</div>
                    <div className="text-sm">{experience.location}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{experience.duration}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      experience.type === 'Founder' ? 'bg-foreground text-background' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {experience.type}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Parallel Role - Upfront Ventures */}
          {experiences.find(exp => exp.isParallel) && (
            <motion.div
              className="mt-12 max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="mr-3 flex size-10 items-center justify-center rounded-full bg-muted ring-1 ring-black/10 dark:ring-white/10">
                    💼
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Parallel Role</div>
                    <div className="text-xs text-muted-foreground">November 2020 - April 2021</div>
                  </div>
                </div>
                <h4 className="font-bold mb-1">Entrepreneur in Residence</h4>
                <div className="mb-2 text-muted-foreground">
                  <div className="font-semibold">Upfront Ventures</div>
                  <div className="text-sm">Los Angeles, CA, USA</div>
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Short-term role that contributed to launching and shaping the early direction of Safe.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">6 mos</span>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    Contract
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
};

export default ExperienceSection;
