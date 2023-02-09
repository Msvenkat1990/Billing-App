// Login form function start


const form = document.querySelector("form");
const user_name = document.querySelector("#userName");
const user_password = document.querySelector("#password");
const login_button = document.querySelector(".logButton");
const emailvalid = document.querySelectorAll("small");
const loginForm = document.querySelector(".loginPage");
const billingForm = document.querySelector(".billingPage");
const loginStatus = document.querySelector(".loginStatus");
const addItemForm = document.querySelector(".add-item-form");

login_button.addEventListener("click", async (e) => {
  e.preventDefault();
  logName = user_name.value;
  logpassword = user_password.value;
  let value = {
    username: logName,
    password: logpassword,
  };
  let result = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      if (error) {
        loginStatus.style.visibility = "visible";
        loginStatus.style.color = "red";
        loginStatus.textContent = "“Network Error”";
      }
    });
  let msg = result.message;

  if (msg == "Email not valid") {
    loginStatus.style.visibility = "hidden";
    emailvalid[0].style.visibility = "visible";
    emailvalid[0].style.color = "red";
    emailvalid[0].textContent = "Username not valid";
  }
  if (msg == "Password not valid") {
    loginStatus.style.visibility = "hidden";
    emailvalid[0].style.visibility = "hidden";
    emailvalid[1].style.visibility = "visible";
    emailvalid[1].style.color = "red";
    emailvalid[1].textContent = "password not valid";
  }

  if (msg == "Login Successfully") {
    emailvalid[0].style.visibility = "hidden";
    emailvalid[1].style.visibility = "hidden";
    loginStatus.style.visibility = "visible";
    loginStatus.style.color = "yellowgreen";
    loginStatus.textContent = "Login successfully";
    // alert("Login successfully");
    setTimeout(() => {
      loginStatus.style.visibility = "hidden";
      loginForm.style.display = "none";
      billingForm.style.display = "block";
    }, 1000);
  }
});

//Billing form function start

//drop down list function

const productListElement = document.querySelector("#dorpDownList");
const productLiElement = document.querySelector("#dorpDownList li");
const productInputElement = document.querySelector("#item-particulars");

fetch("http://localhost:3000/api/view/product")
  .then((res) => res.json())
  .then((data) => {
    let productList = data.map((product) => {
      return product.particulars;
    });
    //Sort names in ascending order
    let sortedNames = productList.sort();
    //reference
    let input = document.getElementById("item-particulars");
    //Execute function on keyup
    input.addEventListener("keyup", (e) => {
      //loop through above array
      //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
      removeElements();
      for (let i of sortedNames) {
        //convert input to lowercase and compare with each string
        if (
          i.toLowerCase().startsWith(input.textContent.toLowerCase()) &&
          input.textContent != ""
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.addEventListener("click", () => {
            input.textContent = listItem.textContent;
            removeElements();
          });
          //Display matched part in bold
          let word = "<b>" + i.substr(0, input.textContent.length) + "</b>";
          word += i.substr(input.textContent.length);
          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".list").appendChild(listItem);
        }
      }
    });

    function removeElements() {
      //clear all the item
      let items = document.querySelectorAll(".list-items");
      items.forEach((item) => {
        item.remove();
      });
    }
  });

const addRow = document.querySelector("#plus");
const removerRow = document.querySelector("#minus");
const tableBody = document.querySelector(".meta tbody");

