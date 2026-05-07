'use client'

import React from 'react'

/**
 * @author: @emerald-ui
 * @description: Animated Dropdown Component with smooth transitions and click-outside behavior
 * @version: 1.1.0 — added onClick item support for i18n language switching
 * @license: MIT
 */
import { useState, useRef, FC, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }
>(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variant === 'outline'
        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
        : variant === 'ghost'
        ? 'hover:bg-accent hover:text-accent-foreground'
        : variant === 'link'
        ? 'text-primary underline-offset-4 hover:underline'
        : 'bg-primary text-primary-foreground hover:bg-primary/90',
      size === 'sm'
        ? 'h-9 px-3'
        : size === 'lg'
        ? 'h-11 px-8'
        : size === 'icon'
        ? 'h-10 w-10'
        : 'h-10 px-4 py-2',
      className
    )}
    {...props}
  />
))
Button.displayName = 'Button'

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, handler])
}

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * A dropdown item can be either:
 * - A link item  : { name, link }
 * - An action item: { name, onClick }  ← used by the language switcher
 */
interface DropdownItem {
  name: string
  link?: string
  onClick?: () => void
}

interface AnimatedDropdownProps {
  items?: DropdownItem[]
  text?: string
  className?: string
}

// ─── Default demo items ───────────────────────────────────────────────────────

const DEMO: DropdownItem[] = [
  { name: 'Documentation', link: '#' },
  { name: 'Components', link: '#' },
  { name: 'Examples', link: '#' },
  { name: 'GitHub', link: '#' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnimatedDropdown({
  items = DEMO,
  text = 'Select Option',
  className,
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  const itemBaseClass = cn(
    'inline-block w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest',
    'border-b border-white/5 last:border-b-0',
    'bg-transparent hover:bg-white/5',
    'transition-colors duration-150',
    'text-white/60 hover:text-white no-underline text-left'
  )

  const motionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <OnClickOutside onClickOutside={close}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('group relative inline-block', className)}
      >
        {/* Trigger button */}
        <Button
          variant="outline"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl"
        >
          <span>{text}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="ml-2"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'absolute top-[calc(100%+0.5rem)] right-0 z-50 w-fit min-w-[150px]',
                'overflow-hidden rounded-xl',
                'bg-zinc-900',
                'border border-white/10',
                'shadow-2xl shadow-black/50'
              )}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.03 },
                  },
                }}
              >
                {items.map((item, index) => {
                  /* ── Action item (onClick) — used for language switching ── */
                  if (item.onClick) {
                    return (
                      <motion.button
                        key={index}
                        type="button"
                        variants={motionVariants}
                        onClick={() => {
                          item.onClick!()
                          close()
                        }}
                        className={itemBaseClass}
                      >
                        {item.name}
                      </motion.button>
                    )
                  }

                  /* ── Link item — default behaviour ── */
                  return (
                    <motion.a
                      key={index}
                      href={item.link ?? '#'}
                      variants={motionVariants}
                      onClick={close}
                      className={itemBaseClass}
                    >
                      {item.name}
                    </motion.a>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OnClickOutside>
  )
}

// ─── OnClickOutside wrapper ───────────────────────────────────────────────────

interface Props {
  children: ReactNode
  onClickOutside: () => void
  classes?: string
}

const OnClickOutside: FC<Props> = ({ children, onClickOutside, classes }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickOutside(wrapperRef, onClickOutside)
  return <div ref={wrapperRef} className={cn(classes)}>{children}</div>
}
