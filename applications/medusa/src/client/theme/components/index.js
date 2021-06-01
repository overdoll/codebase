import input from './input'
import button from './button'
import form from './form'
import menu from './menu'

export default {
  Menu: menu,
  Input: input,
  Button: button,
  Form: form,
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
