const tabList = document.querySelector('.pet-activity__tabs')
const tabs = [...tabList.querySelectorAll('[role="tab"]')]

function selectTab (selectedTab) {
  for (const tab of tabs) {
    const isSelected = tab === selectedTab
    tab.setAttribute('aria-selected', isSelected)
    tab.tabIndex = isSelected ? 0 : -1
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected
  }
}

tabList.addEventListener('click', (event) => {
  const tab = event.target.closest('[role="tab"]')
  if (tab) selectTab(tab)
})

tabList.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return

  const step = event.key === 'ArrowRight' ? 1 : -1
  const index = tabs.indexOf(document.activeElement)
  const nextTab = tabs[(index + step + tabs.length) % tabs.length]
  nextTab.focus()
  selectTab(nextTab)
})
