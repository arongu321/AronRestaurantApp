import { menuArray } from "./data.js";
import { menuItem } from "./menuItem.js";

// Get HTML elements
const foodMenuHTML = document.getElementById("food-menu");
const orderContentsHTML = document.getElementById("order-contents");
const orderListHTML = document.getElementById("order-list");
const totalPriceHTML = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order-btn");
const modalHTML = document.getElementById("modal");
const modalForm = document.getElementById("modal-form");
const deliveryOrderHTML = document.getElementById("delivery-order");
const fullNameInputHTML = document.getElementById("fullName")

// Get menu items from data array
const currMenuItems = createMenuItems(menuArray);

// Track items for user
let currentOrder = []

// Add document event listener to listen for clicks on plus icons
document.addEventListener('click', function(e) {
    // Check if the modal is active or delivery message is active (not hidden)
    if (!modalHTML.classList.contains('hidden') || !deliveryOrderHTML.classList.contains('hidden')) {
        return; // Do nothing if modal or delivery message is active
    }
    
    // Check if user clicks on add icon for item
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    
    // Check if user clicks on remove icon for item in cart
    } else if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    }
})

// Add event listener to handle completed order
completeOrderBtn.addEventListener('click', function() {
    // Check if the modal or delivery message is active (not hidden)
    if (!modalHTML.classList.contains('hidden') || !deliveryOrderHTML.classList.contains('hidden')) {
        return; // Do nothing if modal is active
    }
    modalHTML.classList.toggle('hidden');
})

// Add event listener to handle form submission
modalForm.addEventListener('submit', function(e) {
    e.preventDefault()
    modalHTML.classList.toggle('hidden');
    completeOrderBtn.disabled = false;
    const fullName = fullNameInputHTML.value
    modalForm.reset();
    // Remove the 'hidden' class to make the section visible
    deliveryOrderHTML.classList.remove('hidden');
    
    // Update delivery message
    renderDeliveryHTML(fullName)
    
    // Hide order section so delivery message can be seen
    orderListHTML.classList.add('hidden');
    

    // Set a timeout to hide the delivery message and unhide order section after 5 seconds (5,000 milliseconds)
    setTimeout(() => {
        deliveryOrderHTML.classList.add('hidden');
        orderListHTML.classList.remove('hidden');
        resetDeliveryHTML();
    }, 5000); // 5 seconds
})

// Helper function to update the order section if there are no orders
function checkOrder() {
    if (currentOrder.length === 0) {
        orderListHTML.classList.toggle('hidden');
        completeOrderBtn.classList.toggle('hidden');
    }
}

// Function to add item to order
function handleAddClick(foodID) {
    // Function to get menu item for order
    const menuItemObj = currMenuItems.filter(item =>
    item.getID() === parseInt(foodID))[0];
    
    // Update display of order list
    checkOrder()
    
    // Update order and total price section with new item
    currentOrder.push(menuItemObj)
    renderOrderHTML()
    renderTotalPriceHTML()
}

// Function to remove item from order
function handleRemove(foodID) {
    // Find item for current menu item
    const itemIndex = currentOrder.findIndex(item =>
    item.getID() === parseInt(foodID));
    
    // Remove item from order
    currentOrder.splice(itemIndex, 1)
    
    // Update order section and total price section with item removed
    checkOrder()
    renderOrderHTML()
    renderTotalPriceHTML()
}

// Define function to create array of menuItems
function createMenuItems(items) {
    const menuItems = items.map(function(item) {
        const {name, ingredients, id, price, emoji} = item;
        return new menuItem(id, name, price, ingredients, emoji);
    });
    return menuItems;
}


// ### Functions to update HTML of page ###

// Get HTML to display current order
function getOrderHTML() {
    let orderHTML = ``
    
    currentOrder.forEach(function(order) {
        orderHTML += `
        <div class="order-menu-item">
            <div class="order-menu-item-name">
                <h2 class="item-name">${order.getName()}</h2>
                <a class="item-remove" data-remove="${order.getID()}">Remove</a>
            </div>
            <div class="order-menu-item-price">
                <h3 class="item-price">\$${order.getPrice()}</h3>
            </div>
        </div>
        `;
    })
    
    return orderHTML;
}

// Get HTML to display menu items
function getMenuHTML() {
    // Initialize HTML for menu
    let menuHTML = ``;
    
    // Apply HTML for each menu item
    currMenuItems.forEach(function(item) {
        const name = item.getName();
        const emoji = item.getEmoji();
        const ingredients = item.getIngredients();
        const price = item.getPrice();
        const id = item.getID();
        
        menuHTML += `
        <section class="menu-item">
            <div class="menu-item-inner">
                <div class="item-img">
                    ${emoji}
                </div>
                <div class="item-details">
                    <h2 class="name">${name}</h2>
                    <p class="ingredients-list">${ingredients.join(', ')}</p>
                    <h3 class="price">\$${price}</h3>
                </div>
            </div>
            <div class="add">
                <i class="fa-solid fa-plus" data-add="${id}"></i>
            </div>
        </section>
        `
    });
    
    return menuHTML;
}

// Get HTML to display total price of items
function getTotalPriceHTML() {
    const totalPrice = currentOrder.reduce((currentTotal, item) =>
    currentTotal + item.getPrice(), 0)
    
    const totalPriceHTML = `
    <div class="total-price-div">
        <div class="total-price-header">
            <h2 class="total-price-text">Total Price:</h2>
        </div>
        <div class="total-price-value-section">
            <h3 class="total-price-value">\$${totalPrice}</h3>
        </div>
    </div>
    `
    
    return totalPriceHTML;
}

function getDeliveryHTML(name) {
    const deliveryHTML = `
    <p>Thanks ${name}! Your order is on the way!</p>
    `
    return deliveryHTML
}

// ### Render functions to update page ###

// Function to render menu HTML on page
function renderMenuHTML() {
    foodMenuHTML.innerHTML = getMenuHTML()
}

// Function to render order HTML on page
function renderOrderHTML() {
    orderContentsHTML.innerHTML = getOrderHTML()
}

// Function to render total price HTML on page
function renderTotalPriceHTML() {
    totalPriceHTML.innerHTML = getTotalPriceHTML()
}

// Function to render deliver message HTML on page
function renderDeliveryHTML(name) {
    deliveryOrderHTML.innerHTML = getDeliveryHTML(name)
}

// Function to clear delivery message for new customers
function resetDeliveryHTML() {
    deliveryOrderHTML.innerHTML = ``
}

renderMenuHTML()