export function createProjectCard(project) {
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
}
