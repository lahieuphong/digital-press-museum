import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ArtifactImage from './ArtifactImage'

// =============================================================
//  ArtifactGrid
//  Lưới hiện vật nổi bật. Mỗi card mở modal chi tiết khi bấm.
//  Hiệu ứng hover: card nổi lên, viền sáng, ảnh zoom nhẹ.
// =============================================================

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ArtifactGrid({ artifacts, onOpenArtifact }) {
  return (
    <section id="artifacts" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Bộ sưu tập"
          title="Hiện vật nổi bật"
          desc="Mỗi hiện vật là một mảnh ghép trong dòng chảy báo chí. Bấm để xem chi tiết và bản thuyết minh."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {artifacts.map((a) => (
            <motion.button
              key={a.id}
              variants={card}
              onClick={() => onOpenArtifact(a)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 text-left transition duration-300 hover:-translate-y-1.5 hover:border-brass-400/30 hover:bg-white/[0.06] hover:shadow-soft"
            >
              {/* Ảnh minh hoạ */}
              <div className="overflow-hidden rounded-2xl">
                <ArtifactImage
                  type={a.type}
                  accent={a.accent}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>

              {/* Nội dung */}
              <div className="px-2 pb-2 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brass-200">
                    {a.period}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-300"
                  />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {a.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
