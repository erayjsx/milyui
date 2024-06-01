document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    button.addEventListener("click", () => {
      if (dropdown.classList.contains("show")) {
        dropdownContent.style.opacity = 0;
        setTimeout(() => {
          dropdown.classList.remove("show");
        }, 500);
      } else {
        dropdown.classList.add("show");
        setTimeout(() => {
          dropdownContent.style.opacity = 1;
        }, 10);
      }
    });

    window.addEventListener("click", (event) => {
      if (!event.target.matches("button")) {
        if (dropdown.classList.contains("show")) {
          dropdownContent.style.opacity = 0;
          setTimeout(() => {
            dropdown.classList.remove("show");
          }, 500);
        }
      }
    });
  });

  class Dropdown {
    constructor(containerId, buttonLabel, items) {
      this.container = document.getElementById(containerId);
      this.buttonLabel = buttonLabel;
      this.items = items;
      this.render();
    }

    render() {
      this.dropdownDiv = document.createElement("div");
      this.dropdownDiv.className = "dropdown";

      const button = document.createElement("button");
      button.textContent = this.buttonLabel;

      this.dropdownContent = document.createElement("div");
      this.dropdownContent.className = "dropdown-content";

      this.items.forEach((item) => {
        const a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        this.dropdownContent.appendChild(a);
      });

      this.dropdownDiv.appendChild(button);
      this.dropdownDiv.appendChild(this.dropdownContent);
      this.container.appendChild(this.dropdownDiv);

      button.addEventListener("click", () => {
        this.toggleDropdown();
      });

      window.addEventListener("click", (event) => {
        if (!event.target.matches(`#${this.container.id} button`)) {
          if (this.dropdownDiv.classList.contains("show")) {
            this.dropdownContent.style.opacity = 0;
            setTimeout(() => {
              this.dropdownDiv.classList.remove("show");
            }, 500);
          }
        }
      });
    }

    toggleDropdown() {
      if (this.dropdownDiv.classList.contains("show")) {
        this.dropdownContent.style.opacity = 0;
        setTimeout(() => {
          this.dropdownDiv.classList.remove("show");
        }, 500);
      } else {
        this.dropdownDiv.classList.add("show");
        setTimeout(() => {
          this.dropdownContent.style.opacity = 1;
        }, 10);
      }
    }
  }

  window.Dropdown = Dropdown;
});
