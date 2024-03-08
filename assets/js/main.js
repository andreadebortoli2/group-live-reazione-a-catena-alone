// console.log('test');

class item {
    constructor(image, name, quantity, price) {
        this.image = image;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = function() {
            return this.price * this.quantity;
        };
    }
};

const products = [
    burger = new item('burger.png', 'Burger', 1, 8.50),
    frenchFries = new item('french-fries.png', 'French Fries', 1, 5.50),
    kebab = new item('kebab.png', 'Kebab', 1, 7.00),
    pizza = new item('pizza.png', 'Pizza', 1, 10.00),

];

document.querySelector('.items_counter').innerHTML = `${products.length} Items`;

const tableTbody = document.querySelector('tbody');
console.log(tableTbody);

function generateItem(item) {

    const tableRowMarkup = 
    `<tr>
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
        <td class="quantity">
            <button class="minus_button">&minus;</button>
            <div class="quantity_counter">${item.quantity}</div>
            <button class="plus_button">&plus;</button>
        </td>
        <td>${item.price}€</td>
        <td>${item.totalPrice()}€</td>
    </tr>
    <!-- /.table_row -->`;

    tableTbody.insertAdjacentHTML('beforeend', tableRowMarkup);
}


products.forEach(product => generateItem(product));