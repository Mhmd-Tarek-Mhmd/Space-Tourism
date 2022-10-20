(function () {
  const route = function (e) {
    e.preventDefault();
    const pageName = this.dataset.route;

    // Set current page
    document.body.dataset.page = pageName;
    document.title =
      pageName[0].toUpperCase() + pageName.slice(1) + " - Space Tourism";

    // Toggle nav links aria-current
    document
      .querySelector(".link[aria-current=page]")
      .removeAttribute("aria-current");

    document.querySelector(`.link[data-route=${pageName}]`).ariaCurrent =
      "page";
  };

  document
    .querySelectorAll("[data-route]")
    .forEach((ele) => ele.addEventListener("click", route));
})();