//add rowfunction
function createRow() {
  let row = document.createElement("tr");
  row.classList.add("items-row");
  tableBody.appendChild(row);
  //no td creation
  let no_td = document.createElement("td");
  row.appendChild(no_td);
  let no_span = document.createElement("span");
  no_span.setAttribute("contenteditable", "true");
  no_span.classList.add("no");
  no_td.appendChild(no_span);

  // particulars td creation
  let particulars_td = document.createElement("td");
  row.appendChild(particulars_td);
  let particulars_span = document.createElement("span");
  particulars_span.setAttribute("contenteditable", "true");
  particulars_span.classList.add("particulars");
  particulars_span.setAttribute("id", "item-particulars");
  particulars_td.appendChild(particulars_span);
  let particulars_ul = document.createElement("ul");
  particulars_ul.classList.add("list");
  particulars_td.appendChild(particulars_ul);
  fetch("http://localhost:3000/api/view/product")
    .then((res) => res.json())
    .then((data) => {
      let productList = data.map((product) => {
        return product.particulars;
      });
      //Sort names in ascending order
      let sortedNames = productList.sort();
      //reference
      // let input = document.getElementById("item-particulars");
      //Execute function on keyup
      particulars_span.addEventListener("keyup", (e) => {
        //loop through above array
        //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
        removeElements();
        for (let i of sortedNames) {
          //convert input to lowercase and compare with each string
          if (
            i
              .toLowerCase()
              .startsWith(particulars_span.textContent.toLowerCase()) &&
            particulars_span.textContent != ""
          ) {
            //create li element
            let listItem = document.createElement("li");
            //One common class name
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.addEventListener("click", () => {
              particulars_span.textContent = listItem.textContent;
              removeElements();
            });
            //Display matched part in bold
            let word =
              "<b>" + i.substr(0, particulars_span.textContent.length) + "</b>";
            word += i.substr(particulars_span.textContent.length);
            //display the value in array
            listItem.innerHTML = word;
            particulars_ul.appendChild(listItem);
          }
        }
      });

      function removeElements() {
        //clear all the item
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
          item.remove();
        });
      }
    });

  //hsncode td creation
  let hsncode_td = document.createElement("td");
  row.appendChild(hsncode_td);
  let hsncode_span = document.createElement("span");
  hsncode_span.setAttribute("contenteditable", "true");
  hsncode_span.classList.add("hsn-code");
  hsncode_span.setAttribute("id", "item-hsn-code");
  hsncode_td.appendChild(hsncode_span);

  //quantity td creation
  let quantity_td = document.createElement("td");
  row.appendChild(quantity_td);
  let quantity_span = document.createElement("span");
  quantity_span.setAttribute("contenteditable", "true");
  quantity_span.setAttribute("id", "item-quantity");
  quantity_span.classList.add("quantity");
  quantity_td.appendChild(quantity_span);

  //rate td creation
  let rate_td = document.createElement("td");
  row.appendChild(rate_td);
  let rate_span = document.createElement("span");
  rate_span.setAttribute("contenteditable", "true");
  rate_span.setAttribute("id", "item-price");
  rate_span.classList.add("rate");
  rate_td.appendChild(rate_span);

  //per td creation
  let per_td = document.createElement("td");
  row.appendChild(per_td);
  let per_span = document.createElement("span");
  per_span.setAttribute("contenteditable", "true");
  per_span.classList.add("per");
  per_td.appendChild(per_span);

  //amount td creation
  let amount_td = document.createElement("td");
  row.appendChild(amount_td);
  let amount_span = document.createElement("span");
  amount_span.setAttribute("contenteditable", "true");
  amount_span.setAttribute("id", "item-amount");
  amount_span.classList.add("amount");
  amount_td.appendChild(amount_span);

  //amount delete td creation
  let remove_td = document.createElement("td");
  row.appendChild(remove_td);
  let remove_i = document.createElement("i");
  remove_i.classList.add("fa-solid");
  remove_i.classList.add("fa-square-minus");
  remove_i.setAttribute("id", "minus");
  remove_td.appendChild(remove_i);
}
let value = 0;
function serialNoAutoCreation() {
  var a = document.querySelectorAll("table.meta tbody tr ");
  a.children[0].textContent = value;
  for (let i = 0; a[i]; i++) {
    e.a[i].textContent = value;
  }
}

//add the row on table
addRow.addEventListener("click", (e) => {
  createRow();
  removeItemRow();
  generateSerialNumber();
  generateTotal();
  getItemNameAndHSNCode();
});

//remove the row on table
function removeItemRow() {
  const removeRowBtns = document.querySelectorAll("#minus");
  let saleValue = document.querySelector(".div1").children[0];
  let percentageValue = document.querySelector(".div1").children[1];
  let cGST = document.querySelector(".div2").children[0];
  let sGST = document.querySelector(".div2").children[1];
  let totalGST = document.querySelector(".gstDetails").children[5].children[1];
  let totalBillAmount = document.querySelector(".amounts-of-total");
  let wordsOfTotalAmount = document.querySelector(".amounts-of-words");

  for (let i = 0; i < removeRowBtns.length; i++) {
    let removerRowBtn = removeRowBtns[i];

    removerRowBtn.addEventListener("click", (e) => {
      const parentRow = e.target.parentElement.parentElement;
      parentRow.remove();
      generateSerialNumber();
      saleValue.textContent = calculateSaleValue();
      percentageValue.textContent = percentageCalculate();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      let calculatedBillAmount = calculateTotalBillAmount();
      totalBillAmount.textContent = convertPriceToIndian(calculatedBillAmount);
      wordsOfTotalAmount.textContent =
        "Rupees " + inWords(calculatedBillAmount);
    });
  }
}
removeItemRow();

