import { renderHook } from '@testing-library/react'
import { useFocusTrap } from './useFocusTrap'

describe('useFocusTrap', () => {
  it('should return a ref object', () => {
    const { result } = renderHook(() => useFocusTrap(false))
    expect(result.current).toBeDefined()
    expect(result.current).toHaveProperty('current')
  })

  it('should return ref with null current when inactive', () => {
    const { result } = renderHook(() => useFocusTrap(false))
    expect(result.current.current).toBeNull()
  })

  it('should return ref object when active', () => {
    const { result } = renderHook(() => useFocusTrap(true))
    expect(result.current).toBeDefined()
    expect(typeof result.current).toBe('object')
  })

  it('should not throw when container ref is not attached', () => {
    const { result } = renderHook(() => useFocusTrap(true))
    expect(result.current.current).toBeNull()
  })

  it('should handle isActive changing from true to false', () => {
    const { rerender } = renderHook(({ isActive }) => useFocusTrap(isActive), {
      initialProps: { isActive: true }
    })

    rerender({ isActive: false })
    const { result } = renderHook(() => useFocusTrap(false))
    expect(result.current.current).toBeNull()
  })

  it('should handle isActive changing from false to true', () => {
    const { result, rerender } = renderHook(({ isActive }) => useFocusTrap(isActive), {
      initialProps: { isActive: false }
    })

    rerender({ isActive: true })
    expect(result.current).toBeDefined()
  })

  it('should handle multiple render cycles', () => {
    const { unmount } = renderHook(() => useFocusTrap(true))
    unmount()

    const { result } = renderHook(() => useFocusTrap(true))
    expect(result.current).toBeDefined()
  })

  it('should work with different boolean values', () => {
    const { result: result1 } = renderHook(() => useFocusTrap(true))
    expect(result1.current).toBeDefined()

    const { result: result2 } = renderHook(() => useFocusTrap(false))
    expect(result2.current).toBeDefined()
  })
})
