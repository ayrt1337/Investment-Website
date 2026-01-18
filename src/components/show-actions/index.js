import { React, useState, useEffect } from 'react'
import ShowCards from '../actions-cards'
import Header from '../header-actions-cards'
import Pagination from '../pagination-page'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'
import { useMediaQuery } from 'react-responsive'

const ShowActions = () => {
    const for1020Width = useMediaQuery({query: '(max-width: 1020px)'})
    const for724Width = useMediaQuery({query: '(max-width: 724px)'})
    const for430Width = useMediaQuery({query: '(max-width: 430px)'})

    const [flag, setFlag] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        document.getElementById('root').style.height = '100vh'
        document.getElementById('root').style.overflow = 'hidden'
    }, [])

    return(
        <> 
            {flag &&
                <Overlay>
                    <div>
                        <h1 style={{color: 'white', marginRight: '20px'}}>Carregando</h1>
                    </div>
                
                    <Spinner animation='border' variant='light' />
                </Overlay>
            }

            <Header />

            {!for1020Width &&
                <div style={{   
                    height: notFound ? '100%' : 'auto', 
                    overflow: notFound ? 'hidden' : 'visible', 
                    backgroundColor: '#101318',
                    padding: '80px 18% 80px 18%',
                    minHeight: '100vh'
                    }}>
                    <Div style={{ backgroundColor: notFound ? 'transparent' : ''}}>
                        {!notFound &&
                            <>
                                <DisplayWrap>
                                    <ShowCards setFlag={setFlag} setNotFound={setNotFound} />
                                </DisplayWrap>
                                
                                <Pagination />
                            </>
                        }
                        
                        {notFound &&
                            <div style={{ color: 'white', textAlign: 'center' }}>
                                <p style={{fontSize: '50px'}}>Ops...</p>
                                <p style={{fontSize: '22px'}}>Tente procurar por outra página</p>
                            </div>
                        }
                    </Div>
                </div>
            }

            {(for1020Width && !for430Width) &&
                <div style={{
                    height: notFound ? '100%' : 'auto', 
                    overflow: notFound ? 'hidden' : 'visible', 
                    backgroundColor: '#101318', 
                    padding: for1020Width ? '80px 40px 80px 40px' : '80px 18% 80px 18%',
                    minHeight: '100vh'
                }}>
                    <Div style={{
                        padding: for430Width ? '40px 20px 40px 20px' : '40px 40px 40px 40px',
                        backgroundColor: notFound ? 'transparent' : ''
                    }}>
                        {!notFound &&
                            <>
                                <DisplayWrap style={{gap: for724Width ? '30px' : '10px'}}>
                                    <ShowCards setFlag={setFlag} setNotFound={setNotFound} />
                                </DisplayWrap>
                                
                                <Pagination />
                            </>
                        }

                        {notFound &&
                            <div style={{ color: 'white', textAlign: 'center' }}>
                                <p style={{fontSize: '50px'}}>Ops...</p>
                                <p style={{fontSize: '22px'}}>Tente procurar por outra página</p>
                            </div>
                        }
                    </Div>
                </div>
            }

            {for430Width &&
                <div style={{
                    height: notFound ? '100%' : 'auto', 
                    overflow: notFound ? 'hidden' : 'visible', 
                    backgroundColor: '#101318', 
                    padding: for430Width ? '80px 20px 80px 20px' : '80px 40px 80px 40px',
                    minHeight: '100vh'
                }}>
                    <Div style={{
                        padding: for430Width ? '40px 20px 40px 20px' : '40px 40px 40px 40px',
                        backgroundColor: notFound ? 'transparent' : ''
                    }}>
                        {!notFound &&
                            <>
                                <DisplayWrap style={{gap: for724Width ? '30px' : '10px'}}>
                                    <ShowCards setFlag={setFlag} setNotFound={setNotFound} />
                                </DisplayWrap>
                                
                                <Pagination />
                            </>
                        }

                        {notFound &&
                            <div style={{ color: 'white', textAlign: 'center' }}>
                                <p style={{fontSize: '50px'}}>Ops...</p>
                                <p style={{fontSize: '22px'}}>Tente procurar por outra página</p>
                            </div>
                        }
                    </Div>
                </div>
            }
        </>
    )
}

const Div = styled.div`
    background-color: #171b26;
    border-radius: 10px;
    padding: 40px 40px 40px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DisplayWrap = styled.div`
    flex-wrap: wrap; 
    display: flex;
    justify-content: center;
    gap: 10px;
    width: fit-content;
`

const Overlay = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color:rgba(16, 19, 24, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`

export default ShowActions