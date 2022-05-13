import { formatDistance } from 'date-fns';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useCallback, useMemo } from 'react';
import { NoveltiesApi } from '../../core/api/novelties.api';
import { INovelty, NoveltyStatus } from "../../core/models/Novelty";

interface NoveltyCardProps {
    novelty: INovelty;
    buttons?: JSX.Element[];
    onModify?: () => void;
    isEditable?: boolean;
}

export function NoveltyCard({ novelty, onModify, isEditable }: NoveltyCardProps) {
  
  const onArchive = useCallback(async () => {
     await NoveltiesApi.update(novelty._id, { status: NoveltyStatus.ARCHIVED });
     onModify && onModify();
  }, [novelty._id, onModify]);

  const onDelete = useCallback(async () => {
     await NoveltiesApi.delete(novelty._id);
     onModify && onModify();
  }, [novelty._id, onModify]);

  const onPublish = useCallback(async () => {
     await NoveltiesApi.update(novelty._id, { status: NoveltyStatus.PUBLISHED });
     onModify && onModify();
  }, [novelty._id, onModify]);

  const OptionButtons = useMemo(() => {
    if (!isEditable) return null;

    return novelty.status === NoveltyStatus.PUBLISHED ? (
      <Button
        label="Archive"
        className="p-button-text p-button-sm"
        onClick={onArchive}
      />
    ) : (
      <div className="d-flex gap-2">
        <Button
          label="Publish"
          className="p-button-text p-button-sm"
          onClick={onPublish}
        />
       
        <Button
          label="Delete"
          className="p-button-text p-button-sm"
          onClick={onDelete}
        />
        
      </div>
    );
  }, [isEditable, novelty.status, onArchive, onPublish, onDelete]);

  return (
    <Card
      className="p-4 transition-all rounded-md hover:shadow-xl"
      title={<div className='flex justify-between'><p>{novelty.title}</p>{OptionButtons}</div>}
      subTitle={formatDistance(new Date(novelty.date), new Date(), { addSuffix: true })}
      footer={novelty.author?.username && "by: " + novelty.author?.username}
    >
      <p className='font-bold text-lime-300'>{novelty.description}</p>
      <p className='line-clamp-3 pt-1'>{novelty.content}</p>
    </Card>
  );
}