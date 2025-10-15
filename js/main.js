const navContainer = document.querySelector(".nav_links");
const navToggle = document.querySelector(".nav_toggle");

navToggle.addEventListener("click", () => {
    navContainer.style.display = navContainer.style.display === "flex" ? "none" : "flex";
})