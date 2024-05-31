const modal = (() => {
  var publicAPIs = {};
  var settings = {
    speedOpen: 50,
    speedClose: 250,
    toggleClass: "hidden",
    selectorTarget: "[data-modal-target]",
    selectorTrigger: "[data-modal-trigger]",
    selectorClose: "[data-modal-close]",
    selectorOverlay: "[data-modal-overlay]",
    selectorWrapper: "[data-modal-wrapper]",
    selectorInputFocus: "[data-modal-input-focus]",
  };

  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }

  function trapFocus(element) {
    var focusableEls = element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    element.addEventListener("keydown", function (e) {
      var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }

  var toggleccessibility = function (event) {
    if (event.getAttribute("aria-expanded") === "true") {
      event.setAttribute("aria-expanded", false);
    } else {
      event.setAttribute("aria-expanded", true);
    }
  };

  var openModal = function (event, destination) {
    var target = destination;

    if (typeof event === "string") {
      target = document.getElementById(event);
      if (target) {
        target.setAttribute("data-auto-trigger", "");
      }
    }

    if (!target) return;

    var overlay = target.querySelector(settings.selectorOverlay),
      wrapper = target.querySelector(settings.selectorWrapper),
      input = target.querySelector(settings.selectorInputFocus);

    target.classList.remove(settings.toggleClass);

    document.documentElement.style.overflow = "hidden";

    if (typeof event !== "string") {
      toggleccessibility(event);
    }

    setTimeout(function () {
      if (overlay) {
        var overlayIn = overlay.getAttribute("data-class-in").split(" "),
          overlayOut = overlay.getAttribute("data-class-out").split(" ");
        overlay.classList.remove(...overlayOut);
        overlay.classList.add(...overlayIn);
      }

      if (wrapper) {
        var wrapperIn = wrapper.getAttribute("data-class-in").split(" "),
          wrapperOut = wrapper.getAttribute("data-class-out").split(" ");
        wrapper.classList.remove(...wrapperOut);
        wrapper.classList.add(...wrapperIn);
      }

      if (input) {
        input.focus();
      }

      trapFocus(target);
    }, settings.speedOpen);
  };

  var closeModal = function (event) {
    var closestParent = event.closest(settings.selectorTarget),
      trigger = document.querySelector(
        '[aria-controls="' + closestParent.id + '"'
      ),
      overlay = closestParent.querySelector(settings.selectorOverlay),
      wrapper = closestParent.querySelector(settings.selectorWrapper);

    if (trigger === null) {
      trigger = document.querySelector('a[href="#' + closestParent.id + '"');
    }

    if (overlay) {
      var overlayIn = overlay.getAttribute("data-class-in").split(" "),
        overlayOut = overlay.getAttribute("data-class-out").split(" ");
      overlay.classList.remove(...overlayIn);
      overlay.classList.add(...overlayOut);
    }

    if (wrapper) {
      var wrapperIn = wrapper.getAttribute("data-class-in").split(" "),
        wrapperOut = wrapper.getAttribute("data-class-out").split(" ");
      wrapper.classList.remove(...wrapperIn);
      wrapper.classList.add(...wrapperOut);
    }

    document.documentElement.style.overflow = "";

    if (closestParent.hasAttribute("data-auto-trigger")) {
      closestParent.removeAttribute("data-auto-trigger");
    } else {
      toggleccessibility(trigger);
    }

    setTimeout(function () {
      closestParent.classList.add(settings.toggleClass);
    }, settings.speedClose);
  };

  var clickHandler = function (event) {
    var toggle = event.target,
      trigger,
      target,
      closestButton = toggle.closest("button"),
      closest = toggle.closest("a"),
      open = null;

    if (
      toggle.hasAttribute("data-modal-trigger") &&
      toggle.hasAttribute("aria-controls")
    ) {
      trigger = toggle.closest(settings.selectorTrigger);
      target = document.getElementById(trigger.getAttribute("aria-controls"));
      open = true;
    } else if (
      closestButton &&
      closestButton.hasAttribute("data-modal-trigger") &&
      closestButton.hasAttribute("aria-controls")
    ) {
      trigger = toggle.closest(settings.selectorTrigger);
      target = document.getElementById(trigger.getAttribute("aria-controls"));
      open = true;
    } else if (toggle.hash && toggle.hash.substr(1).indexOf("modal") > -1) {
      trigger = toggle;
      target = document.getElementById(toggle.hash.substr(1));
      open = true;
    } else if (
      closest &&
      closest.hash &&
      closest.hash.substr(1).indexOf("modal") > -1
    ) {
      trigger = closest;
      target = document.getElementById(closest.hash.substr(1));
      open = true;
    }

    var close = toggle.closest(settings.selectorClose);

    if (open && target) {
      openModal(trigger, target);
    }

    if (close) {
      closeModal(close);
    }

    if (open || close) {
      event.preventDefault();
    }
  };

  var keydownHandler = function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      var modals = document.querySelectorAll(settings.selectorTarget),
        i;

      for (i = 0; i < modals.length; ++i) {
        if (!modals[i].classList.contains(settings.toggleClass)) {
          closeModal(modals[i]);
        }
      }
    }
  };

  publicAPIs.init = function () {
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keydown", keydownHandler, false);
  };

  publicAPIs.openModal = openModal;
  publicAPIs.closeModal = closeModal;

  return publicAPIs;
})();

document.addEventListener("DOMContentLoaded", function () {
  modal.init();
});
