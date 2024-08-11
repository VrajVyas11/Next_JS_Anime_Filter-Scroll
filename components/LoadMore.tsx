"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchAnime } from "../app/action";

export type AnimeCard = JSX.Element;

interface LoadMoreProps {
  filters: {
    name: string;
    kind: string;
    score: string;
    status: string;
    episodes: number;
    aired_on: string;
    released_on: string;
  };
}

function LoadMore({ filters }: LoadMoreProps) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    // Reset the page and data when filters change
    setData([]);
    setCurrentPage(2);
  }, [filters]);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500;

      const timeoutId = setTimeout(() => {
        fetchAnime(currentPage, filters).then((res) => {
          if (res.length > 0) {
            setData((prevData) => [...prevData, ...res]);
            setCurrentPage((prevPage) => prevPage + 1);
          }
          setIsLoading(false);
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, filters, currentPage]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
