import styles from "@/components/header/Header.module.css"
import PersonalAccountIcon from "../icons/PersonalAccountIcon";
const Header = () => {
    return (
        <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <p className={styles.catalog}>Каталог</p>
          <div className={styles.rightSectionHeader}>
            <p className={styles.textElems}>Сравнение</p>
            <div className={styles.personalAccountItems }>
              <p className={styles.textElems}>Личный кабинет</p>
              <PersonalAccountIcon/>
            </div>
          </div>
        </header>
      </div>
    )
}

export default Header;