import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Status, { schema } from './model'

const router = new Router()
const { idTransaksi, status } = schema.tree

/**
 * @api {post} /status Membuat Status
 * @apiName MembuatStatus
 * @apiGroup Status Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam idTransaksi Status's idTransaksi.
 * @apiParam status Status's status.
 * @apiSuccess {Object} status Status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Status not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ idTransaksi, status }),
  create)

/**
 * @api {get} /status Lihat Semua Status
 * @apiName LihatSemuaStatusTransaksi
 * @apiGroup Status Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of statuses.
 * @apiSuccess {Object[]} rows List of statuses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /status/:id Lihat Status By Id
 * @apiName LihatStatusById
 * @apiGroup Status Transaksi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} status Status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Status not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /status/:id Perbarui Status
 * @apiName PerbaruiStatus
 * @apiGroup Status Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam idTransaksi Status's idTransaksi.
 * @apiParam status Status's status.
 * @apiSuccess {Object} status Status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Status not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ idTransaksi, status }),
  update)

/**
 * @api {delete} /status/:id Delete status
 * @apiName DeleteStatus
 * @apiGroup Status Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Status not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
