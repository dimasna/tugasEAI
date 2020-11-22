import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Status } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, status

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  status = await Status.create({})
})

test('POST /status 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, idTransaksi: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.idTransaksi).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /status 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /status 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /status 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /status 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /status 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /status/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${status.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(status.id)
})

test('GET /status/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${status.id}`)
  expect(status).toBe(401)
})

test('GET /status/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /status/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${status.id}`)
    .send({ access_token: adminSession, idTransaksi: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(status.id)
  expect(body.idTransaksi).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /status/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${status.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /status/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${status.id}`)
  expect(status).toBe(401)
})

test('PUT /status/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, idTransaksi: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /status/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${status.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /status/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${status.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /status/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${status.id}`)
  expect(status).toBe(401)
})

test('DELETE /status/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
