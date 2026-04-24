import { KanbanBoard } from "@/components/KanbanBoard";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <KanbanBoard />
      <div className="fixed bottom-4 right-4 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border shadow-sm">
        Built with Gemini 3.1 Pro (High)
      </div>
    </main>
  );
}
