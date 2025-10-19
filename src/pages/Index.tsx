import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { RecentSearches } from "@/components/RecentSearches";
import { useToast } from "@/hooks/use-toast";
import { Film, Loader2 } from "lucide-react";
import Loader from "@/components/Loader";
import ThemeToggle from "@/components/ThemeToggle";
import heroImage from "@/assets/hero-cinema.jpg";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    try {
      const { data, error } = await supabase
        .from("search_history")
        .select("search_query")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      // Remove duplicates
      const uniqueSearches = Array.from(
        new Set(data?.map((item) => item.search_query) || [])
      ).slice(0, 5);

      setRecentSearches(uniqueSearches);
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  const saveSearchHistory = async (query: string) => {
    try {
      const { error } = await supabase
        .from("search_history")
        .insert({ search_query: query, search_type: "movie" });

      if (error) throw error;
      fetchRecentSearches();
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("search-movies", {
        body: { query: searchQuery, page: 1 },
      });

      if (error) throw error;

      setMovies(data.results || []);
      saveSearchHistory(searchQuery);

      if (data.fromCache) {
        toast({
          title: "Loaded from cache",
          description: "Results loaded instantly from cache!",
        });
      }

      if (data.results?.length === 0) {
        toast({
          title: "No results",
          description: "No movies found for your search.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Failed to search movies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecentSearch = (search: string) => {
    setSearchQuery(search);
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center gap-3 mb-6">
            {/* Site logo served from public/logo-new.png (place your provided image at public/logo-new.png) */}
            <img src="/logo-new.png" alt="CineSearch logo" className="logo w-28 h-auto sm:w-36 md:w-48 lg:w-56 xl:w-72" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CineSearch
            </h1>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
            Discover your next favorite movie from millions of titles
          </p>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          {isLoading && (
            <div className="mt-6">
              <Loader />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <RecentSearches
          searches={recentSearches}
          onSelectSearch={handleSelectRecentSearch}
        />

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Searching movies...</p>
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Search Results
                <span className="text-muted-foreground text-lg ml-2">
                  ({movies.length} movies)
                </span>
              </h2>
            </div>
            <MovieGrid movies={movies} />
          </>
        )}

        {!isLoading && movies.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Film className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Start your search
            </h3>
            <p className="text-muted-foreground">
              Enter a movie title above to discover amazing films
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;