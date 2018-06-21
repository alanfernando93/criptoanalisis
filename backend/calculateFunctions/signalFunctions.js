function CalculatePrice(Precision, nroPublications) {
  let price = nroPublications / Precision;
  return (price != Infinity) ? price : 0;
};

export {CalculatePrice};
