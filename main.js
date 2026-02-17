eagle.onPluginCreate(async () => {
  setTheme(await eagle.app.theme);
  function log(msg) {
    document.getElementById("log").textContent +=
      "\n" + JSON.stringify(msg, null, 2);
  }

  const btn = document.getElementById("btn");

  async function updateButtonState() {
    const selected = await eagle.item.getSelected();
    if (selected.length === 0) return;
    const item = selected[0];

    const baseClass =
      "w-full h-8 rounded text-sm font-medium flex items-center justify-center transition-colors duration-200 focus:outline-none";

    // SVG Icons
    const checkIcon = `<svg class="w-3.5 h-3.5 mr-2 fill-current opacity-75" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>`;
    const bookIcon = `<svg class="w-3.5 h-3.5 mr-2 fill-current opacity-75" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>`;

    if (item.tags.includes("Learned")) {
      btn.className = `${baseClass} bg-transparent text-gray-500 cursor-default`;
      btn.innerHTML = `${checkIcon}Learned`;
      btn.disabled = true;
    } else if (item.tags.includes("Learning")) {
      // Currently learning, button allows marking as Learned
      btn.className = `${baseClass} bg-gray-700 hover:bg-gray-600 text-gray-200`;
      btn.innerHTML = `${checkIcon}Learned`;
      btn.disabled = false;
    } else {
      // Not learning, button allows marking as Learning
      btn.className = `${baseClass} bg-gray-700 hover:bg-gray-600 text-gray-200`;
      btn.innerHTML = `${bookIcon}Learning`;
      btn.disabled = false;
    }
  }

  // Check state on startup
  await updateButtonState();

  btn.addEventListener("click", async () => {
    let selected = await eagle.item.getSelected();
    let i = selected[0];

    if (i.tags.includes("Learned")) {
      return;
    }

    const learningIndex = i.tags.indexOf("Learning");

    if (learningIndex !== -1) {
      i.tags.splice(learningIndex, 1);
      i.tags.push("Learned");
    } else {
      i.tags.push("Learning");
    }

    await i.save();
    await updateButtonState();
  });
});

function setTheme(theme) {
  // 有些版本返回 "DARK"/"LIGHT"，有些可能是 "dark"/"light"
  document.body.setAttribute("theme", String(theme || "").toUpperCase());
}

eagle.onThemeChanged((theme) => {
  setTheme(theme);
});
