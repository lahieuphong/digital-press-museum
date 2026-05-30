import {
  Newspaper,
  Printer,
  Radio,
  Camera,
  FileText,
  ScrollText,
  BadgeCheck,
  Image as ImageIcon,
} from 'lucide-react'

// =============================================================
//  ArtifactImage
//  Ảnh minh hoạ PLACEHOLDER cho hiện vật (không dùng ảnh bản quyền).
//  - `type`  -> chọn icon tượng trưng
//  - `accent`-> chọn bảng màu gradient nền
//  Khi có ảnh thật, chỉ cần thay phần render bằng thẻ <img>.
// =============================================================

// Bản đồ type -> icon lucide
const ICONS = {
  newspaper: Newspaper,
  machine: Printer,
  audio: Radio,
  camera: Camera,
  document: FileText,
  photo: ScrollText,
  id: BadgeCheck,
}

// Bản đồ accent -> lớp màu (gradient nền, viền, màu icon, đốm sáng)
const ACCENTS = {
  amber: {
    grad: 'from-amber-500/25 via-ink-800 to-ink-900',
    ring: 'ring-amber-400/20',
    icon: 'text-amber-200',
    glow: 'bg-amber-400/30',
  },
  sky: {
    grad: 'from-sky-500/25 via-ink-800 to-ink-900',
    ring: 'ring-sky-400/20',
    icon: 'text-sky-200',
    glow: 'bg-sky-400/30',
  },
  rose: {
    grad: 'from-rose-500/25 via-ink-800 to-ink-900',
    ring: 'ring-rose-400/20',
    icon: 'text-rose-200',
    glow: 'bg-rose-400/30',
  },
  emerald: {
    grad: 'from-emerald-500/25 via-ink-800 to-ink-900',
    ring: 'ring-emerald-400/20',
    icon: 'text-emerald-200',
    glow: 'bg-emerald-400/30',
  },
  violet: {
    grad: 'from-violet-500/25 via-ink-800 to-ink-900',
    ring: 'ring-violet-400/20',
    icon: 'text-violet-200',
    glow: 'bg-violet-400/30',
  },
  slate: {
    grad: 'from-slate-400/20 via-ink-800 to-ink-900',
    ring: 'ring-slate-300/15',
    icon: 'text-slate-200',
    glow: 'bg-slate-300/25',
  },
}

export default function ArtifactImage({ type, accent = 'amber', className = '', iconSize = 56 }) {
  const Icon = ICONS[type] || ImageIcon
  const a = ACCENTS[accent] || ACCENTS.amber

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${a.grad} ring-1 ${a.ring} ${className}`}
    >
      {/* Đốm sáng mờ tạo chiều sâu */}
      <div className={`absolute -right-6 -top-8 h-32 w-32 rounded-full blur-3xl ${a.glow}`} />
      <div className={`absolute -bottom-10 -left-8 h-32 w-32 rounded-full blur-3xl ${a.glow} opacity-60`} />

      {/* Hoạ tiết sọc gợi cảm giác trang báo cũ (dùng inline style cho chắc) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 7px)',
        }}
      />

      {/* Icon tượng trưng cho loại hiện vật */}
      <Icon size={iconSize} strokeWidth={1.25} className={`relative ${a.icon}`} />
    </div>
  )
}
