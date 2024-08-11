import { useState, useEffect, useCallback, useRef } from 'react';

export function useInfiniteScroll(loadMore) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  useEffect(() => {
    loadMore(page).then(hasMoreData => setHasMore(hasMoreData));
  }, [page, loadMore]);

  return { lastElementRef, page, hasMore };
}