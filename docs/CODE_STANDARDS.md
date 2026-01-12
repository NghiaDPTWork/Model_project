# 📋 CODE STANDARDS - Quy Chuẩn Code Dự Án

> Tài liệu đảm bảo TẤT CẢ developers tuân thủ quy tắc code thống nhất.

---

## 🔧 Các Công Cụ

| Công Cụ | Chức Năng | Thời Điểm |
|---------|-----------|-----------|
| **Prettier** | Format code | Khi lưu / Pre-commit |
| **ESLint** | Phát hiện lỗi | Khi lưu / Pre-commit |
| **EditorConfig** | Settings IDE | Khi mở project |
| **Husky** | Git hooks | Trước commit |
| **Lint-Staged** | Check staged files | Pre-commit |
| **Commitlint** | Validate message | Commit-msg |

---

## 📝 Prettier Config (`.prettierrc`)

```json
{
  "semi": false,           // Không dấu ;
  "singleQuote": true,     // Dùng '
  "tabWidth": 2,           // 2 spaces
  "trailingComma": "none"  // Không dấu , cuối
}
```

---

## 🔍 ESLint Rules

- `no-unused-vars`: Lỗi nếu biến không dùng (trừ `_prefix`)
- `no-console`: Cảnh báo (cho phép `warn`, `error`)
- `prefer-const`: Bắt buộc `const` khi không reassign
- `eqeqeq`: Bắt buộc `===` thay vì `==`
- React Hooks rules enabled

---

## 📨 Commit Format

```
<type>: <subject>
```

### Types

| Type | Mô Tả |
|------|-------|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `docs` | Documentation |
| `style` | Format code |
| `refactor` | Refactor |
| `test` | Tests |
| `chore` | Maintenance |

### Ví dụ ✅

```bash
git commit -m "feat: add user login page"
git commit -m "fix: resolve cart calculation"
```

### Sai ❌

```bash
git commit -m "Add login"        # Thiếu type
git commit -m "FEAT: add login"  # Type phải lowercase
```

---

## 🚀 Workflow

```bash
# 1. Code
npm run dev

# 2. Kiểm tra
npm run validate

# 3. Fix nếu lỗi
npm run validate:fix

# 4. Commit
git add .
git commit -m "feat: your feature"
```

---

## 📦 VS Code Extensions

Khi mở project, VS Code sẽ gợi ý cài:
- Prettier
- ESLint
- EditorConfig
- Tailwind CSS IntelliSense
- ES7+ React Snippets

---

## ⚠️ Troubleshooting

### "pre-commit hook failed"
```bash
npm run validate:fix
git add .
git commit -m "feat: message"
```

### "commitlint - subject may not be empty"
Dùng format đúng: `type: subject`
