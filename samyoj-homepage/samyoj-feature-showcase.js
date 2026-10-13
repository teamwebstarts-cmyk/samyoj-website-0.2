(() => {
  const showcase = document.querySelector(".sf-showcase");
  if (!showcase) return;

  const filters = Array.from(showcase.querySelectorAll("[data-feature-filter]"));
  const features = Array.from(showcase.querySelectorAll(".sf-feature-list-verified [data-channels]"));
  const status = showcase.querySelector("[data-filter-status]");
  const labels = {
    all: "all",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    instagram: "Instagram",
    email: "Email",
    "automation-ai": "Automation & AI",
  };

  const countFor = (filter) => filter === "all"
    ? features.length
    : features.filter((feature) => feature.dataset.channels.split(/\s+/).includes(filter)).length;

  filters.forEach((button) => {
    const count = showcase.querySelector(`[data-filter-count="${button.dataset.featureFilter}"]`);
    if (count) count.textContent = String(countFor(button.dataset.featureFilter));

    button.addEventListener("click", () => {
      const selected = button.dataset.featureFilter;
      let shown = 0;

      filters.forEach((filterButton) => {
        const active = filterButton === button;
        filterButton.classList.toggle("is-active", active);
        filterButton.setAttribute("aria-pressed", String(active));
      });

      features.forEach((feature) => {
        const visible = selected === "all" || feature.dataset.channels.split(/\s+/).includes(selected);
        feature.hidden = !visible;
        if (visible) shown += 1;
      });

      if (status) {
        status.textContent = selected === "all"
          ? `Showing all ${shown} feature areas.`
          : `Showing ${shown} ${labels[selected]} feature areas.`;
      }
    });
  });

  if (status) status.textContent = `Showing all ${features.length} feature areas.`;
})();
