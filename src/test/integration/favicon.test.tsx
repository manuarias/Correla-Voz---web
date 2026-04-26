import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const indexHtml = readFileSync(resolve(__dirname, '../../../index.html'), 'utf-8')
const publicDir = resolve(__dirname, '../../../public')

function getLinkHrefByType(html: string, rel: string, type?: string): string | null {
  let regex: RegExp
  if (type) {
    regex = new RegExp(
      `<link[^>]+rel\\s*=\\s*["']${rel}["'][^>]+type\\s*=\\s*["']${type}["'][^>]+href\\s*=\\s*["']([^"']+)["']`,
      'i'
    )
  } else {
    regex = new RegExp(
      `<link[^>]+rel\\s*=\\s*["']${rel}["'][^>]+href\\s*=\\s*["']([^"']+)["']`,
      'i'
    )
  }
  const match = html.match(regex)
  return match ? match[1] : null
}

describe('Favicon', () => {
  it('has SVG favicon link', () => {
    const href = getLinkHrefByType(indexHtml, 'icon', 'image/svg\\+xml')
    expect(href).toBe('/favicon.svg')
  })

  it('has ICO favicon link', () => {
    const href = getLinkHrefByType(indexHtml, 'icon', 'image/x\\-icon')
    expect(href).toBe('/favicon.ico')
  })

  it('has 32x32 PNG favicon link', () => {
    expect(indexHtml).toContain('sizes="32x32"')
    expect(indexHtml).toContain('href="/favicon-32x32.png"')
  })

  it('has 16x16 PNG favicon link', () => {
    expect(indexHtml).toContain('sizes="16x16"')
    expect(indexHtml).toContain('href="/favicon-16x16.png"')
  })

  it('has apple-touch-icon link', () => {
    const href = getLinkHrefByType(indexHtml, 'apple-touch-icon')
    expect(href).toBe('/apple-touch-icon.png')
  })

  it('has favicon.svg file in public directory', () => {
    expect(existsSync(resolve(publicDir, 'favicon.svg'))).toBe(true)
  })

  it('has favicon.ico file in public directory', () => {
    expect(existsSync(resolve(publicDir, 'favicon.ico'))).toBe(true)
  })

  it('has favicon-16x16.png file in public directory', () => {
    expect(existsSync(resolve(publicDir, 'favicon-16x16.png'))).toBe(true)
  })

  it('has favicon-32x32.png file in public directory', () => {
    expect(existsSync(resolve(publicDir, 'favicon-32x32.png'))).toBe(true)
  })

  it('has apple-touch-icon.png file in public directory', () => {
    expect(existsSync(resolve(publicDir, 'apple-touch-icon.png'))).toBe(true)
  })
})
