// buy-button functionality
const buttons = document.querySelectorAll('.buy-button');
var clearBtn = document.getElementById('clear-cart');

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const parentContainer = this.closest('.image-container');
        const itemName = parentContainer.querySelector('.prod-name').innerText;

        console.log(event.target);

        alert("Item \"" + itemName + "\" has been added to your cart for $40!");

        //Add the item to cart

        addToCart(itemName);
    });
});

// end of buy-button functionality

function addToCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('myArtCart')) || [];

    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const now = new Date();
        cart.push({ name: itemName, quantity: 1, FirstAddedAt: now.toLocaleString() });
    }

    localStorage.setItem('myArtCart', JSON.stringify(cart));
}

if (document.querySelector('.cart-body')) {
    displayCartItems();
}

function displayCartItems() {
    const itemAddedMes = document.querySelector('.item-added-mes');
    const emptyImage = document.querySelector('.empty-cart-image');
    const savedCart = JSON.parse(localStorage.getItem('myArtCart')) || [];

    if (savedCart.length > 0) {
        if (emptyImage) emptyImage.classList.toggle('display-none', true);

        if (itemAddedMes) {
            const displayStrings = savedCart.map(item => {
                return item.quantity > 1
                    ? `${item.name} x${item.quantity}`
                    : item.name;
            });

            itemAddedMes.innerText = `Items in your cart:`;
            displayItemsContainer();
            displayTotalPrice();
        }

        if (clearBtn) {
            clearBtn.style.display = 'block';
        }
        else {
            if (clearBtn) clearBtn.style.display = 'none';
        }
    }
    if (emptyImage) {
        const style = getComputedStyle(emptyImage);

        if (style.display === 'none') {
            console.log('The image is hidden');
        } else {
            console.log('The image is visible');
        }
    }
}

if (clearBtn) {
    clearBtn.addEventListener('click', function () {

        localStorage.removeItem('myArtCart');

        location.reload();
    });
}

function displayItemsContainer() {
    const container = document.getElementById('item-container');
    const savedCart = JSON.parse(localStorage.getItem('myArtCart')) || [];

    container.innerHTML = '';

    savedCart.forEach(item => {

        const itemUl = document.createElement('ul');

        const img_map = {
            "Threaded Silence": "./img/Untitled-1.jpg",
            "Background Music": "./img/Attachment-1.jpeg",
            "Echo of Mortality": "./img/Untitled-4.jpg",
            "Flutter in Crimson": "./img/Untitled-5.jpg",
            "Fragmented Self": "./img/Untitled-6.jpg",
            "Pulse & Memory": "./img/Untitled-7.jpg",
            "Still Life in Bloom": "./img/Untitled-3.jpg",
            "Drift & Depth": "./img/Untitled-2.jpg",
        };

        const pricePerItem = 40;
        const totalItemPrice = pricePerItem * item.quantity;

        const imgSrc = img_map[item.name];
        itemUl.innerHTML = `
            <li class="item-image" >
                ${imgSrc ? `<img src="${imgSrc}" alt="${item.name}" style="width:150px;">` : 'No image found'}
            </li>
            <div class="item-details">
                <li class="item-name" >Product: ${item.name}</li>
                <li class="item-price" >Price: $${totalItemPrice}</li>
                <li class="item-quantity" >Quantity:</li>
                <li>
                    <div class="quantity-buttons">
                        <button class="decrease-qty"">-</button>
                        <span class="item-quantity-nr">${item.quantity}</span>
                        <button class="increase-qty">+</button>
                    </div>
                </li>
            
        `;

        container.appendChild(itemUl);

        const decreaseBtn = itemUl.querySelector('.decrease-qty');
        const increaseBtn = itemUl.querySelector('.increase-qty');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', function () {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    localStorage.setItem('myArtCart', JSON.stringify(savedCart));
                    displayCartItems();
                }
                else {
                    const index = savedCart.findIndex(i => i.name === item.name);
                    if (index !== -1) {
                        savedCart.splice(index, 1);
                        localStorage.setItem('myArtCart', JSON.stringify(savedCart));

                        if (savedCart.length === 0) {
                            localStorage.removeItem('myArtCart');
                            location.reload();
                        } else {
                            displayCartItems();
                        }
                    }
                }
            });
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', function () {
                item.quantity += 1;
                localStorage.setItem('myArtCart', JSON.stringify(savedCart));
                displayCartItems();
            });
        }
    }
    );
}
function displayTotalPrice() {
    const savedCart = JSON.parse(localStorage.getItem('myArtCart')) || [];
    const totalPrice = savedCart.reduce((total, item) => total + (40 * item.quantity), 0);

    const totalPriceDiv = document.getElementById('total-amount');

    totalPriceDiv.innerText = `Total Amount: $${totalPrice}`;
}

//contact form validation
const contactForm = document.getElementById('contact-form');


if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('email-addr');
        const agreeCheckbox = document.getElementsByClassName('checkbox-class')[0].querySelector('input[type="checkbox"]');
        // 1. Expresii Regulate (Cerință bifată)
        // Numele trebuie să conțină doar litere și să aibă minim 3 caractere
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        // Format standard de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let isValid = true;

        // 2. Validare Nume
        if (!nameRegex.test(nameInput.value)) {
            nameInput.style.border = "2px solid red"; // Modificare stil (Cerință bifată)
            isValid = false;
        } else {
            nameInput.style.border = "1px solid #ccc";
        }

        // 3. Validare Email
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.border = "2px solid red";
            isValid = false;
        } else {
            emailInput.style.border = "1px solid #ccc";
        }
        if (!agreeCheckbox.checked) {
            agreeCheckbox.style.border = "2px solid red"; // Modificare stil (Cerință bifată)
            isValid = false;
        }
        else {
            agreeCheckbox.style.border = "1px solid #ccc";
        }

        if (isValid) {
            // Folosirea setTimeout pentru a simula trimiterea (Cerință bifată)
            const submitBtn = contactForm.querySelector('button');
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {
                alert("Thank you, " + nameInput.value + "! Your message has been sent.");
                contactForm.reset();
                submitBtn.innerText = "Submit";
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert("Please correct the highlighted fields.");
        }
    });
}

const img_map_random = {
    1: "./img/background-image.png",
    2: "./img/Remove-the-backgroun.png",
    3: "./img/Attachment-1-2.png",
};

const randomImgElement = document.getElementById('about-image');

const randomIndex = Math.floor(Math.random() * 3) + 1;
if (randomImgElement) {
    randomImgElement.src = img_map_random[randomIndex];
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        alert('You pressed ESC');
    }
});

// full screen images on click
const containers = document.querySelectorAll('.image-container');

containers.forEach(container => {
    container.addEventListener('click', function () {
        const img = this.querySelector('img');
        if(!img) return;

        const fullScreenDiv = document.createElement('div');
        fullScreenDiv.classList.add('full-screen-image');

        const fullScreenImg = document.createElement('img');

        fullScreenImg.src = img.src;

        fullScreenDiv.appendChild(fullScreenImg);
        document.body.appendChild(fullScreenDiv);

        fullScreenDiv.addEventListener('click', () => {
            fullScreenDiv.remove();
        });
    });
});