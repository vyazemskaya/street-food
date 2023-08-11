import { isMobile, FLS } from './functions.js'
import { modules } from './modules.js'
import tippy from 'tippy.js'

// styles ======================================================================

import '../../scss/libs/tippy.scss'
//import 'tippy.js/dist/tippy.css';

// launch ======================================================================
modules.tippy = tippy('[data-tippy-content]', {})
