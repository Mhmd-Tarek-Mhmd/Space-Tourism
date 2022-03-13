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
        $(".tabs").innerHTML += Templates.tab(d, i, currentPage);
        $$(".tabs .tab")
          [i].querySelectorAll("button")
          [i].classList.add("active");
      });

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
    tab: function (d, i, currentPage) {
      return `
      <article ${`class="tab space-between-flex ${i === 0 ? "active" : ""}"`}>
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
            <source srcset=${d.images.landscape} media="(max-width: 991px)"  />
            <source srcset=${d.images.portrait} />
            <img src=${d.images.landscape} alt=${d.name} />            
          `
          : `
            <source srcset=${d.images.webp} type="image/webp" />
            <img src=${d.images.png} alt=${d.name} />
          `
      }</picture>
    `,
    tabControls: (currentPage) => {
      const data = Controller.getData()[currentPage];
      const addBtn = (aria, content = "") =>
        `<button ${`aria-label="show ${aria} tab"`}>${content}</button>`;

      switch (currentPage) {
        case "destination":
          return data.map((d) => addBtn(d.name, d.name.toUpperCase())).join("");
        case "crew":
          return data.map((d) => addBtn(d.role)).join("");
        case "technology":
          return data.map((d, i) => addBtn(d.name, i + 1)).join("");
      }
    },
    tabsBody: (d, currentPage) => {
      switch (currentPage) {
        case "destination":
          return `
            <h2 class=h2>${d.name.toUpperCase()}</h2>
            <p class=txt>${d.description}</p>
            <div class="info center-flex">
              <div class=distance>
                <h3 class=sub-h2>AVG. DISTANCE</h3>
                <span class=sub-h1>${d.distance.toUpperCase()}</span>
              </div>
              <div class=time>
                <h3 class=sub-h2>EST. TRAVEL TIME</h3>
                <span class=sub-h1>${d.travel.toUpperCase()}</span>
              </div>
            </div>
          `;
        case "crew":
          return `
            <h2>
              <span class=h4>${d.role.toUpperCase()}</span>
              <p class=h3>${d.name.toUpperCase()}</p>
            </h2>
            <p class=txt>${d.bio}</p>
          `;
        case "technology":
          return `
            <h2>
              <span class=sub-h2>THE TERMINOLOGY…</span>
              <p class=h3>${d.name.toUpperCase()}</p>
            </h2>
            <p class=txt>${d.description}</p>          
        `;
      }
    },
  };

  Controller.init();
})();
