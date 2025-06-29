import React, { useState, useEffect, useMemo } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import Fuse from "fuse.js";

import styles from "./App.module.css";
import type { Song } from "./types/song";
import Input from "./components/ui/Input/Input";
import SearchResultCard from "./components/search/SearchResultCard";
import Search from "./components/icons/Search";
import { useSongs } from "./hooks/use-songs";

export default function App() {
  const { songs } = useSongs()
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [search, setSearch] = useState("");

  const listRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: searchResults.length,
    estimateSize: (i) => i === 0 ? 114 : 114+16,
  });

  const fuse = useMemo(() => {
    if (!songs.length) return null;
    return new Fuse(songs, {
      keys: ["name", "artists"],
      threshold: 0.3,
      includeScore: true,
    });
  }, [songs])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search || !fuse) {
        setSearchResults([]);
        return;
      }

      const searchValue = search.trim().toLowerCase()
      const results = fuse.search(searchValue).map((item) => item.item)
      setSearchResults(results);
    }, 200);

    return () => clearTimeout(timeout);
  }, [search, fuse]);

  return (
    <main className={styles.main}>
      <section id="search-section" className={styles.section}>
        <Input
          value={search}
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Search song here..."
          icon={<Search/>}
        />
      </section>
      <section
        ref={listRef}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          marginTop: "2rem"
        }}
        className={styles.section}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "end"
          }}
          key={virtualItem.key}>
            <SearchResultCard song={searchResults[virtualItem.index]} />
          </div>
        ))}
      </section>
    </main>
  );
}
