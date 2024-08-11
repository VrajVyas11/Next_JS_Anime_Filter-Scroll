import LoadMore from "@/components/LoadMore";
import Filter from "@/components/Filter";
import { fetchAnime } from "./action";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const filters = {
    name: Array.isArray(searchParams.name) ? searchParams.name[0] : searchParams.name || "",
    kind: Array.isArray(searchParams.kind) ? searchParams.kind[0] : searchParams.kind || "",
    score: Array.isArray(searchParams.score) ? searchParams.score[0] : searchParams.score || "",
    status: Array.isArray(searchParams.status) ? searchParams.status[0] : searchParams.status || "",
    episodes: Number(Array.isArray(searchParams.episodes) ? searchParams.episodes[0] : searchParams.episodes || ""),
    aired_on: Array.isArray(searchParams.aired_on) ? searchParams.aired_on[0] : searchParams.aired_on || "",
    released_on: Array.isArray(searchParams.released_on) ? searchParams.released_on[0] : searchParams.released_on || "",
  };
  const data = await fetchAnime(1, filters);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold flex justify-between items-center">
        Explore Anime
        <div className="relative z-50"><Filter /></div>
      </h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <LoadMore filters={filters} />
    </main>
  );
}
