async function triggerUpdateDb() {
  let statusElement = document.getElementById('status');

  try {
    statusElement.innerHTML = `
      <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
        </div>
    `;
    await fetch('http://localhost:3000/update-cards/process', {
      method: 'GET',
    });
    statusElement.innerHTML = `
        <div class="successIntent">
            <h2>Success</h2>
            <p>Neon DB Updated with latest mtg cards</p>
        </div>
      `;
  } catch (error) {
    statusElement.innerHTML = `
            <div class="errorIntent">
                <h2>${{ ...error }}</h2>
            </div>
        `;
  }
}
