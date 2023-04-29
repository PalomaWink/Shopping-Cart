// a getAdress vai fazer as requisições e retornar o endereço completo;
export const getAddress = async () => {
  const cep = document.querySelector('.cep-input').value;
  const api1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const api2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const promises = [api1, api2].map((api) => fetch(api));
  const response = await Promise.any(promises);

  if (!response) {
    throw new Error('CEP não encontrado');
  }
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const searchCep = async () => {
  const section = document.querySelector('.cart__address');
  try {
    const addressData = await getAddress();
    const { address, district, city, state } = addressData;
    const content = `${address} - ${district} - ${city} - ${state}`;
    section.textContent = content;
  } catch (error) {
    section.textContent = 'CEP não encontrado';
  }
};
