"use client";

import { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Column, Card as KanbanCardType } from "@/lib/kanban-data";
import { KanbanCard } from "./KanbanCard";
import { InlineEdit } from "./InlineEdit";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  column: Column;
  cards: KanbanCardType[];
  updateColumn: (id: string | number, title: string) => void;
  updateCard: (id: string | number, updates: Partial<KanbanCardType>) => void;
  deleteCard: (id: string | number) => void;
  addCard: (columnId: string | number) => void;
}

export function KanbanColumn({
  column,
  cards,
  updateColumn,
  updateCard,
  deleteCard,
  addCard,
}: Props) {
  const cardIds = useMemo(() => cards.map((c) => c.id), [cards]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      className="bg-secondary/50 rounded-xl flex flex-col w-full min-w-[280px] max-w-[320px] max-h-full overflow-hidden border shadow-sm"
    >
      {/* Column Header */}
      <div className="p-3 font-bold border-b bg-secondary/80 flex items-center justify-between">
        <div className="flex-1 mr-2">
          <InlineEdit
            value={column.title}
            onChange={(val) => updateColumn(column.id, val)}
            textClassName="text-base"
          />
        </div>
        <span className="bg-background text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
          {cards.length}
        </span>
      </div>

      {/* Column Content (Droppable Area) */}
      <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden flex flex-col gap-2 relative">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="flex flex-col gap-2 min-h-[150px] pb-4">
            {cards.map((card) => (
              <KanbanCard
                key={card.id}
                card={card}
                updateCard={updateCard}
                deleteCard={deleteCard}
              />
            ))}
          </div>
        </SortableContext>
      </div>

      {/* Column Footer */}
      <div className="p-2 border-t bg-secondary/30">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => addCard(column.id)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </div>
    </div>
  );
}
