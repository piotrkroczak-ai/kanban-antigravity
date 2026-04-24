"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as KanbanCardType } from "@/lib/kanban-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InlineEdit } from "./InlineEdit";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  card: KanbanCardType;
  updateCard: (id: string | number, updates: Partial<KanbanCardType>) => void;
  deleteCard: (id: string | number) => void;
  isOverlay?: boolean;
}

export function KanbanCard({ card, updateCard, deleteCard, isOverlay }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "Card",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 border-2 border-dashed border-primary rounded-xl h-[120px] w-full"
      />
    );
  }

  return (
    <Card
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      className={`relative group cursor-default hover:shadow-md transition-shadow ${
        isOverlay ? "shadow-2xl rotate-2" : ""
      }`}
    >
      <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between space-y-0">
        <div className="flex-1 pr-2">
          <InlineEdit
            value={card.title}
            onChange={(val) => updateCard(card.id, { title: val })}
            textClassName="font-semibold text-sm"
            className="text-sm font-semibold h-7"
          />
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => deleteCard(card.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-muted rounded p-1"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <InlineEdit
          value={card.details}
          onChange={(val) => updateCard(card.id, { details: val })}
          type="textarea"
          textClassName="text-xs text-muted-foreground line-clamp-3"
          className="text-xs"
        />
      </CardContent>
    </Card>
  );
}
