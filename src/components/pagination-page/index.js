import React, { use } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
 
const Pagination = () => {
    const for1420Width = useMediaQuery({query: '(max-width: 1420px)'})
    const for450Width = useMediaQuery({query: '(max-width: 450px)'})

    var { page } = useParams() 
    var number = parseInt(page)

    const handleClickBtn = (event) => {
        if(event.target.id === 'next'){
            console.log(number)
            if(number === 9) window.location.href = `${number}`
        
            else{
                number++
                window.location.href = `${number}`
            } 
        }

        else{
            if(number === 1) window.location.href = `${number}`
            
            else{
                number--
                window.location.href = `${number}`
            }  
        }
    }

    const handleClick = (event) => {
        document.getElementById('root').style.height = '100vh'
        document.getElementById('root').style.overflow = 'hidden'

        const pageNumber = event.target.innerHTML
        window.location.href = `${pageNumber}`
    }

    return(
        <>
            {!for1420Width &&
                <Div>
                    <PBtn id="before" onClick={handleClickBtn}>{'<'} Anterior</PBtn>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <PNumber onClick={handleClick}>1</PNumber>
                        <PNumber onClick={handleClick}>2</PNumber>
                        <PNumber onClick={handleClick}>3</PNumber>
                        <PNumber onClick={handleClick}>4</PNumber>
                        <PNumber onClick={handleClick}>5</PNumber>
                        <PNumber onClick={handleClick}>6</PNumber>
                        <PNumber onClick={handleClick}>7</PNumber>
                        <PNumber onClick={handleClick}>8</PNumber>
                        <PNumber onClick={handleClick} style={{margin: '0px'}}>9</PNumber>
                    </div>

                    <PBtn id="next" onClick={handleClickBtn}>Próxima {'>'}</PBtn>
                </Div>
            }

            {for1420Width &&
                <Div style={{justifyContent: 'space-between'}}>
                    {!for450Width &&
                        <>
                            <PBtn id="before" onClick={handleClickBtn}>{'<'} Anterior</PBtn>


                            <PBtn id="next" onClick={handleClickBtn}>Próxima {'>'}</PBtn>
                        </>
                    }

                    {for450Width &&
                        <>
                            <PBtn style={{padding: '7px 15px 7px 15px'}} id="before" onClick={handleClickBtn}>{'<'} Anterior</PBtn>


                            <PBtn style={{padding: '7px 15px 7px 15px'}} id="next" onClick={handleClickBtn}>Próxima {'>'}</PBtn>
                        </>
                    }
                </Div>
            }
        </>
    )
}

const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 40px;
`

const PBtn = styled.p`
    padding: 10px 20px 10px 20px;
    background-color: #32384d;
    cursor: pointer;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.2s;

    &:hover{
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 1);
    }
`

const PNumber = styled.p`
    padding: 10px;
    background-color: #32384d;
    cursor: pointer;
    border-radius: 10px;
    color: white;
    margin-right: 10px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease-in-out 0.2s;

    &:hover{
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 1);
    }
`

export default Pagination