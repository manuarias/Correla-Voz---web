import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cssPath = resolve(__dirname, '../../../index.css')

describe('Design tokens', () => {
  it('declares brand tokens', () => {
    const css = readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--color-murga-red')
    expect(css).toContain('--color-murga-turquoise')
    expect(css).toContain('--color-murga-black')
    expect(css).toContain('--color-murga-white')
  })

  it('declares semantic tokens', () => {
    const css = readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--color-primary')
    expect(css).toContain('--color-accent')
    expect(css).toContain('--color-surface')
    expect(css).toContain('--color-text-primary')
    expect(css).toContain('--color-surface-border')
  })

  it('declares semantic font tokens', () => {
    const css = readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--font-heading-primary')
    expect(css).toContain('--font-heading-secondary')
    expect(css).toContain('--font-heading-tertiary')
    expect(css).toContain('--font-body')
  })

  it('declares shadow tokens', () => {
    const css = readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--shadow-card')
    expect(css).toContain('--shadow-button')
    expect(css).toContain('--shadow-glow-red')
    expect(css).toContain('--shadow-glow-turquoise')
  })
})
