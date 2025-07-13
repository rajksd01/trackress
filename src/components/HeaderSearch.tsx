import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Mock search suggestions
  const suggestions = [
    { type: 'question', title: 'Two Sum', platform: 'LeetCode' },
    { type: 'question', title: 'Binary Search', platform: 'GeeksforGeeks' },
    { type: 'tag', title: 'Dynamic Programming' },
    { type: 'tag', title: 'Binary Tree' },
    { type: 'platform', title: 'LeetCode' },
    { type: 'platform', title: 'HackerRank' },
  ];

  const filteredSuggestions = suggestions.filter(item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1 max-w-md cursor-pointer">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search questions, tags, platforms..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 bg-muted/50 border-0 focus:bg-card transition-colors cursor-pointer"
            onFocus={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search questions, tags, platforms..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Questions">
              {filteredSuggestions
                .filter(item => item.type === 'question')
                .map((item, index) => (
                <CommandItem key={index} className="cursor-pointer">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.platform}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Tags">
              {filteredSuggestions
                .filter(item => item.type === 'tag')
                .map((item, index) => (
                <CommandItem key={index} className="cursor-pointer">
                  <span>#{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Platforms">
              {filteredSuggestions
                .filter(item => item.type === 'platform')
                .map((item, index) => (
                <CommandItem key={index} className="cursor-pointer">
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderSearch;