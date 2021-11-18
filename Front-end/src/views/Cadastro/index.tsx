import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { StyledCadastro } from './style';
import { api} from '../../services/api'
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import useCourse from '../../hooks/useCourse';
import useCep from '../../hooks/useCep';


interface ICadastroData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  whats: string;
  curso_id: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string
}
const Cadastro: React.FC = () => {
  const [ data, setData ] = useState<ICadastroData>({} as ICadastroData);
  const [ load, setLoad ] = useState(false);

  const history = useHistory()

  const hadleSubmit = useCallback( (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoad(true)
    api.post('clientes', data).then(
      response => {
        setLoad(false)
        toast.success('Cadastro realizado com sucesso! Em breve um dos nossos consultores entrara em contato!', {
          hideProgressBar: false,
          onClose: () => history.push('/')
        })
      }
    ).catch( e => { toast.error('Oops, algo deu errado')} )
    .finally(() => setLoad(false))
  }, [data, history])

  const {getCepData, dados:dadoscep} = useCep()
  
  const {getCourses, data:dados} = useCourse()

  useEffect (()=>{
    getCourses(10000,1)
  },[]) 

  if(load){
    return <Loader />
  }  
            
  return (
    <>
    <Nav/>
    <StyledCadastro>
      <div className="card">
        <h5>Cadastre-se</h5>
        <form onSubmit={ hadleSubmit }>
          <input 
            type="text" 
            placeholder="Informe seu nome"
            onChange={ e => setData({...data, nome: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="CPF" 
            onChange={ e => setData({...data, cpf: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Informe seu email" 
            onChange={ e => setData({...data, email: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Telefone" 
            onChange={ e => setData({...data, telefone: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="WhatsApp" 
            onChange={ e => setData({...data, whats: e.target.value})}
          />
          <h6>Curso</h6>
          <hr/>
          <select
                    onChange={e => setData({...data, curso_id: e.target.value})}
                    placeholder="Curso" 
                  >
                    {dados.cursos?.map(curso => (
                      <option key={curso.id} value={curso.id} data-key={curso.id}>
                        {curso.nome}
                      </option>
                    ))}
                  </select>
          <hr/>
          <h6>Endereço</h6>
          <input 
            type="text" 
            placeholder="CEP" 
            onBlur={(cep) => getCepData(cep.target.value)}
            onChange={ e => setData({...data, cep: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="logradouro" 
            defaultValue={dadoscep.logradouro}
            onChange={ e => setData({...data, logradouro: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="numero" 
            onChange={ e => setData({...data, numero: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="bairro" 
            onChange={ e => setData({...data, numero: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="cidade" 
            value={dadoscep.localidade}
            onChange={ e => setData({...data, cidade: e.target.value})}
          />
          <input 
          type="text" 
          placeholder="UF" 
          value={dadoscep.uf}
          onChange={ e => setData({...data, uf: e.target.value})}
        />
          <input type="submit" value="Cadastrar" />
        </form>
        <Link to="/signin">Clique aqui para logar.</Link>
      </div>
    </StyledCadastro>
    <Footer/>
    </>
  );
}

export default Cadastro;