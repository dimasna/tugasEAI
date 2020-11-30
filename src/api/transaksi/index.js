import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, getLaporan, destroy } from './controller'
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
 * @api {get} /transaksis/type Lihat Transaksi By Type
 * @apiName LihatTransaksiByType
 * @apiGroup Transaksi
 * @apiPermission admin
 * @apiParam (Authorization) {String} access_token admin access token.
 * @apiParam {String} name nama jenis transaksi (debit/credit).
 * @apiSuccess {Number} count Total amount of transaksis.
 * @apiSuccess {Object[]} rows List of transaksis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/type',
  token({ required: true, roles: ['admin'] }),
  query({
    name:{
      type: [String],
      paths: ['jenis']
    }
  }),
  index)

/**
 * @api {get} /transaksis/laporan Lihat Laporan Keuangan
 * @apiName LihatLaporanKeuangan
 * @apiGroup Transaksi
 * @apiPermission admin
 * @apiParam (Authorization) {String} access_token admin access token.
 * @apiParam {String} from tanggal mulai format 'yyyy-mm-dd'.
 * @apiParam {String} to tanggal akhir format 'yyyy-mm-dd'.
 * @apiSuccess {Number} count Total amount of transaksis.
 * @apiSuccess {Object[]} rows List of transaksis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/laporan',
  token({ required: true, roles: ['admin'] }),
  query({
    from:{
      type: Date,
      paths: ['createdAt'],
      operator: '$gte'
    },
    to:{
      type: Date,
      paths: ['createdAt'],
      operator: '$lte'
    }
  }),
  getLaporan)

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
