import { useState } from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterState {
  difficulty: string[];
  platform: string[];
  questionType: string[];
  tags: string[];
  status: string[];
  confusionLevel: string[];
}

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onSearchChange: (search: string) => void;
}

const SearchFilters = ({ onFiltersChange, onSearchChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    platform: [],
    questionType: [],
    tags: [],
    status: [],
    confusionLevel: []
  });

  const filterOptions = {
    difficulty: ['Easy', 'Medium', 'Hard'],
    platform: ['LeetCode', 'GeeksforGeeks', 'HackerRank', 'CodeChef', 'Codeforces'],
    questionType: ['DSA', 'SQL', 'Puzzle', 'System Design'],
    tags: ['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming', 'Binary Search', 'Sorting', 'Hash Table'],
    status: ['Solved', 'Attempted', 'Review Needed', 'Bookmarked'],
    confusionLevel: ['Low', 'Medium', 'High']
  };

  const handleFilterChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const updatedFilters = {
      ...filters,
      [category]: checked 
        ? [...filters[category], value]
        : filters[category].filter(item => item !== value)
    };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      difficulty: [],
      platform: [],
      questionType: [],
      tags: [],
      status: [],
      confusionLevel: []
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const removeFilter = (category: keyof FilterState, value: string) => {
    handleFilterChange(category, value, false);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).flat().length;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search questions by name, tags, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-0 focus:bg-card transition-colors"
          />
        </div>
        
        {/* Filter Toggle */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="destructive" className="ml-2 px-1 min-w-[20px] h-5">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category}>
                    <Label className="text-sm font-medium capitalize mb-2 block">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${category}-${option}`}
                            checked={filters[category as keyof FilterState].includes(option)}
                            onCheckedChange={(checked) => 
                              handleFilterChange(category as keyof FilterState, option, !!checked)
                            }
                          />
                          <Label 
                            htmlFor={`${category}-${option}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </form>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([category, values]) =>
            values.map((value) => (
              <Badge
                key={`${category}-${value}`}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => removeFilter(category as keyof FilterState, value)}
              >
                {value}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;