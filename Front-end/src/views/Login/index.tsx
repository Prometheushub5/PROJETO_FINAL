import React, { useState, useCallback, FormEvent} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { StyledLogin } from './style';
import { api } from '../../services/api'
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';


interface IData {
  email: string;
  senha: string;
}
const Login: React.FC = () => {
  const [ data, setData ] = useState<IData>({} as IData);
  const [ load, setLoad ] = useState(false);

  const history = useHistory()

  const hadleSubmit = useCallback( (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoad(true)
    api.post('auth', data).then(
      response => {
        const sessionToken = response.data.token
        const user = JSON.stringify(response.data.consultor)
        localStorage.setItem('@User', user)
        localStorage.setItem('@ServiceToken', sessionToken)
        setLoad(false)
        toast.success('Login realizado com sucesso!', {
          hideProgressBar: false,
          onClose: () => history.push('/consultor')
        })
      }
    ).catch( e => { toast.error('Oops, algo deu errado')} )
    .finally(() => setLoad(false))
  }, [data, history])

  if(load){
    return <Loader />
  }

  return (
    <>
    <Nav/>
    <StyledLogin>
      <div className="card">
        <h5>Logar no sistema</h5>
        <form onSubmit={ hadleSubmit }>
          <input 
            type="text" 
            placeholder="Informe seu email" 
            onChange={ e => setData({...data, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Informe sua senha"
            onChange={ e => setData({...data, senha: e.target.value})}
          />
          <input type="submit" value="Logar" />
        </form>
        <Link to="/signup">Clique aqui para cadastrar.</Link>
      </div>
    </StyledLogin>
    <Footer/>
    </>
  );
}

export default Login;