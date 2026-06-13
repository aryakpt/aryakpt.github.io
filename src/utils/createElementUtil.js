export function createSkillChip(label) {
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.innerHTML = `<span class="chip-dot"></span>${label}`;
  return chip;
}
