const foodItems = document.querySelectorAll(".food-item");
const cookingStatus = document.getElementById("cookingStatus");
const cookingTitle = document.getElementById("cookingTitle");
const cookingMessage = document.getElementById("cookingMessage");
const progressBar = document.getElementById("progressBar");
const emberEffects = document.getElementById("emberEffects");

const cookingMessages = {
  burger: {
    title: "🍔 Grilling your burger...",
    messages: [
      "Forming the perfect patty...",
      "Seasoning with love...",
      "Searing those beautiful grill marks...",
      "Adding the finishing touches...",
      "Ready to serve! 🎉",
    ],
  },
  hotdog: {
    title: "🌭 Cooking your hot dog...",
    messages: [
      "Selecting the finest frankfurter...",
      "Heating up the grill...",
      "Creating those perfect char marks...",
      "Almost ready...",
      "Hot and ready! 🎉",
    ],
  },
  kebab: {
    title: "🍢 Preparing your kebabs...",
    messages: [
      "Marinating the meat...",
      "Threading onto skewers...",
      "Grilling each side evenly...",
      "Checking for doneness...",
      "Perfectly grilled! 🎉",
    ],
  },
  steak: {
    title: "🥩 Grilling your steak...",
    messages: [
      "Selecting premium cut...",
      "Seasoning with herbs...",
      "Searing at high heat...",
      "Achieving perfect temperature...",
      "Steakhouse quality! 🎉",
    ],
  },
  chicken: {
    title: "🍗 BBQ chicken cooking...",
    messages: [
      "Preparing the drumsticks...",
      "Applying BBQ sauce...",
      "Slow cooking for tenderness...",
      "Caramelizing the glaze...",
      "Finger-licking good! 🎉",
    ],
  },
  corn: {
    title: "🌽 Grilling your corn...",
    messages: [
      "Husking fresh corn...",
      "Brushing with herb butter...",
      "Rotating for even cooking...",
      "Caramelizing the kernels...",
      "Sweet perfection! 🎉",
    ],
  },
};

function createEmber() {
  const ember = document.createElement("div");
  ember.className = "ember";
  ember.style.left = Math.random() * window.innerWidth + "px";
  ember.style.top = window.innerHeight + "px";
  ember.style.animationDelay = Math.random() * 2 + "s";
  emberEffects.appendChild(ember);

  setTimeout(() => {
    ember.remove();
  }, 3000);
}

function startEmberEffect() {
  const emberInterval = setInterval(() => {
    createEmber();
  }, 200);

  setTimeout(() => {
    clearInterval(emberInterval);
  }, 5000);
}

function showCookingAnimation(foodType) {
  const cooking = cookingMessages[foodType];
  let messageIndex = 0;

  cookingTitle.textContent = cooking.title;
  cookingMessage.textContent = cooking.messages[0];
  cookingStatus.classList.add("show");
  progressBar.style.width = "0%";

  startEmberEffect();

  const interval = setInterval(() => {
    const progress = (messageIndex + 1) * 20;
    progressBar.style.width = progress + "%";

    if (messageIndex < cooking.messages.length - 1) {
      messageIndex++;
      cookingMessage.textContent = cooking.messages[messageIndex];
    } else {
      clearInterval(interval);
      setTimeout(() => {
        cookingStatus.classList.remove("show");
      }, 1500);
    }
  }, 1000);
}

foodItems.forEach((item) => {
  item.addEventListener("click", () => {
    const foodType = item.getAttribute("data-food");

    // Add sizzle effect
    item.style.transform = "scale(0.95)";
    setTimeout(() => {
      item.style.transform = "";
    }, 150);

    showCookingAnimation(foodType);
  });

  // Add hover sound effect simulation
  item.addEventListener("mouseenter", () => {
    item.querySelector(".food-icon").style.transform =
      "scale(1.2) rotate(5deg)";
  });

  item.addEventListener("mouseleave", () => {
    item.querySelector(".food-icon").style.transform = "";
  });
});

// Create ambient embers occasionally
setInterval(() => {
  if (Math.random() < 0.3) {
    createEmber();
  }
}, 2000);

// Add some initial embers
setTimeout(() => {
  for (let i = 0; i < 3; i++) {
    setTimeout(createEmber, i * 500);
  }
}, 1000);
