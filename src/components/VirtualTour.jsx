import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react'
import SectionHeading from './SectionHeading'

// =============================================================
//  VirtualTour
//  Khu "tham quan ảo": mô phỏng một căn phòng trưng bày bằng phối cảnh
//  một điểm tụ (one-point perspective) dựng hoàn toàn bằng SVG/CSS —
//  KHÔNG dùng ảnh bản quyền, KHÔNG cần thư viện 3D nặng.
//  - Đổi khu vực  -> nền/màu/nhãn phòng & danh sách hotspot thay đổi.
//  - Di chuột     -> hiệu ứng parallax nhẹ tạo cảm giác chiều sâu.
//  - Bấm hotspot  -> mở modal chi tiết hiện vật (qua onOpenArtifact).
// =============================================================

// Bảng màu theo accent của từng phòng (dùng cho stroke/gradient SVG)
const ROOM_ACCENTS = {
  amber: { line: '#f59e0b', soft: '#fbbf24', deep: '#78350f' },
  sky: { line: '#22d3ee', soft: '#67e8f9', deep: '#0c4a6e' },
  rose: { line: '#fb7185', soft: '#fda4af', deep: '#881337' },
  emerald: { line: '#34d399', soft: '#6ee7b7', deep: '#064e3b' },
  violet: { line: '#a78bfa', soft: '#c4b5fd', deep: '#3730a3' },
}

// --- Phòng trưng bày dựng bằng SVG (phối cảnh một điểm tụ) ----------
function PerspectiveRoom({ accent }) {
  const c = ROOM_ACCENTS[accent] || ROOM_ACCENTS.amber
  const gid = `room-${accent}`

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gid} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor={c.soft} stopOpacity="0.30" />
          <stop offset="45%" stopColor={c.deep} stopOpacity="0.24" />
          <stop offset="100%" stopColor="#05070f" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`${gid}-frame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.soft} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c.line} stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Nền tổng thể */}
      <rect x="0" y="0" width="1000" height="600" fill={`url(#${gid})`} />

      {/* Quầng sáng tụ tại "khung trưng bày" cuối phòng */}
      <ellipse cx="500" cy="278" rx="150" ry="110" fill={c.soft} fillOpacity="0.12" />

      {/* Cạnh góc phòng hội tụ về điểm tụ */}
      <g stroke={c.line} strokeOpacity="0.30" strokeWidth="1.2" fill="none">
        <line x1="0" y1="0" x2="370" y2="180" />
        <line x1="1000" y1="0" x2="630" y2="180" />
        <line x1="0" y1="600" x2="370" y2="380" />
        <line x1="1000" y1="600" x2="630" y2="380" />
      </g>

      {/* Sàn: đường dọc hội tụ + đường ngang theo chiều sâu */}
      <g stroke={c.line} strokeOpacity="0.16" strokeWidth="1" fill="none">
        <line x1="120" y1="600" x2="430" y2="380" />
        <line x1="300" y1="600" x2="470" y2="380" />
        <line x1="700" y1="600" x2="530" y2="380" />
        <line x1="880" y1="600" x2="570" y2="380" />
        <line x1="300" y1="470" x2="700" y2="470" />
        <line x1="355" y1="423" x2="645" y2="423" />
        <line x1="384" y1="399" x2="616" y2="399" />
      </g>

      {/* Trần */}
      <g stroke={c.line} strokeOpacity="0.12" strokeWidth="1" fill="none">
        <line x1="300" y1="130" x2="700" y2="130" />
        <line x1="358" y1="160" x2="642" y2="160" />
      </g>

      {/* Khung tranh gợi ý trên hai tường bên */}
      <g fill={c.soft} fillOpacity="0.05" stroke={c.line} strokeOpacity="0.30" strokeWidth="1">
        <polygon points="80,212 232,236 232,366 80,398" />
        <polygon points="920,212 768,236 768,366 920,398" />
      </g>

      {/* Tường xa + khung trưng bày phát sáng */}
      <rect x="370" y="180" width="260" height="200" fill={c.deep} fillOpacity="0.35" />
      <rect
        x="370"
        y="180"
        width="260"
        height="200"
        fill="none"
        stroke={`url(#${gid}-frame)`}
        strokeWidth="2.5"
      />
      <rect
        x="386"
        y="196"
        width="228"
        height="168"
        fill="none"
        stroke={c.soft}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  )
}

