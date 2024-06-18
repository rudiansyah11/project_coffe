// Toggle class active for humburger
const navbarNav = document.querySelector(".navbar-nav");

// ketika humburger diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// close navbar
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Toggle class active for search
const searchBtn = document.querySelector("#search-btn");
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-btn").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

document.addEventListener("click", function (e) {
  if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// Toggle class active for shopping cart
const scBtn = document.querySelector("#shopping-cart-btn");
const scForm = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-btn").onclick = (e) => {
  scForm.classList.toggle("active");
  e.preventDefault();
};

document.addEventListener("click", function (e) {
  if (!scBtn.contains(e.target) && !scForm.contains(e.target)) {
    scForm.classList.remove("active");
  }
});

// show modal detail
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailBtns = document.querySelectorAll(".item-detail-button");

itemDetailBtns.forEach((btns) => {
  btns.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
