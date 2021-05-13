import styled from 'styled-components';

export const HeaderArea = styled.div`
   
    background-color: #FFF;
    height: 60px;
    border-bottom: 1px solid #CCC;

    .container {
        max-width: 1000px;
        margin: auto;
        display: flex;
    }

    a {
        text-decoration: none;
    }

    .logo {
        flex: 1;
        display: flex;
        align-items: center;
        text-decoration: none;
        line-height: 60px;

        span {
            font-size: 30px;
            font-weight: bold;
        }

        span:nth-child(1) { color: #FF0000 }
        span:nth-child(2) { color: #00FF00 }
        span:nth-child(3) { color: #0000FF }
    }

    nav {
        padding: 10px 0;
    }

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    ul {
        display: flex;
        align-items: center;
        height: 40px;
    }
    li {
        margin-left: 20px;
        margin-right: 20px;

        a {
            text-decoration: none;
            color: #000;
            font-size: 14px;
            font-weight: bold;

            &:hover {
                color: #444;
            }

            &.button {
                background-color: #FF8100;
                border-radius: 6px;
                color: #FFF;
                padding: 5px 10px;
            }
            &.button:hover {
                background-color: #ff9930;
            }
        }
    }

`;