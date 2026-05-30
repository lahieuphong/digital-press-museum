# Digital Press Museum — Bảo tàng Báo chí Ảo

Website **demo concept** mô phỏng một bảo tàng số về lịch sử báo chí Việt Nam: tham quan ảo theo từng khu vực, hotspot tương tác, hiện vật nổi bật, dòng thời gian và phần giới thiệu trải nghiệm số.

> ⚠️ Đây là sản phẩm demo. Toàn bộ nội dung là **dữ liệu mẫu**, hình ảnh là **placeholder dựng bằng SVG/CSS** (không dùng ảnh bản quyền), và trình thuyết minh chỉ là **giao diện minh hoạ** (chưa phát âm thanh thật).

## Công nghệ

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **framer-motion** (animation) · **lucide-react** (icon)
- Không backend, không API, không database

## Chạy dự án

```bash
npm install
npm run dev      # chạy môi trường phát triển (mặc định http://localhost:5173)
npm run build    # build bản production vào thư mục dist/
npm run preview  # xem thử bản build
```

Yêu cầu: Node.js 18+.

## Cấu trúc

```
src/
├─ App.jsx                  # gốc app: state dùng chung + bố cục trang
├─ main.jsx                 # điểm vào React
├─ index.css                # Tailwind + style nền + animation sóng âm
├─ data/
│  └─ museumData.js         # TẤT CẢ nội dung: rooms, hiện vật, timeline, features, stats
└─ components/
   ├─ Header.jsx            # thanh điều hướng cố định (glass khi cuộn)
   ├─ Hero.jsx              # màn hình mở đầu + stat card
   ├─ VirtualTour.jsx       # phòng phối cảnh SVG + hotspot + chọn khu vực
   ├─ ArtifactGrid.jsx      # lưới hiện vật nổi bật
   ├─ ArtifactModal.jsx     # modal chi tiết + trình thuyết minh (mock)
   ├─ Timeline.jsx          # dòng thời gian (ngang ở desktop, dọc ở mobile)
   ├─ FeatureSection.jsx    # 4 thẻ "Trải nghiệm số"
   ├─ Footer.jsx            # chân trang + disclaimer
   ├─ SectionHeading.jsx    # tiêu đề section dùng chung
   └─ ArtifactImage.jsx     # ảnh placeholder (icon + gradient theo loại hiện vật)
```

State dùng chung nằm ở `App.jsx`: `selectedRoomId` (khu vực đang xem) và `selectedArtifact` (hiện vật đang mở; `null` nghĩa là modal đóng).

## Tuỳ biến nội dung

Mở `src/data/museumData.js` — gần như mọi thứ đều chỉnh tại đây:

- **Thêm/sửa khu vực**: thêm phần tử vào mảng `rooms`. Mỗi hotspot dùng toạ độ **phần trăm** `x`, `y` so với khung tham quan, nên luôn đúng trên mọi màn hình. Trường `accent` quyết định bảng màu phòng (`amber` · `sky` · `rose` · `emerald` · `violet`).
- **Hiện vật nổi bật**: sửa mảng `featuredArtifacts`. `details` là mô tả dài hiển thị trong modal; `audioLength` là thời lượng giả lập của bản thuyết minh.
- **Dòng thời gian / tính năng / chỉ số**: sửa `timeline`, `features`, `stats`.

## Thay ảnh / nội dung / audio thật về sau

- **Ảnh thật cho hiện vật**: mở `src/components/ArtifactImage.jsx`, thay phần dựng placeholder bằng `<img src={...} className="h-full w-full object-cover" />`. Có thể thêm trường `image` vào từng hiện vật trong `museumData.js` rồi truyền xuống.
- **Ảnh nền 360 cho phòng**: trong `VirtualTour.jsx`, thay component `PerspectiveRoom` (đang dựng bằng SVG) bằng ảnh panorama của bạn, hoặc nhúng thư viện xem 360. Hotspot vẫn hoạt động vì dùng toạ độ phần trăm.
- **Audio thuyết minh thật**: trong `ArtifactModal.jsx`, thay phần tiến trình giả lập (`setInterval`) bằng thẻ `<audio>` thật; nối nút play/pause và thanh tiến trình vào `currentTime` / `duration` của audio.

## Giấy phép

Dự án demo phi thương mại phục vụ mục đích học tập/portfolio. Không sử dụng dữ liệu hay tài sản có bản quyền khi chưa được cấp phép.
