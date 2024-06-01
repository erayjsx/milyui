class Breadcrumb {
  constructor(containerId, items) {
    this.container = document.getElementById(containerId);
    this.items = items;
    this.render();
  }

  render() {
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "breadcrumb");

    const ol = document.createElement("ol");
    ol.className = "breadcrumb";

    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "breadcrumb-item";

      if (item.isActive) {
        li.classList.add("active");
        li.setAttribute("aria-current", "page");
        li.textContent = item.label;
      } else {
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        li.appendChild(a);
      }

      ol.appendChild(li);
    });

    nav.appendChild(ol);
    this.container.appendChild(nav);
  }
}
