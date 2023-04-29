const callAPIProduct = (ID) => fetch(`https://api.mercadolibre.com/items/${ID}`)
  .then((response) => response.json());

export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  const res = await callAPIProduct(id);
  return res;
};

const callAPIList = (product) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((Response) => Response.json());

export const fetchProductsList = async (product) => {
  if (!product) {
    throw new Error('Termo de busca não informado');
  }
  const response = await callAPIList(product);
  return response.results;
};
