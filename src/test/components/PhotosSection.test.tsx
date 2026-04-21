import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhotosSection from '../../../components/PhotosSection'
import type { AlbumItem } from '../../../types'

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  } as unknown as typeof IntersectionObserver
})

const mockAlbums: AlbumItem[] = [
  {
    title: 'Album One',
    imageUrl: 'https://example.com/one.jpg',
    albumUrl: 'https://photos.google.com/one',
    date: '15 de Marzo, 2024',
  },
  {
    title: 'Album Two',
    imageUrl: 'https://example.com/two.jpg',
    albumUrl: 'https://photos.google.com/two',
    date: '20 de Abril, 2024',
  },
]

describe('PhotosSection', () => {
  it('renders album titles', () => {
    render(<PhotosSection albums={mockAlbums} />)

    expect(screen.getByText('Album One')).toBeInTheDocument()
    expect(screen.getByText('Album Two')).toBeInTheDocument()
  })

  it('renders album links with correct hrefs', () => {
    render(<PhotosSection albums={mockAlbums} />)

    expect(screen.getByText('Album One').closest('a')).toHaveAttribute(
      'href',
      'https://photos.google.com/one'
    )
    expect(screen.getByText('Album Two').closest('a')).toHaveAttribute(
      'href',
      'https://photos.google.com/two'
    )
  })

  it('shows empty state when no albums are provided', () => {
    render(<PhotosSection albums={[]} />)

    expect(
      screen.getByText('No hay álbumes de fotos para mostrar en este momento.')
    ).toBeInTheDocument()
  })
})
