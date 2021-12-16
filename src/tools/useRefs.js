export const callBackTool = (node, loading, observer, setPage) => {
  if (loading) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setPage((prev) => prev + 1);
    }
  });
  if (node) observer.current.observe(node);
};
