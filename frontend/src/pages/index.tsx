import Head from 'next/head'
import Image from 'next/image';
import { useContext, FormEvent, useState } from 'react';

import styles from '../../styles/home.module.scss';
import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link';

import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {

  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){

    event.preventDefault();

    let data = {
      email,
      password
    }

    await signIn(data)

  }

  return (
    <>
    <Head>
      <title>SujeitoPizza - Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

      <div className={styles.login}>

        <form onSubmit={handleLogin}>

          <Input
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}  
          />
          
          <Button
            type="submit"
            loading={false}
           
          >
            Acessar
          </Button>

        </form>
 
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>

      </div>

    </div>

    </>

  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})