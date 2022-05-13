import { useCallback, useEffect, useState } from "react";
import { NoveltiesApi } from "../../core/api/novelties.api";
import { INovelty } from "../../core/models/Novelty";
import { NoveltyCard } from "./NoveltyCard";


export function ArchiveList() {
  
  const [novelties, setNovelties] = useState<INovelty[]>();

  const fetchUserNovelties = useCallback(() => {
    NoveltiesApi.getMyNovelties().then(setNovelties);
  }, [])

    useEffect(() => {
        fetchUserNovelties();
        return () => {
            setNovelties(undefined);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



   return (
    <div className="grid gap-6 max-w-3xl p-2 mx-auto">
      {novelties?.map((novelty) => (
        <NoveltyCard  
          isEditable
          key={novelty._id}
          novelty={novelty}
          onModify={fetchUserNovelties}
        />
      ))}
    </div>
  );

}