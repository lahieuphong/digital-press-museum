import { motion } from 'framer-motion'

// =============================================================
//  SectionHeading
//  Tiêu đề dùng chung cho các section (eyebrow + tiêu đề lớn + mô tả).
//  Tách riêng để giữ nhịp thiết kế nhất quán và tránh lặp code.
//  align: 'left' (mặc định) | 'center'
// =============================================================
export default function SectionHeading({ eyebrow, title, desc, align = 'left' }) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-brass-300 ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-6 bg-brass-400/60" />
          {eyebrow}
        </span>
      )}

      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>

      {desc && <p className="mt-4 text-base leading-relaxed text-slate-400">{desc}</p>}
    </motion.div>
  )
}
