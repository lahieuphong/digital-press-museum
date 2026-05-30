import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Landmark, Menu, X } from 'lucide-react'

// =============================================================
//  Header
//  - Cố định trên cùng, trong suốt khi ở đầu trang.
//  - Khi cuộn xuống > 24px sẽ chuyển sang nền kính (glassmorphism).
//  - Điều hướng bằng anchor (#id) + scroll-behavior: smooth trong CSS.
// =============================================================

const NAV = [
  { label: 'Khám phá', href: '#home' },
  { label: 'Không gian', href: '#tour' },
  { label: 'Hiện vật', href: '#artifacts' },
  { label: 'Dòng thời gian', href: '#timeline' },
  { label: 'Giới thiệu', href: '#experience' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Theo dõi vị trí cuộn để đổi nền header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brass-400/15 ring-1 ring-brass-400/30 transition group-hover:bg-brass-400/25">
            <Landmark size={18} className="text-brass-300" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Digital <span className="font-display italic text-brass-300">Press</span> Museum
          </span>
        </a>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-brass-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#tour"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-soft transition hover:bg-brass-200 md:inline-flex"
        >
          Bắt đầu tham quan
        </a>

        {/* Nút mở menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-200 ring-1 ring-white/10 transition hover:bg-white/5 md:hidden"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile (xổ xuống) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#tour"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-ink-950"
              >
                Bắt đầu tham quan
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
