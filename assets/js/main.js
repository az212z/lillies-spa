/* Lillies Spa — interactions (vanilla, guarded) */
(function () {
  "use strict";

  /* ---------- Mobile full-screen menu ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("mobile-menu");
  var closeBtn = document.querySelector(".mm-close");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); closeLightbox(); }
  });

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal (IntersectionObserver + fallback) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }
  /* Safety: never leave anything hidden */
  window.setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }, 1600);

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox ? lightbox.querySelector("img") : null;
  var lbClose = lightbox ? lightbox.querySelector(".lb-close") : null;
  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src; lbImg.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-lightbox]").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var img = fig.querySelector("img");
      if (img) openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Booking form → WhatsApp + localStorage + toast ---------- */
  var form = document.getElementById("booking-form");
  var toast = document.getElementById("toast");
  var WA = "966502226166";

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector("span").textContent = msg;
    toast.classList.add("show");
    window.setTimeout(function () { toast.classList.remove("show"); }, 4200);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var required = form.querySelectorAll("[required]");
      required.forEach(function (inp) {
        var wrap = inp.closest(".field");
        if (!inp.value.trim()) { if (wrap) wrap.classList.add("invalid"); valid = false; }
        else if (wrap) wrap.classList.remove("invalid");
      });
      if (!valid) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select");
        if (firstBad) firstBad.focus();
        return;
      }

      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var service = form.elements["service"].value;
      var date = form.elements["date"].value;
      var notes = form.elements["notes"].value.trim();

      /* localStorage demo */
      try {
        var store = JSON.parse(localStorage.getItem("lillies_bookings") || "[]");
        store.push({ name: name, phone: phone, service: service, date: date, notes: notes, at: new Date().toISOString() });
        localStorage.setItem("lillies_bookings", JSON.stringify(store));
      } catch (err) { /* storage may be blocked — proceed anyway */ }

      /* WhatsApp prefilled message */
      var lines = [
        "السلام عليكم، أرغب بحجز موعد في Lillies Spa",
        "الاسم: " + name,
        "الجوال: " + phone,
        "الخدمة: " + service
      ];
      if (date) lines.push("التاريخ المفضل: " + date);
      if (notes) lines.push("ملاحظات: " + notes);
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));

      showToast("تم استلام طلبك — يفتح واتساب لتأكيد الموعد");
      form.reset();
      window.setTimeout(function () { window.open(url, "_blank", "noopener"); }, 600);
    });

    /* clear error on input */
    form.querySelectorAll("[required]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var wrap = inp.closest(".field");
        if (wrap && inp.value.trim()) wrap.classList.remove("invalid");
      });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
