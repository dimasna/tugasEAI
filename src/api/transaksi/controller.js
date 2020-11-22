import { success, notFound } from '../../services/response/'
import { Transaksi } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Transaksi.create({ ...body, idDivisi: user })
    .then((transaksi) => transaksi.view(true))
    .then(success(res, 201))
    .catch(next)

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
