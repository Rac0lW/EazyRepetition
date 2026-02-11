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

    if (item.tags.includes("Learned")) {
      btn.innerText = "Learned";
      btn.disabled = true;
    } else if (item.tags.includes("Learning")) {
      btn.innerText = "Learned";
      btn.disabled = false;
    } else {
      btn.innerText = "Learning";
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
