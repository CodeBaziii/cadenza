//collection categories : boot sport slippers college dressShoes bag accessory
const hamburger  = document.querySelector(".hamburger")
 const button = document.querySelector(".hamburgrer-icon")
 const menu = document.querySelector(".hamburger-menu")
 const back = document.querySelector(".hamburger-back")
 const backToTop = document.querySelector(".back-to-top")


 button.addEventListener("click", (e) => {
    e.preventDefault()
    const isOpen = menu.classList.contains("is-open")
    if(isOpen) {
        closeMenu()
    }else{
        openMenu()
    }
 })

 function openMenu(){
    menu.classList.add("is-open")
    back.classList.add("is-open")
 }
 function closeMenu(){
    menu.classList.remove("is-open")
    back.classList.remove("is-open")
 }

//  back.addEventListener("click", (e) => {
//     console.log("back");
//     closeMenu()
//  })
 document.addEventListener("click", (e) => {
    // console.log(e.target);
 })

document.addEventListener("keydown" , (e) => {
    if(e.key === "Escape"){
        closeMenu()
    }
})

window.addEventListener("scroll" , () => {
    if(window.scrollY > 400){
        backToTop.classList.add("is-visibile")
    }else{
        backToTop.classList.remove("is-visibile")
    }
})





const mobileLink = document.querySelectorAll(".hamburger-item.has-sub > .hamburger-link")
mobileLink.forEach((link) => {

    link.addEventListener("click", (e) => {
        e.preventDefault()
        const item = link.parentElement
        const isOpen = item.classList.contains("open")
        console.log(isOpen);
        document.querySelectorAll(".hamburger-item.has-sub.open").forEach((openItem) => {
            openItem.classList.remove("open")
        })
        if(!isOpen){
            item.classList.add("open")
        }
    })
})




const input = document.querySelector(".search-input")
const submitBtn = document.querySelector(".header-form-btn")
const form = document.querySelector(".header-form form")
const clearBtn = document.querySelector(".search-clear")

input.addEventListener("input", updateSearchUI)

function updateSearchUI(){
    const value = input.value.trim()
    const hasText = value.length > 0
    submitBtn.disabled = !hasText
    if(hasText){
        clearBtn.classList.add("is-visible")

    }else{
        clearBtn.classList.remove("is-visible")

    }
}


updateSearchUI()


//login form

const loginDiv = document.querySelector(".login-signin-form")
const myForm = document.querySelector(".login-signin-form .my-form")
const forms = document.querySelectorAll(".login-signin-form .my-form form")
const userImage = document.querySelector(".user-img")
const myForm1 = document.querySelector("#myForm1")
const myForm2 = document.querySelector("#myForm2")
const myForm3 = document.querySelector("#myForm3")
const signinBtn = document.querySelector("#signinBtn")

userImage.addEventListener("click", (e) => {
    loginDiv.classList.remove("hidden")
    requestAnimationFrame(() => {
        myForm.classList.add("show-form")
        myForm.style.top = "60px"
    })
})
document.addEventListener("click" , (e) => {
    // console.log(e.target);
    if(e.target.classList.contains("form-back")){
        myForm.style.top = "-370px"
    setTimeout(() => {
        loginDiv.classList.add("hidden")
    },400)
    }

})
// myForm1.lastElementChild.addEventListener("click", (e) => {
//     e.preventDefault()
//     myForm1.classList.add("hidden")
//     myForm3.classList.remove("hidden")
// })
// myForm3.lastElementChild.addEventListener("click",  (e) =>{
//     e.preventDefault()
//     myForm3.classList.add("hidden")
//     myForm1.classList.remove("hidden")
// })
// myForm2.lastElementChild.addEventListener("click",  (e) =>{
//     e.preventDefault()
//     myForm2.classList.add("hidden")
//     myForm1.classList.remove("hidden")
// })
// console.log(forms);
myForm.addEventListener("click", (e) => {
    const currentForm = [...forms].find((form) => !form.classList.contains("hidden"))
    console.log(currentForm);

   if(e.target.tagName === "A"){
    e.preventDefault()
    currentForm.classList.add("hidden")
    if(currentForm.id === "myForm1"){
        myForm3.classList.remove("hidden")
    }
    if(currentForm.id === "myForm3"){
        myForm1.classList.remove("hidden")
    }
    if(currentForm.id === "myForm2"){
        myForm1.classList.remove("hidden")
    }
   }
})


signinBtn.addEventListener("click" , (e) => {
    myForm1.classList.add("hidden")
    myForm2.classList.remove("hidden")
})











//slider banner
const banners = [
    {image : './images/eb341aa3-e8ff-4c53-8031-f7ffebe50b40.webp'},
    {image : './images/banner1.webp'},
    {image : './images/banner2.webp'}
]
const bannerImage = document.querySelector("#home-banner")

window.addEventListener("load" , ((e) => {
    let i = 0
    bannerImage.src = banners[i].image
    setInterval(() => {
            i = (i+1) % banners.length
            bannerImage.src = banners[i].image
        } ,2000)
}))


//slider collection

window.addEventListener("load" , ((e) => {
    setInterval(() => {
        ///چجوری عکسا جابه جا میشن؟؟
    },2000)
}))

const nextBtn = document.querySelector(".navigation-icon-left")
const prevBtn = document.querySelector(".navigation-icon-right")

nextBtn.addEventListener("click", (e) => {
    //
})
prevBtn.addEventListener("click", (e) => {
    //
})



// collection api

let products = [];

async function loadProducts() {
  const res = await fetch("./products.json");
  products = await res.json();

//   console.log("داخل تابع:", products);
  showProducts()
}

loadProducts();
function showProducts() {
    // console.log("بیزون تابع" , products)

    const discountProducts = document.querySelector(".discount-products")
    products.forEach(product => {
        const discountNumber = 10
        let calculatePrice = product.price *(100-discountNumber) / 100
        const newProduct = document.createElement("div")
    newProduct.className = "discount-pro-wrapper"
    newProduct.dataset.id = product.id
    newProduct.innerHTML = `
        <div class="discount-pro-pic">
            <a href=""><img src="${product.imageSrc}" alt=""></a>
        </div>
        <div class="discount-pro-info">
            <span class="before"><del>${product.price}</del></span>
            <span class="after">${calculatePrice} تومان</span>
        </div>
        <div class="discount">${discountNumber}%</div>
        <span class="heart-icon unliked">${product.isFavorite ? "❤️" : "🤍"}</span>
    `
    discountProducts.appendChild(newProduct)

    })
}



// favorite collection
let favProducts = []
function toggleFavorite(productId){
    const sellectedProduct = products.find(product => product.id === productId)
    console.log(sellectedProduct);
    if(!sellectedProduct){
        return
    }
    const isAlreadyFavorit = favProducts.some(product => product.id === productId)
    if(isAlreadyFavorit){
        favProducts = favProducts.filter(product => product.id !== productId)
    }else{
        favProducts.push(sellectedProduct)
    }
    // showProducts()
    console.log(favProducts);
}


document.addEventListener("click", (e) => {
    const heartIcon = e.target.closest(".heart-icon")
    if(!heartIcon){
        return
    }else{

        const heartIcon = e.target
        const proCard = heartIcon.closest(".discount-pro-wrapper")
        const productId = Number(proCard.dataset.id)

        if(heartIcon.classList.contains("unliked")){
            heartIcon.classList.remove("unliked")
            heartIcon.innerHTML = "❤️"
            toggleFavorite(productId);
        }else{
            heartIcon.classList.add("unliked")
            heartIcon.innerHTML = "🤍"
            toggleFavorite(productId);
        }
    }
})


