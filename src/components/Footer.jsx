import { Landmark, Github, Twitter, Youtube, Mail } from 'lucide-react'

// =============================================================
//  Footer
//  Nền tối, brand + mô tả, các cột link GIẢ LẬP và dòng disclaimer.
//  (Các link chỉ mang tính minh hoạ nên trỏ href="#".)
// =============================================================

const LINKS = [
  {
    heading: 'Khám phá',
    items: ['Tham quan ảo', 'Hiện vật nổi bật', 'Dòng thời gian', 'Trải nghiệm số'],
  },
  {
    heading: 'Tài nguyên',
    items: ['Giới thiệu dự án', 'Hướng dẫn sử dụng', 'Câu hỏi thường gặp', 'Bản quyền & giấy phép'],
  },
  {
    heading: 'Kết nối',
    items: ['Liên hệ', 'Hợp tác', 'Đóng góp tư liệu', 'Bản tin'],
  },
]

const SOCIALS = [Github, Twitter, Youtube, Mail]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brass-400/15 ring-1 ring-brass-400/30">
                <Landmark size={18} className="text-brass-300" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Digital <span className="font-display italic text-brass-300">Press</span> Museum
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Không gian trưng bày số tái hiện hành trình báo chí Việt Nam qua hiện vật tương tác và
              câu chuyện đa phương tiện.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Liên kết mạng xã hội (minh hoạ)"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-brass-400/30 hover:text-brass-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Các cột link */}
          {LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-white">{col.heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition hover:text-brass-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Thanh dưới cùng */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Digital Press Museum. Dự án demo phi thương mại.</p>
          <p className="text-brass-200/70">
            Demo concept website — không sử dụng dữ liệu thật khi chưa được cấp phép.
          </p>
        </div>
      </div>
    </footer>
  )
}
