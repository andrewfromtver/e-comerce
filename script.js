/* Fetch items from g-sheets */
let itemsList = "";
let items = [];
fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/1/public/full?alt=json')
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        let counter = 12;
        let row = 0;
        itemsList += "[{";
        for (let index = 0; index < output.feed.entry.length; index++) {
            if (output.feed.entry[index].content.$t === "id" && index < counter) {
                itemsList += `"${output.feed.entry[0].content.$t}"` + ":" + output.feed.entry[counter].content.$t + ", ";
            }
            if (output.feed.entry[index - counter] && index + 12 <= output.feed.entry.length) {
                if (output.feed.entry[index - counter].content.$t === "id") {
                    itemsList += `"${output.feed.entry[0].content.$t}"` + ":" + output.feed.entry[counter].content.$t + ", ";
                }
            }
            if (index > counter) {

                if (output.feed.entry[index - counter + row].content.$t === "prop__1") {
                    itemsList += `"${output.feed.entry[1].content.$t}"` + ":" + `"${output.feed.entry[1 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter + row].content.$t === "prop__2") {
                    itemsList += `"${output.feed.entry[2].content.$t}"` + ":" + `"${output.feed.entry[2 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "add__prop") {
                    itemsList += `"${output.feed.entry[3].content.$t}"` + ":" + `"${output.feed.entry[3 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "name") {
                    itemsList += `"${output.feed.entry[4].content.$t}"` + ":" + `"${output.feed.entry[4 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "price") {
                    itemsList += `"${output.feed.entry[5].content.$t}"` + ":" + output.feed.entry[5 + counter].content.$t + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "img") {
                    itemsList += `"${output.feed.entry[6].content.$t}"` + ":" + `"${output.feed.entry[6 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "img__add__1") {
                    itemsList += `"${output.feed.entry[7].content.$t}"` + ":" + `"${output.feed.entry[7 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "img__add__2") {
                    itemsList += `"${output.feed.entry[8].content.$t}"` + ":" + `"${output.feed.entry[8 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "img__add__3") {
                    itemsList += `"${output.feed.entry[9].content.$t}"` + ":" + `"${output.feed.entry[9 + counter].content.$t}"` + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "top") {
                    itemsList += `"${output.feed.entry[10].content.$t}"` + ":" + output.feed.entry[10 + counter].content.$t + ", ";
                }
                if (output.feed.entry[index - counter].content.$t === "description") {
                    itemsList += `"${output.feed.entry[11].content.$t}"` + ":" + `"${output.feed.entry[11 + counter].content.$t}"`;
                }
                if (output.feed.entry[index - counter].content.$t === "description" && index + 1 < output.feed.entry.length) {
                    itemsList += "}, {";
                    counter += 12;
                }
            }
            if (index + 1 === output.feed.entry.length) {
                itemsList += "}";
            }
        }
        itemsList += "]";
        items = JSON.parse(itemsList);
        itemsListLoaded = true;
        mainList();
    });
/* Fetch select__1 from g-sheets */
let select1 = [];
fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/2/public/full?alt=json')
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        output.feed.entry.forEach(function(item) {
            select1.push(item.content.$t);
        });
        select1loaded = true;
        mainList();
    });
/* Fetch select__2 from g-sheets */
let select2 = [];
fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/3/public/full?alt=json')
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        output.feed.entry.forEach(function(item) {
            select2.push(item.content.$t);
        });
        select2loaded = true;
        mainList();
    });
/* Fetch custom_images from g-sheets */
let customImages = [];
fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/4/public/full?alt=json')
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        output.feed.entry.forEach(function(item) {
            customImages.push(item.content.$t);
        });
        customImagesLoaded = true;
        mainList();
        document.body.style = `background-image: url(${customImages[1]})`;
        document.querySelector('.logo__left').src = customImages[3];
        document.querySelector('.search').src = customImages[5];
        document.querySelector('.logo__right').src = customImages[7];
    });
/* Init */
window.onload = function() {
    document.querySelector('#searchForm').addEventListener('submit', searchList);
    document.cookie = "SameSite=None; Secure";
};
let lastSeenItems = [];
if (sessionStorage.last_seen) {
    lastSeenItems = JSON.parse(sessionStorage.last_seen); 
}
/* Dev check */
function devCheck() {
    if (document.documentElement.clientWidth < 950) {
        document.querySelector('.navbar').style.display = `none`;
        document.querySelector('.filter').style.display = `none`;
        document.querySelector('.container').style.display = `none`;
        document.querySelector('.main__form').style.display = `none`;
        document.querySelector('.footer').style.display = `none`;
        document.querySelector('.small__screen').style.display = ``;
        document.body.style = `background-image: url(./img/background.gif)`;
    }
    if (document.documentElement.clientWidth > 950) {
        document.querySelector('.navbar').style.display = ``;
        document.querySelector('.filter').style.display = ``;
        document.querySelector('.container').style.display = ``;
        document.querySelector('.main__form').style.display = ``;
        document.querySelector('.footer').style.display = ``;
        if (customImages && customImages.length > 0) {
            document.body.style = `background-image: url(${customImages[1]})`;
        }
        else {
            document.body.style = ``;
        }
        document.querySelector('.small__screen').style.display = `none`;
    }
}
devCheck();
window.addEventListener("resize", function() {devCheck();});
/* Show all available items */
function mainList() {
    inner = `
        <select class="select1" name="select1" id="select1">
    `;
    for (let index = 0; index < select1.length; index++) {
        inner += `<option id="${select1[index + 1]}">${select1[index]}</option>`;
        ++index;
    }
    inner += `
        </select>
        <select class="select2" name="select2" id="select2">
    `;
    for (let index = 0; index < select2.length; index++) {
        inner += `<option id="${select2[index + 1]}">${select2[index]}</option>`;
        ++index;
    }
    inner += `
        </select>
        <div class="price__filter">
            <input type="number" id="from" placeholder="Цена: от">
            <a>-</a>
            <input type="number" id="to" placeholder="Цена: до">
        </div>
        <div class="search__clear">
            <button onclick="mainListFiltered()">Найти</button>
            <button onclick="clearFilters()">Сбросить</button>
        </div>
    `;
    document.querySelector('.filter').innerHTML = inner;
    if (sessionStorage.last_seen) {
        lastSeenItems = JSON.parse(sessionStorage.last_seen); 
    }
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('.container').innerHTML = ``;
    items.forEach(function (item){
        document.querySelector('.container').innerHTML += `
            <div class="item" id="${item.id}" onclick="show(${item.id})">
                <img class="main__img" src="${item.img || './img/noimage.png'}" alt="69store__item">
                <h4>${item.name}</h4>
                <div>
                    <p>${item.price}</p>
                    <p>руб.</p>
                </div>
            </div>
        `; 
    });
}
/* For filter function */
function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
}
function filterByPrice(item) {
    let priceFrom = document.querySelector('#from').value;
    let priceTo = document.querySelector('#to').value;
    return !!(isNumber(item.price) && item.price > priceFrom && item.price < priceTo);
}
function filterByName(item) {
    let searchString = document.querySelector('#searchString').value;
    let re = new RegExp('.*' + searchString.toLowerCase() + '.*');
    return !!item.name.toLowerCase().match(re);
}
function filterBySelect1(item) {
    let prop__1 = document.querySelector('.select1').selectedOptions[0].id;
    let re = new RegExp('.*' + prop__1 + '.*');
    return !!item.prop__1.toLowerCase().match(re);
}
function filterBySelect2(item) {
    let prop__2 = document.querySelector('.select2').selectedOptions[0].id;
    let re = new RegExp('.*' + prop__2 + '.*');
    return !!item.prop__2.toLowerCase().match(re);
}
function filterByTop(item) {
    return item.top === true;
}
/* Filtered search by prop__1, prop__2 and price */
function mainListFiltered() {
    if (sessionStorage.last_seen) {
        lastSeenItems = JSON.parse(sessionStorage.last_seen); 
    }
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('#from').style = ``;
    document.querySelector('#to').style = ``;
    let prop__1 = document.querySelector('.select1').selectedOptions[0].id;
    let prop__2 = document.querySelector('.select2').selectedOptions[0].id;
    let filteredItems = {};
    if (document.querySelector('#from').value === ``) {
        document.querySelector('#from').style = `border-color: tomato`;
    }
    if (document.querySelector('#to').value === ``) {
        document.querySelector('#to').style = `border-color: tomato`;
    }
    if (prop__1 === `all` && prop__2 ===`all`) {
        filteredItems = items.filter(filterByPrice);
    }
    if (prop__1 === `all` && prop__2 !== `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterBySelect2);
    }
    if (prop__1 !== `all` && prop__2 === `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterBySelect1);
    }
    if (prop__1 !== `all` && prop__2 !== `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterBySelect1).filter(filterBySelect2);
    }
    document.querySelector('.container').innerHTML = ``;
    filteredItems.forEach(function (item){
        document.querySelector('.container').innerHTML += `
            <div class="item" id="${item.id}" onclick="show(${item.id})">
                <img class="main__img" src="${item.img || './img/noimage.png'}" alt="69store__item">
                <h4>${item.name}</h4>
                <div>
                    <p>${item.price}</p>
                    <p>руб.</p>
                </div>
            </div>
        `;
    });
    if (filteredItems.length === 0) {
        document.querySelector('.container').innerHTML = `
        <h3 class="title">
            По вашему запросу ничего не найденно
        </h3>
        <img class="img" src="${customImages[11]}" alt="69store__404">
        <button class="btn" onclick="mainList()">На главную страницу</button>
    `;
    }
}
/* Clear advanced search filters */
function clearFilters() {
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('#from').style = ``;
    document.querySelector('#to').style = ``;
    document.querySelector('#from').value = ``;
    document.querySelector('#to').value = ``;
    document.querySelector('.container').innerHTML = `
        <h3 class="title">
            Выберите тип, пол, ценовой диапазон и нажмите кнопку "Найти"
        </h3>
        <img class="img" src="${customImages[11]}" alt="69store__404">
        <button class="btn" onclick="mainList()">На главную страницу</button>
    `;
}
/* Show only top items */
function topList() {
    document.querySelector('.filter').innerHTML = `<div class="search__clear"><div>`;
    document.querySelector('.main__form').innerHTML = ``;
    var topItems = items.filter(filterByTop);
    document.querySelector('.container').innerHTML = ``;
    topItems.forEach(function (item){
        document.querySelector('.container').innerHTML += `
            <div class="item" id="${item.id}" onclick="show(${item.id})">
                <img class="main__img" src="${item.img || './img/noimage.png'}" alt="69store__item">
                <h4>${item.name}</h4>
                <div>
                    <p>${item.price}</p>
                    <p>руб.</p>
                </div>
            </div>
        `; 
    });
}
/* Search items by name */
let searchItems = [];
function searchList() {
    try {
        document.querySelector('.search').style = `background-color: none;`;
        if (sessionStorage.last_seen) {
            lastSeenItems = JSON.parse(sessionStorage.last_seen); 
        }
        event.preventDefault();
        document.querySelector('.main__form').innerHTML = ``;
        document.querySelector('#searchString').style = ``;
        let searchString = document.querySelector('#searchString').value;
        if (searchString.length > 2) {
            searchItems = items.filter(filterByName);
            document.querySelector('.container').innerHTML = ``;
            searchItems.forEach(function (item){
                document.querySelector('.container').innerHTML += `
                    <div class="item" id="${item.id}" onclick="show(${item.id})">
                        <img class="main__img" src="${item.img || './img/noimage.png'}" alt="69store__item">
                        <h4>${item.name}</h4>
                        <div>
                            <p>${item.price}</p>
                            <p>руб.</p>
                        </div>
                    </div>
                `; 
            });
        }
        else {
            document.querySelector('.search').style = `background-color: tomato;`;
        }
        if (!searchItems || searchItems.length === 0) {
            document.querySelector('.container').innerHTML = `
            <h3 class="title">
                По вашему запросу ничего не найденно
            </h3>
            <img class="img" src="${customImages[11]}" alt="69store__404">
            <button class="btn" onclick="mainList()">На главную страницу</button>
        `;
        }
    }
    catch {
        document.querySelector('.search').style = `background-color: tomato;`;
    }
}
/* Show item */
function show(id) {
    if (!lastSeenItems.includes(id)) {
        lastSeenItems.unshift(id);
        sessionStorage.setItem('last_seen', JSON.stringify(lastSeenItems.slice(0, 4)));
    }
    function filterById(item) {
        return !!(isNumber(item.id) && item.id === id);
    }
    let shownItem = items.filter(filterById);
    let addItemImage = customImages[9];
    document.querySelector('.container').innerHTML = `
        <div class="item">
            <img class="main__img" onclick="view(this)" src="${shownItem[0].img || './img/noimage.png'}" alt="69store__item">
            <div class="img__set">
                <img onclick="view(this)" src="${shownItem[0].img__add__1 || './img/noimage.png'}" alt="69store__item">
                <img onclick="view(this)" src="${shownItem[0].img__add__2 || './img/noimage.png'}" alt="69store__item">
                <img onclick="view(this)" src="${shownItem[0].img__add__3 || './img/noimage.png'}" alt="69store__item">
            </div>
        </div>
        <h3 class="item__title">${shownItem[0].name}</h3>
        <button class="btn__back" onclick="mainList()"><</button>
        <div class="item__card">
            <div class="cart item__cart" id="${id}" onclick="addToCart(this.id)">
                <img src="${addItemImage}" alt="add__item" height="28px" width="28px">
            </div>
            <p class="item__info">
                ${select1.slice(select1.indexOf(shownItem[0].prop__1)-1, select1.indexOf(shownItem[0].prop__1))} 
                | 
                ${select2.slice(select2.indexOf(shownItem[0].prop__2)-1, select2.indexOf(shownItem[0].prop__2))}
            </p>
            <p class="item__description">${shownItem[0].description}</p>
            <div class="item__more__info">
                <h3>${shownItem[0].add__prop}</h3>
            </div>
            <h3 class="item__price">${shownItem[0].price} руб.</h3>
        </div>
    `;
    document.querySelector('.main__form').innerHTML = `
        <div class="last__seen"></div>
    `;
    lastSeen();
}
/* View/hide item images */
function view(element) {
    document.body.innerHTML += `
    <div class="big__img">
        <img class="big__img__main" src="${element.src}" alt"69store__item" onclick="hide()">
    </div>
    `;
}
function hide() {
    document.querySelector('.big__img').remove();
}
/* Show last seen items */
function lastSeen() {
    if (lastSeenItems.length < 2) {
        document.querySelector('.last__seen').innerHTML = `
            <h3 class="title">
                Здесь появятся товары, которыми вы недавно интересовались
            </h3>
        `;
    }
    else {
        lastSeenItems.forEach(function(lastSeenId) {
            function filterById(item) {
                return !!(isNumber(item.id) && item.id === lastSeenId);
            }
            let elem = items.filter(filterById);
            document.querySelector('.last__seen').innerHTML += `
            <div class="item" id="${elem[0].id}" onclick="show(${elem[0].id})">
                <img class="main__img" src="${elem[0].img || './img/noimage.png'}" alt="69store__item">
                <h4>${elem[0].name}</h4>
            </div>
            `;
            });
        }
}
/* Cart */
function cart() {
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
        <img class="img" src="${customImages[11]}" alt="69store__404">
        <button class="btn" onclick="mainList()">Назад к покупкам</button>
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
        `;
        document.querySelector('.container').innerHTML = cartTable;
    }
}
document.querySelector('.add__to__cart__settings').style.display = `none`;
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
            <button class="btn" onclick="addToCartComplete()">Назад</button>
        </div>
    `;
    document.querySelector('.add__to__cart__settings').innerHTML = inner;
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
