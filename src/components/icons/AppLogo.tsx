import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("h-8 w-8 text-primary", className)} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5m-9 4.5v-4.5m1.5-7.5A2.25 2.25 0 018.25 4.5h7.5a2.25 2.25 0 012.25 2.25V9m-9.75 0h9.75M7.5 12H3m0 0l3.75-3.75M3 12l3.75 3.75m14.25-3.75h4.5m0 0l-3.75-3.75m4.5 0l-3.75 3.75M12 3v3.75m0 9.75V21" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}
