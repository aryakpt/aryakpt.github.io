import projects from "./constants/projects.js";
import socialMedias from "./constants/socialMedias.js";
import createElementUtil from "./utils/createElementUtil.js";

const renderProject = (projects) => {
  const projectListContainer = document.getElementById("project-list");
  projects.forEach((project) => {
    const projectElement = createElementUtil.createProjectElement(project);
    projectListContainer.append(projectElement);
  });
};

const renderDetailContacts = (socialMedias) => {
  const detailContactContainer = document.querySelector(".detail-contact");
  socialMedias.forEach((socialMedia) => {
    const el = createElementUtil.createDetailContacts(socialMedia);
    detailContactContainer.append(el);
  });
};

const renderContacts = (socialMedias) => {
  const contactsContainer = document.querySelector(".btn-media-sosial");
  console.log(contactsContainer);
  socialMedias.forEach((socialMedia) => {
    const el = createElementUtil.createContacts(socialMedia);
    contactsContainer.append(el);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderProject(projects);
  renderDetailContacts(socialMedias);
  renderContacts(socialMedias);
});
