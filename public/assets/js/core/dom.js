function createEl (tag, className = '', ...children) {
  const el = document.createElement(tag)
  if (className) el.classList.add(...className.split(" "))
  el.append(...children)

  return el
}
