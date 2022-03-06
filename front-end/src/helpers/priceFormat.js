const priceFormat = (n) => {
  const number = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    maximunFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return number.format(n);
};

export default priceFormat;
