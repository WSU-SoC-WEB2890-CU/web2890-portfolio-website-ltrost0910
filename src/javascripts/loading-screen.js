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

// Function to show the loading screen
export function showLoadingScreen() {
  document.body.insertAdjacentHTML("afterbegin", loadingScreenHTML)
  document.body.classList.add("loading")
}

// Function to hide the loading screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    loadingScreen.remove()
  }
  document.body.classList.remove("loading")
}
