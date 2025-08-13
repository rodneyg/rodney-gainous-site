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
    color: "bg-blue-500"
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
    color: "bg-indigo-500"
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
    color: "bg-purple-500"
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
    color: "bg-green-500"
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
    color: "bg-orange-500"
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
    color: "bg-teal-500",
    isParallel: true // This overlaps with Safe role
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional <span className="text-primary">Journey</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
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
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-primary/30 to-slate-200 transform -translate-y-1/2 hidden md:block" />
          
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
                {/* Timeline Node */}
                <div className="relative md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                  <motion.div
                    className={`w-16 h-16 ${experience.color} rounded-full shadow-lg flex items-center justify-center text-white text-2xl mb-4 md:mb-0 mx-auto relative z-10`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {experience.icon}
                  </motion.div>
                  
                  {/* Pulse Animation */}
                  <motion.div
                    className={`absolute inset-0 w-16 h-16 ${experience.color} rounded-full opacity-30`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </div>

                {/* Experience Card */}
                <motion.div
                  className={`bg-white rounded-xl shadow-lg p-6 border border-slate-200 ${
                    index % 2 === 0 ? 'md:mt-24' : 'md:mb-24'
                  }`}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-sm text-primary font-semibold mb-2">
                    {experience.startDate} - {experience.endDate}
                  </div>
                  <h3 className="font-bold text-lg mb-2 leading-tight">
                    {experience.title}
                  </h3>
                  <div className="text-slate-600 mb-2">
                    <div className="font-semibold">{experience.company}</div>
                    <div className="text-sm">{experience.location}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{experience.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      experience.type === 'Founder' ? 'bg-orange-100 text-orange-700' :
                      experience.type === 'Contract' ? 'bg-teal-100 text-teal-700' :
                      'bg-blue-100 text-blue-700'
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
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white mr-3">
                    💼
                  </div>
                  <div>
                    <div className="text-sm text-teal-600 font-semibold">Parallel Role</div>
                    <div className="text-xs text-teal-500">November 2020 - April 2021</div>
                  </div>
                </div>
                <h4 className="font-bold mb-1">Entrepreneur in Residence</h4>
                <div className="text-slate-600 mb-2">
                  <div className="font-semibold">Upfront Ventures</div>
                  <div className="text-sm">Los Angeles, CA, USA</div>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Short-term role that contributed to launching and shaping the early direction of Safe.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">6 mos</span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                    Contract
                  </span>
                </div>
              </div>
            </motion.div>
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