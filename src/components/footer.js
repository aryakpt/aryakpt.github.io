export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <span>© 2025 Arya Krisna Putra</span>
    <span>Engineer · Researcher · Educator</span>
  `;
  return footer;
}
