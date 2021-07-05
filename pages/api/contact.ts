// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodemailer from 'nodemailer'
import { dev } from '@/config/index'
import url from 'url'
import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { WebServiceClient } from '@maxmind/geoip2-node'

const email = async (req, res) => {
  process.env.TZ = 'Europe/Moscow'
  // data from the client
  let {
    field,
    uni,
    number,
    userName,
    question,
    contactWay,
    contact,
    userCity,
    userCountry,
    googleClientId,
    userDevice,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    double
  } = req.body

  // geoip2 init
  const geoip2 = new WebServiceClient('550199', process.env.GEO2_APIKEY, {
    host: 'geolite.info'
  })

  // moment init
  const now = moment()

  // get protocol
  const protocol = req.headers['x-forwarded-proto']

  // get root path
  const root = protocol + '://' + req.headers.host

  // get ip
  const ip =
    req.headers['x-forwarded-for'] ||
    // req.socket.remoteAddress ||
    req.connection.remoteAddress ||
    null

  const getUserLocation = async () => {
    try {
      const res = await geoip2.city(ip.toString())
      const output = {
        continent: {
          code: res.continent.code,
          names: {
            ru: res.continent.names.ru,
            en: res.continent.names.en
          }
        },
        country: {
          code: res.country.isoCode,
          names: {
            ru: res.country.names.ru,
            en: res.country.names.en
          }
        },
        city: {
          names: {
            en: res.city.names.en,
            ru: res.city.names.ru
          }
        },
        coordinates: {
          accuracyRadius: res.location.accuracyRadius,
          latitude: res.location.latitude,
          longitude: res.location.longitude
        },
        timeZone: res.location.timeZone,
        postalCode: res.postal.code
      }
      return output
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const locationData = await getUserLocation()

  const data = {
    id: uuidv4(),
    date: now.format('DD-MM-YYYY'),
    time: now.format('HH:mm:ss'),
    utc: now.format('Z'),
    name: userName || 'Не указано',
    phone: number || '-',
    email: contact || '-',
    contactWay: contactWay || '-',
    field: field || 'Не указано',
    uni: uni || 'Не указано',
    question: question || '-',
    googleClientId: googleClientId || '-',
    userDevice: userDevice || 'Не определён',
    utmSource: utmSource || '-',
    utmMedium: utmMedium || '-',
    utmCampaign: utmCampaign || '-',
    utmContent: utmContent || '-',
    utmTerm: utmTerm || '-',
    double: double || 'Нет',
    root: root || '',
    ip,
    cityEn: (locationData && locationData.city.names.en) || userCity,
    cityRu: locationData && locationData.city.names.ru,
    countryCode: locationData && locationData.country.code,
    countryEn: (locationData && locationData.country.names.en) || userCountry,
    countryRu: locationData && locationData.country.names.ru,
    continentCode: locationData && locationData.continent.code,
    continentEn: locationData && locationData.continent.names.en,
    continentRu: locationData && locationData.continent.names.ru,
    accuracyRadius: locationData && locationData.coordinates.accuracyRadius,
    latitude: locationData && locationData.coordinates.latitude,
    longitude: locationData && locationData.coordinates.longitude,
    timeZone: locationData && locationData.timeZone,
    postalCode: locationData && locationData.postalCode
  }

  const subject =
    data.question === '-'
      ? 'Новая заявка с РосУчеба'
      : 'Новый вопрос с РосУчеба'

  const createEmailBody = () => {
    // const createTr = (item, idx) => {
    //   const output = /* html */ `
    //     <tr id='tr-item-${idx}' class="${idx % 2 === 0 && 'bgOnEven'} ${
    //     item.tdKey === 'Телефон' && 'active-row'
    //   } ${!(idx + 1) && 'bgBorderHighlight'}">
    //       <td class="counterCell">${idx + 1}</td>
    //       <td>${item.tdKey}</td>
    //       <td>${item.tdVal}</td>
    //     </tr>
    //   `
    //   return output
    // }

    // const tbodyTrs = [
    //   {
    //     tdKey: 'ID',
    //     tdVal: data.id
    //   },
    //   {
    //     tdKey: 'Дата',
    //     tdVal: data.date
    //   },
    //   {
    //     tdKey: 'Время',
    //     tdVal: data.time
    //   },
    //   {
    //     tdKey: 'UTC',
    //     tdVal: data.utc
    //   },
    //   {
    //     tdKey: 'Имя',
    //     tdVal: data.name
    //   },
    //   {
    //     tdKey: 'Телефон',
    //     tdVal: data.phone
    //   },
    //   {
    //     tdKey: 'Почта',
    //     tdVal: data.email
    //   },
    //   {
    //     tdKey: 'Промокод',
    //     tdVal: data.promocode
    //   },
    //   {
    //     tdKey: 'Способ связи',
    //     tdVal: data.contactWay
    //   },
    //   {
    //     tdKey: 'Лид сайт',
    //     tdVal: data.root
    //   },
    //   {
    //     tdKey: 'Лид страница',
    //     tdVal: data.leadPage
    //   },
    //   {
    //     tdKey: 'IP',
    //     tdVal: data.ip
    //   },
    //   {
    //     tdKey: 'Город (en)',
    //     tdVal: data.cityEn
    //   },
    //   {
    //     tdKey: 'Город (ru)',
    //     tdVal: data.cityRu
    //   },
    //   {
    //     tdKey: 'Код страны',
    //     tdVal: data.countryCode
    //   },
    //   {
    //     tdKey: 'Страна (en)',
    //     tdVal: data.countryEn
    //   },
    //   {
    //     tdKey: 'Страна (ru)',
    //     tdVal: data.countryRu
    //   },
    //   {
    //     tdKey: 'Континент код',
    //     tdVal: data.continentCode
    //   },
    //   {
    //     tdKey: 'Континент (en)',
    //     tdVal: data.continentEn
    //   },
    //   {
    //     tdKey: 'Континент (ru)',
    //     tdVal: data.continentRu
    //   },
    //   {
    //     tdKey: 'Погрешность (м)',
    //     tdVal: data.accuracyRadius
    //   },
    //   {
    //     tdKey: 'Широта',
    //     tdVal: data.latitude
    //   },
    //   {
    //     tdKey: 'Долгота',
    //     tdVal: data.longitude
    //   },
    //   {
    //     tdKey: 'Часовой пояс',
    //     tdVal: data.timeZone
    //   },
    //   {
    //     tdKey: 'Зип код',
    //     tdVal: data.postalCode
    //   },
    //   {
    //     tdKey: 'Направление',
    //     tdVal: data.programTitle
    //   },
    //   {
    //     tdKey: 'Университет',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Вопрос',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Google Client ID',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Yandex Metrics ID',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Устройство пользователя',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Источник рекламы',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Тип трафика',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Название РК',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Объявление',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Ключевое слово',
    //     tdVal: ''
    //   },
    //   {
    //     tdKey: 'Дубль',
    //     tdVal: ''
    //   }
    // ]

    const output = /* html */ `
      1. Имя: ${data.name}, <br /><br />
      2. Телефон: ${data.phone}, <br /><br />
      3. Почта: ${data.email}, <br /><br />
      4. Способ связи: ${data.contactWay}, <br /><br />
      5. Страница с которой отправлена заявка: ${data.root}, <br /><br />
      6. Город: ${data.cityEn}, <br /><br />
      7. Страна: ${data.countryEn}, <br /><br />
      8. Направление: ${data.field}, <br /><br />
      9. Университет: ${data.uni}, <br /><br />
      10. Вопрос: ${data.question}, <br /><br />
      11. Google Client ID: ${data.googleClientId}, <br /><br />
      12. Устройство пользователя: ${data.userDevice}, <br /><br />
      13. Источник рекламы: ${data.utmSource}, <br /><br />
      14. Тип трафика: ${data.utmMedium}, <br /><br />
      15. Название РК: ${data.utmCampaign}, <br /><br />
      16. Объявление: ${data.utmContent}, <br /><br />
      17. Ключевое слово: ${data.utmTerm}, <br /><br />
      18. Дубль: ${data.double}
    `
    return output
  }

  const html = createEmailBody()

  // const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    logger: true,
    debug: true,
    tls: {
      rejectUnAuthorized: true
    },
    auth: {
      user: process.env.SMTP_LOGIN,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    const emailRes = await transporter.sendMail({
      from: 'contact@pr.rosucheba.ru',
      to: `${
        dev
          ? 'nova@ipo.msk.ru, novailoveyou3@gmail.com'
          : 'rosuchebaa@yandex.ru, marketing@rosucheba.ru'
      }`,
      subject, // Subject line
      text: `
      ${data.name}, \n
      ${data.phone}
      `, // plain text body
      html
    })

    console.log('Message sent: %s', emailRes.messageId)
    res.status(200).json({ status: 200, msg: 'Email is sent' })
  } catch (err) {
    res.status(500).json({ status: 500, err, msg: 'Unexpected server error' })
    console.error(err)
  }
}

export default email
