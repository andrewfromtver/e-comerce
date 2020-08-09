/* Dev check */
    function devCheck() {
        if (customImages && customImages.length > 0) {
            document.body.style = `background-image: url(${customImages[1]})`;
        }
        else {
            document.body.style = ``;
        }
        if (document.documentElement.clientWidth < 950) {
            document.querySelector('.navbar').style.display = `none`;
            document.querySelector('.filter').style.display = `none`;
            document.querySelector('.container').style.display = `none`;
            document.querySelector('.main__form').style.display = `none`;
            document.querySelector('.footer').style.display = `none`;
            document.querySelector('.small__screen').style.display = ``;
        }
        if (document.documentElement.clientWidth > 950) {
            document.querySelector('.navbar').style.display = ``;
            document.querySelector('.filter').style.display = ``;
            document.querySelector('.container').style.display = ``;
            document.querySelector('.main__form').style.display = ``;
            document.querySelector('.footer').style.display = ``;
            document.querySelector('.small__screen').style.display = `none`;
        }
    }

/* Scroll control */
    function up() {
        const el = document.getElementById('top');
        el.scrollIntoView({behavior: "smooth"});
    }

/* Show/hide advanced search filters */
    function filter() {
        up();
        if (document.querySelector('.select1')) {
            document.querySelector('.filter__ico').src = customImages[13];
            document.querySelector('.filter').innerHTML = '';
        }
        else {
            document.querySelector('.filter__ico').src = customImages[15];
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
                Укажите параметры товара и нажмите кнопку "Найти"
            </h3>
            <h1></h1>
            <button class="btn" onclick="mainList()">На главную страницу</button>
        `;
    }

/* Show/hide item images */
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