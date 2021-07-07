import { useTranslation } from 'react-i18next'
import Queue from './queue/Queue'

export const sidebar = () => {
  const [t] = useTranslation('nav')

  return [
    {
      title: t('sidebar.mod.queue'),
      route: '/mod/queue',
      component: () => <h1>queue</h1>
    },
    {
      title: t('sidebar.mod.history'),
      route: '/mod/history',
      component: () => <h1>history</h1>
    }
  ]
}

export default {
  sidebar
}
