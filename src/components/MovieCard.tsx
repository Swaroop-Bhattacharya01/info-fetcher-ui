import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MovieCardProps {
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
  overview: string;
}

export const MovieCard = ({ title, posterPath, releaseDate, voteAverage, overview }: MovieCardProps) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card className="group overflow-hidden bg-card border-border hover:shadow-[0_0_30px_rgba(156,89,253,0.3)] transition-all duration-300">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-foreground">{title}</h3>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {releaseDate ? new Date(releaseDate).getFullYear() : "N/A"}
          </span>
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{voteAverage.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{overview}</p>
      </CardContent>
    </Card>
  );
};