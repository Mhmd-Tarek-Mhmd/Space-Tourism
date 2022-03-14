(function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const Modal = {
    currentPage: "home",
    currentTab: 0,
    data: [],
  };

  const Controller = {
    getCurrentPage: () => Modal.currentPage,
    setCurrentPage: (val) => (Modal.currentPage = val),

    getCurrentTab: () => Modal.currentTab,
    setCurrentTab: (val) => (Modal.currentTab = val),

    setData: (val) => (Modal.data = val),
    getData: () => Modal.data,

    init: async function () {
      const res = await fetch("assets/data.json");
      let data = await res.json();
      this.setData(data);

      RouteViews.init();
      TabsViews.init();
    },
  };

  const RouteViews = {
    init: function () {
      const { setCurrentPage } = Controller;

      this.render();
      $$("nav .links a").forEach((ele) =>
        ele.addEventListener("click", (e) => {
          e.preventDefault();

          // [1] Handle route
          setCurrentPage(e.target.textContent.substr(3));
          this.render();
          TabsViews.init();

          // [2] Handle active class
          $("nav .links a.active").classList.remove("active");
          e.target.classList.add('active');
        })
      );
    },

    render: function () {
      const { getCurrentPage, setCurrentTab } = Controller;

      setCurrentTab(0);
      document.body.dataset.page = getCurrentPage();
      document.title = `Space Tourism - ${
        getCurrentPage()[0].toUpperCase() + getCurrentPage().substr(1)
      }`;

      $("main").innerHTML = Templates["pages"][getCurrentPage()];
      $("main > *").dataset.page = getCurrentPage();
    },
  };

  const TabsViews = {
    init: function () {
      const currentPage = Controller.getCurrentPage();
      const data = Controller.getData()[currentPage];

      if (currentPage !== "home") {
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
      }
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
    pages: {
      home: `
      <div class="container space-between-flex">
        <div class=text>
          <h1> <p class=h5> SO, YOU WANT TO TRAVEL TO</p><span class=h1>SPACE</span></h1>
          <p class=txt>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
        </div>
        <button class="explore center-flex">EXPLORE</button>
      </div>
    `,
      destination: `
      <div class=container>
        <h1 class=h5><span aria-hidden=true>01</span> Pick your destination</h1>
        <div class=tabs></div>
      </div>
    `,
      crew: `
      <div class=container>
        <h1 class=h5><span aria-hidden=true>02</span> Meet your crew</h1>
        <div class=tabs></div>
      </div>
    `,
      technology: `
      <div class=container>
        <h1 class=h5><span aria-hidden=true>03</span> SPACE LAUNCH 101</h1>
      </div>
      <div class=tabs></div>
    `,
    },
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
