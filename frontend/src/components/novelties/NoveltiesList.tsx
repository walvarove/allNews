import { useState, useCallback, useEffect } from "react";
import { NoveltiesApi } from "../../core/api/novelties.api";
import { useAuth } from "../../core/hooks/useAuth";
import { INovelty } from "../../core/models/Novelty";
import { NoveltyCard } from "./NoveltyCard";


export function NoveltiesList() {
  
  const { user } = useAuth();

  const [novelties, setNovelties] = useState<INovelty[]>();

  const fetchAllNovelties = useCallback(() => {
    NoveltiesApi.getAllNovelties().then(setNovelties);
  }, []);

  useEffect(() => {
    fetchAllNovelties();
    return () => {
      setNovelties(undefined);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-6 max-w-3xl p-2 mx-auto">
      {novelties?.map((novelty) => (
        <NoveltyCard
          isEditable={!!user && user?._id === novelty.author?._id}
          key={novelty._id}
          novelty={novelty}
          onModify={fetchAllNovelties}
        />
      ))}
    </div>
  );
}