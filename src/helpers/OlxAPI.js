import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

const fetchPut = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'PUT', 
        body
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const fetchFile = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST', 
        body
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const fetchPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const fetchGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

const OlxAPI = () => {
    const api = {

        login:async (email, password) => {
            const json = await fetchPost(
                '/user/signin',
                {email, password}
            );
            return json;
        },
        register:async (name, email, password, stateLoc) => {
            const json = await fetchPost(
                '/user/signup',
                {name, email, password, state:stateLoc}
            );
            return json;
        },
    
        getStates:async () => {
            const json = await fetchGet(
                '/states'
            );
            return json.states;
        },
        getGategories:async () => {
            const json = await fetchGet(
                '/categories'  
            );
            return json.categories
        },
        getAds:async (options) => {
            const json = await fetchGet(
                '/ad/list',
                options
            );
            return json;
        },
        getAd:async (id, other = false) => {
            const json = await fetchGet(
                '/ad/item',
                {id, other}
            );
            return json;
        },
        addAd:async (fData) => {
            const json = await fetchFile(
                '/ad/add',
                fData
            );
            return json;
        },
        getInfo:async () => {
            const json = await fetchGet(
                '/user/me'  
            );
            return json;
        },
        editUser:async (fData) => {
            const json = await fetchPut(
                '/user/me',
                fData
            );
            return json;
        },
        editAd:async (id, status, title, category, price, priceNegotiable, desc, images, img) => {
            const json = await fetchPost(
                '/ad/'+id,
                {status, title, category, 
                price, priceNegotiable, description:desc, 
                images, img}
            );
            return json;
        }
        
    };
    return api;
}


export default (OlxAPI);