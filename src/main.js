import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement, calTotal }
    from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const listProducts = document.querySelector('.products');

const createLoading = () => {
    const loading = document.createElement('p');
    loading.classList.add('loading');
    loading.innerText = 'carregando...';
    return loading;
};
const createLoadingErro = () => {
    const erro = document.createElement('p');
    erro.classList.add('error');
    erro.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    return erro;
};

const productsList = async () => {
    try {
        const loading = createLoading();
        listProducts.appendChild(loading);

        const result = await fetchProductsList('computador');

        result.forEach((element) => {
            const retorno = createProductElement(element);
            listProducts.appendChild(retorno);
        });
        listProducts.removeChild(loading);
    } catch (error) {
        const erro = createLoadingErro();
        listProducts.appendChild(erro);
    }
};
productsList();

const recuperandoItens = () => {
    const itens = getSavedCartIDs();
    const test = itens.map((id) => fetchProduct(id));
    Promise.all(test)
        .then((products) => {
            console.log(products);
            products.forEach((product) => {
                const createCartElement = createCartProductElement(product);
                document.querySelector('.cart__products').appendChild(createCartElement);
                calTotal();
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

window.onload = recuperandoItens;

// pegar os itens do carrinho, acessar o preço e somar;
// acumular o preço, quando add o item, contador .. criar no shopfunctions
// quando clica no botão de deletar e subtrai o preço
