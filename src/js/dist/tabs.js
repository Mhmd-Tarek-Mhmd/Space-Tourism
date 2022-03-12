!function(){const s=document.querySelector.bind(document),n=document.querySelectorAll.bind(document),a={currentPage:document.title.substr(16).toLowerCase(),currentTab:0,data:[]},r={getCurrentPage:()=>a.currentPage,getCurrentTab:()=>a.currentTab,setCurrentTab:t=>a.currentTab=t,setData:t=>a.data=t,getData:()=>a.data,init:async function(){const t=await fetch("../assets/data.json");var a=await t.json();this.setData(a),e.init()}},e={init:function(){const e=r.getCurrentPage(),t=r.getData()[e];t.forEach((t,a)=>{s(".tabs").innerHTML+=c.tab(t,e),n(".tabs .tab")[a].querySelectorAll("button")[a].classList.add("active")}),n(".tabs .tab")[r.getCurrentTab()].classList.add("active"),n(".tab-controls button").forEach(t=>t.addEventListener("click",this.render))},render:function(t){const a=n(".tabs .tab");var e=n(".tab.active .tab-controls button");const{getCurrentTab:s,setCurrentTab:c}=r;a[s()].classList.remove("active"),c([...e].indexOf(t.target)),a[s()].classList.add("active")}},c={tab:function(t,a){return`
      <article class=tab>
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
    `},tabPic:(t,a)=>`
      <picture class=tab-pic>${"technology"===a?`
            <source srcset=${t.images.landscape}  />
            <source srcset=${t.images.portrait} media="(min-width: 1200px)" />
            <img src=${t.images.landscape} alt=${t.name} />            
          `:`
            <source srcset=${t.images.webp} type="image/webp" />
            <img src=${t.images.png} alt=${t.name} />
          `}</picture>
    `,tabControls:t=>{switch(t){case"destination":case"crew":case"technology":return t+" - tabControls"}},tabsBody:(t,a)=>{switch(a){case"destination":case"crew":case"technology":return a+" - tabsBody"}}};r.init()}();