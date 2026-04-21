import * as React from 'react'
import { cn } from '../../lib/utils'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface DialogContextValue {
  onClose: () => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog compound components must be used inside Dialog')
  }
  return context
}

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  React.useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <DialogContext.Provider value={{ onClose }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { onClose } = useDialog()
  return (
    <div
      ref={ref}
      className={cn('fixed inset-0 bg-black/70 z-50', className)}
      onClick={onClose}
      {...props}
    />
  )
})
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const containerRef = useFocusTrap(true)

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [containerRef, ref]
  )

  return (
    <div
      ref={mergedRef}
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl shadow-red-500/10 transform transition-all duration-300 ease-in-out scale-95 animate-modal-enter',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      {...props}
    />
  )
})
DialogContent.displayName = 'DialogContent'

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    id="dialog-title"
    className={cn('font-bold text-xl text-murga-turquoise mb-1', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end space-x-2 mt-6', className)}
    {...props}
  />
))
DialogFooter.displayName = 'DialogFooter'

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
}
