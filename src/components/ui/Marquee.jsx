import { cn } from '../../lib/utils'

export default function Marquee({ children, reverse = false, pauseOnHover = true, className }) {
  return (
    <div
      className={cn(
        'flex overflow-hidden',
        pauseOnHover && '[&:hover_div]:animation-paused',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        style={{ willChange: 'transform' }}
      >
        {children}
        {children}
      </div>
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        aria-hidden
        style={{ willChange: 'transform' }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
