"use strict";
// IDE настроено на 120 знаков

/**
 * Класс корзины
 */
class Cart {
    #cart = {};
    #cartElm = {};
    #cartCounterElm = {};
    #cartTotalElm = {};
    #cartTotalValueElm = {};
    #featuredItemsElm = {};

    #inited = false;

    /**
     *
     * @param {string} cartSelector - селектор элемента корзины
     * @param {string} cartIconWrapSelector - селектор иконки корзины
     * @param {string} cartCounterSelector - селектор иконки количества товара в корзине
     * @param {string} cartTotalSelector - селектор итоговой стоимости товаров в корзине
     * @param {string} cartTotalValueSelector - селектор значения итоговой стоимости товаров в корзине
     * @param {string} featuredItemsSelector - селектор обертки товаров
     * @param {string} addToCartSelector - селектор кнопки добавления товара в корзину
     * @param {string} featuredItemSelector - селектор обертки товара
     * @example cartSelector:'.basket'
     */
    init(cartSelector,
         cartIconWrapSelector,
         cartCounterSelector,
         cartTotalSelector,
         cartTotalValueSelector,
         featuredItemsSelector,
         addToCartSelector,
         featuredItemSelector) {

        if (this.#inited) {
            throw new Error('Cart already initialized');
        }

        this.#inited = true;
        this.#cartElm = document.querySelector(cartSelector);
        this.#cartCounterElm = document.querySelector(cartCounterSelector);
        this.#cartTotalElm = document.querySelector(cartTotalSelector);
        this.#cartTotalValueElm = document.querySelector(cartTotalValueSelector);
        this.#featuredItemsElm = document.querySelector(featuredItemsSelector);

        document.querySelector(cartIconWrapSelector).addEventListener("click", () => {
            this.#cartElm.classList.toggle("hidden");
        });

        this.#featuredItemsElm.addEventListener('click', event => {
            if (!event.target.closest(addToCartSelector)) {
                return;
            }

            const featuredItemElm = event.target.closest(featuredItemSelector);
            const pId = +featuredItemElm.dataset.productid;
            const name = featuredItemElm.dataset.name;
            const price = +featuredItemElm.dataset.price;

            this.#addToCart(pId, name, price);
        });
    }

    /**
     * @param {number} productId - ID товара.
     * @param {string} name - Название товара.
     * @param {number} price - Цена товара.
     */
    #addToCart(productId, name, price) {
        if (!(productId in this.#cart)) {
            this.#cart[productId] = {productId, name, price, count: 0};
        }

        ++this.#cart[productId].count;
        console.log(this.#cart)

        this.#cartCounterElm.textContent = this.#getTotalCartCount().toString();
        this.#cartTotalValueElm.textContent = this.#getTotalCartCost().toFixed(2);
        this.#renderProductInCart(productId);
    }

    /**
     * Считает и возвращает количество товаров в корзине.
     * @return {number} - Количество товаров в корзине.
     */
    #getTotalCartCount() {
        return Object.values(this.#cart).reduce((acc, product) => acc + product.count, 0);
    }

    /**
     * Считает и возвращает итоговую цену добавленных в корзину товаров.
     * @return {number} - Итоговая цена всех товаров.
     */
    #getTotalCartCost() {
        return Object.values(this.#cart).reduce((acc, product) => acc + product.price * product.count, 0);
    }

    /**
     * Изменяет информацию о товаре в корзине, если еще нет товара в корзине,
     * вызывает функцию отрисовки товара в корзине
     * @param {number} productId - ID товара
     */
    #renderProductInCart(productId) {
        const cartRowElm = this.#cartElm.querySelector(`.basketRow[data-productId="${productId}"]`);
        if (!cartRowElm) {
            this.#renderNewProductInBasket(productId);
            return;
        }

        cartRowElm.querySelector('.productCount').textContent = this.#cart[productId]?.count;
        cartRowElm.querySelector('.productTotalRow')
            .textContent = (this.#cart[productId]?.price * this.#cart[productId]?.count).toFixed(2);
    }

    /**
     * Отрисовывает строку с товаров в корзине
     * @param {number} productId - ID товара
     */
    #renderNewProductInBasket(productId) {
        const productRow = `
        <div class="basketRow" data-productId="${productId}">
          <div>${this.#cart[productId]?.name}</div>
          <div>
            <span class="productCount">${this.#cart[productId]?.count}</span> шт.
          </div>
          <div>$${this.#cart[productId]?.price}</div>
          <div>
            $<span class="productTotalRow">${(this.#cart[productId]?.price * this.#cart[productId]?.count)
                .toFixed(2)}</span>
          </div>
        </div>`;

        this.#cartTotalElm.insertAdjacentHTML("beforebegin", productRow);
    }
}


const cart = new Cart();
cart.init('.basket',
    '.cartIconWrap',
    '.cartIconWrap span',
    '.basketTotal',
    '.basketTotalValue',
    '.featuredItems',
    '.addToCart',
    '.featuredItem'
);