import input from './input'
import button from './button'
import form from './form'
import menu from './menu'
import badge from './badge'
import tag from './tag'
import tooltip from './tooltip'
import select from './select'
import textarea from './textarea'

export default {
  Menu: menu,
  Input: input,
  Button: button,
  Form: form,
  Badge: badge,
  Tag: tag,
  Tooltip: tooltip,
  Select: select,
  Textarea: textarea,
  FormLabel: {
    variants: {
      float: {
        fontFamily: 'heading',
        position: 'absolute',
        fontSize: 'm',
        pl: 3,
        pt: 2,
        transform: 'translateX(3.5%)'
      }
    }
  }
}
