import { useContext  } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

  const { signOut } = useContext(AuthContext)

  return(

    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>

        <nav className={styles.menuNav}>

          <Link href="/dashboard">
            <picture>
              <img src="./logo.svg" alt="Smart Pizza" width={190} height={60} />
            </picture>
          </Link>

          <Link href="/category">
            Categoria
          </Link>

          <Link href="/product">
            Cardapio
          </Link>   

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>       
        </nav>

      </div>
    </header>
  )
}