import express from 'express'
import request from 'supertest'
import {expect} from 'chai'

import controller from './controller'
import middleware from '../infra/middleware'
import {stubDomain, stubError} from '../infra/domain'

const app = express().use(middleware).get('/add_product', controller)

describe('controller', function () {
  describe('happy path', () => {
    beforeEach('stub domain', () => {
      this.unstub = stubDomain('Catalog', {
        addProduct: null
      })
    })

    afterEach('unstub domain', () => {
      this.unstub()
    })

    it ('sends 200', () => {
      return request(app)
        .get('/add_product')
        .expect(200, 'added_product')
    })
  })

  describe('unhappy path (domain-level error)', () => {
    beforeEach('stub domain', () => {
      this.unstub = stubDomain('Catalog', {
        addProduct: stubError({type: 'INVALID_ARGUMENTS', message: 'blah'})
      })
    })

    afterEach('unstub domain', () => {
      this.unstub()
    })

    it ('sends 500', () => {
      return request(app)
        .get('/add_product')
        .expect(503, 'service_unavailable')
    })
  })

  describe('broad stack test', () => {
    it ('works', () => {
      return request(app)
        .get('/add_product')
        .expect(200, 'added_product')
    })
  })
})
