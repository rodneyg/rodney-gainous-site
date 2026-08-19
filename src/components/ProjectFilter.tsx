import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTechs: string[];
  setSelectedTechs: (techs: string[]) => void;
  availableTechs: string[];
  totalProjects: number;
  filteredCount: number;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTechs,
  setSelectedTechs,
  availableTechs,
  totalProjects,
  filteredCount
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleTech = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTechs([]);
  };

  const hasActiveFilters = searchTerm || selectedTechs.length > 0;

  return (
    <motion.div
      className="mx-auto mb-12 max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects by name, description, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="min-h-12 border-2 py-3 pl-10 pr-12 text-base transition-colors focus:border-primary md:text-lg"
        />
        {searchTerm && (
          <button
            aria-label="Clear search"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="flex min-h-10 items-center gap-2"
            size="sm"
          >
            <Filter className="size-4" />
            Technology Filters
            {selectedTechs.length > 0 && (
              <Badge variant="secondary" className="ml-1 tabular-nums">
                {selectedTechs.length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
              size="sm"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="text-sm tabular-nums text-muted-foreground">
          {filteredCount === totalProjects 
            ? `${totalProjects} projects` 
            : `${filteredCount} of ${totalProjects} projects`
          }
        </div>
      </div>

      {/* Technology Filter Tags */}
      {showFilters && (
        <motion.div
          className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-muted-foreground">Filter by technology:</p>
          <div className="flex flex-wrap gap-2">
            {availableTechs.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-3 py-1 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200",
                  selectedTechs.includes(tech)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
                whileTap={{ scale: 0.96 }}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectFilter;
