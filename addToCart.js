let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
: [];
    
// READ
function readProducts(products) {
document.querySelector("#badge").innerHTML = cart.length; 
document.querySelector("#cart").innerHTML = "";
let total = cart
.reduce((total, product) => {
return total + product.price * product.qty;
}, 0)
.toFixed(2);

products.forEach((product, position) => {
document.querySelector("#cart").innerHTML += `
<div class="card  mb-3 w-100  position-relative">
<div class="row g-0">
<div class="col-md-4">
<img src="${product.img}" class="img-fluid rounded-start" alt="${product.title}">
<div class="card-body">
</div>
<div class="col-md-8">
<div class="card-body d-flex flex-column container">
<h5 class="card-title" >${product.title}</h5>
<div class="d-flex mb-3 justify-content-between">
<p class="card-text">Individual price: </p>
<span>R${product.price}<span>
</div>
<div class="d-flex mb-3 justify-content-between">
<label class="form-label">Quantity:</label>
<input type="number" min=1 id="remove${position}" value=${
 product.qty
} onchange="updateCart(${position})" />
</div>
<div class="d-flex mb-3 justify-content-between">
<p>Total Cost: </p>
<span>R${(
parseFloat(product.price) * parseInt(product.qty)
).toFixed(2)}</span>
</div>
<div class="d-grid gap-2 d-md-block">
<button class="btn btn-primary btn-lg" onclick="checkout()">
Checkout
</button>
<button type="button"  data-toggle="tooltip" title="Delete" class="btn btn-danger" onclick="deleteCart(${position})">
<i class="material-icons">delete_sweep</i></button>
</div>
</div>
</div>
`;
});
console.log(products)
}
          
readProducts(cart);

// UPDATE
function updateCart(position) {
let qty = document.querySelector(`#remove${position}`).value;
cart[position] = { ...cart[position], qty };
localStorage.setItem("cart", JSON.stringify(cart));
readProducts(cart);
  }


//  DELETE
function deleteCart(position) {
let confirmation = confirm(
"Are you sure you want to delete the selected product?"
);
          
if (confirmation) {
cart.splice(position, 1);
document.querySelector("#badge").innerHTML = cart.length;
localStorage.setItem("cart", JSON.stringify(cart));
readProducts(cart);
}
} 

// CHECKOUT
function checkout() {
    let total = cart
      .reduce((total, product) => {
        return total + product.price * product.qty;
      }, 0)
      .toFixed(2);
    try {
      if (parseInt(total) == 0) throw new Error("Nothing in cart");
      let confirmation = confirm(`Total payment needed: R${total}`);
  
      if (confirmation) {
        cart.length = 0;
        localStorage.removeItem("cart");
        readProducts(cart);
      }
    } catch (err) {
      alert(err);
    }
  }