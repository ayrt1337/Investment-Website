const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

const app = express()

const options = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(options))

app.listen(3000, () => {
  console.log('Server started')
})

app.get('/', (req, res) => {
    res.status(200).send('Welcome')
})

const getImage = async(url) => {
  const response = await axios(url)
  const data = response.data

  const $ = cheerio.load(data)

  const result = []
  const selectedElement = '.animated > .site > .page > .template-front-ticker-list > .section-sectors > .container > .box > .grid > .actions > .fadeInDown > .actions-card > a > .actions-header'

  $(selectedElement).each((parentIndex, parentElement) => {
      $(parentElement).children().each((childId, childElement) => {
          const src = $(childElement).prop('src')
          if(src){
              result.push('https://investidor10.com.br' + src)
          }
      })
  })
  return result
}

const getTitle = async(url) => {
  const response = await axios(url)
  const data = response.data

  const $ = cheerio.load(data)

  const result = []
  const selectedElement = '.animated > .site > .page > .template-front-ticker-list > .section-sectors > .container > .box > .grid > .actions > .fadeInDown > .actions-card > a > .actions-content > .actions-title'

  $(selectedElement).each((elementIndex, element) => {
        const title = $(element).text()

        if(title){
          result.push(title)
      }
  })
  return result
}

const getIndicators = async (url) => {
    const response = await axios(url)
    const data = response.data

    const $ = cheerio.load(data)

    const result = []
    const keys = ['pl', 'pvp', 'dy', 'roe']
    let keyIndex = 0
    let dataText = {}
    const selectedElement = '.animated > .site > .page > .template-front-ticker-list > .section-sectors > .container > .box > .grid > .actions > .fadeInDown > .actions-card > a > .actions-content > .actions-codes > div'

    $(selectedElement).each((parentIndex, parentElement) => {
      if(keyIndex == 4 ) dataText = {}

      $(parentElement).children().each((childId, childElement) => {
          const text = $(childElement).text()
          if(text){
              if(childId == 1 || childId % 2 !== 0){
                if(keyIndex == 4) keyIndex = 0

                dataText[keys[keyIndex]] = text
                keyIndex++
              }
          }
      })

      if(keyIndex == 4) result.push(dataText)
    })
    return result
}

app.post('/post-page', async (req, res) => {
  const page = req.body.page
  const url = `https://investidor10.com.br/acoes/?page=${page}`

  const [img, indicators, title] = await Promise.all([
    getImage(url),
    getIndicators(url),
    getTitle(url)
  ])

  res.status(200).json({
    imgs: img,
    indicators: indicators,
    title: title,
  })
})

const getSubHeader = async (url) => {
  const data = await axios(url)
  const response = data.data

  const $ = cheerio.load(response)

  const resultFundamentalIndicatorsName = []
  const resultFundamentalIndicators = []
  const resultDataEmpresa = []
  const resultInformationName = []
  const resultInformation = []

  const selectedItemImg = '.site > .template-front-ticker-show > main > header > .container > #header_action > .action > .logo > img'
  const selectedName = '.site > .template-front-ticker-show > main > header > .container > #header_action > .action > .name-ticker > h2'
  const selectedCotacao = '.site > .template-front-ticker-show > main > section > .container > #cards-ticker > .cotacao > ._card-body > div > span'
  const selectedVariacao = '.site > .template-front-ticker-show > main > section > .container > #cards-ticker > .pl > ._card-body > div > span'
  const selectedArrow = '.site > .template-front-ticker-show > main > section > .container > #cards-ticker > .pl > ._card-body > div > img'
  const selectedFundamentalIndicatorsName = '.site > .template-front-ticker-show > main > .section-sectors > .container > #indicators_basileia > #indicators > .content > #container-multi-medias > #table-indicators > .cell > span'
  const selectedFundamentalIndicators = '.site > .template-front-ticker-show > main > .section-sectors > .container > #indicators_basileia > #indicators > .content > #container-multi-medias > #table-indicators > .cell > .value > span'
  const selectedData = '.site > .template-front-ticker-show > main > section > .container > #about-company > #data_about > .content > .columns > .basic_info > table > tbody > tr > .value'
  const selectedInformationName = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > .title'
  const selectedInformation = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > .value'

  let src

  if($(selectedItemImg).prop('src') !== 'assets/images/not-found-thumbnail.png'){
    src = 'https://investidor10.com.br' + $(selectedItemImg).prop('src')
  }

  else src = 'https://investidor10.com.br/assets/images/not-found-thumbnail.png'
  
  const name = $(selectedName).text()
  const cotacao = $(selectedCotacao).text()
  const variacao = $(selectedVariacao).text()
  const arrow = $(selectedArrow).prop('src')

  $(selectedFundamentalIndicatorsName).each((index, element) => {
    resultFundamentalIndicatorsName.push($(element).text())
  })

  $(selectedFundamentalIndicators).each((index, element) => {
    const newElement = $(element).text().replaceAll(' ', '')
    const newElement2 = newElement.replaceAll('\n', '')
    resultFundamentalIndicators.push(newElement2)
  })

  $(selectedData).each((index, element) => {
    resultDataEmpresa.push($(element).text())
  })

  $(selectedInformationName).each((index, element) => {
    resultInformationName.push($(element).text())
    
    if(index == 12){
      const selectedInformationName2 = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > a > .title'
      $(selectedInformationName2).each((index, element) => {
        resultInformationName.push($(element).text())
      })
    }

    else if(index == $(selectedInformationName).length - 1){
      const selectedInformationName2 = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > a > .title'
      $(selectedInformationName2).each((index, element) => {
        resultInformationName.push($(element).text())
      })
    }
  })

  $(selectedInformation).each((index, element) => {    
    if($(element).children().length > 0){
      $(element).children().each((index, element) => {
        if(index % 2 == 0 || index == 0){
          resultInformation.push($(element).text())
        }
      })
    }

    else resultInformation.push($(element).text())

    if(index == 12){
      const selectedInformation3 = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > a > .value'
        $(selectedInformation3).each((index, element) => {
          resultInformation.push($(element).text())
      })
    }

    else if(index == $(selectedInformationName).length - 1){
      const selectedInformationName2 = '.site > .template-front-ticker-show > main > .section-sectors > .container > #about-company > #info_about > .content > #table-indicators-company > .cell > a > .value'
      $(selectedInformationName2).each((index, element) => {
        resultInformation.push($(element).text())
      })
    }
  })

  const result = {
    arrow: arrow,
    src: src,
    name: name,
    cotacao: cotacao,
    variacao: variacao,
    resultFundamentalIndicators,
    resultFundamentalIndicatorsName,
    data: resultDataEmpresa,
    resultInformationName,
    resultInformation
  }

  return result
}

