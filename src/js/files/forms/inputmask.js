import { modules } from '../modules.js'
import 'inputmask/dist/inputmask.min.js'

const inputMasks = document.querySelectorAll('input')
if (inputMasks.length) {
  modules.inputmask = Inputmask().mask(inputMasks)
}