// --- Một điểm sáng (hotspot) trên khung tham quan -------------------
function Hotspot({ spot, color, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Xem hiện vật: ${spot.title}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      {/* Vòng nhịp lan toả */}
      <span
        className="absolute inset-0 -m-2 animate-ping rounded-full"
        style={{ backgroundColor: `${color}55` }}
      />
      {/* Chấm sáng */}
      <span
        className="relative grid h-5 w-5 place-items-center rounded-full shadow-glow ring-2 ring-white/70 transition group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      {/* Nhãn tên hiện vật khi hover/focus */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-soft backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {spot.title}
      </span>
    </button>
  )
}

export default function VirtualTour({ rooms, selectedRoomId, onRoomChange, onOpenArtifact }) {
  // offset trong khoảng -0.5..0.5 dùng cho hiệu ứng parallax
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const index = Math.max(
    0,
    rooms.findIndex((r) => r.id === selectedRoomId),
  )
  const room = rooms[index] || rooms[0]
  const c = ROOM_ACCENTS[room.accent] || ROOM_ACCENTS.amber

  // Chuyển phòng theo vòng tròn (trước/sau)
  const go = (dir) => {
    const next = (index + dir + rooms.length) % rooms.length
    onRoomChange(rooms[next].id)
  }

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOffset({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }

  return (
    <section id="tour" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tham quan ảo"
          title="Bước vào không gian trưng bày"
          desc="Chọn một khu vực, di chuyển trong phòng và chạm vào các điểm sáng để khám phá từng hiện vật."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar chọn khu vực (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Khu vực
              </p>
              {rooms.map((r, i) => {
                const active = r.id === room.id
                return (
                  <button
                    key={r.id}
                    onClick={() => onRoomChange(r.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? 'border-brass-400/40 bg-white/[0.06]'
                        : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-semibold ${
                        active ? 'bg-brass-400/20 text-brass-200' : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block truncate text-sm font-medium ${
                          active ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {r.name}
                      </span>
                      <span className="block truncate text-xs text-slate-500">{r.subtitle}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Sân khấu tham quan */}
          <div>
            <div
              onMouseMove={handleMove}
              onMouseLeave={() => setOffset({ x: 0, y: 0 })}
              className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-soft"
            >
              {/* Nền phối cảnh + parallax + chuyển cảnh khi đổi phòng */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-200 ease-out"
                    style={{
                      transform: `translate(${offset.x * 26}px, ${offset.y * 26}px) scale(1.06)`,
                    }}
                  >
                    <PerspectiveRoom accent={room.accent} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Vignette tăng chiều sâu */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" />

              {/* Nhãn phòng */}
              <div className="absolute left-5 top-5 max-w-[60%]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.line }} />
                  {room.subtitle}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white drop-shadow sm:text-2xl">
                  {room.name}
                </h3>
              </div>

              {/* Lớp hotspot (parallax nhẹ hơn nền -> tạo chiều sâu) */}
              <div
                className="absolute inset-0 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${offset.x * 10}px, ${offset.y * 10}px)` }}
              >
                {room.hotspots.map((spot) => (
                  <Hotspot
                    key={spot.id}
                    spot={spot}
                    color={c.line}
                    onClick={() => onOpenArtifact({ ...spot, accent: room.accent })}
                  />
                ))}
              </div>

              {/* Điều hướng trước/sau */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Khu vực trước"
                className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-950/50 text-white backdrop-blur transition hover:bg-ink-950/80"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Khu vực kế tiếp"
                className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-950/50 text-white backdrop-blur transition hover:bg-ink-950/80"
              >
                <ChevronRight size={20} />
              </button>

              {/* Gợi ý thao tác + đếm khu vực */}
              <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
                <span className="hidden items-center gap-1.5 text-xs text-slate-300 sm:inline-flex">
                  <MousePointerClick size={14} className="text-brass-300" />
                  Chạm vào điểm sáng để xem hiện vật
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {rooms.map((r) => (
                      <span
                        key={r.id}
                        className={`h-1.5 rounded-full transition-all ${
                          r.id === room.id ? 'w-5 bg-brass-300' : 'w-1.5 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs tabular-nums text-slate-400">
                    {String(index + 1).padStart(2, '0')} / {String(rooms.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Bộ chọn khu vực dạng chip (mobile/tablet) */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {rooms.map((r, i) => {
                const active = r.id === room.id
                return (
                  <button
                    key={r.id}
                    onClick={() => onRoomChange(r.id)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? 'border-brass-400/40 bg-white/[0.08] text-white'
                        : 'border-white/10 bg-white/[0.02] text-slate-400'
                    }`}
                  >
                    <span className="mr-1.5 text-xs text-slate-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {r.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
