import styled from 'styled-components';

export const AdModalArea = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0, 0.5);
display: flex;
justify-content: center;
align-items: center;
transition: all 0.5s ease;

.ad-modal {
    position: relative;
    min-width: 800px;
    padding: 5px 20px;
    background-color: #fff;
    border-radius: 10px;

    button {
        position: absolute;
        top: 2px;
        right: 5px;
        border: none;
        background: none;
        font-size: 25px;
        cursor: pointer;

        &:hover {
            color: #444;
        }
    }

    form {
        background-color: #FFF;
        border-radius: 3px;
        display: flex;
        align-items: flex-start;
        padding: 30px;
             
        .ad-modal--info {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-right: 10px;
            
            .ad-modal--area {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .ad-modal--area-title {
                    width: 130px;
                    text-align: right;
                    paddind-right: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    margin-right: 10px;
                }

                .ad-modal--area-input {
                    flex: 1;

                    input, select, textarea {
                        width: 100%;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid #DDD;
                        outline: 0;
                        border-radius: 5px;
                        transition: all ease 0.4s;
        
                        &:focus {
                            border: 1px solid #333;
                            color: #333;
                        }
                    }
        
                    textarea {
                        height: 150px;
                        resize: none;
                    }
                    
                    button {
                        position: relative;
                        margin-top: 20px;
                        background-color: #0089FF;
                        border: 0;
                        outline: 0;
                        padding: 5px 10px;
                        border-radius: 4px;
                        color: #FFF;
                        font-size: 15px;
                        cursor: pointer;
        
                        &:hover {
                            background-color: #006FCE;
                        }
                    }
                }

                .ad-modal--area-check {
                    input {
                        float: left;
                    }
                }
            }
        }

        .ad-modal--images {
            width: 320px;
            height: 320px;
            overflow: hidden;

            .each-slide {
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                height: 320px;

                img {
                    object-fit: cover;
                    width:100%;
                }
            }
        }
            
        }
        
    }
}
`;