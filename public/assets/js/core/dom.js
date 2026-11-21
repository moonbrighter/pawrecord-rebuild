function createEl (tag, className = '', ...children) {
  const el = document.createElement(tag)
  if (className) el.classList.add(className)
  el.append(...children)

  return el
}
