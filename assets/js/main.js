// console.log('test');

/* generate an object */
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



/* let cartTotalCost = 0; */




document.querySelector('.items_counter').innerHTML = `${products.length} Items`;

const tableTbody = document.querySelector('tbody');
// console.log(tableTbody);

/**
 * print on page a product as a row in the table
 * @param {object} item object to print
 * @returns a row of a table filled with object data
*/
function generateItem(item) {

    /* const tableRowMarkup =
        `<tr class="item_row">
            <td class="item_title">
                 <img class="item_img" src="./assets/img/foods/${item.image}" alt="">
                <!-- /.item_img -->
                 <div class="item_text">
                    <div class="item_name">${item.name}</div>
                     <!-- /.item_name -->
                     <div class="item_remove">Remove</div>
                    <!-- /.remove_item -->
                 </div>
                <!-- /.item_text -->
            </td>
            <!-- /.item_title -->
            <td class="quantity">
                <button class="minus_button">&minus;</button>
                 <div class="quantity_counter">${item.quantity}</div>
                <button class="plus_button">&plus;</button>
            </td>
            <!-- /.quantity -->
            <td>${item.price}€</td>
            <td>${item.totalPrice()}€</td>
        </tr>
        <!-- /.item_row -->`;

    tableTbody.insertAdjacentHTML('beforeend', tableRowMarkup); */


    const trItemRow = document.createElement('tr');
    tableTbody.append(trItemRow);

    // item title
    const tdItemTitle = document.createElement('td');
    tdItemTitle.classList.add('item_title')
    tdItemTitle.innerHTML =
        `<img class="item_img" src="./assets/img/foods/${item.image}" alt="">
    <!-- /.item_img -->
    <div class="item_text">
    <div class="item_name">${item.name}</div>
    <!-- /.item_name -->
    <div class="item_remove">Remove</div>
    <!-- /.remove_item -->
    </div>
    <!-- /.item_text -->`;

    // item quantity
    const tdItemQuantity = document.createElement('td');
    tdItemQuantity.classList.add('quantity');


    //+++++++++++++++++ todo bug minus sometimes stop to work after 15 clicks circa ++++++++++++++++
    // --button minus
    const minusButton = document.createElement('button');
    minusButton.classList.add('minus_button');
    minusButton.innerHTML = '-';
    /* minusButton.addEventListener('click', function(e) {
        item.quantity--
        console.log(item.quantity);
        quantityCounter.innerHTML = `${item.quantity}`;
        tdItemTotal.innerHTML = `${item.totalPrice()}€`;
        if (item.quantity === 0) {
            this.removeEventListener('click', function)
        }
    }); */
    minusButton.addEventListener('click', subtract);
    function subtract() {
        if (item.quantity > 0) {
            item.quantity--
            // console.log(item.quantity);
            quantityCounter.innerHTML = `${item.quantity}`;
            tdItemTotal.innerHTML = `${item.totalPrice()}€`;
        } else if (item.quantity < 1) {
            this.removeEventListener('click', subtract)
        };
    };

    const quantityCounter = document.createElement('div');
    quantityCounter.classList.add('quantity_counter');
    quantityCounter.innerHTML = `${item.quantity}`;

    // --button plus
    const plusButton = document.createElement('button');
    plusButton.classList.add('plus_button');
    plusButton.innerHTML = '+';
    plusButton.addEventListener('click', function () {
        item.quantity++
        // console.log(item.quantity);
        quantityCounter.innerHTML = `${item.quantity}`;
        tdItemTotal.innerHTML = `${item.totalPrice()}€`;

        // sum the cart total cost
        products.forEach((product) => {
            cartTotalCost = cartTotalCost + product.totalPrice()
        
        })
    });

    tdItemQuantity.append(minusButton, quantityCounter, plusButton);

    // item price and total
    const tdItemPrice = document.createElement('td');
    tdItemPrice.innerHTML = `${item.price}€`;

    const tdItemTotal = document.createElement('td');
    tdItemTotal.innerHTML = `${item.totalPrice()}€`;

    // add all parts
    trItemRow.append(tdItemTitle, tdItemQuantity, tdItemPrice, tdItemTotal);

};


products.forEach(product => generateItem(product));


/* products.forEach((product, index) => {
    
    generateItem(product);
    
    console.log(document.querySelectorAll('.plus_button')[index]);
    document.querySelectorAll('.plus_button')[index].addEventListener('click', function () {
        product.quantity++
        console.log(product.quantity);
        console.log(products[index]);
        generateItem(products[index]);

    });
}); */

//++++++++++++++++++++++++ sidebar ++++++++++++++++++++++++++

let cartTotalCost = 0;

products.forEach((product) => {
    cartTotalCost = cartTotalCost + product.totalPrice()

});

console.log(cartTotalCost);
//----------------------------



// cart summary items
const cartSummaryItems = document.querySelector('.cart_summary_items');
cartSummaryItems.innerHTML = `ITEMS - ${products.length}`;

// cart summary price
const cartSummaryPrice = document.querySelector('.cart_summary_price');
cartSummaryPrice.innerHTML = `${cartTotalCost.toFixed(2)} €`;

// total cost checkout
const shippingCost = document.getElementById('shipping_options');
    
function calcChechkoutCost(shippingCostValue) {
    return total = Number(cartTotalCost) + Number(shippingCostValue)
}

const totalCheckoutCost = document.querySelector('.checkout_cost');
totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;

shippingCost.addEventListener('change', function(){
    totalCheckoutCost.innerHTML = `${calcChechkoutCost(shippingCost.value).toFixed(2)} €`;
});