//calculate total amount function

function generateSerialNumber() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  for (let i = 0; i < rows.length; i++) {
    let td = rows[i].children[0];
    td.textContent = i + 1;
  }
}

generateSerialNumber();

function generateTotal() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  rows.forEach((row) => {
    let quantity, price;
    let quantitySpan = row.children[3].querySelector("#item-quantity");
    let priceSpan = row.children[4].querySelector("#item-price");
    let item_amount = row.children[6];
    let saleValue = document.querySelector(".div1").children[0];
    let percentageValue = document.querySelector(".div1").children[1];
    let cGST = document.querySelector(".div2").children[0];
    let sGST = document.querySelector(".div2").children[1];
    let totalGST =
      document.querySelector(".gstDetails").children[5].children[1];
    let totalBillAmount = document.querySelector(".amounts-of-total");
    let wordsOfTotalAmount = document.querySelector(".amounts-of-words");

    quantitySpan.addEventListener("input", () => {
      quantity = parseFloat(quantitySpan.textContent);
      price = parseFloat(priceSpan.textContent);
      let totalPrice = findTotal(quantity, price);
      item_amount.textContent = convertPriceToIndian(totalPrice);
      saleValue.textContent = calculateSaleValue();
      percentageValue.textContent = percentageCalculate();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      let calculatedBillAmount = calculateTotalBillAmount();
      totalBillAmount.textContent = convertPriceToIndian(calculatedBillAmount);
      wordsOfTotalAmount.textContent =
        inWords(calculatedBillAmount).concat(" (Rupees only)");
    });

    priceSpan.addEventListener("input", () => {
      price = parseFloat(priceSpan.textContent);
      let totalPrice = findTotal(quantity, price);
      item_amount.textContent = convertPriceToIndian(totalPrice);
      saleValue.textContent = calculateSaleValue();
      percentageValue.textContent = percentageCalculate();
      cGST.textContent = calculateGST();
      sGST.textContent = calculateGST();
      totalGST.textContent = calculateGSTTotal();
      let calculatedBillAmount = calculateTotalBillAmount();
      totalBillAmount.textContent = convertPriceToIndian(calculatedBillAmount);
      wordsOfTotalAmount.textContent =
        inWords(calculatedBillAmount).concat(" (Rupees only)");
    });
  });
}

function findTotal(quantity, price) {
  if (!quantity) {
    quantity = 0.0;
  }

  if (!price) {
    price = 0.0;
  }
  return (quantity.toFixed(2) * price.toFixed(2)).toFixed(2);
}

function calculateSaleValue() {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  let sum = 0.0;
  rows.forEach((row) => {
    const itemPrice = row.children[6].textContent.replace(/,/g, "");
    sum = sum + parseFloat(itemPrice);
  });
  return convertPriceToIndian(sum.toFixed(2));
}
function percentageCalculate() {
  const saleValue = document
    .querySelector(".div1")
    .children[0].textContent.replace(/,/g, "");
  const percentage =
    document.querySelector(".gstDetails").children[1].children[0].textContent;
  const per = (saleValue / 100) * percentage;
  return convertPriceToIndian(per.toFixed(2).toString());
}
generateTotal();

const discountPercentage =
  document.querySelector(".gstDetails").children[1].children[0];

