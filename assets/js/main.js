// console.log('test');
/* class declaration function contructor */
class item {
    constructor(image, name, quantity, price) {
        this.image = image;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = function () {
            return this.price * this.quantity;
        };
    };
};

/* the array of the products */
const products = [
    burger = new item('burger.png', 'Burger', 1, 8.50),
    frenchFries = new item('french-fries.png', 'French Fries', 1, 5.50),
    kebab = new item('kebab.png', 'Kebab', 1, 7.00),
    pizza = new item('pizza.png', 'Pizza', 1, 10.00),
];

/**
 * print on page a product as a row in the table
 * @param {object} item object to print
 * @returns a row of a table filled with object data
*/
function generateItem(item) {

    // create table row for the item
    const trItemRow = document.createElement('tr');
    tableTbody.append(trItemRow);

    
    // item title
    const tdItemTitle = document.createElement('td');
    tdItemTitle.classList.add('item_title');

    const itemImg = document.createElement('img');
    itemImg.classList.add('item_img');
    itemImg.setAttribute('src', `./assets/img/foods/${item.image}`);

    const itemText = document.createElement('div');
    itemText.classList.add('item_text');

    const itemName = document.createElement('div');
    itemName.classList.add('item_name');
    itemName.innerHTML = `${item.name}`;

    const itemRemove = document.createElement('button');
    itemRemove.classList.add('item_remove');
    itemRemove.innerHTML = 'Remove';
    itemRemove.addEventListener('click', function(){
        item.quantity = 0;
        tdItemTotal.innerHTML = `${item.totalPrice()}€`;
        trItemRow.remove();
    });

    itemText.append(itemName, itemRemove);

    tdItemTitle.append(itemImg, itemText);


    // item quantity
    const tdItemQuantity = document.createElement('td');
    tdItemQuantity.classList.add('quantity');


    // -- button minus
    const minusButton = document.createElement('button');
    minusButton.classList.add('minus_button');
    minusButton.innerHTML = '-';
    minusButton.addEventListener('click', subtract);
    function subtract() {
        if (item.quantity >= 1) {
            item.quantity--
            // console.log(item.quantity);
            quantityCounter.innerHTML = `${item.quantity}`;
            tdItemTotal.innerHTML = `${item.totalPrice()}€`;
        } else if (item.quantity === 1) {
            this.removeEventListener('click', subtract);
        };
    };


    // -- quantity counter
    const quantityCounter = document.createElement('div');
    quantityCounter.classList.add('quantity_counter');
    quantityCounter.innerHTML = `${item.quantity}`;


    // -- button plus
    const plusButton = document.createElement('button');
    plusButton.classList.add('plus_button');
    plusButton.innerHTML = '+';
    plusButton.addEventListener('click', function () {
        item.quantity++
        // console.log(item.quantity);
        quantityCounter.innerHTML = `${item.quantity}`;
        tdItemTotal.innerHTML = `${item.totalPrice()}€`;

        // -- sum the cart total cost
        products.forEach((product) => {
            cartTotalCost = cartTotalCost + product.totalPrice();
        });
    });

    // -- add quantity buttons and counter
    tdItemQuantity.append(minusButton, quantityCounter, plusButton);


    // item price and total
    const tdItemPrice = document.createElement('td');
    tdItemPrice.classList.add('item_price');
    tdItemPrice.innerHTML = `${item.price}€`;

    const tdItemTotal = document.createElement('td');
    tdItemTotal.classList.add('item_total_price');
    tdItemTotal.innerHTML = `${item.totalPrice()}€`;

    // -- add all parts
    trItemRow.append(tdItemTitle, tdItemQuantity, tdItemPrice, tdItemTotal);

};



// -- create the cart table
document.querySelector('.items_counter').innerHTML = `${products.length} Items`;

const tableTbody = document.querySelector('tbody');
// console.log(tableTbody);



// -- fill thecart table with items
products.forEach(product => generateItem(product));

//++++++++++++++++++++++++ sidebar ++++++++++++++++++++++++++

// cart summary items
const cartSummaryItems = document.querySelector('.cart_summary_items');
cartSummaryItems.innerHTML = `ITEMS - ${products.length}`;



// -- calculate cart summary price
let cartTotalCost = 0;

products.forEach(product => cartTotalCost = cartTotalCost + product.totalPrice());

// -- print cart summary price
const cartSummaryPrice = document.querySelector('.cart_summary_price');
cartSummaryPrice.innerHTML = `${cartTotalCost.toFixed(2)} €`;



// -- select the shipping
const shippingCost = document.getElementById('shipping_options');

// -- calc total cost checkout
function calcChechkoutCost(shippingCostValue) {
    return total = Number(cartTotalCost) + Number(shippingCostValue);
};

// -- print checkout cost
const totalCheckoutCost = document.querySelector('.checkout_cost');
totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;

// -- re-print checkout cost at the change of shipping
shippingCost.addEventListener('change', function () {
    totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;
});



// -- set 'observer' to work at all the changes on products.totalPrice and re-print cart summary price and checkot price --
const observerCart = new MutationObserver(() => {
    cartTotalCost = 0;
    products.forEach(product => cartTotalCost = cartTotalCost + product.totalPrice());
    /* console.log(cartTotalCost); */
    cartSummaryPrice.innerHTML = `${cartTotalCost.toFixed(2)} €`;
    totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;
});

document.querySelectorAll('.item_total_price').forEach((item) => {
    observerCart.observe(item, {
        childList: true,
    });
});