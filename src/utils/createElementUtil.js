const createElementUtil = {
  createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const techsHTML = (project.techs || [])
      .map((t) => `<span class="project-tech-tag">${t}</span>`)
      .join("");

    const actionsHTML = [
      project.github
        ? `<a href="${project.github}" class="project-card-btn" target="_blank">GitHub <span>→</span></a>`
        : "",
      project.website
        ? `<a href="${project.website}" class="project-card-btn" target="_blank">Visit site <span>→</span></a>`
        : "",
    ].join("");

    const headerHTML = project.image
      ? `<div class="project-card-image">
           <img src="${project.image}" alt="${project.title}" />
           <div class="project-card-badges">
             <span class="project-card-tag">${project.tag}</span>
             ${project.status ? `<span class="project-card-status">${project.status}</span>` : ""}
           </div>
         </div>`
      : `<div class="project-card-gradient">
           <span class="project-card-tag gradient-tag">${project.tag}</span>
           ${project.status ? `<span class="project-card-status gradient-status">${project.status}</span>` : ""}
         </div>`;

    card.innerHTML = `
      ${headerHTML}
      <div class="project-card-body">
        <div class="project-card-title">${project.title}</div>
        <div class="project-card-desc">${project.description}</div>
        ${techsHTML ? `<div class="project-card-techs">${techsHTML}</div>` : ""}
        ${actionsHTML ? `<div class="project-card-actions">${actionsHTML}</div>` : ""}
      </div>
    `;

    return card;
  },

  createSkillChip(label) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `<span class="chip-dot"></span>${label}`;
    return chip;
  },

  createBlogCard(blog) {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <span class="blog-card-cat">${blog.category}</span>
      <div class="blog-card-title">${blog.title}</div>
      <div class="blog-card-excerpt">${blog.excerpt}</div>
      <div class="blog-card-footer">
        <span class="blog-card-date">${blog.date}</span>
        <span class="blog-card-read">Read More →</span>
      </div>
    `;
    return card;
  },
};

export default createElementUtil;
