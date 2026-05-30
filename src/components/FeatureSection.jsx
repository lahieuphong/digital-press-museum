import { motion } from 'framer-motion'
import { Compass, MousePointerClick, Layers, Smartphone } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { features } from '../data/museumData'

// =============================================================
//  FeatureSection
//  Khu "Trải nghiệm số": 4 thẻ giới thiệu tính năng nổi bật.
// =============================================================

// Ánh xạ khoá icon trong data -> component icon lucide
const ICONS = {
  compass: Compass,
  hotspot: MousePointerClick,
  media: Layers,
  mobile: Smartphone,
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeatureSection() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Vì sao là bảo tàng số"
          title="Trải nghiệm số"
          desc="Công nghệ đặt người xem làm trung tâm — để việc khám phá lịch sử trở nên trực quan, sống động và dễ tiếp cận."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => {
            const Icon = ICONS[f.icon] || Compass
            return (
              <motion.div
                key={f.title}
                variants={item}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-brass-400/30 hover:bg-white/[0.06]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brass-400/15 ring-1 ring-brass-400/30 transition group-hover:bg-brass-400/25">
                  <Icon size={22} className="text-brass-300" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
