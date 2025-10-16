import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ value, onChange, onSearch, isLoading }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for movies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
      </div>
      <Button 
        onClick={onSearch}
        disabled={isLoading || !value.trim()}
        className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};