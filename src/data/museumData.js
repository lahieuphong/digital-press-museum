// =============================================================
//  museumData.js
//  TOÀN BỘ NỘI DUNG của bảo tàng được tập trung ở đây để dễ chỉnh sửa.
//
//  - rooms            : các khu vực tham quan ảo, mỗi khu vực có danh sách hotspot
//  - featuredArtifacts: hiện vật nổi bật hiển thị dạng grid
//  - timeline         : các cột mốc lịch sử báo chí
//  - features         : các thẻ giới thiệu "Trải nghiệm số"
//  - stats            : 3 chỉ số hiển thị ở Hero
//
//  ⚠ Tất cả là DỮ LIỆU MẪU phục vụ demo, không phải tư liệu chính thức.
//
//  Hotspot dùng đơn vị PHẦN TRĂM cho toạ độ (x, y) so với khung tham quan,
//  nhờ vậy vị trí luôn đúng trên mọi kích thước màn hình.
//  Trường `type`  -> dùng để chọn icon minh hoạ (xem ArtifactImage.jsx).
//  Trường `accent`-> điều khiển bảng màu/ánh sáng của phòng (xem VirtualTour.jsx).
// =============================================================

export const rooms = [
  {
    id: 'hall',
    name: 'Sảnh chính',
    subtitle: 'Khởi đầu hành trình',
    ambient: 'Không gian mở đầu giới thiệu tổng quan dòng chảy báo chí.',
    accent: 'amber',
    hotspots: [
      {
        id: 'intro-wall',
        title: 'Bảng dẫn nhập',
        period: 'Tổng quan',
        type: 'document',
        roomId: 'hall',
        x: 24,
        y: 50,
        description:
          'Tấm bảng mở đầu khái quát hơn một thế kỷ hình thành và phát triển của báo chí Việt Nam, mở lối cho toàn bộ hành trình tham quan.',
      },
      {
        id: 'press-globe',
        title: 'Dòng chảy thông tin',
        period: 'Tổng quan',
        type: 'newspaper',
        roomId: 'hall',
        x: 52,
        y: 66,
        description:
          'Mô hình tượng trưng cho sự lan toả của thông tin báo chí qua nhiều thời kỳ và loại hình truyền thông khác nhau.',
      },
      {
        id: 'hall-map',
        title: 'Trục thời gian thu nhỏ',
        period: 'Tổng quan',
        type: 'photo',
        roomId: 'hall',
        x: 78,
        y: 44,
        description:
          'Bản thu nhỏ của dòng thời gian, gợi mở các khu vực trưng bày được sắp xếp theo từng giai đoạn lịch sử.',
      },
    ],
  },
  {
    id: 'press-1865',
    name: 'Báo chí 1865–1925',
    subtitle: 'Buổi đầu báo in',
    ambient: 'Giai đoạn hình thành báo in và chữ Quốc ngữ.',
    accent: 'sky',
    hotspots: [
      {
        id: 'gia-dinh-bao-hs',
        title: 'Gia Định Báo',
        period: '1865',
        type: 'newspaper',
        roomId: 'press-1865',
        x: 22,
        y: 52,
        description:
          'Tờ báo bằng chữ Quốc ngữ đầu tiên, đánh dấu khởi đầu của báo in hiện đại tại Việt Nam.',
      },
      {
        id: 'typo-press-hs',
        title: 'Máy in Typo',
        period: 'Cuối thế kỷ 19',
        type: 'machine',
        roomId: 'press-1865',
        x: 50,
        y: 64,
        description:
          'Kỹ thuật in typo (in nổi) từng là công nghệ chủ lực giúp nhân bản báo chí với số lượng lớn.',
      },
      {
        id: 'quoc-ngu-hs',
        title: 'Trang báo Quốc ngữ',
        period: '1865–1925',
        type: 'document',
        roomId: 'press-1865',
        x: 76,
        y: 47,
        description:
          'Những trang báo Quốc ngữ buổi đầu góp phần phổ biến chữ viết và tri thức tới đông đảo công chúng.',
      },
    ],
  },
  {
    id: 'revolution',
    name: 'Báo chí cách mạng 1925–1945',
    subtitle: 'Tiếng nói thời cuộc',
    ambient: 'Báo chí gắn liền với các phong trào yêu nước.',
    accent: 'rose',
    hotspots: [
      {
        id: 'thanh-nien-hs',
        title: 'Báo Thanh Niên',
        period: '1925',
        type: 'newspaper',
        roomId: 'revolution',
        x: 26,
        y: 48,
        description:
          'Tờ báo mở đường cho dòng báo chí cách mạng, gắn với phong trào yêu nước đầu thế kỷ 20.',
      },
      {
        id: 'secret-press-hs',
        title: 'Xưởng in bí mật',
        period: 'Thập niên 1930',
        type: 'machine',
        roomId: 'revolution',
        x: 54,
        y: 63,
        description:
          'Những xưởng in hoạt động bí mật giúp tiếng nói báo chí không bị gián đoạn trong giai đoạn khó khăn.',
      },
      {
        id: 'manuscript-hs',
        title: 'Bản thảo viết tay',
        period: '1925–1945',
        type: 'document',
        roomId: 'revolution',
        x: 79,
        y: 50,
        description:
          'Bản thảo viết tay cho thấy quy trình biên tập thủ công trước thời kỳ in ấn cơ giới hoá rộng rãi.',
      },
    ],
  },
  {
    id: 'resistance',
    name: 'Kháng chiến 1945–1975',
    subtitle: 'Báo chí nơi tuyến đầu',
    ambient: 'Báo chí đồng hành cùng đời sống thời chiến.',
    accent: 'emerald',
    hotspots: [
      {
        id: 'radio-mic-hs',
        title: 'Micro phát thanh',
        period: '1945–1975',
        type: 'audio',
        roomId: 'resistance',
        x: 23,
        y: 50,
        description:
          'Chiếc micro phát thanh đưa tin tức tới công chúng qua làn sóng, mở rộng tầm với của báo chí.',
      },
      {
        id: 'war-camera-hs',
        title: 'Máy ảnh phóng viên',
        period: 'Thập niên 1960',
        type: 'camera',
        roomId: 'resistance',
        x: 51,
        y: 65,
        description:
          'Máy ảnh đồng hành cùng phóng viên nơi tuyến đầu, lưu giữ những khoảnh khắc lịch sử bằng hình ảnh.',
      },
      {
        id: 'war-page-hs',
        title: 'Trang báo thời chiến',
        period: '1945–1975',
        type: 'document',
        roomId: 'resistance',
        x: 77,
        y: 46,
        description:
          'Trang báo thời chiến phản ánh nhịp sống và tinh thần của một giai đoạn đầy biến động.',
      },
    ],
  },
  {
    id: 'renovation',
    name: 'Đổi mới và hội nhập',
    subtitle: 'Bước vào kỷ nguyên số',
    ambient: 'Từ báo in sang môi trường số đa nền tảng.',
    accent: 'violet',
    hotspots: [
      {
        id: 'press-card-hs',
        title: 'Thẻ nhà báo',
        period: 'Thời kỳ Đổi mới',
        type: 'id',
        roomId: 'renovation',
        x: 25,
        y: 49,
        description:
          'Thẻ nhà báo là biểu tượng cho vai trò và trách nhiệm nghề nghiệp của người làm báo.',
      },
      {
        id: 'digital-news-hs',
        title: 'Toà soạn số',
        period: 'Thập niên 2000',
        type: 'photo',
        roomId: 'renovation',
        x: 52,
        y: 64,
        description:
          'Toà soạn số đánh dấu bước chuyển từ báo in sang môi trường trực tuyến đa nền tảng.',
      },
      {
        id: 'transformation-hs',
        title: 'Chuyển đổi số',
        period: '2025',
        type: 'newspaper',
        roomId: 'renovation',
        x: 78,
        y: 48,
        description:
          'Chuyển đổi số định hình lại cách sản xuất, phân phối và tiếp nhận tin tức trong kỷ nguyên mới.',
      },
    ],
  },
]

