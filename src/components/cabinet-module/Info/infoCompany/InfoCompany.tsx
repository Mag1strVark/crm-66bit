import s from './InfoCompany.module.scss'
import { NavButton } from 'components/cabinet-module/UI/NavButton/NavButton.tsx'
import { COMPANIES_ROUTE } from 'utils/constsRoutes.ts'

export const InfoCompany = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Ваши филиалы</div>
      <div className={s.block}>
        <div className={s.infoCompany}>
          <p>Cписок филиалов:</p>
        </div>
        <div className={s.route}>
          <NavButton route={COMPANIES_ROUTE} children={'Создать филиал'} />
        </div>
      </div>
    </div>
  )
}