let items = [
    {
        'id': 1,
        'type': 'u',
        'name': 'Носки 1',
        'price': 111,
        'img': 'https://img2.wbstatic.net/large/new/6630000/6634558-1.jpg',
        'top': false,
        'gender': 'w',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        'id': 2,
        'type': 'w',
        'name': 'Куртка 2',
        'price': 222,
        'img': 'https://www.sportstyler.ru/images/thumbnails/990/1200/detailed/64/helly-hansen-64057_003-web-4.jpg',
        'top': true,
        'gender': 'm',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        'id': 3,
        'type': 'w',
        'name': 'Куртка 3',
        'price': 333,
        'img': 'https://contents.mediadecathlon.com/p1645998/kb37eb36961b61d5e068685bc5530ec12/1645998_default.jpg?format=auto&quality=60&f=800x0',
        'top': false,
        'gender': 'w',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        'id': 4,
        'type': 'u',
        'name': 'Носки 4',
        'price': 444,
        'img': 'https://img2.wbstatic.net/large/new/6630000/6634558-1.jpg',
        'top': false,
        'gender': 'w',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        'id': 5,
        'type': 'w',
        'name': 'Куртка 5',
        'price': 555,
        'img': 'https://www.sportstyler.ru/images/thumbnails/990/1200/detailed/64/helly-hansen-64057_003-web-4.jpg',
        'top': true,
        'gender': 'm',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        'id': 6,
        'type': 'w',
        'name': 'Куртка 6',
        'price': 666,
        'img': 'https://contents.mediadecathlon.com/p1645998/kb37eb36961b61d5e068685bc5530ec12/1645998_default.jpg?format=auto&quality=60&f=800x0',
        'top': false,
        'gender': 'w',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
]
/* Init */
window.onload = function() {
    mainList();
    document.querySelector('#searchForm').addEventListener('submit', searchList);
}
let lastSeenItems = [];
if (sessionStorage.last_seen) {
    lastSeenItems = JSON.parse(sessionStorage.last_seen); 
}
/* Show all available items */
function mainList() {
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
    let type = document.querySelector('.type').selectedOptions[0].id;
    let re = new RegExp('.*' + type + '.*');
    if (item.type.toLowerCase().match(re)) {
        return true;
    }
    return false;
}
function filterByGender(item) {
    let gender = document.querySelector('.gender').selectedOptions[0].id;
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
    let gender = document.querySelector('.gender').selectedOptions[0].id;
    let type = document.querySelector('.type').selectedOptions[0].id;
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
    if (shownItem[0].type == "w") {
        selectedItemType = "Верхняя одежда";
    }
    if (shownItem[0].gender == "m") {
        selectedItemGender = "Мужская одежда";
    }
    if (shownItem[0].type == "u") {
        selectedItemType = "Нижнее бельё";
    }
    if (shownItem[0].gender == "w") {
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
            <div class="cart item__cart" onclick="addToCart()">
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
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('.container').innerHTML = `
    <h3 class="title">
        Ваша корзина пока пуста, выберите что-нибудь и возвращайтесь
    </h3>
    <img class="img" src="./img/404.gif" alt="69store__404">
    <button class="btn" onclick="mainList()">Назад к покупкам</button>
    `;
}
/* Contacts */
function contacts() {
    document.querySelector('.main__form').innerHTML = ``;
    document.querySelector('.container').innerHTML = `
    <h3 class="title">
        Оставьте отзыв о работе нашего магазина
    </h3>
    <textarea name="feedback" class="feedback"></textarea>
    <button class="btn" onclick="sendRecuest()">Отправить</button>
`;
}
