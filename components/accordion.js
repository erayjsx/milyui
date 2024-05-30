(function () {
  const accordions = document.querySelectorAll(".accordion");

  const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    const icon = accordion.querySelector(".accordion__intro svg");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
  };

  const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    const icon = accordion.querySelector(".accordion__intro svg");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
    icon.style.transform = "rotate(0deg)";
  };

  accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "28");
    svg.setAttribute("height", "28");
    svg.setAttribute("fill", "#000");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.innerHTML = `<path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>`;

    intro.appendChild(svg);

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach((accordion) => closeAccordion(accordion));
        openAccordion(accordion);
      }
    };

    if (accordion.hasAttribute("is-active")) {
      openAccordion(accordion);
    }
  });
})();
