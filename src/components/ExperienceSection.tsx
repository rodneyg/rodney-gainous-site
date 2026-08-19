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
  },
  {
    id: 7,
    title: "Staff Software Engineer",
    company: "Blueprint (now Immortals)",
    location: "Los Angeles, California, United States · Remote",
    startDate: "November 2025",
    endDate: "Present",
    duration: "10 mos",
    type: "Full time",
    icon: "",
    logo: "https://blueprint.bryanjohnson.com/cdn/shop/files/Logo_Blueprint_Bryan_Johnson_Stacked.svg",
    logoAlt: "Blueprint",
    skills: "Mobile Application Development · Mobile Product Development",
    color: "bg-muted"
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="mb-4 text-balance text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional <span className="text-muted-foreground">Journey</span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Over a decade of building software across industries—from automotive to mobility, health tech to security.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-0">
          {/* Horizontal Timeline Line */}
          <div className="absolute bottom-0 left-2 top-0 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-3 md:h-px md:w-auto" />
          
          {/* Timeline Items */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-6">
            {experiences.filter(exp => !exp.isParallel).map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className="absolute -left-[1.9rem] top-4 z-10 md:left-1/2 md:top-1 md:-translate-x-1/2">
                  <div className={`size-4 rounded-full ${experience.color} ring-4 ring-background shadow-sm`} />
                </div>

                {/* Experience Card */}
                <motion.div
                  className="relative rounded-2xl bg-card p-5 shadow-sm ring-1 ring-black/10 dark:ring-white/10 md:mt-8"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    {'logo' in experience ? (
                      <div className="flex h-10 min-w-0 items-center rounded-lg bg-white px-2 ring-1 ring-black/10">
                        <img
                          src={experience.logo}
                          alt={experience.logoAlt}
                          className="max-h-7 w-auto max-w-24"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className={`flex size-10 items-center justify-center rounded-lg text-lg ${experience.color} ${experience.color === 'bg-foreground' ? 'text-background' : 'text-foreground'}`}>
                        {experience.icon}
                      </div>
                    )}
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      experience.type === 'Founder' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
                    }`}>
                      {experience.type}
                    </span>
                  </div>
                  <div className="mb-3 text-xs leading-5 text-muted-foreground tabular-nums">
                    {experience.startDate} - {experience.endDate}
                  </div>
                  <h3 className="mb-2 text-balance text-lg font-semibold leading-6">
                    {experience.title}
                  </h3>
                  <div className="text-pretty text-sm leading-6 text-muted-foreground">
                    <div className="font-medium text-foreground">{experience.company}</div>
                    <div>{experience.location}</div>
                  </div>
                  {'skills' in experience && (
                    <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2 text-xs font-medium leading-5 text-muted-foreground">
                      {experience.skills}
                    </div>
                  )}
                  <div className="mt-5 border-t border-border/60 pt-3 text-xs font-medium text-muted-foreground tabular-nums">
                    {experience.duration}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Parallel Role - Upfront Ventures */}
          {experiences.find(exp => exp.isParallel) && (
            <motion.div
              className="mx-auto mt-5 max-w-xl md:mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="rounded-2xl bg-muted/40 p-5 shadow-sm ring-1 ring-black/10 dark:ring-white/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-background ring-1 ring-black/10 dark:ring-white/10">
                    💼
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted-foreground">Parallel role</div>
                    <div className="text-xs text-muted-foreground tabular-nums">November 2020 - April 2021</div>
                  </div>
                </div>
                <h4 className="mb-1 text-balance font-bold">Entrepreneur in Residence</h4>
                <div className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Upfront Ventures</span>
                  <span> · Los Angeles, CA, USA</span>
                </div>
                <p className="text-pretty text-sm leading-6 text-muted-foreground">
                  Short-term role that contributed to launching and shaping the early direction of Safe.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
};

export default ExperienceSection;
