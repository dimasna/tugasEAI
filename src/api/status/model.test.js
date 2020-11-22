import { Status } from '.'

let status

beforeEach(async () => {
  status = await Status.create({ idTransaksi: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = status.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(status.id)
    expect(view.idTransaksi).toBe(status.idTransaksi)
    expect(view.status).toBe(status.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = status.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(status.id)
    expect(view.idTransaksi).toBe(status.idTransaksi)
    expect(view.status).toBe(status.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
