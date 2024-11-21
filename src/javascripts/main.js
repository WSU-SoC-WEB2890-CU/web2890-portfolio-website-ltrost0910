import "bootstrap"
import { showLoadingScreen, removeLoadingScreen } from "./loading-screen.js"

// Preload images
preloadImages("/LT_Logo.png")

// Function to preload images
function preloadImages(...images) {
  images.forEach((imageUrl) => {
    const img = new Image()
    img.src = imageUrl
  })
}

// Async function to inject HTML content
const injectHTML = async (filePath, elementId) => {
  try {
    const response = await fetch(filePath)
    if (!response.ok) throw new Error(`Failed to fetch ${filePath}`)
    const content = await response.text()

    // Inject the content into the designated element
    const container = document.getElementById(elementId)
    if (container) {
      container.innerHTML = content
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

// Function to handle anchor scrolling
const scrollToAnchor = () => {
  const hash = window.location.hash
  if (hash) {
    const scrollToTarget = () => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Try immediately, but also observe for dynamically loaded content
    scrollToTarget()

    // Observe for when the content gets injected
    const observer = new MutationObserver(() => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        observer.disconnect() // Stop observing once we find the target
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }
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
    scrollToAnchor() // Scroll to the anchor after everything is injected
    removeLoadingScreen()
  }
})
