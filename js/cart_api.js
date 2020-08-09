/* Cart api */
document.querySelector('.add__to__cart__settings').style.display = `none`;
    function cart() {
        document.querySelector('.pagination').innerHTML = '';
        document.querySelector('.filter__ico').src = customImages[13];
        document.querySelector('.filter').innerHTML = `<div class="search__clear"><div>`;
        let cartItems = [];
        let cartTable = ``;
        let count = 0;
        if (sessionStorage.cart_items) {
            cartItems = JSON.parse(sessionStorage.cart_items);
        }
        document.querySelector('.main__form').innerHTML = ``;
        if (cartItems.length === 0) {
            document.querySelector('.container').innerHTML = `
            <h3 class="title">
                Ваша корзина пока пуста, выберите что-нибудь и возвращайтесь
            </h3>
            <h1></h1>
            <button class="btn" onclick="mainList(1)">Назад к покупкам</button>
            `;
        } else {
            cartTable += `
                <table class="cart__table">
            `;
            cartItems.forEach(function() {
                cartTable +=`
                        <tr>
                            <td>${cartItems[count].split('|')[0]}</td>
                            <td>${cartItems[count].split('|')[1]}</td>
                        </tr>
                `;
                count +=1;
            });
            cartTable +=`
                </table>
                <button class="btn" onclick="clearCart()">Отчистить корзину</button>
                <button class="btn" onclick="pay()">Оплатить</button>
            `;
            document.querySelector('.container').innerHTML = cartTable;
        }
    }

    function addToCart(id) {
        function filterById(item) {
            return !!(isNumber(item.id) && String(item.id) === id);
        }
        let cartItem = items.filter(filterById);
        document.querySelector('.add__to__cart__settings').style.display = ``;
        let inner = `
            <div>
                <h3 class="title">
                    ${cartItem[0].name}
                </h3>
                <p class="sizes__title">
                    Уточните заказ:
                </p>
                <div class="sizes__table">
            `;
        cartItem[0].add__prop.split(',').forEach(function(size) {
            inner += `
            <a onclick="addToCartComplete(${id}, '${size}')">${size}</a>`;
        });
        inner += `
                </div>
                <button class="btn" onclick="addToCartUndoo()">Назад</button>
            </div>
        `;
        document.querySelector('.add__to__cart__settings').innerHTML = inner;
    }

    function addToCartUndoo() {
        document.querySelector('.add__to__cart__settings').style.display = `none`;

    }

    function addToCartComplete(id, size) {
        document.querySelector('.add__to__cart__settings').style.display = `none`;
        let cartItems = [];
        if (sessionStorage.cart_items) {
            cartItems = JSON.parse(sessionStorage.cart_items);
        }
        cartItems.push(`${id}|${size}`);
        sessionStorage.setItem('cart_items', JSON.stringify(cartItems));
    }

    function clearCart() {
        if (sessionStorage.cart_items) {
            sessionStorage.setItem('cart_items', []);
        }
        cart();
    }
