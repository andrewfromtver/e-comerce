/* Service functions for items filtering */
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


/* Show all available items */
    function mainList(page = 1) {
        up();
        document.querySelector('.main__form').innerHTML = '';
        document.querySelector('.container').innerHTML = '';
        document.querySelector('.pagination').innerHTML = '';
        if (items.length > 10) {
            end = page * 9;
            start = end - 9;
            itemsCut = items.slice(start, end);
            document.querySelector('.pagination').innerHTML = `
                123...
            `;
        }
        else if (items.length === 0) {
            document.querySelector('.container').innerHTML = `
            <h3 class="title">
                По вашему запросу ничего не найденно
            </h3>
            <h1></h1>
            <button class="btn" onclick="mainList(1)">Обновить страницу</button>
            `;
        }
        else {
            itemsCut = items;
        }
        itemsCut.forEach(function (item){
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

/* Show only top items */
    function topList(page = 1) {
        up();
        document.querySelector('.main__form').innerHTML = '';
        document.querySelector('.container').innerHTML = '';
        document.querySelector('.pagination').innerHTML = '';
        if (items.length > 10) {
            end = page * 9;
            start = end - 9;
            itemsCut = items.slice(start, end);
            document.querySelector('.pagination').innerHTML = `
                123...
            `;
        }
        else if (items.length === 0) {
            document.querySelector('.container').innerHTML = `
            <h3 class="title">
                По вашему запросу ничего не найденно
            </h3>
            <h1></h1>
            <button class="btn" onclick="mainList(1)">Обновить страницу</button>
            `;
        }
        else {
            itemsCut = items;
        }
        var topItems = itemsCut.filter(filterByTop);
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

/* Advanced search */
    function mainListFiltered(page = 1) {
        document.querySelector('.pagination').innerHTML = '';
        document.querySelector('.main__form').innerHTML = '';
        document.querySelector('#from').style = '';
        document.querySelector('#to').style = '';
        let prop__1 = document.querySelector('.select1').selectedOptions[0].id;
        let prop__2 = document.querySelector('.select2').selectedOptions[0].id;
        let filteredItems = {};
        if (document.querySelector('#from').value === '') {
            document.querySelector('#from').style = 'border-color: tomato';
        }
        if (document.querySelector('#to').value === '') {
            document.querySelector('#to').style = 'border-color: tomato';
        }
        if (prop__1 === 'all' && prop__2 ==='all') {
            filteredItems = items.filter(filterByPrice);
        }
        if (prop__1 === 'all' && prop__2 !== 'all') {
            filteredItems = items.filter(filterByPrice).filter(filterBySelect2);
        }
        if (prop__1 !== 'all' && prop__2 === 'all') {
            filteredItems = items.filter(filterByPrice).filter(filterBySelect1);
        }
        if (prop__1 !== 'all' && prop__2 !== 'all') {
            filteredItems = items.filter(filterByPrice).filter(filterBySelect1).filter(filterBySelect2);
        }
        document.querySelector('.container').innerHTML = '';
        if (filteredItems.length > 10) {
            end = page * 9;
            start = end - 9;
            filteredItemsCut = filteredItems.slice(start, end);
            document.querySelector('.pagination').innerHTML = `
                123...
            `;
        }
        else {
            filteredItemsCut = filteredItems;
        }
        filteredItemsCut.forEach(function (item){
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
            <h1></h1>
            <button class="btn" onclick="mainList(1)">На главную страницу</button>
        `;
        }
    }

/* Search items by name */
    function searchList(page = 1) {
        let searchItems = [];
        document.querySelector('.pagination').innerHTML = '';
        up();
        try {
            document.querySelector('.search').style = 'background-color: none;';
            event.preventDefault();
            document.querySelector('.main__form').innerHTML = '';
            document.querySelector('#searchString').style = '';
            let searchString = document.querySelector('#searchString').value;
            if (searchString.length > 2) {
                searchItems = items.filter(filterByName);
                document.querySelector('.container').innerHTML = '';
                if (searchItems.length > 10) {
                    end = page * 9;
                    start = end - 9;
                    searchItemsCut = searchItems.slice(start, end);
                    document.querySelector('.pagination').innerHTML = `
                        123...
                    `;
                }
                else if (searchItems.length === 0) {
                    document.querySelector('.container').innerHTML = `
                    <h3 class="title">
                        По вашему запросу ничего не найденно
                    </h3>
                    <h1></h1>
                    <button class="btn" onclick="mainList(1)">Обновить страницу</button>
                    `;
                }
                else {
                    searchItemsCut = searchItems;
                }
                searchItemsCut = searchItems.slice(0, 9);
                searchItemsCut.forEach(function (item){
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
                document.querySelector('.search').style = 'background-color: tomato;';
            }
            if (!searchItems || searchItems.length === 0) {
                document.querySelector('.container').innerHTML = `
                <h3 class="title">
                    По вашему запросу ничего не найденно
                </h3>
                <h1></h1>
                <button class="btn" onclick="mainList(1)">На главную страницу</button>
            `;
            }
        }
        catch {
            document.querySelector('.search').style = 'background-color: tomato;';
        }
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

/* Show item */
    function show(id) {
        document.querySelector('.pagination').innerHTML = '';
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
            <button class="btn__back" onclick="mainList(1)"><</button>
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