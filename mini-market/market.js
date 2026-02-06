const cartTotal = document.getElementById('cartTotal')
const cartList = document.getElementById('cartList')
const productsContainer = document.getElementById('productsContainer')

let carts = JSON.parse(localStorage.getItem('miCarrito')) || []

function saveInStorage(){
    localStorage.setItem('miCarrito',JSON.stringify(carts))
}

async function loadProducts(){
    const answer = await fetch('./mini-market/products.json')
    const products = await answer.json()

    productsContainer.innerHTML = ''

    products.forEach(product => {
        
        const productItem = document.createElement('div')
        productItem.classList.add('item')

        productItem.innerHTML = `
        
        <img src=" ${ product.image } " class="img-product" >
        <h2> ${ product.name } </h2>
        <p> $ ${ product.price } </p>
        <button class="add-btn"
        data-name="${ product.name }"
        data-price="${ product.price }"
        >Agregar</button>
        `

        productsContainer.appendChild(productItem)

    }) 

    const btnAdd = document.querySelectorAll('.add-btn')
    btnAdd.forEach(button => {
        button.addEventListener('click', (e) =>{

            const name = e.target.dataset.name
            const price = parseFloat(e.target.dataset.price)

            addToCart(name, price)

        })
    })
}

function renderMarket(){
    cartList.innerHTML = ''

    carts.forEach(item =>{
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item-container')

            const subtotal = item.price * item.quantity

            cartItem.innerHTML = `
                <h2> ${item.name} </h2>
                <p>Precio total: $${subtotal.toFixed(2)} </p>
                <p> cantidad: ${ item.quantity } </p>
                <button class="delete">Eliminar</button>
            `
        
            cartItem.querySelector('.delete').addEventListener('click', () =>{
                carts = carts.filter(i => i.id !== item.id)
                saveInStorage();
                renderMarket();
            })

            cartList.appendChild(cartItem)
        })

    updateTotal()
}

function updateTotal(){
    const total =  carts.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    if (cartTotal) {
        cartTotal.innerText = ` total: ${total.toFixed(2)} `
    }
}

function addToCart(name, price){

    const existingItem = carts.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1
    }else{
        const newItem = {
        id : Date.now(),
        name : name,
        price : price,
        quantity : 1,
        }
        
        carts.push(newItem)
    }    
    
        saveInStorage();
        renderMarket();
}
    loadProducts();
    saveInStorage();
    renderMarket();
