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
    title: "Founder & Principal Engineer",
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
    isParallel: true, // This overlaps with Safe role
    description: "Short-term role that contributed to launching and shaping the early direction of Safe."
  },
  {
    id: 7,
    title: "Staff Software Engineer",
    company: "Blueprint Bryan Johnson",
    location: "Remote",
    startDate: "November 2024",
    endDate: "Present",
    duration: "1 yr 1 mo",
    type: "Full time",
    icon: "🧬",
    color: "bg-foreground",
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

          {/* Parallel Roles */}
          {experiences.filter(exp => exp.isParallel).length > 0 && (
            <div className="mt-12 space-y-6">
              {experiences.filter(exp => exp.isParallel).map((parallelExp, index) => (
                <motion.div
                  key={parallelExp.id}
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                >
                  <div className={`bg-gradient-to-r ${
                    parallelExp.color === 'bg-foreground' 
                      ? 'from-purple-50 to-indigo-50 border-purple-200' 
                      : 'from-teal-50 to-cyan-50 border-teal-200'
                  } rounded-xl p-6 border`}>
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 ${
                        parallelExp.color === 'bg-foreground' 
                          ? 'bg-purple-500' 
                          : 'bg-teal-500'
                      } rounded-full flex items-center justify-center text-white mr-3`}>
                        {parallelExp.icon}
                      </div>
                      <div>
                        <div className={`text-sm ${
                          parallelExp.color === 'bg-foreground' 
                            ? 'text-purple-600' 
                            : 'text-teal-600'
                        } font-semibold`}>Parallel Role</div>
                        <div className={`text-xs ${
                          parallelExp.color === 'bg-foreground' 
                            ? 'text-purple-500' 
                            : 'text-teal-500'
                        }`}>{parallelExp.startDate} - {parallelExp.endDate}</div>
                      </div>
                    </div>
                    <h4 className="font-bold mb-1">{parallelExp.title}</h4>
                    <div className="text-slate-600 mb-2">
                      <div className="font-semibold">{parallelExp.company}</div>
                      <div className="text-sm">{parallelExp.location}</div>
                    </div>
                    {parallelExp.description && (
                      <p className="text-sm text-slate-600 mb-2">
                        {parallelExp.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{parallelExp.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parallelExp.color === 'bg-foreground' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-teal-100 text-teal-700'
                      }`}>
                        {parallelExp.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-primary blur-2xl" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 rounded-full bg-secondary blur-3xl" />
      </div>
    </section>
  );
};

export default ExperienceSection;