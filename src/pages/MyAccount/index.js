import React, { useState, useEffect} from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import AdModal from '../../components/partials/AdModal';

// GET /user/me (token)
// PUT /user/me (token, name, email, state, password)
// POST /ad/{id} (token, status, title, category, price, priceNegotiable,
// description, images, img[])

import { PageContainer, PageTitle, ErrorMessage, SuccessMessage } from '../../components/MainComponents';

let urlBase = 'http://alunos.b7web.com.br:501/media/';

const Page = () => {
    const api = useApi();

    const [userInfo, setUserInfo] = useState([]);
    const [ad, setAd] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [stateList, setStateList] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState('');

    useEffect(()=>{
        const getUserInfo = async ()=> {
            const json = await api.getInfo();
            setUserInfo(json);
            setName(json.name);
            setEmail(json.email);
            setState(json.state);
        }
        getUserInfo();
    }, []);

    useEffect(()=>{
        const getStates = async ()=> {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    const handlerClickEdit = (ad) => {
        setAd(ad);
        setShowModal(true);
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        setSuccess('');
        let errors = [];

        // 1. Validar os campos
        if(!name.trim()) {
            errors.push('Preenche campo do nome');
        }
        if(!email.trim()) {
            errors.push('Prenche campo do email');
        }
        if(!state.trim()) {
            errors.push('Selecionar um estado');
        }
        if(password || passwordConfirm) {
            if(password !== passwordConfirm) {
                errors.push('Senhas não batem');
            }
        }

        // 2. Verificar se tem errors
        if(errors.length > 0) {
            setError(errors);
            setDisabled(false);
            return;
        } 
        // 3. montar FormData e fazer requisiçao do api
        const fData = new FormData();
        fData.append('name', name);
        fData.append('state', state);
        if(email !== userInfo.email) {
            fData.append('email', email);
        }
        if(password) {
            fData.append('password', password);
        }

        const json = await api.editUser(fData);

        if(json.error !== '') {
            setError([json.error]);
        } else {
            setSuccess('Alterado com sucesso');
        }
        
        setPassword('');
        setPasswordConfirm('');
        setDisabled(false);
    }



    return (
        <PageContainer>
            <PageTitle>Dados Usuário</PageTitle>
            <PageArea>
                <form onSubmit={handlerSubmit}>
                    {success && 
                        <SuccessMessage>{success}</SuccessMessage>
                    }
                    {error.length > 0 && 
                        <ErrorMessage>
                            <ul>
                                {error.map((i,k)=>
                                    <li key={k}>{i}</li>
                                )}
                            </ul>
                        </ErrorMessage>
                    }
                    {/*Input Name ------------------------------------------------------*/}
                    <div className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {/*Input Email -------------------------------------------------------*/}
                    <div className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input 
                                type="text"
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {/*Input State --------------------------------------------------------*/}
                    <div className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select disabled={disabled} onChange={e=>setState(e.target.value)}>
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}
                                    selected={(state===i.name)?'selected':''}>
                                        {i.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    {/*Input Password -----------------------------------------------------*/}
                    <div className="area">
                        <div className="area--title">Nova Senha(Opcional)</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {/*Input PasswordConfirm -----------------------------------------------*/}
                    <div className="area">
                        <div className="area--title">Confirma Senha(Opcional)</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={passwordConfirm}
                                onChange={e=>setPasswordConfirm(e.target.value)}
                            />
                        </div>
                    </div>
                    {/*Input Submit -------------------------------------------------------*/}
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Salvar</button>
                        </div>
                    </div>
                </form>
            </PageArea>
            
            <PageTitle>Seus Anúncios</PageTitle>
            <PageArea>
                {userInfo.ads &&
                    <div className="list-ads">
                        {userInfo.ads.map((i, k)=>
                            <div className="ad--box" key={k}>
                                <img src={urlBase+i.images[0].url} />
                                <p>{i.title}</p>
                                <button onClick={e=>handlerClickEdit(i)}>Editar</button>
                            </div>
                        )}
                    </div> 
                }    
            </PageArea>

            <AdModal ad={ad} showModal={showModal} setShowModal={setShowModal} />
        </PageContainer>
    );
}

export default Page;
