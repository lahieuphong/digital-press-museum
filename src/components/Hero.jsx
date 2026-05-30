import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Compass, Eye } from 'lucide-react'
import { stats } from '../data/museumData'

// =============================================================
//  Hero
//  Màn hình mở đầu toàn trang: nền tối, ánh sáng nhẹ, tiêu đề lớn,
//  2 nút CTA và 3 stat card. Hiệu ứng xuất hiện tuần tự (stagger).
// =============================================================

// Variants cho hiệu ứng xuất hiện lần lượt
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 scroll-mt-24"
    >
      {/* Ánh sáng nền */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brass-400/10 blur-[120px]" />
        <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        {/* Lưới mờ tạo chiều sâu, được làm mờ dần ở rìa bằng mask */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-5xl px-5 py-20 text-center sm:px-8"
      >
        {/* Eyebrow */}
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brass-200 backdrop-blur"
        >
          <Sparkles size={14} className="text-brass-300" />
          Bảo tàng số • Demo concept
        </motion.span>

        {/* Tiêu đề chính */}
        <motion.h1
          variants={item}
          className="mx-auto mt-7 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.08] text-white sm:text-6xl md:text-7xl"
        >
          Bảo tàng Báo chí trên{' '}
          <span className="bg-gradient-to-r from-brass-200 via-brass-300 to-brass-500 bg-clip-text text-transparent">
            không gian số
          </span>
        </motion.h1>

        {/* Mô tả */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-300"
        >
          Khám phá lịch sử báo chí Việt Nam qua không gian trưng bày số, hiện vật tương tác và câu
          chuyện đa phương tiện.
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tour"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 shadow-soft transition hover:bg-brass-200"
          >
            <Compass size={18} />
            Bắt đầu tham quan
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#artifacts"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <Eye size={18} />
            Xem hiện vật
          </a>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={item}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-brass-400/30 hover:bg-white/[0.06]"
            >
              <div className="font-display text-4xl font-semibold text-brass-300">{s.value}</div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Chỉ báo cuộn xuống */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-1.5 w-1 animate-floaty rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
