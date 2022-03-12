(function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const Modal = {
    currentPage: document.title.substr(16).toLowerCase(),
    currentTab: 0,
    data: [],
  };

  const Controller = {
    getCurrentPage: () => Modal.currentPage,

    getCurrentTab: () => Modal.currentTab,
    setCurrentTab: (val) => (Modal.currentTab = val),

    setData: (val) => (Modal.data = val),
    getData: () => Modal.data,

    init: async function () {
      const res = await fetch("../assets/data.json");
      let data = await res.json();
      this.setData(data);

      Views.init();
    },
  };

  const Views = {
    init: function () {
      const currentPage = Controller.getCurrentPage();
      const data = Controller.getData()[currentPage];

      // [1] Add tabs
      data.forEach((d, i) => {
        $(".tabs").innerHTML += Templates.tab(d, currentPage);
        $$(".tabs .tab")
          [i].querySelectorAll("button")
          [i].classList.add("active");
      });
      $$(".tabs .tab")[Controller.getCurrentTab()].classList.add("active");

      // [2] Handle navigation
      $$(".tab-controls button").forEach((btn) =>
        btn.addEventListener("click", this.render)
      );
    },

    render: function (e) {
      const tabs = $$(".tabs .tab");
      const tabControls = $$(".tab.active .tab-controls button");
      const { getCurrentTab, setCurrentTab } = Controller;

      tabs[getCurrentTab()].classList.remove("active");
      setCurrentTab([...tabControls].indexOf(e.target));
      tabs[getCurrentTab()].classList.add("active");
    },
  };

  const Templates = {
    tab: function (d, currentPage) {
      return `
      <article class=tab>
        ${this.tabPic(d, currentPage)}

        <div class=wrapper>
          <nav class="tab-controls center-flex">
            ${this.tabControls(currentPage)}
          </nav>

          <div class=tab-body>
            ${this.tabsBody(d, currentPage)}        
          </div>
        </div>
      </article>
    `;
    },
    tabPic: (d, currentPage) => `
      <picture class=tab-pic>${
        currentPage === "technology"
          ? `
            <source srcset=${d.images.landscape}  />
            <source srcset=${d.images.portrait} media="(min-width: 1200px)" />
            <img src=${d.images.landscape} alt=${d.name} />            
          `
          : `
            <source srcset=${d.images.webp} type="image/webp" />
            <img src=${d.images.png} alt=${d.name} />
          `
      }</picture>
    `,
    tabControls: (currentPage) => {
      switch (currentPage) {
        case "destination":
          return `${currentPage} - tabControls`;
        case "crew":
          return `${currentPage} - tabControls`;
        case "technology":
          return `${currentPage} - tabControls`;
      }
    },
    tabsBody: (d, currentPage) => {
      switch (currentPage) {
        case "destination":
          return `${currentPage} - tabsBody`;
        case "crew":
          return `${currentPage} - tabsBody`;
        case "technology":
          return `${currentPage} - tabsBody`;
      }
    },
  };

  Controller.init();
})();