discountPercentage.addEventListener("input", () => {
  let wordsOfTotalAmount = document.querySelector(".amounts-of-words");
  let totalBillAmount = document.querySelector(".amounts-of-total");
  let percentageValue = document.querySelector(".div1").children[1];
  percentageValue.textContent = percentageCalculate();
  let calculatedBillAmount = calculateTotalBillAmount();
  totalBillAmount.textContent = convertPriceToIndian(calculatedBillAmount);
  console.log("calculated", calculatedBillAmount);
  wordsOfTotalAmount.textContent =
    inWords(calculatedBillAmount).concat(" (Rupees only)");
});
function calculateGST() {
  const saleValue = document
    .querySelector(".div1")
    .children[0].textContent.replace(/,/g, "");
  const gst = parseFloat(saleValue) * 0.09;
  return convertPriceToIndian(gst.toFixed(2));
}
function calculateGSTTotal() {
  let cGST = document
    .querySelector(".div2")
    .children[0].textContent.replace(/,/g, "");
  let sGST = document
    .querySelector(".div2")
    .children[1].textContent.replace(/,/g, "");
  return convertPriceToIndian((parseFloat(cGST) + parseFloat(sGST)).toFixed(1));
}
function calculateTotalBillAmount() {
  const saleValue = document
    .querySelector(".div1")
    .children[0].textContent.replace(/,/g, "");
  const percentageValue = document
    .querySelector(".div1")
    .children[1].textContent.replace(/,/g, "");
  const totalAmount = saleValue - percentageValue;
  let totalGST = document
    .querySelector(".gstDetails")
    .children[5].children[1].textContent.replace(/,/g, "");
  const total = parseFloat(totalAmount) + parseFloat(totalGST);
  return Math.round(total);
}

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
      : "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//back-end connect function

//buttons get in js

const createBillBtn = document.querySelector(".create-button");
const printBtn = document.querySelector(".print-button");

//input value get in bill form
const custamerAddress = document.querySelector(".custmer_address");
const custamerGstNo = document.querySelector(".custmer_gtsno");
const billingNo = document.querySelector(".billNo");
const billingdate = document.querySelector(".date");
const serialno = document.querySelector("#serialNo");
const product = document.querySelectorAll(".product");
const productAmount = document.querySelector(".row-total");
const productPrice = document.querySelector("#item-price");
const productSaleValue = document.querySelector(".salesValue");
const discount = document.querySelector(".discount");
const discountAmount = document.querySelector(".percentageValue");
const cgst = document.querySelector(".cgst");
const sgst = document.querySelector(".sgst");
const productGst = document.querySelector(".totalGst");
const wordOfAmount = document.querySelector(".amounts-of-words");
const productTotalAmount = document.querySelector(".amounts-of-total");
// billingdate.textContent = getCurrentDate();

createBillBtn.addEventListener("click", async () => {
  let particulars = product[1].textContent;
  let quantity = product[2].textContent;
  // billingNo.textContent = gererateBillNumber();

  let address = custamerAddress.textContent;
  let gstNo = custamerGstNo.textContent;
  let billNo = billingNo.textContent;
  let date = billingdate.textContent;
  let salesValue = productSaleValue.textContent;
  let disCount = discount.textContent;
  let disCountAmount = discountAmount.textContent;
  let cGST = cgst.textContent;
  let sGST = sgst.textContent;
  let totalGst = productGst.textContent;
  let wordofAmount = wordOfAmount.textContent;
  let totalAmount = productTotalAmount.textContent;
  console.log(!address, !gstNo, !particulars, !quantity);
  if (!address || !gstNo || !particulars || !quantity) {
    alert("Fill the required filed");
    return;
  }
  let products = [];
  const productRows = document.querySelectorAll(".items-row");
  for (let i = 0; i < productRows.length; i++) {
    const row = productRows[i];
    const product = {
      particulars: row.children[1].children[0].textContent,
      hsnCode: row.children[2].children[0].textContent,
      quantity: row.children[3].children[0].textContent,
      rate: row.children[4].children[0].textContent,
      per: row.children[5].children[0].textContent,
      amount: row.children[6].textContent,
    };
    products.push(product);
  }

  let body = {
    address: address,
    gstNo: gstNo,
    billNo: billNo,
    billDate: date,
    products: products,
    salesAmount: salesValue,
    discount: disCount,
    discountAmount: disCountAmount,
    cgst: cGST,
    sgst: sGST,
    wordOfAmount: wordofAmount,
    totalGST: totalGst,
    totalBillAmount: totalAmount,
  };

  url = "http://localhost:3000/api/bill/create";
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())

    .catch((err) => {
      alert("Error generating bill!");
    });
  if (result.message == "Bill number already exists") {
    alert("Bill number already exists");
  } else {
    alert("Bill saved on database");
  }
});

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}
function getItemNameAndHSNCode() {
  let rows = document.querySelectorAll("table.meta tbody tr ");

  rows.forEach(async (row) => {
    let particulars = row.children[1].querySelector("#item-particulars");
    let hsn_code = row.children[2].querySelector("#item-hsn-code");
    let rate = row.children[4].querySelector("#item-price");

    particulars.addEventListener("keydown", async (e) => {
      let particular = particulars.textContent;

      if (e.key === "Tab" && particular) {
        const type = "particulars";
        const value = particular;
        const result = await getHSNCodeData(type, value);
        console.log(result);
        particulars.textContent = result.particulars;
        hsn_code.textContent = result.hsnCode;
        rate.textContent = result.rate;
      }
    });

    hsn_code.addEventListener("keydown", async (e) => {
      let hsncodeValue = hsn_code.textContent;

      if (e.key === "Tab" && hsncodeValue) {
        const type = "hsnCode";
        const value = hsncodeValue;
        const result = await getHSNCodeData(type, value);

        particulars.textContent = result.particulars;
        hsn_code.textContent = result.hsnCode;
        rate.textContent = result.rate;
      }
    });
  });
}
getItemNameAndHSNCode();

