import { Transaksi } from '.'
import { User } from '../user'

let user, transaksi

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  transaksi = await Transaksi.create({ idDivisi: user, jenis: 'test', biaya: 'test', status: 'test', keterangan: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = transaksi.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaksi.id)
    expect(typeof view.idDivisi).toBe('object')
    expect(view.idDivisi.id).toBe(user.id)
    expect(view.jenis).toBe(transaksi.jenis)
    expect(view.biaya).toBe(transaksi.biaya)
    expect(view.status).toBe(transaksi.status)
    expect(view.keterangan).toBe(transaksi.keterangan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = transaksi.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transaksi.id)
    expect(typeof view.idDivisi).toBe('object')
    expect(view.idDivisi.id).toBe(user.id)
    expect(view.jenis).toBe(transaksi.jenis)
    expect(view.biaya).toBe(transaksi.biaya)
    expect(view.status).toBe(transaksi.status)
    expect(view.keterangan).toBe(transaksi.keterangan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
