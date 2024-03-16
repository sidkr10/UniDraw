import Tool from './Tool'
import './menu.css'
import line from '../../assets/icons/line-svgrepo-com.svg'
import rectangle from '../../assets/icons/rectangle-svgrepo-com.svg'
import circle from '../../assets/icons/circle-svgrepo-com.svg'
import scribble from '../../assets/icons/scribble-svgrepo-com.svg'
import { toolType } from '../../Enums/ToolTypes'

const Menu = () => {

  return (
    <div className="menu-container" >
        <Tool src={line} tooltype = {toolType.LINE} />
        <Tool src={rectangle} tooltype = {toolType.RECTANGLE}/>
        <Tool src={circle} tooltype = {toolType.CIRCLE}/>
        <Tool src={scribble} tooltype = {toolType.SCRIBBLE}/>
    </div>
  )
}
export default Menu