!function(){function t(e){e.preventDefault();const t=this.dataset.route;document.body.dataset.page=t,document.title=t[0].toUpperCase()+t.slice(1)+" - Space Tourism",document.querySelector(".link[aria-current=page]").removeAttribute("aria-current"),document.querySelector(`.link[data-route=${t}]`).ariaCurrent="page"}document.querySelectorAll("[data-route]").forEach(e=>e.addEventListener("click",t))}();