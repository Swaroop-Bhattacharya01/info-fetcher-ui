import { MovieCard } from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xl text-muted-foreground mb-2">No movies found</p>
        <p className="text-sm text-muted-foreground">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          overview={movie.overview}
        />
      ))}
    </div>
  );
};