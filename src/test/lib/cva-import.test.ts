import { describe, it, expect } from 'vitest'
import { cva } from 'class-variance-authority'

describe('class-variance-authority', () => {
  it('exports cva as a function', () => {
    expect(typeof cva).toBe('function')
  })
})
