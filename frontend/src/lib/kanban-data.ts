export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Card = {
  id: Id;
  columnId: Id;
  title: string;
  details: string;
};

export type BoardData = {
  title: string;
  description: string;
  columns: Column[];
  cards: Card[];
};

export const defaultBoardData: BoardData = {
  title: "Frontend Overhaul Q3",
  description: "Tracking tasks for the major frontend redesign and performance improvements in Q3.",
  columns: [
    { id: "col-1", title: "Backlog" },
    { id: "col-2", title: "To Do" },
    { id: "col-3", title: "In Progress" },
    { id: "col-4", title: "Review" },
    { id: "col-5", title: "Done" },
  ],
  cards: [
    {
      id: "card-1",
      columnId: "col-1",
      title: "Audit dependencies",
      details: "Check for any outdated NPM packages and prepare an upgrade plan."
    },
    {
      id: "card-2",
      columnId: "col-1",
      title: "Research alternative state managers",
      details: "Look into Zustand and Jotai to see if they fit better than Redux for our current needs."
    },
    {
      id: "card-3",
      columnId: "col-2",
      title: "Setup CI/CD pipeline",
      details: "Configure GitHub Actions to run ESLint and unit tests on every PR."
    },
    {
      id: "card-4",
      columnId: "col-3",
      title: "Implement new design system",
      details: "Migrate standard UI components to the new Tailwind configuration and shadcn."
    },
    {
      id: "card-5",
      columnId: "col-3",
      title: "Fix responsive layout bugs",
      details: "The navigation bar breaks on screens smaller than 768px. Need to fix flexbox properties."
    },
    {
      id: "card-6",
      columnId: "col-4",
      title: "Accessibility Review",
      details: "Run Lighthouse and manual screen reader checks on the main dashboard page."
    },
    {
      id: "card-7",
      columnId: "col-5",
      title: "Scaffold Next.js project",
      details: "Initialize the frontend repository with Next 15 App router and TypeScript."
    }
  ]
};
