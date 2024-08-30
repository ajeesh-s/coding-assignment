import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (fetchData, currentPage, totalPages) => {
  const [loading, setLoading] = useState(false);

  const handleScroll = useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      currentPage >= totalPages
    ) {
      return;
    }
    setLoading(true);
    await fetchData();
    setLoading(false);
  }, [fetchData, loading, currentPage, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { loading };
};

export default useInfiniteScroll;