// ------------------------------------------------------------------
//  HIỆN VẬT NỔI BẬT (grid). `details` là mô tả dài hơn dùng trong modal.
//  `audioLength` chỉ để hiển thị thời lượng giả lập của bản thuyết minh.
// ------------------------------------------------------------------
export const featuredArtifacts = [
  {
    id: 'gia-dinh-bao',
    title: 'Gia Định Báo',
    period: '1865',
    type: 'newspaper',
    accent: 'amber',
    audioLength: '02:18',
    description:
      'Tờ báo bằng chữ Quốc ngữ đầu tiên, mở đầu cho lịch sử báo in hiện đại tại Việt Nam.',
    details:
      'Gia Định Báo được xem là tờ báo bằng chữ Quốc ngữ đầu tiên, đặt nền móng cho báo in hiện đại tại Việt Nam. Sự ra đời của nó góp phần phổ biến chữ Quốc ngữ và hình thành thói quen đọc báo trong công chúng. Hiện vật minh hoạ giúp người xem hình dung diện mạo những trang báo buổi sơ khai.',
  },
  {
    id: 'may-in-typo',
    title: 'Máy in Typo',
    period: 'Cuối thế kỷ 19',
    type: 'machine',
    accent: 'slate',
    audioLength: '01:54',
    description:
      'Công nghệ in nổi chủ lực một thời, giúp nhân bản báo chí với số lượng lớn.',
    details:
      'Máy in typo sử dụng kỹ thuật in nổi, từng là công nghệ in ấn chủ lực trong nhiều thập kỷ. Mỗi con chữ kim loại được sắp thủ công thành trang, sau đó ép mực lên giấy. Đây là bước tiến quan trọng giúp báo chí đến được với đông đảo người đọc.',
  },
  {
    id: 'micro-phat-thanh',
    title: 'Micro phát thanh cũ',
    period: '1945–1975',
    type: 'audio',
    accent: 'emerald',
    audioLength: '02:05',
    description:
      'Thiết bị đưa tin tức tới công chúng qua làn sóng phát thanh.',
    details:
      'Chiếc micro phát thanh tượng trưng cho thời kỳ phát thanh giữ vai trò quan trọng trong việc truyền tải thông tin. Qua làn sóng, tin tức có thể vượt khoảng cách địa lý để đến với người nghe ở khắp nơi, mở rộng đáng kể tầm ảnh hưởng của báo chí.',
  },
  {
    id: 'may-anh-phong-vien',
    title: 'Máy ảnh phóng viên',
    period: 'Thế kỷ 20',
    type: 'camera',
    accent: 'sky',
    audioLength: '01:42',
    description:
      'Người bạn đồng hành của phóng viên, ghi lại những khoảnh khắc lịch sử.',
    details:
      'Máy ảnh là công cụ không thể thiếu của phóng viên ảnh, giúp ghi lại những khoảnh khắc chân thực của đời sống và lịch sử. Mỗi bức ảnh là một tư liệu báo chí, kể câu chuyện bằng hình ảnh theo cách mà ngôn từ đôi khi khó diễn đạt trọn vẹn.',
  },
  {
    id: 'the-nha-bao',
    title: 'Thẻ nhà báo',
    period: 'Thời kỳ Đổi mới',
    type: 'id',
    accent: 'violet',
    audioLength: '01:30',
    description:
      'Biểu tượng cho vai trò và trách nhiệm nghề nghiệp của người làm báo.',
    details:
      'Thẻ nhà báo không chỉ là giấy tờ tác nghiệp mà còn là biểu tượng cho trách nhiệm và đạo đức nghề nghiệp. Nó gắn liền với hình ảnh người làm báo dấn thân, đưa thông tin trung thực tới công chúng.',
  },
  {
    id: 'trang-bao-thoi-chien',
    title: 'Trang báo thời chiến',
    period: '1945–1975',
    type: 'document',
    accent: 'rose',
    audioLength: '02:33',
    description:
      'Trang báo phản ánh nhịp sống và tinh thần của một giai đoạn lịch sử.',
    details:
      'Những trang báo thời chiến là lát cắt sống động về một giai đoạn đầy biến động. Qua từng dòng tin, người đọc hôm nay có thể cảm nhận được nhịp sống, tinh thần và những câu chuyện của thời kỳ đó.',
  },
]

