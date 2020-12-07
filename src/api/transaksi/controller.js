import { success, notFound } from '../../services/response/'
import { Transaksi } from '.'
var request = require('request');

export const create = ({ user, bodymen: { body } }, res, next) => {
  Transaksi.create({ ...body, idDivisi: user })
    .then((transaksi) => transaksi.view(true))
    .then((resp) => {
      //success(res, 201)
     
      
      var options = {
        'method': 'POST',
        'url': `${process.env.BASE_URL}/status`,
        'headers': {
          'Authorization': `Bearer ${process.env.MASTER_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "idTransaksi": resp.id, "status": "pending" })

      };
      request(options, async function (error, response) {
        if (error) {throw new Error(error)
        }else{
          const rep =  await response.body
        console.log(' a : '+rep);
        res.status(200).json(JSON.parse(rep))
        }
      });

    }
    )
    // .then((resps)=> {
    //   console.log('ini : '+JSON.stringify(resps))
    //   success(resps,201)
    // })
    .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Transaksi.count(query)
    .then(count => Transaksi.find(query, select, cursor)
      .populate('idDivisi')
      .then((transaksis) => ({
        count,
        rows: transaksis.map((transaksi) => transaksi.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const getLaporan = ({ querymen: { query, select, cursor } }, res, next) => {
  let debit = 0;
  let credit = 0;
  Transaksi.count(query)
    .then(count => Transaksi.find(query, select, cursor)
      .populate('idDivisi')
      .then((transaksis) => ({
        count,
        rows: transaksis.map((transaksi) => {
          //console.log(transaksi)
          if (transaksi.jenis == 'debit') {
            debit += transaksi.biaya
          } else {
            credit += transaksi.biaya
          }

          return transaksi.view()
        })
      }))
    )
    .then((res) => {
      let newResp = { debit: debit, credit: credit }
      Object.assign(res, newResp)
      //console.log(res)
      return res
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Transaksi.findById(params.id)
    .populate('idDivisi')
    .then(notFound(res))
    .then((transaksi) => transaksi ? transaksi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Transaksi.findById(params.id)
    .populate('idDivisi')
    .then(notFound(res))
    .then((transaksi) => transaksi ? Object.assign(transaksi, body).save() : null)
    .then((transaksi) => transaksi ? transaksi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Transaksi.findById(params.id)
    .then(notFound(res))
    .then((transaksi) => transaksi ? transaksi.remove() : null)
    .then(success(res, 204))
    .catch(next)
