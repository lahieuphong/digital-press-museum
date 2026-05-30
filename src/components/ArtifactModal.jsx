import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Pause, Volume2, Clock, Tag } from 'lucide-react'
import ArtifactImage from './ArtifactImage'

// =============================================================
//  ArtifactModal
//  Cửa sổ chi tiết hiện vật. Bao gồm trình "Nghe thuyết minh" MOCK:
//  thanh tiến trình chạy bằng setInterval, KHÔNG phát âm thanh thật.
//  - Khoá cuộn nền khi mở, đóng bằng phím Esc hoặc bấm ra ngoài.
// =============================================================

const BAR_COUNT = 40

// "mm:ss" -> số giây
function toSeconds(str = '0:00') {
  const [m, s] = str.split(':').map(Number)
  return (m || 0) * 60 + (s || 0)
}
// số giây -> "mm:ss"
function fmt(sec) {
  const s = Math.max(0, Math.round(sec))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

export default function ArtifactModal({ artifact, onClose }) {
  const total = toSeconds(artifact.audioLength || '02:00')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // tính bằng giây
  const closeRef = useRef(null)

  // Reset trình phát khi mở một hiện vật khác
  useEffect(() => {
    setPlaying(false)
    setProgress(0)
  }, [artifact.id])

  // Khoá cuộn nền + đóng bằng Esc + đưa focus vào nút đóng
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Tiến trình thuyết minh giả lập (1 giây thực ≈ 1 giây phát)
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setProgress((p) => {
        if (p + 0.5 >= total) {
          clearInterval(t)
          setPlaying(false)
          return total
        }
        return p + 0.5
      })
    }, 500)
    return () => clearInterval(t)
  }, [playing, total])

  // Tua bằng cách bấm lên thanh tiến trình
  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    setProgress(ratio * total)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={artifact.title}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900 shadow-soft sm:rounded-3xl md:flex-row"
      >
        {/* Nút đóng */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-950/60 text-white backdrop-blur transition hover:bg-ink-950/90"
        >
          <X size={18} />
        </button>

        {/* Ảnh minh hoạ (trái) */}
        <div className="md:w-[42%] md:shrink-0">
          <ArtifactImage
            type={artifact.type}
            accent={artifact.accent}
            iconSize={84}
            className="h-48 w-full md:h-full"
          />
        </div>

        {/* Nội dung (phải) */}
        <div className="flex min-w-0 flex-col overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brass-200">
              <Tag size={12} />
              {artifact.period}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              <Clock size={12} />
              {artifact.audioLength || fmt(total)}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            {artifact.title}
          </h3>

          <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
            {artifact.details || artifact.description}
          </p>

          {/* Trình "Nghe thuyết minh" (mock) */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? 'Tạm dừng thuyết minh' : 'Nghe thuyết minh'}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brass-400 text-ink-950 shadow-glow transition hover:bg-brass-300"
              >
                {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Volume2 size={15} className="text-brass-300" />
                  Nghe thuyết minh
                </div>

                {/* Sóng âm minh hoạ */}
                <div className="mt-2 flex h-8 items-center gap-[3px]">
                  {Array.from({ length: BAR_COUNT }).map((_, i) => {
                    const h = 28 + Math.abs(Math.sin(i * 1.3)) * 64 // 28%..92%
                    return (
                      <span
                        key={i}
                        className="w-1 flex-1 origin-center rounded-full bg-gradient-to-t from-brass-500/70 to-brass-300 animate-wave"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${(i % 10) * 0.08}s`,
                          animationPlayState: playing ? 'running' : 'paused',
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Thanh tiến trình (có thể tua) */}
            <div
              onClick={seek}
              className="mt-4 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="h-full rounded-full bg-brass-300 transition-[width] duration-200 ease-linear"
                style={{ width: `${(progress / total) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs tabular-nums text-slate-400">
              <span>{fmt(progress)}</span>
              <span>{fmt(total)}</span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              * Giao diện minh hoạ — bản demo chưa tích hợp âm thanh thật.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
