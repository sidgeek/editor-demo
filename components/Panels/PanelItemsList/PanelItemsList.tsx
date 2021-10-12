import { Scrollbars } from 'react-custom-scrollbars'

import { tabItems } from '../config'
import { Item } from '../types'
import styles from './PanelItemsList.module.scss'
import PanelItemsListItem from './PanelItemsListItem'

interface Props {
  setActiveItem: React.Dispatch<React.SetStateAction<Item>>
  activeItem: Item
  panelOpen: boolean
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function PanelItems(props: Props) {
  const { setActiveItem, activeItem, setPanelOpen, panelOpen } = props
  return (
    <div className={styles.panelItemsList}>
      <Scrollbars
        renderThumbVertical={() => (
          <div style={{ background: 'rgba(255,255,255,0.3)' }}></div>
        )}
        autoHide
        style={{ backgroundColor: '#f9f9fc' }}
      >
        {tabItems.map((tabItem) => (
          <PanelItemsListItem
            key={tabItem.name}
            item={tabItem}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
            setPanelOpen={setPanelOpen}
            panelOpen={panelOpen}
          />
        ))}
      </Scrollbars>
    </div>
  )
}

export default PanelItems
