const createElementUtil = {
  createProjectElement(project) {
    const projectElement = document.createElement("div");
    projectElement.setAttribute(
      "class",
      "col-lg-6 col-md-6 col-sm-12 mb-5 project-detail"
    );
    projectElement.innerHTML = `
      <a
        href="${project.website || project.github || "#"}"
        class="project-link"
        ${project.website || project.github ? `target="_blank"` : null}
        ><img src="${project.image}" alt="Project Image" srcset=""
      /></a>
      <div class="mt-3">
        <p class="m-0">
        ${project.desription}
        </p>
        ${
          project.github
            ? `<a href="${project.github}" class="visit-site" target="_blank">View Github</a>`
            : null
        }
        ${
          project.website
            ? ` <a
            href="${project.website}"
            class="visit-site float-right"
            target="_blank"
            >Visit site</a
          >`
            : null
        }
      </div>
  `;
    return projectElement;
  },
  createDetailContacts(socialMedia) {
    const detailContactElement = document.createElement("a");
    detailContactElement.href = socialMedia.link;
    detailContactElement.target = "_blank";

    const iconEl = document.createElement("i");
    iconEl.className = socialMedia.icon;

    detailContactElement.append(socialMedia.value, iconEl);

    return detailContactElement;
  },
  createContacts(socialMedia) {
    const contactElement = document.createElement("a");
    contactElement.href = socialMedia.link;
    contactElement.target = "_blank";
    contactElement.className = "ml-4";

    const iconEl = document.createElement("i");
    iconEl.className = socialMedia.icon;
    contactElement.append(iconEl);
    return contactElement;
  },
};

export default createElementUtil;
