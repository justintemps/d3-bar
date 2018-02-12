export default Number.isNaN =
  Number.isNaN ||
  function(value) {
    return value !== value;
  };
