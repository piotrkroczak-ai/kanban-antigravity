"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { defaultBoardData, BoardData, Id, Card } from "@/lib/kanban-data";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { InlineEdit } from "./InlineEdit";

export function KanbanBoard() {
  const [boardData, setBoardData] = useState<BoardData>(defaultBoardData);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const columns = boardData.columns;
  const cards = boardData.cards;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateBoardTitle = (title: string) => setBoardData((prev) => ({ ...prev, title }));
  const updateBoardDesc = (description: string) => setBoardData((prev) => ({ ...prev, description }));

  const updateColumn = (id: Id, title: string) => {
    setBoardData((prev) => ({
      ...prev,
      columns: prev.columns.map((c) => (c.id === id ? { ...c, title } : c)),
    }));
  };

  const updateCard = (id: Id, updates: Partial<Card>) => {
    setBoardData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const deleteCard = (id: Id) => {
    setBoardData((prev) => ({
      ...prev,
      cards: prev.cards.filter((c) => c.id !== id),
    }));
  };

  const addCard = (columnId: Id) => {
    const newCard: Card = {
      id: `card-${Date.now()}`,
      columnId,
      title: "New Task",
      details: "Add details here...",
    };
    setBoardData((prev) => ({
      ...prev,
      cards: [...prev.cards, newCard],
    }));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "Card";
    const isOverACard = over.data.current?.type === "Card";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveACard) return;

    // Dropping a card over another card
    if (isOverACard) {
      setBoardData((prev) => {
        const activeIndex = prev.cards.findIndex((c) => c.id === activeId);
        const overIndex = prev.cards.findIndex((c) => c.id === overId);

        if (prev.cards[activeIndex].columnId !== prev.cards[overIndex].columnId) {
          const newCards = [...prev.cards];
          newCards[activeIndex].columnId = newCards[overIndex].columnId;
          return { ...prev, cards: arrayMove(newCards, activeIndex, overIndex) };
        }

        return { ...prev, cards: arrayMove(prev.cards, activeIndex, overIndex) };
      });
    }

    // Dropping a card over an empty column
    if (isOverAColumn) {
      setBoardData((prev) => {
        const activeIndex = prev.cards.findIndex((c) => c.id === activeId);
        if (prev.cards[activeIndex].columnId !== overId) {
          const newCards = [...prev.cards];
          newCards[activeIndex].columnId = overId;
          return { ...prev, cards: arrayMove(newCards, activeIndex, activeIndex) };
        }
        return prev;
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 bg-background overflow-hidden">
      {/* Board Header */}
      <div className="mb-6 px-4">
        <InlineEdit
          value={boardData.title}
          onChange={updateBoardTitle}
          textClassName="text-3xl font-bold tracking-tight mb-2"
          className="text-3xl font-bold h-10 mb-2"
        />
        <InlineEdit
          value={boardData.description}
          onChange={updateBoardDesc}
          type="textarea"
          textClassName="text-muted-foreground text-lg max-w-3xl"
          className="text-lg min-h-[60px]"
        />
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-4 h-full items-start">
            {columns.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                cards={cards.filter((c) => c.columnId === col.id)}
                updateColumn={updateColumn}
                updateCard={updateCard}
                deleteCard={deleteCard}
                addCard={addCard}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard ? (
              <KanbanCard
                card={activeCard}
                updateCard={updateCard}
                deleteCard={deleteCard}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
