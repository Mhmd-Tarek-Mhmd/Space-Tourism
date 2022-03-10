function navToggler(e) {
  const links = e.target.nextElementSibling;
  const handleLinks = (handleAria, handleImgSrc) => {
    e.target.ariaLabel = `${handleAria} menu`;
    e.target.firstElementChild.src = `assets/images/nav/icon-${handleImgSrc}.svg`;
  };

  links.classList.toggle("show");
  links.classList.contains("show")
    ? handleLinks("Close", "close")
    : handleLinks("Open", "hamburger");
}
