import "bootstrap"
import { showLoadingScreen, hideLoadingScreen } from "./loading-screen.js"

// Preload images
preloadImages("/LT_Logo.png")

// Function to preload images
function preloadImages(...images) {
  images.forEach((imageUrl) => {
    const img = new Image()
    img.src = imageUrl
  })
}

// Async function to inject HTML content with caching
const injectHTML = async (filePath, elementId) => {
  try {
    let cachedContent = sessionStorage.getItem(filePath)
    if (!cachedContent) {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Failed to fetch ${filePath}`)
      cachedContent = await response.text()
      sessionStorage.setItem(filePath, cachedContent)
    }
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
  const currentPage = document.querySelector("div#body-content")?.getAttribute("page-name")
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("id") === currentPage)
  })
}

// Main logic to load content after everything (including fonts) is ready
window.onload = async () => {
  showLoadingScreen()

  try {
    // Inject all HTML content concurrently
    await Promise.all([
      injectHTML("../navmenu.html", "navmenu"),
      injectHTML("../hero.html", "hero"),
      injectHTML("../footer.html", "footer"),
    ])

    // Wait for all fonts to be fully loaded
    await document.fonts.ready
  } catch (error) {
    console.error("Error loading content:", error)
  } finally {
    setActiveNavLink()
    hideLoadingScreen() // Ensure the loading screen is removed only after fonts are ready
  }
}
