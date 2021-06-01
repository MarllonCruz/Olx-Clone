import styled from 'styled-components';

export const PageArea = styled.div`

margin-bottom: 40px;

form {
    background-color: #FFF;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;
    

    .area {
        display: flex;
        align-items: center;
        padding: 10px;
        max-width: 500px;

        .area--title {
            width: 200px;
            text-align: right;
            paddind-right: 20px;
            font-weight: bold;
            font-size: 14px;
            margin-right: 10px;
        }
        .area--input {
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
            
            button {
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

    
    }
}

.list-ads {
    background-color: #FFF;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px #999;
    display: flex;
    flex-wrap: wrap;

    .ad--box {
        width: 25%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        padding-right: 20px;
        margin-bottom: 10px;
        align-items: center;

        img {
            max-width: 100%;
        }
        p {
            font-size: 16px;
            font-weight: bold;
            margin: 5px 0;
        }
        button {
            border: none;
            background: none;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            padding: 5px 10px;

            &:hover {
                background: #0089FF;
                color: #FFF;
            }
        }
        
    }
}

`;