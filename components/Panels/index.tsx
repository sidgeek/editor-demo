import { useState } from 'react'

import ClosePanel from './ClosePanel'
import { tabItems } from './config'
import PanelItem from './PanelItem/PanelItem'
import PanelItemsList from './PanelItemsList/PanelItemsList'
import style from './Panels.module.scss'

function Panels() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeItem, setActiveItem] = useState(tabItems[0])

  const closePanel = () => {
    setPanelOpen(!panelOpen)
  }
  return (
    <div className={style.panels}>
      <PanelItemsList
        setPanelOpen={setPanelOpen}
        panelOpen={panelOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <PanelItem activeItem={activeItem} panelOpen={panelOpen} />
      <ClosePanel closePanel={closePanel} />
    </div>
  )
}

export default Panels
