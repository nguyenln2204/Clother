const truncate = (input, length) => {
  if (input.length > length) {
    return input.substring(0, length) + "...";
  }
  return input;
};

export default truncate;
