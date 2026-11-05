# Khoai ơi, con một tuổi rồi!

Album lật trang mừng sinh nhật đầu tiên của **Phạm Viết An Duy**, sinh ngày **05/11/2025**. Người tặng xưng **chú**.

## Mở món quà

Mở `Khoai-mot-tuoi.html` bằng Safari, Chrome hoặc Edge. Toàn bộ giao diện, tương tác và ảnh nằm trong một file, mở được không cần máy chủ. Nếu đang mở bản cũ, tải lại trang.

`site/` là mã website thông thường. Có thể chạy `python3 -m http.server 4174 --directory site` để xem qua localhost. File ZIP gồm website và đủ 99 ảnh đã tối ưu để lưu trữ.

## Album

**35 trang album, 13 chương**, gồm trang bìa, 32 trang ảnh và 2 trang thư.

- Lời mở đầu: Khi cả nhà chờ con.
- Chương 01: Nhà mình thêm một người thương.
- Chương 02: Những ngày con còn bé xíu.
- Chương 03: Đi đâu cũng có vòng tay.
- Chương 04: Cùng nhà mình gom kỷ niệm.
- Chương 05: Những điều nhỏ xíu mỗi ngày.
- Chương 06: Những vòng tay đưa con đi.
- Chương 07: Thế giới rộng thêm từng chút.
- Chương 08: Những người bạn, những niềm vui.
- Chương 09: Nụ cười lớn dần cùng con.
- Chương 10: Mang theo cả một trời háo hức.
- Chương 11: Khoai một tuổi rồi! (5 ảnh sinh nhật ghép trên một trang, cạnh bánh kem thổi nến).
- Lá thư: Gửi An Duy của những năm sau.

Toàn bộ **99 ảnh** có mặt trực tiếp trong các trang ảnh, theo đúng thứ tự gốc, không ảnh nào bị bỏ vào một kho ảnh riêng. 94 ảnh đánh số xuất hiện trước 5 ảnh sinh nhật. Ảnh số 14 không có trong thư mục gốc; vẫn giữ số file gốc và không tạo ảnh thay thế. Ảnh bìa là ảnh sinh nhật được lặp lại cho mục đích trình bày, không tính vào 99 ảnh của các trang chính.

Mỗi lần lật hiển thị một trang album gồm hai mặt giấy trên máy tính; màn hình điện thoại sắp ảnh theo chiều dọc, vừa một màn hình. Không tự suy đoán tháng tuổi, ngày chụp, quan hệ của người trong ảnh, hoặc ngày bé đạt một mốc phát triển.

## Giao diện (bản chỉnh 11/2026)

- Khung ảnh ôm sát theo tỉ lệ từng tấm, không còn mảng trống hai bên ảnh dọc.
- Chương sinh nhật gộp thành một trang ảnh ghép.
- Lá thư còn 2 trang liền mạch; lời chào, lời chúc và chữ ký dùng chữ viết tay.
- Thanh trên cùng hiện câu dẫn của chương thay vì lặp lại tên chương.
- Cỡ chữ nhỏ nhất được nâng lên và chữ phụ đậm màu hơn cho dễ đọc.

## Chế độ sách toàn màn hình

- Cuốn album chiếm gần trọn màn hình, đặt trên nền bàn gỗ tối. Không còn thanh tiêu đề, dòng chương hay chân trang bên ngoài.
- Khi mở từ bìa, cuốn sách bìa cứng đang gập nằm giữa màn hình. Chạm vào bìa (hoặc nhấn Enter, phím →) để lật bìa mở ra.
- Lật trang có hiệu ứng trang giấy 3D và bóng đổ: máy tính lật cả tờ quanh gáy sách, điện thoại lật từng trang quanh mép trái.
- Lật trang tới và lật lại bằng hai nút tròn nhỏ ‹ › ở hai mép màn hình (có cả trên điện thoại), vuốt ngang hoặc phím ← →. Không còn thanh số trang ở dưới che ảnh.
- Nút nhạc và mục lục là nút nổi nhỏ ở góc trên, tự ẩn sau khoảng 3 giây không chạm và hiện lại khi chạm hoặc di chuột.
- Trên màn hình lớn, cả cuốn sách được phóng to theo tỉ lệ cho vừa màn hình nên chữ và ảnh to lên cùng nhau.
- Người dùng bật chế độ giảm chuyển động sẽ vào thẳng album, không có hoạt ảnh.

## Tương tác

- Nút Trang trước / Trang tiếp, phím trái/phải hoặc vuốt ngang để lật.
- Mục lục mở nhanh các chương; Home về bìa, End đến trang cuối.
- Bấm ảnh để xem lớn; chuyển qua đủ 99 ảnh bằng nút hoặc phím mũi tên, Escape đóng ảnh.
- Giữ lại lá thư ở trang cuối dưới dạng văn bản UTF-8.
- Giai điệu Happy Birthday vui tươi, phối hộp nhạc với đàn gảy và nhịp đệm nhẹ. Nhạc bật sẵn và tự phát ở lần chạm đầu tiên (thường là lúc chạm mở bìa sách), vì trình duyệt không cho phát âm thanh trước khi người xem chạm vào trang. Nút "Tắt nhạc" ở góc trên tắt nhạc, và máy đó nhớ lựa chọn cho những lần mở sau. Nhạc tạm dừng khi rời tab. Âm thanh tổng hợp bằng Web Audio, hoạt động cả khi không có mạng.
- Hiệu ứng lật giấy, dây cờ sinh nhật ở bìa, bóng bay và ánh sao nền nhẹ.
- Chương sinh nhật có pháo giấy và bánh sinh nhật tương tác: bấm thổi nến, nhận lời chúc và thắp nến lại.
- Hiệu ứng hỗ trợ chế độ giảm chuyển động, tự dừng khi chuyển sang tab khác.

## Chỉnh sửa và lưu giữ

Ảnh gốc không bị thay đổi. `prepare_photos.py` tạo các bản JPEG đã tối ưu. `site/photos.js` chứa danh sách ảnh. Cấu trúc chương, chú thích và trang nằm trong `site/app.js`; thư gốc nằm trong template của `site/index.html`; giao diện trong `site/style.css`.

Sau khi sửa, chạy `python3 export_gift.py` để cập nhật bản một file, thư văn bản và ZIP. Phông chữ (Lora, Be Vietnam Pro, Dancing Script) được lưu sẵn trong `site/fonts/` và nhúng vào bản một file, nên album hiển thị đúng cả khi không có mạng. Album không tải tài nguyên nào từ bên ngoài. Website không có bộ theo dõi hoặc biểu mẫu gửi dữ liệu.

## Kiểm tra

Đã đi qua toàn bộ 35 trang trên các màn hình 320×640, 390×844, 768×1024, 1024×768, 1440×900 và 844×390; kiểm tra thứ tự đủ 99 ảnh, không trùng trong các trang chính, nội dung vừa khung, lật trang, mục lục, phím tắt, thao tác vuốt, xem ảnh lớn và tải thư. Bản một file được kiểm tra khi không có mạng.

Bản hiện tại lưu tại máy, chưa xuất bản ảnh gia đình lên dịch vụ bên ngoài.
