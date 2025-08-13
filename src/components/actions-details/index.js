import { useEffect, useState }  from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import Spinner from 'react-bootstrap/Spinner'

const ActionDetails = () => {
    const for1475Width = useMediaQuery({query: '(max-width: 1475px)'})
    const for970Width = useMediaQuery({query: '(max-width: 970px)'})
    const for830Width = useMediaQuery({query: '(max-width: 830px)'})
    const for640Width = useMediaQuery({query: '(max-width: 640px)'})
    const for465Width = useMediaQuery({query: '(max-width: 465px)'})

    const [flag, setFlag] = useState(true)
    
    useEffect(() => {
        document.getElementById('root').style.height = '100vh'
        document.getElementById('root').style.overflow = 'hidden'
    }, [])

    const [showData, setData] = useState([])
    const [showImg, setImg] = useState(null)
    const [showName, setName] = useState(null)
    const [showCotacao, setCotacao] = useState(null)
    const [showVariacao, setVariacao] = useState(null)
    const [showArrow, setArrow] = useState(null)
    const [showResultFundamentalIndicators, setResultFundamentalIndicators] = useState([])
    const [showResultFundamentalIndicatorsName, setResultFundamentalIndicatorsName] = useState([])
    const [showResultInformation, setResultInformation] = useState([])
    const [showResultInformationName, setResultInformationName] = useState([])
    const [showDemonstrativeData, setDemonstrativeData] = useState({last_exercise: '', last_trimester: ''})
    const [notFound, setNotFound] = useState(false)

    var { action } = useParams()

    useEffect(() => {   
        const getData = async () => {
            const response = await fetch('http://localhost:3000/post-action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({action: action})
            })
            const output = await response.json()

            if(Object.keys(output).length > 0){
                setDemonstrativeData(output.demonstrativeData)
                setResultInformationName(output.data.resultInformationName)
                setResultInformation(output.data.resultInformation)
                setArrow(output.data.arrow)
                setName(output.data.name)
                setImg(output.data.src)
                setCotacao(output.data.cotacao)
                setVariacao(output.data.variacao)
                setResultFundamentalIndicators(output.data.resultFundamentalIndicators)
                setResultFundamentalIndicatorsName(output.data.resultFundamentalIndicatorsName)
                setData(output.data.data)
            }

            else{
                setNotFound(true)
                setFlag(false)
                document.getElementById('root').style.minHeight = '100%'
                document.getElementById('root').style.overflow = 'visible'
            }
        }
        getData()
    }, [])

    const handleLoad = () => {
        if(document.getElementById('img').src !== null){
            setFlag(false)
            document.getElementById('root').style.minHeight = '100%'
            document.getElementById('root').style.overflow = 'visible'
        }
    }
    
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

            {!for1475Width &&
                <>
                    <SubHeader>
                        <div style={{padding: '20px 0px 5px 0px', borderBottom: 'solid #ccc 1px'}}>
                            <Link to='/' style={{textDecoration: 'none'}}>
                                <Home>Home </Home>
                            </Link>

                            <span style={{color:'rgb(165, 170, 177)' }}>/ </span>

                            <Link to='/acoes/page/1' style={{textDecoration: 'none'}}>
                                <Home>Ações</Home>
                            </Link>

                            <span style={{color:'rgb(165, 170, 177)'}}> / </span>
                            <span style={{color:'rgb(165, 170, 177)'}}>{notFound ? '' : action}</span>
                        </div>  

                        <div style={{display: 'flex', alignItems: 'center', padding: '20px 0px 20px 0px'}}>
                            <DivImg style={{marginRight: '15px'}}>
                                <img id='img' onLoad={handleLoad} style={{height: '80px', width: '80px', borderRadius: '10px'}} alt='' src={showImg}></img>
                            </DivImg>   

                            <div>
                                <h2 style={{margin: '0', color: 'white'}}>{notFound ? 'Não encontrado' : action}</h2>
                                <p style={{margin: '0', color: 'white'}}>{showName}</p>
                            </div>
                        </div>
                    </SubHeader>

                    <Indicators>
                        <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto auto', gridGap: '20px'}}>
                            <Card>
                                <div>
                                    <p style={{color: '#6faddc'}}>COTAÇÃO</p>
                                </div>

                                <h4 style={{color: 'white'}}>{showCotacao}</h4>
                            </Card>
                                
                            <Card>
                                <div>
                                    <p style={{color: '#6faddc'}}>VARIAÇÃO (12M)</p>
                                </div>

                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <h4 style={{color: 'white'}}>{showVariacao}</h4>
                                    <img style={{margin: '0px 0px 0.6rem 7px'}} src={showArrow}></img>
                                </div>
                            </Card>

                            <Card>
                                <div>
                                    <p style={{color: '#6faddc'}}>P/L</p>
                                </div>

                                <h4 style={{color: 'white'}}>{showResultFundamentalIndicators[0]}</h4>
                            </Card>

                            <Card>
                                <div>
                                    <p style={{color: '#6faddc'}}>P/VP</p>
                                </div>

                                <h4 style={{color: 'white'}}>{showResultFundamentalIndicators[2]}</h4>
                            </Card>

                            <Card>
                                <div>
                                    <p style={{color: '#6faddc'}}>DY</p>
                                </div>

                                <h4 style={{color: 'white'}}>{showResultFundamentalIndicators[3]}</h4>
                            </Card>
                        </div>

                        <FundamentalIndicators>
                            <div>
                                <h5 style={{color: 'white', margin: '0px'}}>DADOS SOBRE A EMPRESA</h5>
                            </div>

                
                            <div style={{marginTop: '15px'}}>
                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Nome da Empresa: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[0]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>CNPJ: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[1]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Ano de estreia na bolsa: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[2]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Número de funcionários: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[3]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Ano de fundação: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[4]}</span>
                                </div>
                            </div>
                        </FundamentalIndicators>

                        <FundamentalIndicators>
                            <div>
                                <h5 style={{color: 'white', margin: '0px'}}>INDICADORES FUNDAMENTALISTAS {notFound ? '' : action}</h5>
                            </div>

                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridGap: '10px', marginTop: '20px'}}>
                                {showResultFundamentalIndicatorsName.map((element, index) => {
                                        return(
                                            <DivText key={index}>
                                                <P style={{color: '#6faddc'}}>{element}</P>
                                                <P style={{color: 'white'}}>{showResultFundamentalIndicators[index]}</P>
                                            </DivText>
                                        )
                                    })
                                }
                            </div>
                        </FundamentalIndicators>

                        <FundamentalIndicators>
                            <div>
                                <h5 style={{color: 'white', margin: '0px'}}>INFORMAÇÕES SOBRE A EMPRESA</h5>
                            </div>

                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto', gridGap: '10px', marginTop: '20px'}}>
                                {showResultInformationName.map((element, index) => {
                                        return(
                                            <DivText key={index}>
                                                <P style={{color: '#6faddc'}}>{element}</P>
                                                <P style={{color: 'white'}}>{showResultInformation[index]}</P>
                                            </DivText>
                                        )
                                    })
                                }
                            </div>
                        </FundamentalIndicators>

                        <FundamentalIndicators>
                            <div>
                                <h5 style={{color: 'white', margin: '0px'}}>DADOS DEMONSTRATIVOS DE RESULTADOS</h5>
                            </div>

                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px', marginTop: '20px'}}>
                                <div>
                                    <p style={{color: '#6faddc', fontSize: '18px'}}>Último Exercício</p>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.receita_liquida}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_bruto}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.ebit}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_liquido}</span>
                                    </div>
                                </div>

                                <div>
                                    <p style={{color: '#6faddc', fontSize: '18px'}}>Último Trimestre</p>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.receita_liquida}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_bruto}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.ebit}</span>
                                    </div>

                                    <div>
                                        <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                        <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_liquido}</span>
                                    </div>
                                </div>
                            </div>
                        </FundamentalIndicators>
                    </Indicators>
                </>
            }

            {for1475Width &&
                <>
                    <SubHeader style={{padding: for970Width ? '0px 30px 0px 30px' : '0px 8% 0px 8%'}}>
                        <div style={{padding: '20px 0px 5px 0px', borderBottom: 'solid #ccc 1px'}}>
                            <Link to='/' style={{textDecoration: 'none'}}>
                                <Home>Home </Home>
                            </Link>

                            <span style={{color:'rgb(165, 170, 177)' }}>/ </span>

                            <Link to='/acoes/page/1' style={{textDecoration: 'none'}}>
                                <Home>Ações</Home>
                            </Link>

                            <span style={{color:'rgb(165, 170, 177)'}}> / </span>
                            <span style={{color:'rgb(165, 170, 177)'}}>{notFound ? '' : action}</span>
                        </div>  

                        <div style={{display: 'flex', alignItems: 'center', padding: '20px 0px 20px 0px'}}>
                            <DivImg style={{
                                marginRight: '15px',
                                height: for640Width ? '70px' : '100px', 
                                width: for640Width ? '70px' : '100px'
                            }}>
                                <img style={{
                                    height: for640Width ? '50px' : '80px', 
                                    width: for640Width ? '50px' : '80px',
                                    borderRadius: '10px'
                                }} id='img' onLoad={handleLoad} alt='' src={showImg}></img>
                            </DivImg>   

                            <div>
                                <h2 style={{margin: '0', color: 'white', fontSize: for640Width ? '20px' : '25px'}}>{notFound ? 'Não encontrado' : action}</h2>
                                <p style={{margin: '0', color: 'white', fontSize: for640Width ? '14px' : '16px'}}>{showName}</p>
                            </div>
                        </div>
                    </SubHeader>

                    <Indicators style={{padding: for970Width ? '40px 30px 40px 30px' : '40px 8% 40px 8%'}}>
                        {!for830Width &&
                            <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto auto', gridGap: '20px'}}>
                                <Card>
                                    <div>
                                        <p style={{color: '#6faddc'}}>COTAÇÃO</p>
                                    </div>

                                    <h4 style={{
                                        color: 'white',
                                        fontSize: for970Width ? '20px' : '23px'
                                    }}>{showCotacao}</h4>
                                </Card>
                                    
                                <Card>
                                    <div>
                                        <p style={{color: '#6faddc'}}>VARIAÇÃO (12M)</p>
                                    </div>

                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showVariacao}</h4>
                                        <img style={{margin: '0px 0px 0.6rem 7px'}} src={showArrow}></img>
                                    </div>
                                </Card>

                                <Card>
                                    <div>
                                        <p style={{color: '#6faddc'}}>P/L</p>
                                    </div>

                                    <h4 style={{
                                        color: 'white',
                                        fontSize: for970Width ? '20px' : '23px'
                                    }}>{showResultFundamentalIndicators[0]}</h4>
                                </Card>

                                <Card>
                                    <div>
                                        <p style={{color: '#6faddc'}}>P/VP</p>
                                    </div>

                                    <h4 style={{
                                        color: 'white',
                                        fontSize: for970Width ? '20px' : '23px'
                                    }}>{showResultFundamentalIndicators[2]}</h4>
                                </Card>

                                <Card>
                                    <div>
                                        <p style={{color: '#6faddc'}}>DY</p>
                                    </div>

                                    <h4 style={{
                                        color: 'white',
                                        fontSize: for970Width ? '20px' : '23px'
                                    }}>{showResultFundamentalIndicators[3]}</h4>
                                </Card>
                            </div>
                        }

                        {(for830Width && !for465Width) &&
                            <>
                                <Card style={{textAlign: 'center'}}>
                                    <div>
                                        <p style={{color: '#6faddc'}}>COTAÇÃO</p>
                                    </div>

                                    <h4 style={{
                                        color: 'white',
                                        fontSize: for970Width ? '20px' : '23px'
                                    }}>{showCotacao}</h4>
                                </Card>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px', marginTop: '20px'}}>    
                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>VARIAÇÃO (12M)</p>
                                        </div>

                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <h4 style={{
                                                color: 'white',
                                                fontSize: for970Width ? '20px' : '23px'
                                            }}>{showVariacao}</h4>
                                            <img style={{margin: '0px 0px 0.6rem 7px'}} src={showArrow}></img>
                                        </div>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>P/L</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[0]}</h4>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>P/VP</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[2]}</h4>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>DY</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[3]}</h4>
                                    </Card>
                                </div>
                            </>
                        }

                        {for465Width &&
                            <>
                                <div style={{display: 'grid', gridTemplateColumns: '1fr', gridGap: '20px', marginTop: '20px'}}>    
                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>COTAÇÃO</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showCotacao}</h4>
                                    </Card>
                                    
                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>VARIAÇÃO (12M)</p>
                                        </div>

                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <h4 style={{
                                                color: 'white',
                                                fontSize: for970Width ? '20px' : '23px'
                                            }}>{showVariacao}</h4>
                                            <img style={{margin: '0px 0px 0.6rem 7px'}} src={showArrow}></img>
                                        </div>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>P/L</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[0]}</h4>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>P/VP</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[2]}</h4>
                                    </Card>

                                    <Card style={{textAlign: 'center'}}>
                                        <div>
                                            <p style={{color: '#6faddc'}}>DY</p>
                                        </div>

                                        <h4 style={{
                                            color: 'white',
                                            fontSize: for970Width ? '20px' : '23px'
                                        }}>{showResultFundamentalIndicators[3]}</h4>
                                    </Card>
                                </div>
                            </>
                        }

                        <FundamentalIndicators style={{padding: for465Width ? '30px 20px 30px 20px' : '30px'}}>
                            <div>
                                <h5 style={{color: 'white', margin: '0px', fontSize: for465Width ? '18px' : '20px'}}>DADOS SOBRE A EMPRESA</h5>
                            </div>

                
                            <div style={{marginTop: '15px'}}>
                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Nome da Empresa: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[0]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>CNPJ: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[1]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Ano de estreia na bolsa: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[2]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Número de funcionários: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[3]}</span>
                                </div>

                                <div>
                                    <span style={{color: '#6faddc', fontSize: '18px'}}>Ano de fundação: </span>
                                    <span style={{color: 'white', fontSize: '18px'}}>{showData[4]}</span>
                                </div>
                            </div>
                        </FundamentalIndicators>

                        <FundamentalIndicators style={{padding: for465Width ? '30px 20px 30px 20px' : '30px'}}>
                            <div>
                                <h5 style={{color: 'white', margin: '0px', fontSize: for465Width ? '18px' : '20px'}}>INDICADORES FUNDAMENTALISTAS {notFound ? '' : action}</h5>
                            </div>

                            {!for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridGap: '10px', marginTop: '20px'}}>
                                    {showResultFundamentalIndicatorsName.map((element, index) => {
                                            return(
                                                <DivText key={index}>
                                                    <P style={{color: '#6faddc'}}>{element}</P>
                                                    <P style={{color: 'white'}}>{showResultFundamentalIndicators[index]}</P>
                                                </DivText>
                                            )
                                        })
                                    }
                                </div>
                            }

                            {for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: for465Width ? '1fr' : '1fr 1fr', gridGap: '10px', marginTop: '20px'}}>
                                    {showResultFundamentalIndicatorsName.map((element, index) => {
                                            return(
                                                <DivText key={index}>
                                                    <P style={{color: '#6faddc'}}>{element}</P>
                                                    <P style={{color: 'white'}}>{showResultFundamentalIndicators[index]}</P>
                                                </DivText>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </FundamentalIndicators>

                        <FundamentalIndicators style={{padding: for465Width ? '30px 20px 30px 20px' : '30px'}}> 
                            <div>
                                <h5 style={{color: 'white', margin: '0px', fontSize: for465Width ? '18px' : '20px'}}>INFORMAÇÕES SOBRE A EMPRESA</h5>
                            </div>
                            
                            {!for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '10px', marginTop: '20px'}}>
                                    {showResultInformationName.map((element, index) => {
                                            return(
                                                <DivText key={index}>
                                                    <P style={{color: '#6faddc'}}>{element}</P>
                                                    <P style={{color: 'white'}}>{showResultInformation[index]}</P>
                                                </DivText>
                                            )
                                        })
                                    }
                             </div>
                            }

                            {for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: for465Width ? '1fr' : '1fr 1fr', gridGap: '10px', marginTop: '20px'}}>
                                    {showResultInformationName.map((element, index) => {
                                            return(
                                                <DivText key={index}>
                                                    <P style={{color: '#6faddc'}}>{element}</P>
                                                    <P style={{color: 'white'}}>{showResultInformation[index]}</P>
                                                </DivText>
                                            )
                                        })
                                    }
                             </div>
                            }
                        </FundamentalIndicators>

                        <FundamentalIndicators style={{padding: for465Width ? '30px 20px 30px 20px' : '30px'}}>
                            <div>
                                <h5 style={{color: 'white', margin: '0px', fontSize: for465Width ? '18px' : '20px'}}>DADOS DEMONSTRATIVOS DE RESULTADOS</h5>
                            </div>

                            {!for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px', marginTop: '20px'}}>
                                    <div>
                                        <p style={{color: '#6faddc', fontSize: '18px'}}>Último Exercício</p>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.receita_liquida}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_bruto}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.ebit}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_liquido}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p style={{color: '#6faddc', fontSize: '18px'}}>Último Trimestre</p>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.receita_liquida}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_bruto}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.ebit}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_liquido}</span>
                                        </div>
                                    </div>
                                </div>
                            }

                            {for830Width &&
                                <div style={{display: 'grid', gridTemplateColumns: '1fr', gridGap: '30px', marginTop: '20px'}}>
                                    <div>
                                        <p style={{color: '#6faddc', fontSize: '18px'}}>Último Exercício</p>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.receita_liquida}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_bruto}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.ebit}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_exercise.lucro_liquido}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p style={{color: '#6faddc', fontSize: '18px'}}>Último Trimestre</p>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Receita Líquida: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.receita_liquida}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Bruto: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_bruto}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>EBIT: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.ebit}</span>
                                        </div>

                                        <div>
                                            <span style={{color: '#6faddc', fontSize: '18px'}}>Lucro Líquido: </span>
                                            <span style={{color: 'white', fontSize: '18px'}}>R$ {showDemonstrativeData.last_trimester.lucro_liquido}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </FundamentalIndicators>
                    </Indicators>
                </>
            }
        </>
    )
}

const Overlay = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color:rgba(16, 19, 24, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`

const SubHeader = styled.div`
    background-color: #173e5b;
    padding: 0px 18% 0px 18%;
`

const DivImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 100px;
    width: 100px;
    padding: 10px;
    background-color: white;
`

const Home = styled.span`
    color:rgb(165, 170, 177);
    cursor: pointer;

    &:hover{
        transition: 0.2s ease-in-out;
        color: white;
    }
`

const Indicators = styled.div`
    padding: 40px 18% 40px 18%;
    background-color: #101318;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #32384d;
    border-radius: 10px;
    padding: 10px 30px 10px 30px;
`

const FundamentalIndicators = styled.div`
    background-color: #32384d;
    border-radius: 10px;
    padding: 30px;
    margin-top: 50px;
`

const P = styled.div`
    margin: 0;
`

const DivText = styled.div`
    border: solid 1px #ccc;
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
`

export default ActionDetails