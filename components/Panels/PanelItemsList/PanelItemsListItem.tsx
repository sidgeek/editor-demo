import classNames from 'classnames'

import { Item } from '../types'
import styles from './PanelItemsList.module.scss'

interface Props {
  activeItem: Item
  item: Item
  panelOpen: boolean
  setActiveItem: React.Dispatch<React.SetStateAction<Item>>
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function PanelItem(props: Props) {
  const { setActiveItem, item, activeItem, setPanelOpen } = props
  const className = classNames(styles.panelItemsListItem, {
    active: activeItem.name === item.name,
  })

  return (
    <div
      className={className}
      onClick={() => {
        setPanelOpen(true)
        setActiveItem(item)
      }}
    >
      <li className={styles.panelMenuItem}>
        <p className={styles.text}>{item.name}</p>
      </li>
    </div>
  )
}

export default PanelItem
