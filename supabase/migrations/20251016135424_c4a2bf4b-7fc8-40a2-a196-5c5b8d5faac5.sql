-- Create search_history table to store user search queries
CREATE TABLE public.search_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_query TEXT NOT NULL,
  search_type TEXT NOT NULL DEFAULT 'movie',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert search history (public feature)
CREATE POLICY "Anyone can insert search history" 
ON public.search_history 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view search history (for displaying recent searches)
CREATE POLICY "Anyone can view search history" 
ON public.search_history 
FOR SELECT 
USING (true);

-- Create index on created_at for faster queries on recent searches
CREATE INDEX idx_search_history_created_at ON public.search_history(created_at DESC);