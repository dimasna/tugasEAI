import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Transaksi } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, transaksi

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  transaksi = await Transaksi.create({ idDivisi: user })
})

test('POST /transaksis 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, jenis: 'test', biaya: 'test', status: 'test', keterangan: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.jenis).toEqual('test')
  expect(body.biaya).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.keterangan).toEqual('test')
  expect(typeof body.idDivisi).toEqual('object')
})

test('POST /transaksis 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /transaksis 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /transaksis 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /transaksis 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /transaksis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${transaksi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaksi.id)
  expect(typeof body.idDivisi).toEqual('object')
})

test('GET /transaksis/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${transaksi.id}`)
  expect(status).toBe(401)
})

test('GET /transaksis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /transaksis/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${transaksi.id}`)
    .send({ access_token: adminSession, jenis: 'test', biaya: 'test', status: 'test', keterangan: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaksi.id)
  expect(body.jenis).toEqual('test')
  expect(body.biaya).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.keterangan).toEqual('test')
})

test('PUT /transaksis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaksi.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /transaksis/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaksi.id}`)
  expect(status).toBe(401)
})

test('PUT /transaksis/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, jenis: 'test', biaya: 'test', status: 'test', keterangan: 'test' })
  expect(status).toBe(404)
})

test('DELETE /transaksis/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaksi.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /transaksis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaksi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /transaksis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaksi.id}`)
  expect(status).toBe(401)
})

test('DELETE /transaksis/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
