import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      className="mb-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects by name, description, or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-2 focus:border-primary transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            size="sm"
          >
            <Filter className="h-4 w-4" />
            Technology Filters
            {selectedTechs.length > 0 && (
              <Badge variant="secondary" className="ml-1">
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

        <div className="text-sm text-muted-foreground">
          {filteredCount === totalProjects 
            ? `${totalProjects} projects` 
            : `${filteredCount} of ${totalProjects} projects`
          }
        </div>
      </div>

      {/* Technology Filter Tags */}
      {showFilters && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-medium text-muted-foreground">Filter by technology:</p>
          <div className="flex flex-wrap gap-2">
            {availableTechs.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTechs.includes(tech)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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