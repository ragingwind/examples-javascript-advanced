function flattern(arr) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flattern(val) : val);
  }, []);
}