async function getHSNCodeData(type, value) {
  const result = await fetch(
    `http://localhost:3000/api/product/${type}/${value}`
  ).then((data) => data.json());
  return result;
}

//Print methode call function

const printBtns = document.querySelector(".print-button");
const billForm = document.querySelector(".full-bill");

function printDiv(billForm) {
  var printContents = document.getElementById(billForm).innerHTML;
  window.print();
}

//search the bill

const searchInput = document.querySelector(".searchInput");
const searchBtns = document.querySelector("#search");

searchBtns.addEventListener("click", async () => {
  let searchValue = searchInput.value;
  let value = {
    billNo: searchValue,
  };

  const result = await fetch("http://localhost:3000/api/view/billno", {
    method: "PUT",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  const val = result.products;


  const table = document.querySelector("table.meta tbody");
  const rows = document.querySelectorAll("table.meta tbody tr ");


  if (result.products.length > 0) {
    // Adding data to first row
    let td_particulars = rows[0].children[1].children[0];
    td_particulars.textContent = result.products[0].particulars;

    let td_hsnCode = rows[0].children[2].children[0];
    td_hsnCode.textContent = result.products[0].hsnCode;

    let td_quantity = rows[0].children[3].children[0];
    td_quantity.textContent = result.products[0].quantity;

    let td_price = rows[0].children[4].children[0];
    td_price.textContent = result.products[0].rate;

    let td_per = rows[0].children[5].children[0];
    td_per.textContent = result.products[0].per;

    let td_amount = rows[0].children[6];
    td_amount.textContent = result.products[0].amount;

    if (result.products.length > 1) {
      //Creating rows and adding data for all the remaining products
      for (let i = 1; i < result.products.length; i++) {
        createRow();
        let totalRows = document.querySelectorAll("table.meta tbody tr ");

        let serialNo = totalRows[totalRows.length - 1].children[0];
        serialNo.textContent = totalRows.length;

        let td_particulars =
          totalRows[totalRows.length - 1].children[1].children[0];
        td_particulars.textContent = result.products[i].particulars;

        let td_hsnCode =
          totalRows[totalRows.length - 1].children[2].children[0];
        td_hsnCode.textContent = result.products[i].hsnCode;

        let td_quantity =
          totalRows[totalRows.length - 1].children[3].children[0];
        td_quantity.textContent = result.products[i].quantity;

        let td_price = totalRows[totalRows.length - 1].children[4].children[0];
        td_price.textContent = result.products[i].rate;

        let td_per = totalRows[totalRows.length - 1].children[5].children[0];
        td_per.textContent = result.products[i].per;

        let td_amount = totalRows[totalRows.length - 1].children[6].children[0];
        td_amount.textContent = result.products[i].amount;
      }
    }
  }
  let custamerGstNo = document.querySelector(".custmer_gtsno")
  let saleAmount = document.querySelector(".salesValue");
  let discount = document.querySelector(".discount");
  let discountAmount = document.querySelector(".percentageValue");
  let cgst = document.querySelector(".cgst");
  let sgst = document.querySelector(".sgst");
  let totalGst = document.querySelector(".totalGst");
  let wordOfAmount = document.querySelector(".amounts-of-words");
  let totalAmount = document.querySelector(".amounts-of-total");

  custamerAddress.textContent = result.address;
  custamerGstNo.textContent = result.gstNo;
  billingNo.textContent = result.billNo;
  billingdate.textContent = result.billDate;
  saleAmount.textContent = result.salesAmount;
  discount.textContent = result.discount;
  discountAmount.textContent = result.discountAmount;
  cgst.textContent = result.cgst;
  sgst.textContent = result.sgst;
  totalGst.textContent = result.totalGst;
  wordOfAmount.textContent = result.wordOfAmount;
  totalAmount.textContent = result.totalBillAmount;
});

//Reset function
const resetBtns = document.querySelector(".reset-button");

resetBtns.addEventListener("click", () => {
  const rows = document.querySelectorAll("table.meta tbody tr ");
  let custamerGstNo = document.querySelector(".custmer_gtsno")
  let saleAmount = document.querySelector(".salesValue");
  let discount = document.querySelector(".discount");
  let discountAmount = document.querySelector(".percentageValue");
  let cgst = document.querySelector(".cgst");
  let sgst = document.querySelector(".sgst");
  let totalGst = document.querySelector(".totalGst");
  let wordOfAmount = document.querySelector(".amounts-of-words");
  let totalAmount = document.querySelector(".amounts-of-total");


  let td_particulars = rows[0].children[1].children[0];
  td_particulars.textContent = "";

  let td_hsnCode = rows[0].children[2].children[0];
  td_hsnCode.textContent = "";

  let td_quantity = rows[0].children[3].children[0];
  td_quantity.textContent = "";

  let td_price = rows[0].children[4].children[0];
  td_price.textContent = "";

  let td_per = rows[0].children[5].children[0];
  td_per.textContent = "";

  let td_amount = rows[0].children[6];
  td_amount.textContent = "";

  for(i=1;i<rows.length;i++){
    rows[i].remove();
  }

  custamerAddress.textContent = "";
  custamerGstNo.textContent = "33CBWPPI299MIZP";
  billingNo.textContent = "";
  billingdate.textContent = getCurrentDate()
  saleAmount.textContent = "";
  discount.textContent = "";
  discountAmount.textContent = "";
  cgst.textContent = "";
  sgst.textContent = "";
  totalGst.textContent = "";
  wordOfAmount.textContent = "";
  totalAmount.textContent = "";
});

//Logout function

const logOut = document.querySelector(".logout-button");

logOut.addEventListener("click", () => {
  loginForm.style.display = "flex";
  user_password.value = "";
  window.location.reload();
  billingForm.style.display = "none";
  
});

//AddItem function
const addButton = document.querySelector(".add-button");
const submitStatus = document.querySelector(".submitStatus");
const returnButton = document.querySelector(".returnButton");
const logOutButton = document.querySelector(".logoutButton");
const submitButton = document.querySelector(".addItemButton");

addButton.addEventListener("click", () => {
  billingForm.style.display = "none";
  addItemForm.style.display = "flex";
});
returnButton.addEventListener("click", (e) => {
  e.preventDefault();
  addItemForm.style.display = "none";
  loginForm.style.display = "none";
  billingForm.style.display = "block";
});
const particularInput = document.querySelector("#addParticulers");
const hsnCodeInput = document.querySelector("#addHsnCode");
const priceInput = document.querySelector("#addPrice");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let particular = particularInput.value;
  let hsnCode = hsnCodeInput.value;
  let rate = priceInput.value;
  let body = {
    particulars: particular,
    hsnCode: hsnCode,
    rate: rate,
  };
  url = "http://localhost:3000/api/create/product";
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  if (result.message == "Item add successfully") {
    submitStatus.style.visibility = "visible";
    submitStatus.textContent = "Item submit successfully";
    submitStatus.style.color = "white";
    setTimeout(() => {
      submitStatus.style.visibility = "hidden";
    }, 1500);
  } else {
    setTimeout(() => {
      submitStatus.style.visibility = "visible";
      submitStatus.textContent = "Network problem";
      submitStatus.style.color = "red";
    }, 1500);
    submitStatus.style.visibility = "hidden";
  }
  console.log(result.message);
});

logOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
  addItemForm.style.display = "none";
  loginForm.style.display = "flex";
  user_password.value = "";
  billingForm.style.display = "none";
});

function convertPriceToIndian(price) {
  // const result = price.toLocaleString("en-IN", {style:"currency", currency:"INR"});
  // console.log("Price: "+ result)
  return Number(price).toLocaleString("en-IN");
}
