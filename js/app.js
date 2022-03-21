const images = [
  "images/61pdShJHBbL._AC_SX679_.jpg",
  "images/61QckPGdteL._AC_SX679_.jpg",
  "images/61W1iNjiYSL._AC_SX679_.jpg",
  "images/71+HgUXU-mL._AC_SX679_.jpg",
  "images/71Avgs0DbrL._AC_SX679_.jpg",
  "images/81hKmuMWW+L._AC_SX679_.jpg",
];
const slider = document.getElementById("slider");
let imgCount = 0;
setInterval(() => {
  if (imgCount === images.length) {
    imgCount = 0;
  }
  const imgUrl = images[imgCount];
  slider.setAttribute("src", imgUrl);
  imgCount++;
}, 3000);
const getData = async () => {
  let data = await fetch("../fake-data.json");
  let gun = await data.json();
  displayCard(gun);
};
getData();
const cardContainer = document.getElementById("card-container");
const displayCard = (guns) => {
  guns.forEach((gun) => {
    const { image, name, price,id} = gun;
    
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="m-4 border-2 shadow-xl shadow-red-700">
          <div class="p-4 h-[250px]">
            <img class="object-fill" src="${image}" alt="" />
          </div>
          <div class="bg-slate-600 text-white p-6">
            <h1 class="text-3xl font-semibold">${name}</h1>
            <p class="text-xl my-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              non!
            </p>
            <h3 class="text-2xl font-bold">$${price}</h3>
            <button
            onclick="buyNow('${JSON.stringify(gun).split('"').join("&quot;")}')"
              class="my-4 border-white border rounded-2xl text-xl font-bold px-4"
            >
              buy now
            </button>
            <button onclick="removeToCart('${id}')" class="my-4 border-white border rounded-2xl text-xl font-bold px-4">delete</button> 
            <button onclick="removeSoppingCart()" class="my-4 border-white border rounded-2xl text-xl font-bold px-4">removeSoppingCart</button> 
            
          </div>
        </div>
  `;
    cardContainer.appendChild(div);
  });
};
const addToCard =(id)=>{
 let shapingCart
 const check = localStorage.getItem("shaping-cart");
//  console.log(check);
 if(check){
   shapingCart=JSON.parse(check)
 }else{
   shapingCart = {};
 }

//  console.log(id);
 const item=shapingCart[id]
 if (item){
   shapingCart[id]=item+1
  }else{
    shapingCart[id]= 1;
  }
  localStorage.setItem('shaping-cart',JSON.stringify(shapingCart))
}
const removeToCart=(id)=>{
  // console.log(id);
  const check=localStorage.getItem('shaping-cart')
 

  if(check){
    const shapingCart=JSON.parse(check)
    // console.log(shapingCart);
    if(id in shapingCart){
      delete shapingCart[id]
      localStorage.setItem("shaping-cart", JSON.stringify(shapingCart));
    }

  }
}
const removeSoppingCart=()=>{
  localStorage.removeItem("shaping-cart");
}

const detailContainer = document.getElementById("detail-container");

function buyNow(gun) {
  const parGun = JSON.parse(gun);

  detailContainer.textContent = "";
  const div = document.createElement("div");
  div.classList.add("flex");
  div.innerHTML = `
        <div class="m-4 border-2 w-3/4 ">
          <div class="p-4 ">
            <img class=""  src="${parGun.image}" alt="" />
          </div>
          <div class="bg-slate-600 text-white p-6">
            <h1 class="text-3xl font-semibold">${parGun.name}</h1>
            <p class="text-xl my-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              non!
            </p>
            <h3 class="text-2xl font-bold">$${parGun.price}</h3>
          </div>
        </div>


        <div class="w-1/4 border flex justify-center my-4 pt-4">
          <div>
            <button class="border-2 px-2" onclick="gotMinus(${parGun.price})">-</button>
            <input
              class="border-2 w-16"
              type="number"
              id="quantity"
              value="1"
            />
            <button class="border-2 px-2" onclick="gotPlus(${parGun.price})">+</button>
            <p>price:$ <span id="price-field">${parGun.price}</span></p>
          </div>
        </div>
  `;
  addToCard(parGun.id)

  detailContainer.appendChild(div);
}
function gotPlus(gunPrice) {
  const quantity = document.getElementById("quantity");
  const price = document.getElementById("price-field");
  quantity.value = parseInt(quantity.value) + 1;
  price.innerText = parseInt(quantity.value) * gunPrice;
}
function gotMinus(gunPrice) {
  const quantity = document.getElementById("quantity");
  const price = document.getElementById("price-field");
  if (quantity.value <= 1) {
    return;
  }
  quantity.value = parseInt(quantity.value) - 1;
  price.innerText = parseInt(quantity.value) * gunPrice;
}
 