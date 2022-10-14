function navToggler(e) {
  const rootStyle = document.documentElement.style;
  const links = e.target.nextElementSibling;

  const handleToggle = (ariaLabel, iconName) => {
    rootStyle.overflow = ariaLabel === "Close" ? "hidden" : "initial";
    e.target.ariaLabel = `${ariaLabel} menu`;
    e.target.firstElementChild.src = `assets/images/nav/icon-${iconName}.svg`;
  };

  links.classList.toggle("show");
  links.classList.contains("show")
    ? handleToggle("Close", "close")
    : handleToggle("Open", "hamburger");
}