// ------------------------------------------------------------------
//  DÒNG THỜI GIAN
// ------------------------------------------------------------------
export const timeline = [
  {
    year: '1865',
    title: 'Gia Định Báo',
    accent: 'amber',
    text: 'Tờ báo chữ Quốc ngữ đầu tiên ra đời, mở đầu cho báo in hiện đại.',
  },
  {
    year: '1925',
    title: 'Báo chí cách mạng',
    accent: 'rose',
    text: 'Dòng báo chí cách mạng hình thành, gắn với phong trào yêu nước.',
  },
  {
    year: '1945',
    title: 'Kỷ nguyên độc lập',
    accent: 'sky',
    text: 'Báo chí bước vào giai đoạn mới trong kỷ nguyên độc lập.',
  },
  {
    year: '1975',
    title: 'Thống nhất đất nước',
    accent: 'emerald',
    text: 'Đất nước thống nhất, báo chí cả nước hoà chung một dòng chảy.',
  },
  {
    year: '1986',
    title: 'Đổi mới',
    accent: 'violet',
    text: 'Công cuộc Đổi mới tạo động lực phát triển mạnh mẽ cho báo chí.',
  },
  {
    year: '2025',
    title: 'Chuyển đổi số',
    accent: 'cyan',
    text: 'Báo chí chuyển mình trên nền tảng số, đa phương tiện và tương tác.',
  },
]

// ------------------------------------------------------------------
//  TRẢI NGHIỆM SỐ (4 feature card). `icon` ánh xạ trong FeatureSection.jsx
// ------------------------------------------------------------------
export const features = [
  {
    icon: 'compass',
    title: 'Tham quan ảo 360',
    text: 'Di chuyển linh hoạt qua từng không gian trưng bày, khám phá bảo tàng theo nhịp của riêng bạn.',
  },
  {
    icon: 'hotspot',
    title: 'Hotspot tương tác',
    text: 'Chạm vào các điểm sáng để mở thông tin chi tiết về hiện vật ngay trong không gian.',
  },
  {
    icon: 'media',
    title: 'Tư liệu đa phương tiện',
    text: 'Kết hợp hình ảnh, văn bản và thuyết minh để mỗi hiện vật trở thành một câu chuyện sống động.',
  },
  {
    icon: 'mobile',
    title: 'Giao diện mobile-first',
    text: 'Tối ưu trọn vẹn cho điện thoại, máy tính bảng và máy tính — trải nghiệm mượt trên mọi thiết bị.',
  },
]

// ------------------------------------------------------------------
//  CHỈ SỐ HERO
// ------------------------------------------------------------------
export const stats = [
  { value: '5', label: 'khu vực trưng bày' },
  { value: '24', label: 'hiện vật tương tác' },
  { value: '100+', label: 'năm lịch sử' },
]
