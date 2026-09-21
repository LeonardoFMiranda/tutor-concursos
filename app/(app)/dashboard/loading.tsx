export default function DashboardLoading() {
  return (
    <div className="gov-container animate-pulse" style={{ padding: "48px var(--space-4)" }}>
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="flex items-center gap-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-center w-32">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center w-32">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-[300px] w-full bg-gray-100 border border-gray-200 rounded-lg"></div>
        </div>
        <div>
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-[300px] w-full bg-gray-100 border border-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Recent Sessions Skeleton */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-64 w-full bg-gray-100 border border-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
