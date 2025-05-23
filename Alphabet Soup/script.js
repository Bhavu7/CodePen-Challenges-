const messyRecipe = document.getElementById("messyRecipe");
const formattedRecipe = document.getElementById("formattedRecipe");
const alphabetDisplay = document.getElementById("alphabetDisplay");
const floatingLetters = document.getElementById("floatingLetters");
const formatBtn = document.getElementById("formatBtn");
const scrambleBtn = document.getElementById("scrambleBtn");
const extractBtn = document.getElementById("extractBtn");
const timerDisplay = document.getElementById("timerDisplay");
const progressCircle = document.getElementById("progressCircle");

let timer = 0;
let timerInterval;

const originalText = messyRecipe.textContent;

function createFloatingLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter = document.createElement("div");
  letter.className = "letter";
  letter.textContent = letters[Math.floor(Math.random() * letters.length)];
  letter.style.left = Math.random() * 100 + "%";
  letter.style.animationDelay = Math.random() * 2 + "s";
  letter.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";

  const colors = ["#e17055", "#74b9ff", "#00b894", "#fdcb6e", "#fd79a8"];
  letter.style.color = colors[Math.floor(Math.random() * colors.length)] + "99";

  floatingLetters.appendChild(letter);

  setTimeout(() => {
    if (letter.parentNode) {
      letter.parentNode.removeChild(letter);
    }
  }, 15000);
}

function startFloatingLetters() {
  setInterval(createFloatingLetter, 800);
}

function formatRecipe() {
  const text = messyRecipe.textContent;

  // Extract title
  const titleMatch = text.match(/^([A-Z\s]+)/);
  const title = titleMatch ? titleMatch[1].trim() : "ALPHABET SOUP";

  // Extract ingredients (looking for measurements and ingredients)
  const ingredientMatches = text.match(
    /(\d+\s*(?:tablespoons?|cups?|teaspoons?|can|oz|large|cloves?)\s+[^0-9]+?)(?=\d+|INSTRUCTIONS|$)/gi
  );
  const ingredients = ingredientMatches || [
    "2 tablespoons olive oil",
    "1 large onion, diced",
    "2 carrots, diced",
    "2 celery stalks, diced",
    "3 cloves garlic, minced",
    "8 cups chicken broth",
    "1 can (14.5 oz) diced tomatoes",
    "1 cup alphabet pasta",
    "2 cups cooked chicken, shredded",
    "1 teaspoon dried oregano",
    "1 teaspoon dried basil",
    "Salt and pepper to taste",
    "2 tablespoons fresh parsley, chopped",
  ];

  // Extract instructions
  const instructionsText = text.substring(
    text.indexOf("INSTRUCTIONS") + "INSTRUCTIONS".length
  );
  const instructionSteps = instructionsText
    .split(/(?=heat|add|bring|cook|stir|serve|season)/i)
    .filter((step) => step.trim().length > 10)
    .map((step) =>
      step
        .trim()
        .replace(/^\w+/, (word) => word.charAt(0).toUpperCase() + word.slice(1))
    );

  const formattedHTML = `
        <h2 class="recipe-title">${title}</h2>
        
        <div class="recipe-section">
          <h3>🥕 Ingredients</h3>
          <ul class="ingredients-list">
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
          </ul>
        </div>

        <div class="recipe-section">
          <h3>👩‍🍳 Instructions</h3>
          <ol class="instructions-list">
            ${instructionSteps.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </div>

        <div class="recipe-section">
          <h3>📊 Recipe Info</h3>
          <p><strong>Serves:</strong> 6 people</p>
          <p><strong>Prep Time:</strong> 15 minutes</p>
          <p><strong>Cook Time:</strong> 25 minutes</p>
          <p><strong>Total Time:</strong> 40 minutes</p>
        </div>
      `;

  formattedRecipe.innerHTML = formattedHTML;
  formattedRecipe.classList.add("show");

  // Animate ingredients and instructions
  setTimeout(() => {
    const ingredients = document.querySelectorAll(".ingredients-list li");
    const instructions = document.querySelectorAll(".instructions-list li");

    ingredients.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationDelay = "0s";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 100);
    });

    instructions.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationDelay = "0s";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, ingredients.length * 100 + index * 150);
    });
  }, 500);

  startCookingTimer();
}

function scrambleText() {
  const text = originalText;
  const words = text.split(" ");

  let scrambledText = "";
  let wordIndex = 0;

  const scrambleInterval = setInterval(() => {
    if (wordIndex < words.length) {
      const word = words[wordIndex];
      const scrambledWord = word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
      scrambledText += scrambledWord + " ";
      messyRecipe.textContent = scrambledText + "...";
      wordIndex++;
    } else {
      clearInterval(scrambleInterval);
      setTimeout(() => {
        messyRecipe.textContent = originalText;
      }, 1000);
    }
  }, 50);
}

function extractAlphabet() {
  const text = messyRecipe.textContent.toUpperCase();
  const uniqueLetters = [...new Set(text.match(/[A-Z]/g))].sort();

  alphabetDisplay.innerHTML = "";

  uniqueLetters.forEach((letter, index) => {
    setTimeout(() => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "alphabet-letter";
      letterSpan.textContent = letter;
      letterSpan.style.animationDelay = index * 0.1 + "s";
      alphabetDisplay.appendChild(letterSpan);
    }, index * 100);
  });

  setTimeout(() => {
    alphabetDisplay.innerHTML += `<p style="font-size: 1rem; color: #6c757d; margin-top: 10px;">Found ${uniqueLetters.length} unique letters!</p>`;
  }, uniqueLetters.length * 100 + 500);
}

function startCookingTimer() {
  timer = 0;
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    // Update progress circle
    const progress = (timer / 40) * 360; // 40 minutes total
    progressCircle.style.background = `conic-gradient(#74b9ff ${progress}deg, #ddd ${progress}deg)`;

    if (timer >= 40 * 60) {
      // 40 minutes
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Event listeners
formatBtn.addEventListener("click", formatRecipe);
scrambleBtn.addEventListener("click", scrambleText);
extractBtn.addEventListener("click", extractAlphabet);

// Start floating letters animation
startFloatingLetters();

// Show initial floating letters
for (let i = 0; i < 5; i++) {
  setTimeout(createFloatingLetter, i * 200);
}

// Welcome message
setTimeout(() => {
  alphabetDisplay.innerHTML =
    '<p style="font-size: 1.2rem; color: #e17055;">🍲 Welcome to Alphabet Soup! Try the buttons above to transform the recipe.</p>';
}, 2000);
