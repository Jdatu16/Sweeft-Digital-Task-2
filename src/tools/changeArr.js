export const addToArr = (setState, toAdd) => {
  setState((prev) => {
    return [...prev, toAdd];
  });
};

export const addToArrIterate = (setState, toAdd, setLoading) => {
  setState((prev) => {
    return [...prev, ...toAdd];
  });
  setLoading(false);
};
