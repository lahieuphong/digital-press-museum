import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { timeline } from '../data/museumData'

// =============================================================
//  Timeline
//  Dòng thời gian báo chí.
//  - Desktop: timeline NGANG, card xen kẽ trên/dưới đường trục.
//  - Mobile : timeline DỌC, card trượt vào từ trái.
//  Hiệu ứng xuất hiện tuần tự khi cuộn tới (whileInView + stagger).
// =============================================================

// Màu theo accent (dùng inline để tránh phụ thuộc lớp động)
const HEX = {
  amber: '#fbbf24',
  rose: '#fb7185',
  sky: '#38bdf8',
  emerald: '#34d399',
  violet: '#a78bfa',
  cyan: '#22d3ee',
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const itemLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function TimelineCard({ m }) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="font-display text-3xl font-semibold" style={{ color: HEX[m.accent] }}>
        {m.year}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{m.title}</div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{m.text}</p>
    </div>
  )
}

function Dot({ accent }) {
  return (
    <span
      className="relative z-10 h-4 w-4 rounded-full ring-4 ring-ink-950"
      style={{ backgroundColor: HEX[accent], boxShadow: `0 0 14px ${HEX[accent]}` }}
    />
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Dòng chảy lịch sử"
          title="Dòng thời gian báo chí"
          desc="Những cột mốc tiêu biểu trải dài hơn một thế kỷ, từ tờ báo Quốc ngữ đầu tiên đến kỷ nguyên chuyển đổi số."
        />

        {/* ---- Desktop: timeline ngang ---- */}
        <div className="relative mt-16 hidden lg:block">
          {/* Đường trục ngang ở giữa */}
          <div className="pointer-events-none absolute inset-x-0 top-[160px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-6 gap-4"
          >
            {timeline.map((m, i) => {
              const top = i % 2 === 0
              return (
                <motion.div key={m.year} variants={itemUp} className="flex flex-col">
                  {/* Nửa trên */}
                  <div className="flex h-[160px] items-end justify-center pb-3">
                    {top && <TimelineCard m={m} />}
                  </div>
                  {/* Trục: đoạn nối + chấm */}
                  <div className="relative flex h-0 items-center justify-center">
                    <span
                      className={`absolute left-1/2 h-3 w-px -translate-x-1/2 bg-white/20 ${
                        top ? 'bottom-0' : 'top-0'
                      }`}
                    />
                    <Dot accent={m.accent} />
                  </div>
                  {/* Nửa dưới */}
                  <div className="flex h-[160px] items-start justify-center pt-3">
                    {!top && <TimelineCard m={m} />}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* ---- Mobile/tablet: timeline dọc ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative mt-12 space-y-5 lg:hidden"
        >
          {/* Đường trục dọc */}
          <div className="absolute bottom-3 left-[11px] top-3 w-px bg-white/15" />

          {timeline.map((m) => (
            <motion.div key={m.year} variants={itemLeft} className="relative pl-10">
              <span className="absolute left-[3px] top-1">
                <Dot accent={m.accent} />
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-display text-2xl font-semibold"
                    style={{ color: HEX[m.accent] }}
                  >
                    {m.year}
                  </span>
                  <span className="text-sm font-semibold text-white">{m.title}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
