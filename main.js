eagle.onPluginCreate(async () => {
  setTheme(await eagle.app.theme);
  function log(msg) {
    document.getElementById("log").textContent +=
      "\n" + JSON.stringify(msg, null, 2);
  }

  document.getElementById("btn").on;

  document.getElementById("btn").addEventListener("click", async () => {
    let selected = await eagle.item.getSelected();
    let i = selected[0];

    if (i.tags.includes("Learned")) {
      return;
    }

    // 找到 Learning 的索引
    const learningIndex = i.tags.indexOf("Learning");

    if (learningIndex !== -1) {
      i.tags.splice(learningIndex, 1);
      i.tags.push("Learned");
    } else {
      i.tags.push("Learning");
    }

    await i.save();
  });

  // document
  //     .getElementById("learned")
  //     .addEventListener("click", async () => {
  //         let selected = await eagle.item.getSelected();
  //         let i = selected[0];
  //         const tags = await eagle.tag.get();
  //         const tag = tags.find((t) => t === "Learning");
  //         tag.name = "Learned";
  //         await tag.save();
  //     });
});
function setTheme(theme) {
  // 有些版本返回 "DARK"/"LIGHT"，有些可能是 "dark"/"light"
  document.body.setAttribute("theme", String(theme || "").toUpperCase());
}

eagle.onThemeChanged((theme) => {
  setTheme(theme);
});
