export default function CalculatePrice(fiability, nroPublications){
  let price = nroPublications / fiability;
  return (price != Infinity) ? price : 0;
};
