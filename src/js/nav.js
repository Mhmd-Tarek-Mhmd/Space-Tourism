function navToggler(e) {
  const links = e.target.nextElementSibling;
  const handleLinks = (ariaLabel, iconName) => {
    e.target.ariaLabel = `${ariaLabel} menu`;
    e.target.firstElementChild.src = `assets/images/nav/icon-${iconName}.svg`;
  };

  links.classList.toggle("show");
  links.classList.contains("show")
    ? handleLinks("Close", "close")
    : handleLinks("Open", "hamburger");
}
