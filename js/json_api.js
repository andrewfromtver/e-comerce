/* Global variables */
let items = [];
let select1 = [];
let select2 = [];
let customImages = [];
let lastSeenItems = [];


/* Fetch data from google sheets JSON api */
    function fetchData() {
        /* Fetch items from g-sheets */
        fetch('https://spreadsheets.google.com/feeds/cells/1AbCjehdSl4Su8RXm-GILIisymiRFodqaGcZZ4xWcizA/1/public/full?alt=json')
            .then(function(value){
                if(value.status !== 200){
                    return Promise.reject(new Error('Ошибка'));
                }
                    return value.json();
            })
            .then(function(output){
                let itemsList = '';
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
                document.querySelector('.blank__screen').style.display = 'none';
            });
        /* Fetch select__1 from g-sheets */
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
            });
        /* Fetch select__2 from g-sheets */
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
            });
        /* Fetch custom_images from g-sheets */
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
                document.body.style = `background-image: url(${customImages[1]})`;
                document.querySelector('.logo__left').src = customImages[3];
                document.querySelector('.search').src = customImages[5];
                document.querySelector('.logo__right').src = customImages[7];
                document.querySelector('.filter__ico').src = customImages[13];
                document.querySelector('.footer').innerText = customImages[17];
            });
    }