function filter(data, currentCat) {
  return data.filter(
    obj =>
      obj.category === currentCat &&
      Object.values(obj).every(o => {
        if (!isNaN(o) && o === 0) { // eslint-disable-line
          return false;
        }
        return true;
      })
  );
}

export default filter;
