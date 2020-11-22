import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Transaksi, { schema } from './model'

const router = new Router()
const { jenis, biaya, keterangan } = schema.tree

/**
 * @api {post} /transaksis Laporkan Transaksi
 * @apiName LaporkanTransaksi
 * @apiGroup Transaksi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam jenis Transaksi's jenis.
 * @apiParam biaya Transaksi's biaya.
 * @apiParam keterangan Transaksi's keterangan.
 * @apiSuccess {Object} transaksi Transaksi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaksi not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ jenis, biaya, keterangan }),
  create)

/**
 * @api {get} /transaksis Lihat Semua Transaksi
 * @apiName LihatSemuaTransaksi
 * @apiGroup Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of transaksis.
 * @apiSuccess {Object[]} rows List of transaksis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /transaksis/:id Lihat Transaksi By Id
 * @apiName LihatTransaksiById
 * @apiGroup Transaksi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} transaksi Transaksi's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transaksi not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)


/**
 * @api {delete} /transaksis/:id Delete transaksi
 * @apiName DeleteTransaksi
 * @apiGroup Transaksi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transaksi not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
