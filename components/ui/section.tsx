import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string
  titleClassName?: string
  as?: React.ElementType
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, title, titleClassName, as: Component = 'section', children, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const sectionRef = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.1 }
      )

      const currentRef = sectionRef.current
      if (currentRef) {
        observer.observe(currentRef)
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef)
        }
      }
    }, [])

    React.useImperativeHandle(ref, () => sectionRef.current!)

    return (
      <Component
        ref={sectionRef}
        className={cn(
          'transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          className
        )}
        {...props}
      >
        {title && (
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold text-center mb-8 text-murga-turquoise tracking-wide animate-murga-glow-soft',
              titleClassName
            )}
          >
            {title}
          </h2>
        )}
        {children}
      </Component>
    )
  }
)
Section.displayName = 'Section'

export { Section }
