import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const for1330Width = useMediaQuery({query: '(max-width: 1330px)'})
    const for1200Width = useMediaQuery({query: '(max-width: 1200px)'})
    const for941Width = useMediaQuery({query: '(max-width: 941px)'})
    const for700Width = useMediaQuery({query: '(max-width: 700px)'})
    const for620Width = useMediaQuery({query: '(max-width: 620px)'})
    const for500Width = useMediaQuery({query: '(max-width: 500px)'})
    const for430Width = useMediaQuery({query: '(max-width: 430px)'})

    const [showData, setData] = useState([])
    const [showSearch, setSearch] = useState({})
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const getData = async() => {
            const response = await fetch('http://localhost:3000/data-home')
            const data = await response.json()

            setData(data)
        }
        getData()
    }, [])

    const handleChange = () => {
        const text = document.getElementById('input').value

        const names = []
        const actions = []
        const imgs = []
        const cotacao = []

        if(text.length >= 3){
            showData.data.names.forEach((element, index) => {
                if(element.toLowerCase().includes(text.toLowerCase()) || showData.data.actions[index].toLowerCase().includes(text.toLowerCase())){
                    names.push(element)
                    actions.push(showData.data.actions[index])
                    imgs.push(showData.data.img[index])
                    cotacao.push(showData.data.cotacao[index])
                }
                
                if(index == showData.data.names.length - 1 && names.length > 0){
                    setSearch({
                        names,
                        actions,
                        imgs,
                        cotacao
                    })
                    setFlag(true)
                }
            })
        } 
        else setFlag(false)
    }

    useEffect(() => {
        document.getElementById('root').addEventListener('click', event => {
            if(event.target !== document.getElementById('absolute')){
                setFlag(false)
            }
        })
    }, [])

    return(
        <>  
            {!for1200Width &&
                <>
                    <HeaderStyle>
                        <div>
                            <H1>Decida no que investir em segundos</H1>
                            <P>Nossa ferramenta oferece acesso a dados atualizados, ajudando você a tomar decisões fundamentadas com confiança.</P>
                            <Link style={{textDecoration: 'none'}} to={'acoes/page/1'}>
                                <A>Ver ativos</A>
                            </Link>
                        </div>
                    </HeaderStyle>

                    <Container>
                        <div style={{position: 'relative'}}>
                            {!for1330Width &&
                                <Input id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {for1330Width &&
                                <Input style={{width: '500px'}} id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {flag &&
                                <Absolute id="absolute" style={{
                                    overflow: showSearch.names.length >= 5 ? 'auto' : 'visible',
                                    height: showSearch.names.length >= 5 ? '438px' : 'auto'
                                }}>
                                    {showSearch.names.map((element, index) => {
                                        return(
                                            <Link key={index} to={`acao/${showSearch.actions[index]}`} style={{textDecoration: 'none', color: 'white', width: '100%'}}>
                                                {(index == showSearch.names.length - 1) &&
                                                    <DivResult style={{border: 'solid 0px #ccc'}}> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            <p style={{margin: '0px 10px 0px 10px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                }

                                                {(index < showSearch.names.length - 1) &&
                                                    <DivResult> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            <p style={{margin: '0px 10px 0px 10px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                } 
                                            </Link>  
                                        )
                                    })
                                    }
                                </Absolute>
                            }
                        </div>

                        <Actions>
                            <h5 style={{color: 'white', margin: '0px', fontSize: '18px'}}>OS ATIVOS MAIS PROCURADOS</h5>

                            <DivWrap>
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBAS3'}>
                                    <DivCard>
                                        <Img src="https://cdn.asupernova.com.br/stocks/icons/BBAS3.svg"></Img>

                                        <PCard>BBAS3</PCard>

                                        <p>BCO BRASIL S.A</p>
                                    </DivCard>
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC3'}>
                                    <DivCard>
                                        <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC3.svg"></Img>

                                        <PCard>BBDC3</PCard>

                                        <p>BCO BRADESCO S.A</p>
                                    </DivCard>
                                </Link> 
                                
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/WEGE3'}>
                                    <DivCard>
                                        <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                        <PCard>WEGE3</PCard>

                                        <p>WEG S.A</p>
                                    </DivCard>
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/VALE3'}>
                                    <DivCard>
                                        <Img src="https://cdn.asupernova.com.br/stocks/icons/VALE3.svg"></Img>

                                        <PCard>VALE3</PCard>

                                        <p>VALE S.A</p>
                                    </DivCard>
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/PETR3'}>
                                    <DivCard>
                                        <Img style={{marginTop: '16px'}} src="https://cdn.asupernova.com.br/stocks/icons/PETR3.svg"></Img>

                                        <PCard>PETR3</PCard>

                                        <p style={{fontSize: '14px'}}>PETROLEO BRASILEIRO S.A PETROBRAS</p>
                                    </DivCard>
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC4'}>
                                    <DivCard>
                                        <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC4.svg"></Img>

                                        <PCard>BBDC4</PCard>

                                        <p>BCO BRADESCO S.A</p>
                                    </DivCard>
                                </Link>
                            </DivWrap>
                        </Actions>
                    </Container>
                </>
            }
            
            {(for1200Width && !for700Width) &&
                <>
                    <HeaderStyle style={{padding: '110px 10% 70px 10%'}}>
                        <div>
                            {!for941Width &&
                                <>
                                    <H1>Decida no que investir em segundos</H1>
                                    <P>Nossa ferramenta oferece acesso a dados atualizados, ajudando você a tomar decisões fundamentadas com confiança.</P>
                                </>
                                
                            }

                            {for941Width &&
                                <>
                                    <H1 style={{fontSize: '45px', inlineSize: 'auto'}}>Decida no que investir em segundos</H1>
                                    <P style={{inlineSize: 'auto'}}>Nossa ferramenta oferece acesso a dados atualizados, ajudando você a tomar decisões fundamentadas com confiança.</P>
                                </>
                            }

                            <Link style={{textDecoration: 'none'}} to={'acoes/page/1'}>
                                <A>Ver ativos</A>
                            </Link>
                        </div>
                    </HeaderStyle>

                    <Container style={{padding: '70px 10% 80px 10%'}}>
                        <div style={{position: 'relative'}}>
                            {for1330Width &&
                                <Input style={{width: '500px', fontSize: '14px'}} id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {flag &&
                                <Absolute id="absolute" style={{
                                    overflow: showSearch.names.length >= 5 ? 'auto' : 'visible',
                                    height: showSearch.names.length >= 5 ? '438px' : 'auto'
                                }}>
                                    {showSearch.names.map((element, index) => {
                                        return(
                                            <Link key={index} to={`acao/${showSearch.actions[index]}`} style={{textDecoration: 'none', color: 'white', width: '100%'}}>
                                                {(index == showSearch.names.length - 1) &&
                                                    <DivResult style={{border: 'solid 0px #ccc'}}> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            <p style={{margin: '0px 0px 0px 10px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                }

                                                {(index < showSearch.names.length - 1) &&
                                                    <DivResult> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            <p style={{margin: '0px 0px 0px 10px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                } 
                                            </Link>  
                                        )
                                    })
                                    }
                                </Absolute>
                            }
                        </div>

                        <Actions>
                            <h5 style={{color: 'white', margin: '0px', fontSize: '18px'}}>OS ATIVOS MAIS PROCURADOS</h5>

                            <DivWrap>
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBAS3'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBAS3.svg"></Img>

                                            <PCard>BBAS3</PCard>

                                            <p>BCO BRASIL S.A</p>
                                        </DivCard>
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBAS3.svg"></Img>

                                            <PCard>BBAS3</PCard>

                                            <p>BCO BRASIL S.A</p>
                                        </DivCard>
                                    }
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC3'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC3.svg"></Img>

                                            <PCard>BBDC3</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>  
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC3.svg"></Img>

                                            <PCard>BBDC3</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>
                                    }
                                </Link> 
                                
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/WEGE3'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>WEG</PCard>

                                            <p>WEG S.A</p>
                                        </DivCard>  
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>WEGE3</PCard>

                                            <p>WEG S.A</p>
                                        </DivCard>
                                    }
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/VALE3'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>VALE3</PCard>

                                            <p>VALE S.A</p>
                                        </DivCard>  
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/VALE3.svg"></Img>

                                            <PCard>VALE3</PCard>

                                            <p>VALE S.A</p>
                                        </DivCard>
                                    }
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/PETR3'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img style={{marginTop: '16px'}} src="https://cdn.asupernova.com.br/stocks/icons/PETR3.svg"></Img>

                                            <PCard>PETR3</PCard>

                                            <p style={{fontSize: '14px'}}>PETROLEO BRASILEIRO S.A PETROBRAS</p>
                                        </DivCard>  
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img style={{marginTop: '16px'}} src="https://cdn.asupernova.com.br/stocks/icons/PETR3.svg"></Img>

                                            <PCard>PETR3</PCard>

                                            <p style={{fontSize: '14px'}}>PETROLEO BRASILEIRO S.A PETROBRAS</p>
                                        </DivCard>
                                    }
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC4'}>
                                    {!for941Width && 
                                        <DivCard>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC4.svg"></Img>

                                            <PCard>BBDC4</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>  
                                    }

                                    {for941Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC4.svg"></Img>

                                            <PCard>BBDC4</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>
                                    }
                                </Link>
                            </DivWrap>
                        </Actions>
                    </Container>
                </>
            }

            {for700Width &&
                <>
                    <HeaderStyle style={{padding: '110px 28px 70px 28px'}}>
                        <div>
                            <H1 style={{fontSize: '30px', inlineSize: 'auto', lineHeight: '1.2'}}>Decida no que investir em segundos</H1>
                            <P style={{inlineSize: 'auto'}}>Nossa ferramenta oferece acesso a dados atualizados, ajudando você a tomar decisões fundamentadas com confiança.</P>

                            <Link style={{textDecoration: 'none'}} to={'acoes/page/1'}>
                                <A>Ver ativos</A>
                            </Link>
                        </div>
                    </HeaderStyle>

                    <Container style={{padding: '70px 28px 80px 28px'}}>
                        <div style={{position: 'relative'}}>
                            {!for620Width &&
                                <Input style={{width: '500px', fontSize: '14px'}} id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {(for620Width && !for500Width) &&
                                <Input style={{width: '380px', fontSize: '14px'}} id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {for500Width &&
                                <Input style={{width: '290px', fontSize: '14px'}} id="input" onChange={handleChange} placeholder="Pesquise pelo ativo desejado" type="text"></Input>
                            }

                            {flag &&
                                <Absolute id="absolute" style={{
                                    overflow: showSearch.names.length >= 5 ? 'auto' : 'visible',
                                    height: showSearch.names.length >= 5 ? '438px' : 'auto'
                                }}>
                                    {showSearch.names.map((element, index) => {
                                        return(
                                            <Link key={index} to={`acao/${showSearch.actions[index]}`} style={{textDecoration: 'none', color: 'white', width: '100%'}}>
                                                {(index == showSearch.names.length - 1) &&
                                                    <DivResult style={{border: 'solid 0px #ccc', padding: for620Width === true ? '10px 8px 10px 8px' : '15px 20px 15px 20px'}}> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            {!for620Width &&
                                                                
                                                                <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            }

                                                            {for620Width &&
                                                                <img style={{width: '48px', height: '48px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            }
                                                            <p style={{margin: '0px 0px 0px 10px', fontSize: '15px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px', fontSize: '15px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                }

                                                {(index < showSearch.names.length - 1) &&
                                                    <DivResult style={{padding: for620Width === true ? '10px 8px 10px 8px' : '15px 20px 15px 20px'}}> 
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            {!for620Width &&
                                                                <img style={{width: '56px', height: '56px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            }

                                                            {for620Width &&
                                                                <img style={{width: '48px', height: '48px', borderRadius: '5px'}} src={showSearch.imgs[index]}></img>
                                                            }
                                                            <p style={{margin: '0px 10px 0px 10px', fontSize: '15px'}}>{element.toUpperCase()} - {showSearch.actions[index]}</p>
                                                        </div>

                                                        <p style={{margin: '0px', fontSize: '15px'}}>R$ {showSearch.cotacao[index]}</p>
                                                    </DivResult> 
                                                } 
                                            </Link>  
                                        )
                                    })
                                    }
                                </Absolute>
                            }
                        </div>

                        <Actions>
                            <h5 style={{color: 'white', margin: '0px', fontSize: '18px'}}>OS ATIVOS MAIS PROCURADOS</h5>

                            <DivWrap>
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBAS3'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBAS3.svg"></Img>

                                            <PCard>BBAS3</PCard>

                                            <p>BCO BRASIL S.A</p>
                                        </DivCard>
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBAS3.svg"></Img>

                                            <PCard>BBAS3</PCard>

                                            <p>BCO BRASIL S.A</p>
                                        </DivCard>
                                    }
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC3'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC3.svg"></Img>

                                            <PCard>BBDC3</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>  
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC3.svg"></Img>

                                            <PCard>BBDC3</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>
                                    }
                                </Link> 
                                
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/WEGE3'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>WEG</PCard>

                                            <p>WEG S.A</p>
                                        </DivCard>  
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>WEGE3</PCard>

                                            <p>WEG S.A</p>
                                        </DivCard>
                                    }
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/VALE3'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/WEGE3.svg"></Img>

                                            <PCard>VALE3</PCard>

                                            <p>VALE S.A</p>
                                        </DivCard>  
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/VALE3.svg"></Img>

                                            <PCard>VALE3</PCard>

                                            <p>VALE S.A</p>
                                        </DivCard>
                                    }
                                </Link>
            
                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/PETR3'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img style={{marginTop: '16px'}} src="https://cdn.asupernova.com.br/stocks/icons/PETR3.svg"></Img>

                                            <PCard>PETR3</PCard>

                                            <p style={{fontSize: '14px'}}>PETROLEO BRASILEIRO S.A PETROBRAS</p>
                                        </DivCard>  
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img style={{marginTop: '16px'}} src="https://cdn.asupernova.com.br/stocks/icons/PETR3.svg"></Img>

                                            <PCard>PETR3</PCard>

                                            <p style={{fontSize: '14px'}}>PETROLEO BRASILEIRO S.A PETROBRAS</p>
                                        </DivCard>
                                    }
                                </Link>

                                <Link style={{textDecoration: 'none', color: 'white'}} to={'acao/BBDC4'}>
                                    {!for430Width && 
                                        <DivCard style={{width: '280px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC4.svg"></Img>

                                            <PCard>BBDC4</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>  
                                    }

                                    {for430Width && 
                                        <DivCard style={{width: '200px'}}>
                                            <Img src="https://cdn.asupernova.com.br/stocks/icons/BBDC4.svg"></Img>

                                            <PCard>BBDC4</PCard>

                                            <p>BCO BRADESCO S.A</p>
                                        </DivCard>
                                    }
                                </Link>
                            </DivWrap>
                        </Actions>
                    </Container>
                </>
            }
        </>
    )
}

const HeaderStyle = styled.header`
    background-color: #173e5b;
    padding: 110px 16% 70px 16%;
`

const H1 = styled.h1`
    inline-size: 570px;
    overflow-wrap: break-word;
    line-height: 50px;
    font-weight: 700;
    color: white;
    margin: 0; 
    font-size: 50px;
`

const P = styled.p`
    color: white;
    inline-size: 600px;
    overflow-wrap: break-word;
    font-weight: 300;
    margin-top: 10px;
    margin-bottom: 20px;
`

const A = styled.a`
    text-decoration: none;
    color: white;
    padding: 10px 20px 10px 20px;
    background-color: hsl(213 100% 51%);
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        transition: 0.2s ease-in-out;
        color: black;
    }
`

const Container = styled.div`
    background-color: #101318; 
    padding: 70px 16% 80px 16%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    color: #ccc;
    width: 800px;
    border-radius: 20px;
    padding: 8px 13px 8px 13px;
    background-color: #101318;
    border: solid 1px hsl(206 61% 65%);

    &:focus{
        outline: #173e5b;
    }
`

const Actions = styled.div`
    background-color: #171b26;
    border-radius: 10px;
    padding: 40px 30px 40px 30px;
    margin-top: 80px;
    width: 100%;
`

const DivCard = styled.div`
  border-radius: 10px;
  background-color: #32384d;
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200px;
  height: 220px;
  cursor: pointer;
  padding: 0px 15px 0px 15px;
  transition: ease-in-out 0.1s;

  &:hover{
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
  }
`

const DivWrap = styled.div`
    flex-wrap: wrap; 
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
    color: white;
`

const Img = styled.img`
    height: 56px;
    width: 56px;
    border-radius: 5px;
    margin-bottom: 5px;
`

const PCard = styled.p`
    font-weight: 600;
    margin-bottom: 5px;
`

const Absolute = styled.div`
    position: absolute;
    background-color: #171b26;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    width: 100%;
    margin-top: 20px;
    border: solid 1px hsl(206 61% 65%);
    border-radius: 10px;
`

const DivResult = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between;
    width: 100%;
    padding: 15px 20px 15px 20px;
    border-bottom: solid 1px #ccc;

    > *{
      &:last-child {
         border: solid 0px #ccc;
      }
    }
`

export default Home