(function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  function handleClick() {
    const activeTab = this.parentElement.querySelector("[aria-selected=true]");

    // [1] Handle tabs
    activeTab.setAttribute("aria-selected", "false");
    this.setAttribute("aria-selected", "true");

    // [2] Handle Panels
    $$(`[data-panel=${activeTab.dataset.tab}]`).forEach((ele, i) => {
      ele.setAttribute("hidden", "");
      $$(`[data-panel=${this.dataset.tab}]`)[i].removeAttribute("hidden");
    });
  }

  $$("[role=tab]").forEach((tab) => tab.addEventListener("click", handleClick));
})();
