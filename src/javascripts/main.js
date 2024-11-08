import "bootstrap"
import { showLoadingScreen, loadFontsAndRemoveLoadingScreen } from "./loading-screen.js"

// Preload images
preloadImages("/LT_Logo.png", "/intro-section-hands-typing-unsplash.webp", "/lindat.jpg")

// Function to inject HTML content
document.addEventListener("DOMContentLoaded", function () {
  // Show the loading screen once the DOM is loaded
  showLoadingScreen()

  // Check if the navmenu script element exists and get the currentPage value
  let currentPage = null
  const navmenuElem = document.querySelector("script#js_navmenu")
  if (navmenuElem) {
    currentPage = navmenuElem.getAttribute("page-name")
  }

  // Function to inject HTML content and return a promise
  const injectHTML = (filePath, elementId) => {
    return fetch(filePath)
      .then((res) => res.text())
      .then((text) => {
        let oldelem = document.querySelector(`script#${elementId}`)
        let newelem = document.createElement("div")
        newelem.innerHTML = text
        oldelem.parentNode.replaceChild(newelem, oldelem)
        return text // Return text for possible chaining
      })
  }

  // Create an array of promises for the HTML injections
  const htmlPromises = [
    injectHTML("../navmenu.html", "js_navmenu"),
    injectHTML("../hero.html", "js_hero"),
    injectHTML("../footer.html", "js_footer"),
  ]

  // Wait for all HTML content to be injected
  Promise.all(htmlPromises)
    .then(() => {
      // Once the content is injected, set the active nav link if currentPage is available
      if (currentPage) {
        setActiveNavLinkFromVar(currentPage)
      }

      // Once the content is injected, load fonts and remove the loading screen
      loadFontsAndRemoveLoadingScreen()
    })
    .catch((error) => {
      console.error("Error injecting HTML content:", error)
      loadFontsAndRemoveLoadingScreen() // Proceed even if there's an error with content injection
    })
})

// Preload images function
function preloadImages(...images) {
  images.forEach((imageUrl) => {
    const img = new Image()
    img.src = imageUrl
  })
}

// Set active class on nav menu
function setActiveNavLinkFromVar(currentPage) {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link") // Select all nav links
  navLinks.forEach((link) => {
    const linkId = link.getAttribute("id")
    if (linkId === currentPage) {
      link.classList.add("active") // Set active class if it matches the current page
    } else {
      link.classList.remove("active") // Remove active class from other links
    }
  })
}
