# 🔐 Cek Kebocoran Email & Gmail
Repositori ini cuma sekedar nampung link cepat buat cek apakah email kalian kena breach atau Gmail-nya ada aktivitas mencurigakan.  
**Tidak perlu install apapun, cukup klik → masukin email → selesai.**

---

## 1. Cek Kebocoran Data (Email / Username)
| Situs | Catatan |
|-------|---------|
| [Have I Been Pwned](https://haveibeenpwned.com) | Legit, database paling besar |
| [Mozilla Monitor](https://monitor.mozilla.org) | Dari Firefox + bisa notifik |
| [Avast Hack Check](https://www.avast.com/hackcheck) | Simple, gak perlu login |
| [DeHashed](https://www.dehashed.com) | Bisa search 1x gratis |
| [LeakCheck.io](https://leakcheck.io) | Tanpa login, hasil jelas |
| [Scylla.sh](https://scylla.sh) | Search engine breach |
| [IntelligenceX](https://intelx.io) | Deep-search kalau perlu |

---

## 2. Cek Keamanan Akun Gmail Langsung
| Tujuan | Langkah |
|--------|---------|
| Lihat perangkat login | [google.com/devices](https://google.com/devices) |
| Ubah sandi & 2FA | [myaccount.google.com/security](https://myaccount.google.com/security) |
| Cek app berbahaya | [myaccount.google.com/connections](https://myaccount.google.com/connections) |
| Audit forwarding / filter | [Gmail → Settings → See all settings → Forwarding & POP/IMAP](https://mail.google.com/mail/#settings/fwdandpop) |

---

## 3. Cara Pakai (Cuma 30 detik)
1. Klik salah satu link di tabel.  
2. Masukkan email → tekan cek.  
3. Kalau muncul “Found in breach”, ganti password + aktifkan 2FA.

---

## 4. Mau kontribusi?
Fork → edit → pull-request.  
Boleh nambahin situs baru, terjemahan, atau bikin versi bahasa lain.

---

### ⚠️ Disclaimer
Semua link di atas adalah situs pihak ketiga. Gunakan dengan bijak, jangan masukin password di formulir yang mencurigakan.

Berikut panduan LENGKAP menjalankan proyek HTML/CSS/JS lokal di Termux (Android) dan Linux, pakai web-server sederhana (Python) agar semua fitur (termasuk `fetch()` ke API eksternal) bisa jalan tanpa CORS error.

---

0. Persiapan file

---

1. Buat folder proyek, misal `cek-bocor`.  
2. Letakkan 3 file ini di dalamnya:

- `index.html` (kode HTML kamu)  
- `style.css` (kode CSS kamu)  
- `script.js` (kode JS kamu)

---

1. Termux (Android)

---

A. Install dependensi

```bash
pkg update && pkg upgrade -y
pkg install python git -y
```

B. Masuk ke folder proyek

```bash
cd ~/storage/shared  # supaya file mudah diakses HP
mkdir cek-bocor && cd cek-bocor
# pindahkan 3 file tadi ke sini (bisa via file manager)
```

C. Jalankan server Python (port 8080)

```bash
python -m http.server 8080
```

Keluaran:

```
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

D. Buka browser HP → ketik di address-bar:

```
http://localhost:8080
```

Selesai. Semua tombol “Cek” sudah bisa dipakai (HP harus online agar API HIBP terjangkau).

E. (Opsional) agar bisa diakses PC/laptop di jaringan Wi-Fi yang sama:

```
http://<IP-Termux>:8080
```

Cek IP Termux:

```bash
ip addr show wlan0
```

---

2. Linux (Ubuntu/Debian/Arch dsb.)

---

A. Install Python3 (sudah ada di kebanyakan distro)

```bash
sudo apt update && sudo apt install python3 -y   # Debian/Ubuntu
```

B. Masuk ke folder proyek

```bash
cd ~/cek-bocor
```

C. Jalankan server

```bash
python3 -m http.server 8080
```

D. Buka browser →

```
http://localhost:8080
```

E. Agar bisa diakses perangkat lain di LAN:

```
http://<IP-Linux>:8080
```

Cek IP:

```bash
ip -4 addr show scope global
```

---

3. Tips & Troubleshooting

---

- CORS error? Pakai server lokal (langkah di atas) jangan buka file `index.html` langsung (`file://`).  
- API HIBP butuh kunci? Gratis 10 request/bulan tanpa kunci; kalau limit, daftar di https://haveibeenpwned.com/API/Key lalu masukkan di baris:
  
```js
  headers: { 'hibp-api-key': 'ISI_KAMU_DI_SINI' }
  ```

- Matikan server: `Ctrl+C` di terminal.  
- Jalankan di background Termux: pakai `nohup` atau `tmux`.

---

4. One-liner (copas langsung)

---

Termux/Linux:

```bash
cd ~/cek-bocor && python3 -m http.server 8080
```

Buka browser → `localhost:8080` → selesai.

Selamat mencoba, stay secure!
