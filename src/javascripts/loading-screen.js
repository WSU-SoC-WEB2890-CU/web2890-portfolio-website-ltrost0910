import FontFaceObserver from "fontfaceobserver"

// Preload images
preloadImages("/LT_Logo.png")

// Function to preload images
function preloadImages(...images) {
  images.forEach((imageUrl) => {
    const img = new Image()
    img.src = imageUrl
  })
}

// Define the loading screen HTML as a string
const loadingScreenHTML = `
  <div id="loading-screen">
    <div class="spinner-container">
      <img src="/LT_Logo.png" alt="Logo" class="spinnerlogo" />
      <div class="spinner"></div>
    </div>
    Loading
  </div>
`

// Function to inject the loading screen into the DOM
export function showLoadingScreen() {
  document.body.insertAdjacentHTML("afterbegin", loadingScreenHTML)
  document.body.classList.add("loading") // Ensure body is in 'loading' state
}

// Function to remove the loading screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.remove()
  }
}

// Function to handle font loading with FontFaceObserver
export function loadFontsAndRemoveLoadingScreen() {
  const poppins = new FontFaceObserver("Poppins")
  const montserrat = new FontFaceObserver("Montserrat")
  const cinzel = new FontFaceObserver("Cinzel")
  const cinzelDecorative = new FontFaceObserver("Cinzel Decorative")

  Promise.all([poppins.load(), montserrat.load(), cinzel.load(), cinzelDecorative.load()])
    .then(() => {
      document.body.classList.remove("loading")
      hideLoadingScreen() // Remove the loading screen after fonts are loaded
    })
    .catch((error) => {
      console.error("Font loading failed:", error)
      hideLoadingScreen() // Ensure the loading screen is removed even if fonts fail
    })
}
