"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

const MAX_LIMIT = 100; 

export async function fetchAnime(page: number, filters: {
  episodes: number; name: string; kind: string; score: string; status: string; aired_on: string; released_on: string;
}) {

  const query = new URLSearchParams({
    page: page.toString(),
    limit: MAX_LIMIT.toString(),
    order: "popularity",
    score: filters.score, 
  }).toString();

  const response = await fetch(`https://shikimori.one/api/animes?${query}`);
  const data = await response.json();

  if (!data || data.length === 0) {
    return []; 
  }


  const filteredData = data.filter((anime: AnimeProp) => {
    const animeAiredOn = anime.aired_on ? new Date(anime.aired_on).toISOString().split('T')[0] : null;
    const animeReleasedOn = anime.released_on ? new Date(anime.released_on).toISOString().split('T')[0] : null;

    return (
      (!filters.name || anime.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.kind || anime.kind.toLowerCase() === filters.kind.toLowerCase()) &&
      (!filters.episodes || Number(anime.episodes || anime.episodes_aired) >= Number(filters.episodes)) &&
      (!filters.status || anime.status.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.aired_on || animeAiredOn === filters.aired_on) &&
      (!filters.released_on || animeReleasedOn === filters.released_on)
    );
  });


  if (filteredData.length === 0) {
    return []; 
  }

  // Return mapped AnimeCard components only if valid filtered data is available
  return filteredData.map((anime: AnimeProp, index: number) => (
    <AnimeCard key={anime.id} anime={anime} index={index} />
  ));
}
