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

// Combined function to remove the loading screen
export function removeLoadingScreen() {
  // Remove the 'loading' class from the body
  document.body.classList.remove("loading")

  // Remove the loading screen element from the DOM
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.remove()
  }
}
