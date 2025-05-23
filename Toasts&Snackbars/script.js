const toastContainer = document.getElementById("toastContainer");
const snackbar = document.getElementById("snackbar");
const snackbarMessage = document.getElementById("snackbarMessage");
const snackbarIcon = document.getElementById("snackbarIcon");
const snackbarAction = document.getElementById("snackbarAction");

// Toast notification templates
const toastTemplates = {
  success: {
    icon: "✓",
    title: "Success!",
    message: "Operation completed successfully",
  },
  error: {
    icon: "✕",
    title: "Error",
    message: "Something went wrong",
  },
  warning: {
    icon: "⚠",
    title: "Warning",
    message: "Please check your input",
  },
  info: {
    icon: "ℹ",
    title: "Info",
    message: "Here's some helpful information",
  },
};

// Breakfast toast messages
const breakfastToasts = {
  avocado: {
    icon: "🥑",
    title: "Avocado Toast Ready!",
    message:
      "Your healthy avocado toast is perfectly prepared with a sprinkle of salt and pepper",
  },
  butter: {
    icon: "🧈",
    title: "Classic Butter Toast",
    message:
      "Simple perfection - golden brown toast with creamy butter melting on top",
  },
  jam: {
    icon: "🍓",
    title: "Strawberry Jam Toast",
    message: "Sweet and fruity strawberry jam spread on warm, crispy toast",
  },
  honey: {
    icon: "🍯",
    title: "Honey Toast Delight",
    message:
      "Golden honey drizzled over perfectly toasted bread - nature's sweetness",
  },
  peanut: {
    icon: "🥜",
    title: "Peanut Butter Power",
    message: "Protein-packed peanut butter toast to fuel your day",
  },
  cinnamon: {
    icon: "✨",
    title: "Cinnamon Toast Magic",
    message:
      "Warm cinnamon and sugar sprinkled on buttery toast - childhood memories!",
  },
};

let toastCounter = 0;

function createToast(type, template, duration = 5000) {
  const toast = document.createElement("div");
  toast.className = `toast-notification ${type}`;
  toast.id = `toast-${++toastCounter}`;

  toast.innerHTML = `
        <div class="toast-header">
          <div class="toast-icon ${type}">${template.icon}</div>
          <div class="toast-title">${template.title}</div>
          <button class="close-btn" onclick="closeToast('${toast.id}')">&times;</button>
        </div>
        <div class="toast-message">${template.message}</div>
      `;

  toastContainer.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    closeToast(toast.id);
  }, duration);

  return toast;
}

function closeToast(toastId) {
  const toast = document.getElementById(toastId);
  if (toast) {
    toast.style.animation = "slideOut 0.5s ease forwards";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 500);
  }
}

function showSnackbar(
  message,
  icon = "📱",
  actionText = "UNDO",
  duration = 4000
) {
  snackbarMessage.textContent = message;
  snackbarIcon.textContent = icon;
  snackbarAction.textContent = actionText;

  snackbar.classList.add("show");

  setTimeout(() => {
    snackbar.classList.remove("show");
  }, duration);
}

// Event listeners for UI notification buttons
document.querySelectorAll(".btn[data-type]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    const template = toastTemplates[type];
    createToast(type, template);
  });
});

// Event listeners for breakfast toasts
document.querySelectorAll(".toast-item").forEach((item) => {
  item.addEventListener("click", () => {
    const toastType = item.getAttribute("data-toast");
    const template = breakfastToasts[toastType];

    // Add click animation
    item.style.transform = "scale(0.95)";
    setTimeout(() => {
      item.style.transform = "";
    }, 150);

    createToast("success", template, 6000);
  });

  // Add hover effects
  item.addEventListener("mouseenter", () => {
    const emoji = item.querySelector(".toast-emoji");
    emoji.style.transform = "scale(1.2) rotate(10deg)";
  });

  item.addEventListener("mouseleave", () => {
    const emoji = item.querySelector(".toast-emoji");
    emoji.style.transform = "";
  });
});

// Snackbar button
document.getElementById("snackbarBtn").addEventListener("click", () => {
  const messages = [
    "File saved successfully!",
    "Settings updated",
    "Connection restored",
    "Data synchronized",
    "Toast is ready to eat! 🍞",
  ];
  const icons = ["💾", "⚙️", "🔗", "🔄", "🍞"];
  const randomIndex = Math.floor(Math.random() * messages.length);

  showSnackbar(messages[randomIndex], icons[randomIndex]);
});

// Multiple toasts button
document.getElementById("multiToastBtn").addEventListener("click", () => {
  const types = ["success", "info", "warning"];
  const messages = [
    "First toast notification",
    "Second toast appearing",
    "Third toast in sequence",
  ];

  types.forEach((type, index) => {
    setTimeout(() => {
      const template = {
        ...toastTemplates[type],
        message: messages[index],
      };
      createToast(type, template);
    }, index * 500);
  });
});

// Snackbar action button
snackbarAction.addEventListener("click", () => {
  snackbar.classList.remove("show");
  createToast("info", {
    icon: "↩️",
    title: "Action Undone",
    message: "Your last action has been reversed",
  });
});

// Show welcome toast on load
setTimeout(() => {
  createToast(
    "info",
    {
      icon: "👋",
      title: "Welcome to Toasts & Snackbars!",
      message: "Click on breakfast toasts or try the notification buttons",
    },
    7000
  );
}, 1000);

// Add some ambient animations
setInterval(() => {
  const toastItems = document.querySelectorAll(".toast-item");
  if (toastItems.length > 0 && Math.random() < 0.1) {
    const randomItem =
      toastItems[Math.floor(Math.random() * toastItems.length)];
    const emoji = randomItem.querySelector(".toast-emoji");
    emoji.style.transform = "scale(1.1)";
    setTimeout(() => {
      emoji.style.transform = "";
    }, 500);
  }
}, 3000);
