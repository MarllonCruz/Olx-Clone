import styled from 'styled-components';

export const Template = styled.div``;

export const PageContainer = styled.div`
    max-width: 1000px;
    margin: auto;
`;

export const PageTitle = styled.h1`
    font-size: 27px;
`;

export const PageBody = styled.div``;

export const ErrorMessage = styled.div`
    margin: 5px 0;
    background-color: #ff5a5a;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #FF0000;
    padding: 2px 5px;
    border-radius: 4px;

    ul {
        list-style: none;
    }
`;
export const SuccessMessage = styled.div`
    margin: 5px 0;
    background-color: #59bf37;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #1f6907;
    padding: 18px 45px;
    border-radius: 4px;

    ul {
        list-style: none;
    }
`;