/* Fetch items from g-sheets */
let itemsTest = "";
let items = [];
fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/1/public/full?alt=json')
    .then(function(value){
        if(value.status !== 200){
            return Promise.reject(new Error('Ошибка'));
        }
            return value.json();
    })
    .then(function(output){
        itemsTest += "["
        for (let index = 0; index < output.feed.entry.length; index++) {
            if (output.feed.entry[index].content.$t == "id") {
                itemsTest += "{";
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + output.feed.entry[++index].content.$t;
            }
            if (output.feed.entry[index].content.$t == "prop__1") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "name") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "price") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + output.feed.entry[++index].content.$t;
            }
            if (output.feed.entry[index].content.$t == "img") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "img__add__1") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "img__add__2") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "img__add__3") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "top") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + output.feed.entry[++index].content.$t;
            }
            if (output.feed.entry[index].content.$t == "prop__2") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "add__prop") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry[index].content.$t == "description") {
                itemsTest += `"${output.feed.entry[index].content.$t}"` + ":" + `"${output.feed.entry[++index].content.$t}"`;
            }
            if (output.feed.entry.length - 1 > index && output.feed.entry[index + 1].content.$t != "id") {
                itemsTest += ",";
            }
            if (output.feed.entry[index-1].content.$t == "description" && index + 1 < output.feed.entry.length) {
                itemsTest += "},";
            }
            if (index + 1 == output.feed.entry.length) {
                itemsTest += "}";
            }
        }
        itemsTest += "]"
        items = JSON.parse(itemsTest);
        mainList();
    })
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
        })
        mainList();
    })
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
        })
        mainList();
    })

