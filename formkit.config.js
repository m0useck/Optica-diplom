import { createProPlugin, mask } from '@formkit/pro'
import { generateClasses } from '@formkit/themes'
import { ru } from '@formkit/i18n'
import genesis from '@formkit/themes/tailwindcss/genesis'

const proPlugin = createProPlugin('fk-62b0de8f08', {
    mask
    // ... and any other Pro Inputs
  })

export default {
    plugins: [proPlugin],
    locales: { ru },
    locale: 'ru',
    config: {
        classes: generateClasses(genesis),
    }
}
