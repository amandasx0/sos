const SkeletonCard = () => {
  return (
    <div className="bg-background-card border border-gray-300 rounded-2xl p-6 flex gap-4 animate-pulse">
      
      <div className="w-10 h-10 bg-gray-200 rounded-md" />

      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>

        <div className="flex justify-between items-center">
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-2 mt-2">
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const SkeletonOrders = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-full lg:w-[calc(50%-10px)]"
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
};

export default SkeletonOrders;