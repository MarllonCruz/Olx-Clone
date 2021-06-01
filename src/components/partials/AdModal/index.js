import React, {useState, useRef, useEffect} from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {useSpring, animated} from 'react-spring';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { AdModalArea } from './styled';

import useApi from '../../../helpers/OlxAPI';

const AdModal = ({ ad, showModal, setShowModal }) => {
    const api = useApi();
    const modalRef = useRef();
    const fileField = useRef();

    const urlMedia = 'http://alunos.b7web.com.br:501/media/';

    const [categories, setCategories] = useState([]);

    const [id, setId] = useState('');
    const [status, setStatus] = useState(true);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [images, setImages] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=> {
        if(ad.length !== 0) {
            setId(ad.id);
            setStatus(ad.status);
            setTitle(ad.title);
            setCategory(ad.category);
            setPrice(ad.price);
            setPriceNegotiable(ad.priceNegotiable);
            setDesc(ad.description);
            setImages(ad.images);
        }
    }, [ad]);

    useEffect(()=>{
        const getCategories = async ()=> {
            const cats = await api.getGategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    const animation = useSpring({
        config: {
            duration:400
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
        reset: true
    });

    const backCloseModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
            closeModal();
        }
    };
    const closeModal = () => {
        setShowModal(false);
        setTitle(ad.title);
        setCategory(ad.category);
        setPrice(ad.price);
        setPriceNegotiable(ad.priceNegotiable);
        setDesc(ad.desc);
    }

    const properties = {
        arrows: false
    }; 
    
    const handlerSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()) {
            errors.push('Preenche o título');
        }
        if(!category) {
            errors.push('Preenche categoria');
        }

        if(errors.length === 0) {
            let img = [];

            if(fileField.current.files.length > 0) {
                for(let i=0;i<fileField.current.files.length;i++) {
                    img.push(fileField.current.files[i]);
                }
            }

            const json = await api.editAd(id, status, title, category, price,
                priceNegotiable, desc, images, img);

            if(!json.error) {
                //window.location.href = window.location.href;
                console.log(json);
                return;
            } else {
                setError(json.error);
            }


        } else {
            setError(errors.join("\n"));
        }

        console.log(error);
        setDisabled(false);
    }

    return (
        <>
        {showModal ? 
            <AdModalArea ref={modalRef} onClick={backCloseModal}>
                <animated.div style={animation}>
                    <div className="ad-modal">
                        <button onClick={closeModal} >x</button>
                        
                        <form onSubmit={handlerSubmit}>
                            <div className="ad-modal--info">

                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Titulo</div>
                                    <div className="ad-modal--area-input">
                                        <input 
                                            type="text"
                                            disabled={disabled}
                                            value={title}
                                            onChange={e=>setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                </label>
                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Categoria</div>
                                    <div className="ad-modal--area-input">
                                        <select 
                                            disabled={disabled}
                                            onChange={e=>setCategory(e.target.value)}
                                            required
                                        >
                                            {categories && categories.map((i)=>
                                                <option key={i._id} value={i.slug} 
                                                selected={(i.slug==category)?'selected':''}>
                                                    {i.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </label>
                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Preço</div>
                                    <div className="ad-modal--area-input">
                                        <MaskedInput 
                                            mask={priceMask}
                                            placeholder="R$ "
                                            disabled={disabled || priceNegotiable}
                                            value={price}
                                            onChange={e=>setPrice(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Preço Negociavel</div>
                                    <div className="ad-modal--area-check">
                                        <input 
                                            type="checkbox"
                                            disabled={disabled}
                                            checked={priceNegotiable}
                                            onChange={e=>setPriceNegotiable(!priceNegotiable)}
                                        />
                                    </div>
                                </label>
                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Descrição</div>
                                    <div className="ad-modal--area-input">
                                        <textarea
                                            disabled={disabled}
                                            value={desc}
                                            onChange={e=>setDesc(e.target.value)}
                                        ></textarea>
                                    </div>
                                </label>
                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title">Imagens (1 ou mais)</div>
                                    <div className="ad-modal--area-input">
                                        <input 
                                            type='file'
                                            disabled={disabled}
                                            ref={fileField}
                                            multiple
                                        />
                                    </div>
                                </label>


                                <label className="ad-modal--area">
                                    <div className="ad-modal--area-title"></div>
                                    <div className="ad-modal--area-input">
                                        <button disabled={disabled}>Salvar Anúncio</button>
                                    </div>
                                </label>

                            </div>
                            <div className="ad-modal--images">
                                {images.length > 0 &&
                                    <Slide {...properties}>
                                        {images.map((img, k)=>
                                            <div key={k} className="each-slide">
                                                <img src={urlMedia+img.url} />
                                            </div>
                                        )}
                                    </Slide>
                                }
                            </div>
                        </form>
                    </div>
                </animated.div>
            </AdModalArea>
        : null}   
        </>
    );
};

export default AdModal;
