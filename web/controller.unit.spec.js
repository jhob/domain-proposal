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
      stubDomain('Catalog', {
        addProduct: null
      })
    })

    it ('sends 200', () => {
      return request(app)
        .get('/add_product')
        .expect(200, 'added_product')
    })
  })

  describe('unhappy path (domain-level error)', () => {
    beforeEach('stub domain', () => {
      stubDomain('Catalog', {
        addProduct: stubError({type: 'INVALID_ARGUMENTS', message: 'blah'})
      })
    })

    it ('sends 500', () => {
      return request(app)
        .get('/add_product')
        .expect(503, 'service_unavailable')
    })
  })
})
