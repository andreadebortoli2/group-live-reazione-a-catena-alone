// console.log('test');

/* class declaration - function contructor */
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



// cart items counter

/**
 * calc the total items in the cart based on each item quantity
 * @returns total items in the cart
 */
function calcTotalItems() {
    let total = 0;
    products.forEach((product) => {
        total += product.quantity;
    });
    return total;
};

// -- print total on page
const cartItemsCounter = document.querySelector('.items_counter');
cartItemsCounter.innerHTML = `${calcTotalItems()} Items`;



// cart table
// -- create the cart table
const tableTbody = document.querySelector('tbody');
// console.log(tableTbody);

// -- fill thecart table with items
products.forEach(product => generateItem(product));


//++++++++++++++++++++++++ sidebar ++++++++++++++++++++++++++


// cart summary items
const cartSummaryItems = document.querySelector('.cart_summary_items');
cartSummaryItems.innerHTML = `ITEMS - ${calcTotalItems()}`;



// -- calculate cart summary price
/**
 * calc the total price of the cart based on each item total price already calculated
 * @returns total price of the cart
 */
function calcCartTotalCost() {
    let cartTotalCost = 0;
    products.forEach(product => cartTotalCost += product.totalPrice());
    return cartTotalCost;
};


// -- print cart summary price
const cartSummaryPrice = document.querySelector('.cart_summary_price');
cartSummaryPrice.innerHTML = `${calcCartTotalCost().toFixed(2)} €`;



// -- select the shipping
const shippingCost = document.getElementById('shipping_options');

// -- calc total cost checkout
/**
 * cacl the final price at checkout based on alredy calculated cart total cost and selected shipping cost
 * @param {*} shippingCostValue the .value of the shipping option selected
 * @returns final checkout price
 */
function calcChechkoutCost(shippingCostValue) {
    return total = Number(calcCartTotalCost()) + Number(shippingCostValue);
};

// -- print checkout cost
const totalCheckoutCost = document.querySelector('.checkout_cost');
totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;

// -- re-print checkout cost at the change of shipping
shippingCost.addEventListener('change', function () {
    totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;
});



// -- set 'observer' to work at all the changes on products.totalPrice and reprint cart items counter, cart summary items, cart summary price, total checkout price, --
const observerCart = new MutationObserver(() => {
    // reprint cart items counter
    cartItemsCounter.innerHTML = `${calcTotalItems()} Items`;
    // reprint cart summary items
    cartSummaryItems.innerHTML = `ITEMS - ${calcTotalItems()}`;
    // reprint cart summary price
    cartSummaryPrice.innerHTML = `${calcCartTotalCost().toFixed(2)} €`;
    // reprint total checkout cost
    totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;
});

document.querySelectorAll('.item_total_price').forEach((item) => {
    observerCart.observe(item, {
        childList: true,
    });
});