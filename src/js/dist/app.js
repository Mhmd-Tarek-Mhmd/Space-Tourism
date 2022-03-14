!function(){const s=document.querySelector.bind(document),i=document.querySelectorAll.bind(document),e={currentPage:"home",currentTab:0,data:[]},c={getCurrentPage:()=>e.currentPage,setCurrentPage:t=>e.currentPage=t,getCurrentTab:()=>e.currentTab,setCurrentTab:t=>e.currentTab=t,setData:t=>e.data=t,getData:()=>e.data,init:async function(){const t=await fetch("assets/data.json");var e=await t.json();this.setData(e),a.init(),n.init()}},a={init:function(){const e=c["setCurrentPage"];this.render(),i("nav .links a").forEach(t=>t.addEventListener("click",t=>{t.preventDefault(),e(t.target.textContent.substr(3)),this.render(),n.init(),s("nav .links a.active").classList.remove("active"),t.target.classList.add("active")}))},render:function(){const{getCurrentPage:t,setCurrentTab:e}=c;e(0),document.body.dataset.page=t(),document.title="Space Tourism - "+(t()[0].toUpperCase()+t().substr(1)),s("main").innerHTML=r.pages[t()],s("main > *").dataset.page=t()}},n={init:function(){const a=c.getCurrentPage(),t=c.getData()[a];"home"!==a&&(t.forEach((t,e)=>{s(".tabs").innerHTML+=r.tab(t,e,a),i(".tabs .tab")[e].querySelectorAll("button")[e].classList.add("active")}),i(".tab-controls button").forEach(t=>t.addEventListener("click",this.render)))},render:function(t){const e=i(".tabs .tab");var a=i(".tab.active .tab-controls button");const{getCurrentTab:s,setCurrentTab:n}=c;e[s()].classList.remove("active"),n([...a].indexOf(t.target)),e[s()].classList.add("active")}},r={pages:{home:`
      <div class="container space-between-flex">
        <div class=text>
          <h1> <p class=h5> SO, YOU WANT TO TRAVEL TO</p><span class=h1>SPACE</span></h1>
          <p class=txt>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
        </div>
        <button class="explore center-flex">EXPLORE</button>
      </div>
    `,destination:`
      <div class=container>
        <h1 class=h5><span aria-hidden=true>01</span> Pick your destination</h1>
        <div class=tabs></div>
      </div>
    `,crew:`
      <div class=container>
        <h1 class=h5><span aria-hidden=true>02</span> Meet your crew</h1>
        <div class=tabs></div>
      </div>
    `,technology:`
      <div class=container>
        <h1 class=h5><span aria-hidden=true>03</span> SPACE LAUNCH 101</h1>
      </div>
      <div class=tabs></div>
    `},tab:function(t,e,a){return`
      <article ${`class="tab space-between-flex ${0===e?"active":""}"`}>
        ${this.tabPic(t,a)}

        <div class=wrapper>
          <nav class="tab-controls center-flex">
            ${this.tabControls(a)}
          </nav>

          <div class=tab-body>
            ${this.tabsBody(t,a)}        
          </div>
        </div>
      </article>
    `},tabPic:(t,e)=>`
      <picture class=tab-pic>${"technology"===e?`
            <source srcset=${t.images.landscape} media="(max-width: 991px)"  />
            <source srcset=${t.images.portrait} />
            <img src=${t.images.landscape} alt=${t.name} />            
          `:`
            <source srcset=${t.images.webp} type="image/webp" />
            <img src=${t.images.png} alt=${t.name} />
          `}</picture>
    `,tabControls:t=>{const e=c.getData()[t],a=(t,e="")=>`<button ${`aria-label="show ${t} tab"`}>${e}</button>`;switch(t){case"destination":return e.map(t=>a(t.name,t.name.toUpperCase())).join("");case"crew":return e.map(t=>a(t.role)).join("");case"technology":return e.map((t,e)=>a(t.name,e+1)).join("")}},tabsBody:(t,e)=>{switch(e){case"destination":return`
            <h2 class=h2>${t.name.toUpperCase()}</h2>
            <p class=txt>${t.description}</p>
            <div class="info center-flex">
              <div class=distance>
                <h3 class=sub-h2>AVG. DISTANCE</h3>
                <span class=sub-h1>${t.distance.toUpperCase()}</span>
              </div>
              <div class=time>
                <h3 class=sub-h2>EST. TRAVEL TIME</h3>
                <span class=sub-h1>${t.travel.toUpperCase()}</span>
              </div>
            </div>
          `;case"crew":return`
            <h2>
              <span class=h4>${t.role.toUpperCase()}</span>
              <p class=h3>${t.name.toUpperCase()}</p>
            </h2>
            <p class=txt>${t.bio}</p>
          `;case"technology":return`
            <h2>
              <span class=sub-h2>THE TERMINOLOGY…</span>
              <p class=h3>${t.name.toUpperCase()}</p>
            </h2>
            <p class=txt>${t.description}</p>          
        `}}};c.init()}();