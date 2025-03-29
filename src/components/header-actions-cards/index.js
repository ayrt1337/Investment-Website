import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"

const Header = () => {
    const for1020Width = useMediaQuery({query: '(max-width: 1020px)'})

    return(
        <HeaderStyle style={{padding: for1020Width ? '0px 40px 0px 40px' : '0px 18% 0px 18%'}}>
            <div style={{padding: '20px 0px 5px 0px', borderBottom: 'solid #ccc 1px'}}>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <Home>Home </Home>
                </Link>
                <span style={{color:'rgb(165, 170, 177)' }}>/ </span>
                <span style={{color:'rgb(165, 170, 177)'}}>Ações</span>
            </div>  

            <div>
                <h1 style={{padding: '25px 0px 27px 0px', color: 'white', margin: '0'}}>Todas as Ações</h1>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    background-color: #173e5b;
    padding: 0px 18% 0px 18%;
`

const Home = styled.span`
    color:rgb(165, 170, 177);
    cursor: pointer;

    &:hover{
        transition: 0.2s ease-in-out;
        color: white;
    }
`

export default Header