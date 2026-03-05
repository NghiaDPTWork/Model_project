# Model Configure Project

Dự án này là một template (mẫu cấu hình) được xây dựng nhằm mục đích thực hành và thiết lập bộ khung tiêu chuẩn cho các dự án lập trình. Trọng tâm của repository này là cấu hình các công cụ kiểm soát chất lượng mã nguồn, đảm bảo code luôn sạch, thống nhất và hạn chế tối đa lỗi trước khi được đẩy lên hệ thống quản lý phiên bản.

## Các công cụ được tích hợp

* **ESLint:** Công cụ phân tích mã nguồn tĩnh giúp phát hiện các vấn đề, lỗi tiềm ẩn và ép buộc tuân thủ các quy tắc viết code chuẩn.
* **Prettier:** Trình định dạng mã nguồn tự động, giúp đồng bộ hóa phong cách code (dấu phẩy, ngoặc đơn, khoảng trắng...) trên toàn bộ dự án.
* **Husky:** Công cụ quản lý Git hooks. Husky cho phép tự động kích hoạt các tập lệnh (như chạy ESLint hoặc format bằng Prettier) tại các thời điểm cụ thể, điển hình nhất là quá trình `pre-commit` để chặn các commit chứa code không đạt chuẩn.

## Hướng dẫn cài đặt

Để sử dụng cấu trúc mẫu này cho dự án của bạn, hãy thực hiện các bước sau:

1. Clone repository về máy tính:
   ```bash
   git clone [https://github.com/NghiaDPTWork/model-configure-project.git](https://github.com/NghiaDPTWork/model-configure-project.git)
