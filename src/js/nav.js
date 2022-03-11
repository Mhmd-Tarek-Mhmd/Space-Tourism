function navToggler(e) {
  const links = e.target.nextElementSibling;
  const handleLinks = (handleAria, handleImgSrc) => {
    let path =
      document.title.substr(16) === "Home"
        ? "assets/images/nav/"
        : "../assets/images/nav/";
    e.target.ariaLabel = `${handleAria} menu`;
    e.target.firstElementChild.src = `${path}icon-${handleImgSrc}.svg`;
  };

  links.classList.toggle("show");
  links.classList.contains("show")
    ? handleLinks("Close", "close")
    : handleLinks("Open", "hamburger");
}
