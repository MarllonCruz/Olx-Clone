import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();

    const [q, setQ]         = useState( query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat]     = useState( query.get('cat') != null ? query.get('cat') : '' );
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '' );

    const [stateList, setStateList]   = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList]         = useState([]);

    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        let offset = (currentPage-1) * 12;
        
        const json = await api.getAds({
            sort:'desc',
            limit:15,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(()=>{
        if(adList.length > 0) {
            setPageCount( Math.ceil(adsTotal / adList.length) )
        } else {
            setPageCount( 0 );
        }
    }, [adsTotal]);

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage])

    useEffect(()=>{
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`)
        }

        history.replace({
            search:`?${queryString.join('&')}`
        });

        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1200);
        setCurrentPage(1);
        setLoading(true);
        setResultOpacity(0.3);
    }, [q, cat, state])
  
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getGategories = async () => {
            const cats = await api.getGategories();
            setCategories(cats);
        }
        getGategories();
    }, []);

    let pagination = [];
    for(let i=1;i<pageCount;i++) {
        pagination.push(i);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            value={q} type="text" 
                            name="q" placeholder="O que você procura?" 
                            onChange={e=>setQ(e.target.value)}    
                        />

                        <div className="filterName">Estado</div>
                        <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {stateList.map((i,k)=>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>

                        <div className="filterName">Categoria</div>
                        <ul>    
                            {categories.map((i,k)=>
                                <li key={k} className={cat==i.slug?'categoryItem active':'categoryItem'}
                                    onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>
                    
                    {loading && 
                        <div className="listWarning">Carregando...</div>
                    }
                    {adList.length === 0 && !loading &&
                        <div className="listWarning">Nenhum resultado encontrado.</div>
                    }

                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map((i,k)=>
                            <AdItem key={k} data={i} />
                        )}
                    </div>

                    <div className="pagination">
                        {pagination.map((i,k)=>
                            <div 
                                className={(i===currentPage)?'pagItem active':'pagItem'}
                                onClick={()=>setCurrentPage(i)}
                            >{i}</div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;