/* Init */
window.onload = function() {
    mainList();
    document.querySelector('#searchForm').addEventListener('submit', searchList);
}
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
        document.body.style = ``;
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
    })
}
/* For filter function */
function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
}
function filterByPrice(item) {
    let priceFrom = document.querySelector('#from').value;
    let priceTo = document.querySelector('#to').value;
    if (isNumber(item.price) && item.price > priceFrom && item.price < priceTo) {
        return true;
    }
    return false;
}
function filterByName(item) {
    let searchString = document.querySelector('#search').value;
    let re = new RegExp('.*' + searchString.toLowerCase() + '.*');
    if (item.name.toLowerCase().match(re)) {
        return true;
    }
    return false;
}
function filterByType(item) {
    let type = document.querySelector('.select1').selectedOptions[0].id;
    let re = new RegExp('.*' + type + '.*');
    if (item.type.toLowerCase().match(re)) {
        return true;
    }
    return false;
}
function filterByGender(item) {
    let gender = document.querySelector('.select2').selectedOptions[0].id;
    let re = new RegExp('.*' + gender + '.*');
    if (item.gender.toLowerCase().match(re)) {
        return true;
    }
    return false;
}
function filterByTop(item) {
    if (item.top == true) {
        return true;
    }
    return false;
}
/* Filtered search by type, gender and price */
function mainListFiltered() {
    if (sessionStorage.last_seen) {
        lastSeenItems = JSON.parse(sessionStorage.last_seen); 
    }
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('#from').style = ``;
    document.querySelector('#to').style = ``;
    let gender = document.querySelector('.select2').selectedOptions[0].id;
    let type = document.querySelector('.select1').selectedOptions[0].id;
    var filteredItems = {};
    if (document.querySelector('#from').value == ``) {
        document.querySelector('#from').style = `border-color: tomato`;
    }
    if (document.querySelector('#to').value == ``) {
        document.querySelector('#to').style = `border-color: tomato`;
    }
    if (gender == `all` & type ==`all`) {
        filteredItems = items.filter(filterByPrice);
    }
    if (gender == `all` && type != `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterByType);
    }
    if (type == `all` && gender != `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterByGender);
    }
    if (type != `all` && gender != `all`) {
        filteredItems = items.filter(filterByPrice).filter(filterByGender).filter(filterByType);
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
    })
    if (filteredItems.length == 0) {
        document.querySelector('.container').innerHTML = `
        <h3 class="title">
            По вашему запросу ничего не найденно
        </h3>
        <img class="img" src="./img/404.gif" alt="69store__404">
        <button class="btn" onclick="mainList()">На главную страницу</button>
    `;
    }
}
/* Clear advansed search filters */
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
        <img class="img" src="./img/404.gif" alt="69store__404">
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
    })
}
/* Search items by name */
function searchList() {
    if (sessionStorage.last_seen) {
        lastSeenItems = JSON.parse(sessionStorage.last_seen); 
    }
    event.preventDefault();
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('#search').style = ``;
    let searchString = document.querySelector('#search').value;
    if (searchString.length > 3) {
        var searchItems = items.filter(filterByName);
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
        })
    }
    else {
        document.querySelector('#search').style = `border-color: tomato;`
    }
    if (!searchItems || searchItems.length == 0) {
        document.querySelector('.container').innerHTML = `
        <h3 class="title">
            По вашему запросу ничего не найденно
        </h3>
        <img class="img" src="./img/404.gif" alt="69store__404">
        <button class="btn" onclick="mainList()">На главную страницу</button>
    `;
    }
}
/* Show item */
function show(id) {
    if (!lastSeenItems.includes(id)) {
        lastSeenItems.unshift(id);
        sessionStorage.setItem('last_seen', JSON.stringify(lastSeenItems.slice(0, 4)));
    }
    function filterById(item) {
        if (isNumber(item.id) && item.id == id) {
            return true;
        }
        return false;
    }
    var shownItem = items.filter(filterById);
    let selectedItemType = "";
    let selectedItemGender = "";
    if (shownItem[0].prop__1 == "w") {
        selectedItemType = "Верхняя одежда";
    }
    if (shownItem[0].prop__2 == "m") {
        selectedItemGender = "Мужская одежда";
    }
    if (shownItem[0].prop__1 == "u") {
        selectedItemType = "Нижнее бельё";
    }
    if (shownItem[0].prop__2 == "w") {
        selectedItemGender = "Женская одежда";
    }
    
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
                <img src="./img/add_to_cart.png" alt="69store__add__to__cart" height="28px" width="28px">
            </div>
            <p class="item__info">${selectedItemType} | ${selectedItemGender}</p>
            <p class="item__description">${shownItem[0].description}</p>
            <div class="item__more__info">
                
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
                if (isNumber(item.id) && item.id == lastSeenId) {
                    return true;
                }
                return false;
            }
            let elem = items.filter(filterById);
            document.querySelector('.last__seen').innerHTML += `
            <div class="item" id="${elem[0].id}" onclick="show(${elem[0].id})">
                <img class="main__img" src="${elem[0].img || './img/noimage.png'}" alt="69store__item">
                <h4>${elem[0].name}</h4>
            </div>
            `;
            })
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
    if (cartItems.length == 0) {
        document.querySelector('.container').innerHTML = `
        <h3 class="title">
            Ваша корзина пока пуста, выберите что-нибудь и возвращайтесь
        </h3>
        <img class="img" src="./img/404.gif" alt="69store__404">
        <button class="btn" onclick="mainList()">Назад к покупкам</button>
        `;
    } else {
        cartTable += `
            <table class="cart__table">
        `;
        cartItems.forEach(function(item) {
            cartTable +=`
                    <tr>
                        <td>${cartItems[count].split('|')[0]}</td>
                        <td>${cartItems[count].split('|')[1]}</td>
                    </tr>
            `;
            count +=1;
        })
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
        if (isNumber(item.id) && item.id == id) {
            return true;
        }
        return false;
    }
    var cartItem = items.filter(filterById);
    document.querySelector('.add__to__cart__settings').style.display = ``;

    let inner = `
        <div>
            <h3 class="title">
                ${cartItem[0].name}
            </h3>
            <p class="sizes__title">
                Выберите размер:
            </p>
            <div class="sizes__table">
        `;
    cartItem[0].add__prop.split(',').forEach(function(size) {
        inner += `
        <a onclick="addToCartCompleate(${id}, '${size}')">${size}</a>`
    })
    inner += `
            </div>
            <button class="btn" onclick="addToCartCompleate()">Назад</button>
        </div>
    `;
    document.querySelector('.add__to__cart__settings').innerHTML = inner;
}
function addToCartCompleate(id, size) {
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
/* Contacts */
function contacts() {
    document.querySelector('.filter').innerHTML = `<div class="search__clear"><div>`;
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('.container').innerHTML = `
    <h3 class="title">
        Оставьте отзыв о работе нашего магазина
    </h3>
    <textarea name="feedback" class="feedback"></textarea>
    <button class="btn" onclick="sendRecuest()">Отправить</button>
`;
}
