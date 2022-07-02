let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody")
let searchBlok = document.querySelector(".searchBlok")
let createButton = document.querySelector(".button")
let mod = "create";
let test;
let searchTi
let array;

// console.log(title,price,taxs,ads,discount,category,count,total,search,submit)


// if-local
if (localStorage.arrays != null) {
    array = JSON.parse(localStorage.getItem("arrays"));
} else {
    array = [];
}



// count number
function getTotal() {
    let count = +price.value + +taxs.value + +ads.value - +discount.value;
    if (
        price.value != "" ||
        taxs.value != "" ||
        ads.value != "" ||
        discount.value != ""
    ) {
        total.innerHTML = count;
        total.classList.add("green")
    } else {
        total.classList.remove("green")
        total.innerHTML = 0
    }
}


// submit
submit.addEventListener("click", create)


// create product
function create() {
    let table = {
        title: title.value,
        price: price.value,
        taxs: taxs.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    // upddate
    if (title.value != '' && price.value != '' && category.value != '' && count.value <= 1000) {
        if (mod === "create") {
            if (table.count > 1) {
                for (let i = 0; i < table.count; i++) {
                    array.push(table)
                }
            } else {
                array.push(table)
            }
        } else {
            array[test] = table
            mod = "create"
            submit.innerHTML = mod;
            count.style.display = "block"
        }
        clearDate()
    }
    forC()
    title.focus()
}


// clearDate
function clearDate() {
    title.value = ""
    price.value = ""
    taxs.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
}


//read
function forC() {
    getTotal()
    let table = '';
    for (let i = 0; i < array.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxs}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button id="update" onclick="update(${i})">update</button></td>
        <td><button id="delete"  onclick="dele(${i})">delete</button></td>
    </tr>
    `
    }
    tbody.innerHTML = table;
    createButton.textContent = `Delete All (${array.length})`;
    if (array.length > 0) {
        createButton.style.display = "block"
    } else {
        createButton.style.display = "none"
    }
    local()
} forC()


//deleteAll
createButton.onclick = function () {
    array = []
    forC()
}


// delete
function dele(i) {
    array.splice(i, 1)
    local()
    forC()
}


// local
function local() {
    localStorage.setItem("arrays", JSON.stringify(array))
}



// update
function update(i) {
    title.value = array[i].title
    price.value = array[i].price
    taxs.value = array[i].taxs
    ads.value = array[i].ads
    discount.value = array[i].discount
    getTotal()
    count.style.display = "none"
    category.value = array[i].category
    submit.innerHTML = "update"
    mod = "update"
    title.focus()
    test = i
    // window.screenTop = 0;
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}


//searsh 
function getSearshMood(id) {
    searchTi = 'title'
    if (id == 'searchTitle') {
        search.Placeholder = 'search By Title'
    } else {
        searchTi = 'category'
        search.Placeholder = 'search By category'
    }
    search.focus()
    search.value = ''
    forC()
}
function searshDate(value) {
    let table = '';
    if (searchTi == 'title') {
        for (let i = 0; i < array.length; i++) {
            if (array[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxs}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button id="update" onclick="update(${i})">update</button></td>
        <td><button id="delete"  onclick="dele(${i})">delete</button></td>
    </tr>
    `
            }
        }
    }
    else {
        for (let i = 0; i < array.length; i++) {
            if (array[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taxs}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td><button id="update" onclick="update(${i})">update</button></td>
        <td><button id="delete"  onclick="dele(${i})">delete</button></td>
    </tr>
    `
            }
        }
    }
    tbody.innerHTML = table;
}