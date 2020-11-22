import { success, notFound } from '../../services/response/'
import { Status } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Status.create(body)
    .then((status) => status.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Status.count(query)
    .then(count => Status.find(query, select, cursor)
      .then((statuses) => ({
        count,
        rows: statuses.map((status) => status.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Status.findById(params.id)
    .then(notFound(res))
    .then((status) => status ? status.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Status.findById(params.id)
    .then(notFound(res))
    .then((status) => status ? Object.assign(status, body).save() : null)
    .then((status) => status ? status.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Status.findById(params.id)
    .then(notFound(res))
    .then((status) => status ? status.remove() : null)
    .then(success(res, 204))
    .catch(next)
