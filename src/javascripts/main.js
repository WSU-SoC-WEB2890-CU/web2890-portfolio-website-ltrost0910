import { showLoadingScreen, loadFontsAndRemoveLoadingScreen } from "./loading-screen.js"

// Preload images
preloadImages("/LT_Logo.png", "/intro-section-hands-typing-unsplash.webp", "/lindat.jpg")

// Function to preload images
function preloadImages(...images) {
  images.forEach((imageUrl) => {
    const img = new Image()
    img.src = imageUrl

    // img.onload = () => {
    //   console.log(`Image found: ${imageUrl}`)
    // }

    // img.onerror = () => {
    //   console.log(`Image not found: ${imageUrl}`)
    // }
  })
}

// Toggle caching for testing purposes (set this to false to disable caching, true to use caching)
const cacheEnabled = true // Change to `false` to bypass caching, true to use caching

// Async function to inject HTML content with caching
const injectHTML = async (filePath, elementId) => {
  try {
    // Check if caching is enabled
    let cachedContent = null
    if (cacheEnabled) {
      cachedContent = sessionStorage.getItem(filePath) // Look for cached content
    }
    if (!cachedContent) {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}`)
      cachedContent = await response.text()
      sessionStorage.setItem(filePath, cachedContent)
    }
    // Inject the content into the designated element
    const container = document.getElementById(elementId)
    if (container) {
      container.innerHTML = cachedContent
    }
  } catch (error) {
    console.error(`Error injecting ${filePath}:`, error)
  }
}

// Function to set active nav link based on the current path
const setActiveNavLink = () => {
  const currentPage = document.querySelector("div#body-content").getAttribute("page-name")
  //console.log("currentPage=", currentPage)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    //console.log("link=", link)
    const linkId = link.getAttribute("id")
    if (linkId === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Main logic to load content after DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  showLoadingScreen() // do this first
  try {
    // Inject all HTML content concurrently
    await Promise.all([
      injectHTML("../navmenu.html", "navmenu"),
      injectHTML("../hero.html", "hero"),
      injectHTML("../footer.html", "footer"),
    ])
  } catch (error) {
    console.error("Error injecting HTML content:", error)
  } finally {
    setActiveNavLink()
    loadFontsAndRemoveLoadingScreen()
  }
})