const getDemonstrativeData = async (action) => {
  if(action.toLowerCase() !== 'hvan3'){
    const url = `https://www.dadosdemercado.com.br/acoes/${action}`
    const data = await axios(url)
    const response = data.data
    const $ = cheerio.load(response)

    const result = {}
    const result2 = {}
  
    const arr = []
    const arr2 = []
  
    const selectedLastExercise = '.page > #incomesYear > .normal-table > tbody > .level0 > .nw'
    const selectedLastTrimester = '.page > #incomes > .normal-table > tbody > .level0 > .nw'
  
    $(selectedLastExercise).each((index, element) => {
      arr[index] = $(element).text()
  
      if(index > 0){
        if(arr[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'receita_liquida' || 
          arr[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'lucro_bruto' || 
          arr[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'ebit' || 
          arr[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'lucro_liquido'){
            result[`${arr[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_')}`] = $(element).text().replaceAll('\n', '').replaceAll(' ', '')
        }
      }
    })
  
    $(selectedLastTrimester).each((index, element) => {
      arr2[index] = $(element).text()
  
      if(index > 0){
        if(arr2[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'receita_liquida' || 
          arr2[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'lucro_bruto' || 
          arr2[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'ebit' || 
          arr2[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_') == 'lucro_liquido'){
            result2[`${arr2[index - 1].toLowerCase().replaceAll('í', 'i').replaceAll(' ', '_')}`] = $(element).text().replaceAll('\n', '').replaceAll(' ', '')
        }
      }
    })
  
    const demonstrativeData = {
      last_exercise: result,
      last_trimester: result2
    }
  
    return demonstrativeData
  }
  else{
    const demonstrativeData = {
      last_exercise: {
        receita_liquida: '',
        lucro_bruto: '',
        ebit: '',
        lucro_liquido: ''
      },
      last_trimester: {
        receita_liquida: '',
        lucro_bruto: '',
        ebit: '',
        lucro_liquido: ''
      }
    }

    return demonstrativeData
  }
}

app.post('/post-action', async (req, res) => {
  const action = req.body.action
  const url = `https://investidor10.com.br/acoes/${action}/`

  const [data, demonstrativeData] = await Promise.all([
    getSubHeader(url),
    getDemonstrativeData(action)
  ])

  res.status(200).json({
      data: data,
      demonstrativeData
  })
})

const getHomeData = async () => {
  const url = 'https://www.dadosdemercado.com.br/acoes'
  const data = await axios(url)
  const response = data.data

  const $ = cheerio.load(response)

  const resultAction = []
  const resultName = []
  const resultCotacao = []
  const resultImg = []

  const selectedIItem = '.page > .table-container > #stocks > tbody > tr'

  $(selectedIItem).each((index, element) => {
    $(element).children().each((index, element) => {
      if(index == 0){
        resultAction.push($(element).text())
        resultImg.push(`https://analitica.auvp.com.br/api/cdn/images/assets/${$(element).text()}.svg`)
      }
      else if(index == 1) resultName.push($(element).text())
      else if(index == 3) resultCotacao.push($(element).text())
    })
  })

  const result = {
    actions: resultAction,
    names: resultName,
    cotacao: resultCotacao,
    img: resultImg
  }

  return result
}

app.get('/data-home', async (req, res) => {
  const data = await getHomeData()

  res.status(200).json({
    data
  })
})