import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pick, resolveLang } from '../../src/lib/addonLang.ts'

test('query tiene prioridad', () => {
  assert.equal(resolveLang({ query: 'pt', stored: 'en', browser: ['es'] }), 'pt')
})

test('query inválida se ignora', () => {
  assert.equal(resolveLang({ query: 'fr', stored: 'en' }), 'en')
  assert.equal(resolveLang({ query: 'fr' }), 'es')
})

test('query y guardado ignoran mayúsculas y región', () => {
  assert.equal(resolveLang({ query: 'EN' }), 'en')
  assert.equal(resolveLang({ query: 'pt-BR' }), 'pt')
  assert.equal(resolveLang({ stored: 'PT' }), 'pt')
})

test('guardado antes que navegador', () => {
  assert.equal(resolveLang({ stored: 'en', browser: ['pt-BR'] }), 'en')
})

test('guardado inválido se ignora', () => {
  assert.equal(resolveLang({ stored: 'xx', browser: ['pt-BR'] }), 'pt')
})

test('navegador con región', () => {
  assert.equal(resolveLang({ browser: ['pt-BR'] }), 'pt')
  assert.equal(resolveLang({ browser: ['en-US'] }), 'en')
  assert.equal(resolveLang({ browser: ['es-AR'] }), 'es')
})

test('navegador: primer idioma soportado, en orden', () => {
  assert.equal(resolveLang({ browser: ['fr-FR', 'pt-PT', 'en'] }), 'pt')
})

test('sin datos o sin idiomas soportados', () => {
  assert.equal(resolveLang({}), 'es')
  assert.equal(resolveLang({ browser: ['fr', 'de'] }), 'es')
})

test('pick devuelve el idioma pedido', () => {
  assert.equal(pick({ es: 'Hola', en: 'Hi' }, 'en'), 'Hi')
})

test('pick cae al español si falta el idioma', () => {
  assert.equal(pick({ es: 'Hola' }, 'pt'), 'Hola')
})

test('pick cae al español si el texto está vacío', () => {
  assert.equal(pick({ es: 'Hola', pt: '' }, 'pt'), 'Hola')
})
