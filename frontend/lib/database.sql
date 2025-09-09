-- Create blog_posts table
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create portfolio_projects table
CREATE TABLE portfolio_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_type TEXT NOT NULL,
  client_name TEXT,
  completion_date DATE,
  camera_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  needs TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_faqs_order ON faqs(order_index);

-- Insert sample data
INSERT INTO faqs (question, answer, order_index) VALUES
('Berapa lama proses instalasi CCTV?', 'Proses instalasi biasanya membutuhkan waktu 1-3 hari kerja, tergantung kompleksitas sistem dan jumlah kamera yang dipasang.', 1),
('Apakah bisa integrasi dengan ponsel?', 'Ya, semua sistem CCTV yang kami pasang dapat diakses melalui aplikasi mobile iOS dan Android untuk monitoring jarak jauh.', 2),
('Bagaimana dengan garansi perangkat dan pemasangan?', 'Kami memberikan garansi perangkat 1-2 tahun dan garansi pemasangan 6 bulan. Dukungan teknis tersedia selama masa garansi.', 3),
('Apakah perlu langganan bulanan?', 'Tidak ada biaya langganan bulanan untuk sistem lokal. Biaya tambahan hanya untuk layanan cloud storage atau monitoring 24/7 jika diperlukan.', 4),
('Bagaimana cara menjadwalkan survey lokasi?', 'Survey lokasi dapat dijadwalkan melalui WhatsApp atau form kontak. Tim kami akan datang untuk evaluasi gratis sesuai jadwal yang disepakati.', 5);

INSERT INTO testimonials (name, company, content, rating) VALUES
('Budi Santoso', 'Toko Elektronik Jaya', 'Pelayanan VisionGuard sangat profesional. Tim teknisi datang tepat waktu dan hasil pemasangan CCTV sangat memuaskan. Sekarang toko saya lebih aman.', 5),
('Sari Dewi', 'Rumah Pribadi', 'Konsultasi gratis yang diberikan sangat membantu memilih sistem CCTV yang tepat untuk rumah. Harga transparan dan tidak ada biaya tersembunyi.', 5),
('PT. Maju Bersama', 'Kantor', 'Instalasi CCTV untuk kantor kami berjalan lancar. Tim VisionGuard sangat komunikatif dan memberikan pelatihan penggunaan sistem dengan baik.', 5),
('Ahmad Rizki', 'Gudang', 'Sistem monitoring jarak jauh sangat membantu mengawasi gudang 24/7. Kualitas rekaman jernih dan aplikasi mobile mudah digunakan.', 4),
('Linda Permata', 'Sekolah TK', 'VisionGuard membantu memasang CCTV di sekolah dengan sangat hati-hati. Mereka memahami kebutuhan keamanan untuk lingkungan anak-anak.', 5);

INSERT INTO portfolio_projects (title, description, project_type, client_name, camera_count, completion_date) VALUES
('Instalasi CCTV Toko Retail', 'Pemasangan sistem CCTV 8 kamera dengan DVR untuk toko retail di pusat kota. Monitoring area kasir, gudang, dan area publik.', 'Retail', 'Toko Modern ABC', 8, '2024-01-15'),
('Sistem Keamanan Kantor', 'Instalasi CCTV network dengan 16 kamera IP untuk gedung perkantoran 3 lantai. Integrasi dengan sistem akses kontrol.', 'Perkantoran', 'PT. Sukses Mandiri', 16, '2024-02-20'),
('CCTV Kompleks Perumahan', 'Pemasangan sistem CCTV 12 kamera untuk keamanan kompleks perumahan dengan monitoring gerbang utama dan area publik.', 'Perumahan', 'Perumahan Indah Sejahtera', 12, '2024-03-10'),
('Monitoring Gudang Industri', 'Instalasi CCTV 20 kamera untuk gudang besar dengan sistem night vision dan recording 24/7.', 'Industri', 'CV. Logistik Prima', 20, '2024-03-25'),
('Keamanan Sekolah', 'Pemasangan CCTV 10 kamera untuk sekolah dengan fokus pada area playground, gerbang, dan koridor utama.', 'Pendidikan', 'SD Harapan Bangsa', 10, '2024-04-05'),
('CCTV Rumah Mewah', 'Sistem CCTV premium 6 kamera dengan fitur smart detection dan integrasi home automation untuk rumah mewah.', 'Residensial', 'Bapak Johnson', 6, '2024-04-18');

