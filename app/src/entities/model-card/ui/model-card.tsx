import { useEffect, useState } from "react";
import { Card, Button } from "@/shared/ui";
import { getThumbnail } from "@/shared/lib";

interface ModelCardProps {
  id: string;
  name: string;
  isBuiltIn?: boolean;
  onOpen: () => void;
  onDelete?: () => void;
  openLabel: string;
  deleteLabel?: string;
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white select-none">
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

export function ModelCard({
  id,
  name,
  isBuiltIn,
  onOpen,
  onDelete,
  openLabel,
  deleteLabel,
}: ModelCardProps) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    let revoke: string | null = null;
    getThumbnail(id).then((blob) => {
      if (blob) {
        revoke = URL.createObjectURL(blob);
        setThumbUrl(revoke);
      }
    });
    return () => {
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, [id]);

  return (
    <Card>
      <div className="aspect-square overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder name={name} />
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {name}
        </h3>

        <div className="mt-2 flex gap-2">
          <Button variant="primary" className="flex-1 text-xs" onClick={onOpen}>
            {openLabel}
          </Button>
          {!isBuiltIn && onDelete && deleteLabel && (
            <Button variant="danger" className="text-xs" onClick={onDelete}>
              {deleteLabel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
