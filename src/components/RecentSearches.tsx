import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecentSearchesProps {
  searches: string[];
  onSelectSearch: (search: string) => void;
}

export const RecentSearches = ({ searches, onSelectSearch }: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Recent Searches</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {searches.map((search, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-accent/20 transition-colors"
            onClick={() => onSelectSearch(search)}
          >
            {search}
          </Badge>
        ))}
      </div>
    </div>
  );
};