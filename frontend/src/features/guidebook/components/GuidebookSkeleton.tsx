import { Skeleton } from "../../../components/ui/Skeleton";

export function GuidebookSkeleton() {
  return (
    <div data-testid="guidebook-skeleton" className="space-y-4">
      <div className="bg-seazone-navy rounded-2xl shadow-sm p-6 space-y-2">
        <div className="h-4 w-24 rounded bg-slate-600 animate-pulse" />
        <div className="h-3 w-full rounded bg-slate-600 animate-pulse" />
        <div className="h-3 w-4/5 rounded bg-slate-600 animate-pulse" />
      </div>

      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-seazone-card rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      ))}

      <div className="bg-seazone-card rounded-2xl shadow-sm p-6 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
