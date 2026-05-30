import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import VirtualTour from './components/VirtualTour'
import ArtifactGrid from './components/ArtifactGrid'
import Timeline from './components/Timeline'
import FeatureSection from './components/FeatureSection'
import Footer from './components/Footer'
import ArtifactModal from './components/ArtifactModal'
import { rooms, featuredArtifacts } from './data/museumData'

// =============================================================
//  App
//  Gốc của ứng dụng. Quản lý 2 state dùng chung:
//   - selectedRoomId  : khu vực đang xem trong Virtual Tour
//   - selectedArtifact : hiện vật đang mở trong modal (null = đóng)
//  Mọi dữ liệu lấy từ src/data/museumData.js để dễ chỉnh sửa.
// =============================================================

// Lớp nền trang trí: vài quầng sáng + hạt nhiễu nhẹ tạo chiều sâu.
function BackdropFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-brass-500/10 blur-[130px]" />
      <div className="absolute right-[-10%] top-[35%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      <div className="absolute bottom-[-10%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-500/[0.07] blur-[130px]" />
      {/* Hạt nhiễu (grain) bằng SVG data-uri, độ mờ rất thấp */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}

export default function App() {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id)
  const [selectedArtifact, setSelectedArtifact] = useState(null) // null => modal đóng

  return (
    <div className="relative min-h-screen">
      <BackdropFX />
      <Header />

      <main>
        <Hero />
        <VirtualTour
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          onRoomChange={setSelectedRoomId}
          onOpenArtifact={setSelectedArtifact}
        />
        <ArtifactGrid artifacts={featuredArtifacts} onOpenArtifact={setSelectedArtifact} />
        <Timeline />
        <FeatureSection />
      </main>

      <Footer />

      {/* Modal chi tiết hiện vật (mở khi có selectedArtifact) */}
      <AnimatePresence>
        {selectedArtifact && (
          <ArtifactModal artifact={selectedArtifact} onClose={() => setSelectedArtifact(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
