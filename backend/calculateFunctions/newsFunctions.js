function CalculatePrice(precision, nroPublications) {
  let price = nroPublications / precision;
  return (price != Infinity) ? price : 0;
};

export {CalculatePrice};
