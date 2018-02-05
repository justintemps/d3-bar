function filter(data, currentCat) {
  return data.filter(
    obj =>
      obj.category === currentCat &&
      Object.values(obj).every(o => {
        if (!Number.isNaN(o) && o === 0) {
          return false;
        }
        return true;
      })
  );
}

export default filter;