INSERT INTO blog_posts (title, slug, excerpt, content, published) VALUES
('Cara Memilih CCTV Sesuai Kebutuhan', 'cara-memilih-cctv-sesuai-kebutuhan', 'Panduan lengkap memilih sistem CCTV yang tepat untuk rumah, toko, atau kantor Anda.', 
 'Memilih sistem CCTV yang tepat adalah investasi penting untuk keamanan properti Anda. Berikut adalah panduan lengkap untuk membantu Anda membuat keputusan yang tepat:

## 1. Tentukan Tujuan Pemasangan

Sebelum memilih CCTV, tentukan tujuan utama:
- Mencegah pencurian
- Monitoring aktivitas
- Bukti hukum
- Pengawasan jarak jauh

## 2. Pilih Jenis Kamera

**Analog vs IP Camera:**
- Analog: Lebih ekonomis, cocok untuk area kecil
- IP Camera: Kualitas tinggi, fitur canggih, dapat diakses online

**Indoor vs Outdoor:**
- Indoor: Untuk area dalam ruangan
- Outdoor: Tahan cuaca, vandal-proof

## 3. Resolusi dan Kualitas Gambar

- **HD (720p)**: Cukup untuk monitoring dasar
- **Full HD (1080p)**: Standard yang direkomendasikan
- **4K**: Untuk detail maksimal, cocok area kritis

## 4. Fitur Tambahan

- **Night Vision**: Wajib untuk monitoring 24/7
- **Motion Detection**: Menghemat storage dan memudahkan review
- **Audio Recording**: Jika diperlukan rekaman suara
- **Mobile Access**: Monitoring melalui smartphone

## 5. Storage dan Recording

- **DVR/NVR**: Pilih kapasitas sesuai kebutuhan
- **Cloud Storage**: Backup tambahan
- **Local Storage**: HDD dengan kapasitas memadai

## Konsultasi Gratis

Tim ahli VisionGuard siap membantu Anda memilih sistem CCTV yang tepat. Hubungi kami untuk konsultasi gratis dan survey lokasi.', true),

('Tips Penempatan Kamera untuk Meminimalkan Blind Spot', 'tips-penempatan-kamera-minimalisir-blind-spot', 'Pelajari teknik penempatan kamera CCTV yang optimal untuk coverage maksimal tanpa blind spot.', 
 'Penempatan kamera CCTV yang strategis adalah kunci efektivitas sistem keamanan. Berikut tips untuk meminimalkan blind spot:

## 1. Survey Area Secara Menyeluruh

**Identifikasi Titik Kritis:**
- Pintu masuk dan keluar
- Area dengan valuables
- Jalur sirkulasi utama
- Titik-titik tersembunyi

**Perhatikan Pencahayaan:**
- Area dengan backlight
- Zona gelap
- Perubahan pencahayaan siang-malam

## 2. Prinsip Penempatan Kamera

**Ketinggian Optimal:**
- 2.5-3 meter untuk area umum
- 3-4 meter untuk area outdoor
- Hindari jangkauan tangan (anti-vandal)

**Sudut Pandang:**
- Angle 15-30 derajat ke bawah
- Hindari penempatan terlalu tinggi
- Pastikan wajah terlihat jelas

## 3. Teknik Coverage

**Overlapping Coverage:**
- Kamera saling menutupi blind spot
- Minimal 20% area overlap
- Backup view untuk area kritis

**Choke Point Strategy:**
- Fokus pada titik wajib dilalui
- Pintu, koridor, tangga
- Area dengan traffic tinggi

## 4. Mengatasi Tantangan Umum

**Corner Blind Spots:**
- Gunakan corner mount camera
- Wide angle lens
- Multiple camera placement

**Reflection dan Glare:**
- Hindari penempatan menghadap jendela
- Gunakan kamera dengan WDR
- Posisi yang tidak terpengaruh cahaya langsung

## 5. Testing dan Adjustment

- Live view testing dari berbagai sudut
- Walk test untuk memastikan coverage
- Night testing untuk low light performance
- Adjustment berkala sesuai kebutuhan

## Konsultasi Profesional

Tim teknisi VisionGuard berpengalaman dalam mendesain layout kamera optimal. Kami melakukan survey detail dan memberikan rekomendasi penempatan terbaik untuk setiap lokasi.', true),

('Perawatan Berkala Agar Rekaman Selalu Optimal', 'perawatan-berkala-rekaman-optimal', 'Panduan perawatan sistem CCTV untuk menjaga kualitas rekaman dan memperpanjang umur perangkat.', 
 'Perawatan rutin sistem CCTV sangat penting untuk memastikan kinerja optimal dan umur panjang perangkat. Berikut panduan lengkap perawatan CCTV:

## 1. Pembersihan Rutin

**Lensa Kamera:**
- Bersihkan setiap 2-4 minggu
- Gunakan kain microfiber lembut
- Hindari pembersih kimia keras
- Perhatikan kondisi cuaca dan debu

**Housing/Casing:**
- Bersihkan debu dan kotoran
- Periksa kondisi seal waterproof
- Pastikan ventilasi tidak tersumbat
- Bersihkan spider web secara rutin

## 2. Pemeriksaan Teknis

**Kualitas Gambar:**
- Cek clarity dan focus
- Periksa color balance
- Test night vision performance
- Verifikasi angle dan coverage

**Sistem Recording:**
- Monitor storage capacity
- Backup data penting
- Test playback quality
- Periksa timestamp accuracy

## 3. Maintenance Hardware

**Kabel dan Koneksi:**
- Periksa kondisi kabel
- Test koneksi power dan data
- Pastikan tidak ada kabel terkelupas
- Cek grounding system

**Power Supply:**
- Monitor voltage stability
- Periksa kondisi adaptor
- Test backup power (UPS)
- Bersihkan ventilasi power supply

## 4. Software dan Firmware

**Update Rutin:**
- Update firmware kamera
- Update software DVR/NVR
- Patch security updates
- Backup konfigurasi

**Database Maintenance:**
- Defrag hard drive
- Clean temporary files
- Optimize recording settings
- Monitor system performance

## 5. Schedule Perawatan

**Mingguan:**
- Visual inspection
- Test remote access
- Check recording status

**Bulanan:**
- Deep cleaning
- Storage management
- Performance check

**Triwulan:**
- Comprehensive system test
- Firmware update
- Professional inspection

**Tahunan:**
- Full system overhaul
- Component replacement
- Warranty check
- System upgrade evaluation

## Service Profesional VisionGuard

Kami menyediakan layanan maintenance berkala dengan teknisi bersertifikat. Paket perawatan kami mencakup:

- Cleaning dan adjustment rutin
- Monitoring system health
- Preventive maintenance
- Emergency support 24/7
- Laporan kondisi berkala

Hubungi kami untuk mengatur jadwal perawatan sistem CCTV Anda.', true);
