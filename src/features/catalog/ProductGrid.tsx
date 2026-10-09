import { cn } from "@/lib/utils";

export function ProductGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {children}
    </ul>
  );
}
