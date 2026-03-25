import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('should merge simple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle multiple class names', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle conditional truthy values', () => {
    const isActive = true
    expect(cn('base', isActive && 'active')).toBe('base active')
  })

  it('should handle conditional falsy values', () => {
    const isActive = false
    expect(cn('base', isActive && 'active')).toBe('base')
  })

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar')
  })

  it('should handle empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('should merge conflicting tailwind classes (last wins)', () => {
    expect(cn('p-4 p-2')).toBe('p-2')
  })

  it('should handle objects with truthy values', () => {
    expect(cn({ 'active': true, 'disabled': false })).toBe('active')
  })

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })
})