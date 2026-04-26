import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const indexHtml = readFileSync(resolve(__dirname, '../../../index.html'), 'utf-8')

function getMetaContent(html: string, nameAttr: string, value: string): string | null {
  const regex = new RegExp(
    `<meta[^>]+${nameAttr}\\s*=\\s*["']${value}["'][^>]+content\\s*=\\s*["']([^"']+)["']`,
    'i'
  )
  const match = html.match(regex)
  return match ? match[1] : null
}

function getLinkHref(html: string, rel: string): string | null {
  const regex = new RegExp(
    `<link[^>]+rel\\s*=\\s*["']${rel}["'][^>]+href\\s*=\\s*["']([^"']+)["']`,
    'i'
  )
  const match = html.match(regex)
  return match ? match[1] : null
}

describe('Meta Tags', () => {
  describe('SEO meta tags', () => {
    it('has description meta tag', () => {
      const content = getMetaContent(indexHtml, 'name', 'description')
      expect(content).toContain('murga')
      expect(content).toContain('Tandil')
    })

    it('has keywords meta tag', () => {
      const content = getMetaContent(indexHtml, 'name', 'keywords')
      expect(content).toContain('carnaval')
      expect(content).toContain('Correla Voz')
    })

    it('has canonical link', () => {
      const href = getLinkHref(indexHtml, 'canonical')
      expect(href).toBe('https://murgacorrelavoz.com.ar')
    })

    it('has robots meta tag', () => {
      const content = getMetaContent(indexHtml, 'name', 'robots')
      expect(content).toBe('index, follow')
    })

    it('has correct title', () => {
      const match = indexHtml.match(/<title>([^<]+)<\/title>/i)
      expect(match?.[1]).toBe('Correla Voz — Murga de Tandil')
    })
  })

  describe('Open Graph meta tags', () => {
    it('has og:title', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:title')
      expect(content).toBe('Correla Voz — Murga de Tandil')
    })

    it('has og:description', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:description')
      expect(content).toContain('murga')
    })

    it('has og:image', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:image')
      expect(content).toContain('cumplecorso2025.jpg')
    })

    it('has og:url', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:url')
      expect(content).toBe('https://murgacorrelavoz.com.ar')
    })

    it('has og:type', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:type')
      expect(content).toBe('website')
    })

    it('has og:locale', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:locale')
      expect(content).toBe('es_AR')
    })

    it('has og:site_name', () => {
      const content = getMetaContent(indexHtml, 'property', 'og:site_name')
      expect(content).toBe('Correla Voz')
    })
  })

  describe('Twitter Card meta tags', () => {
    it('has twitter:card', () => {
      const content = getMetaContent(indexHtml, 'name', 'twitter:card')
      expect(content).toBe('summary_large_image')
    })

    it('has twitter:title', () => {
      const content = getMetaContent(indexHtml, 'name', 'twitter:title')
      expect(content).toBe('Correla Voz — Murga de Tandil')
    })

    it('has twitter:description', () => {
      const content = getMetaContent(indexHtml, 'name', 'twitter:description')
      expect(content).toContain('murga')
    })

    it('has twitter:image', () => {
      const content = getMetaContent(indexHtml, 'name', 'twitter:image')
      expect(content).toContain('cumplecorso2025.jpg')
    })
  })
})
