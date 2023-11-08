import s from './Cabinet.module.scss'
import { InfoUser } from 'components/cabinet-module/Info/infoUser/InfoUser.tsx'
import { Settings } from 'components/cabinet-module/settings/Settings.tsx'

export const Cabinet = () => {
  return (
    <div className={s.container}>
      <div className={s.info}>
        <h2>Информация</h2>
        <InfoUser />
      </div>
      <div className={s.settings}>
        <h2>Настройки</h2>
        <Settings />
      </div>
    </div>
  )
}
