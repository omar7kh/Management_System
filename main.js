let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// get Total
function getTotal() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = '#539165';
  } else {
    total.innerHTML = '';
    total.style.background = '#ff0202c0';
  }
}

//create Product
let dataPro;
if (localStorage.Product != null) {
  dataPro = JSON.parse(localStorage.Product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count
  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newPro.count < 101
  ) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clearData();
  }

  // save localstorage
  localStorage.setItem('Product', JSON.stringify(dataPro));

  showDate();
};

// Clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// read
function showDate() {
  getTotal();
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += `
                      <tr>
                          <td>${i + 1}</td>
                          <td>${dataPro[i].title}</td>
                          <td>${dataPro[i].price}</td>
                          <td>${dataPro[i].taxes}</td>
                          <td>${dataPro[i].ads}</td>
                          <td>${dataPro[i].discount}</td>
                          <td>${dataPro[i].total}</td>
                          <td>${dataPro[i].category}</td>
                          <td><button onClick="updateData(${i})" id="update">Update</button></td>
                          <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
                      </tr> 
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = '';
  }
}
showDate();

//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.Product = JSON.stringify(dataPro);
  showDate();
}

//deleteAll
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showDate();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}

// search
let searchMood = 'title';
function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id === 'searchTitle') {
    searchMood = 'title';
    search.placeholder = 'Search By Title';
  } else {
    searchMood = 'category';
    search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value = '';
  showDate();
}

function searchDate(value) {
  let table = '';
  if (searchMood === 'title') {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
                      <tr>
                          <td>${i}</td>
                          <td>${dataPro[i].title}</td>
                          <td>${dataPro[i].price}</td>
                          <td>${dataPro[i].taxes}</td>
                          <td>${dataPro[i].ads}</td>
                          <td>${dataPro[i].discount}</td>
                          <td>${dataPro[i].total}</td>
                          <td>${dataPro[i].category}</td>
                          <td><button onClick="updateData(${i})" id="update">Update</button></td>
                          <td><button onClick="deleteData(${i})" id="delete">Delete</button></td>
                      </tr> 
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
                      <tr>
                          <td>${i}</td>
                          <td>${dataPro[i].title}</td>
                          <td>${dataPro[i].price}</td>
                          <td>${dataPro[i].taxes}</td>
                          <td>${dataPro[i].ads}</td>
                          <td>${dataPro[i].discount}</td>
                          <td>${dataPro[i].total}</td>
                          <td>${dataPro[i].category}</td>
                          <td><button onClick="updateData(${i})" id="update">update</button></td>
                          <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
                      </tr> 
    `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
