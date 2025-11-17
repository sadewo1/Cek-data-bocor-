async function checkEmail() {
  const email = document.getElementById('emailInput').value.trim();
  const resultDiv = document.getElementById('emailResult');

  if (!email) {
    resultDiv.innerHTML = '<span style="color: orange">⚠️ Masukkan email dulu!</span>';
    return;
  }

  resultDiv.innerHTML = '🔍 Sedang memeriksa...';

  try {
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
      headers: { 'hibp-api-key': '' } // API key opsional, bisa kosong untuk rate-limited free use
    });

    if (response.status === 404) {
      resultDiv.innerHTML = '<span style="color: green">✅ Email aman — belum pernah bocor.</span>';
    } else if (response.ok) {
      const breaches = await response.json();
      const count = breaches.length;
      resultDiv.innerHTML = `<span style="color: red">❌ Email kamu pernah bocor di ${count} breach!</span><br>
        <small>Lihat detail: <a href="https://haveibeenpwned.com/account/${encodeURIComponent(email)}" target="_blank">di sini</a></small>`;
    } else {
      throw new Error('Gagal cek email');
    }
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: orange">⚠️ Gagal cek: ${error.message}</span>`;
  }
}

async function checkPassword() {
  const pwd = document.getElementById('pwdInput').value;
  const resultDiv = document.getElementById('pwdResult');

  if (!pwd) {
    resultDiv.innerHTML = '<span style="color: orange">⚠️ Masukkan password dulu!</span>';
    return;
  }

  resultDiv.innerHTML = '🔒 Sedang memeriksa...';

  try {
    // Hash password dengan SHA-1
    const hash = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(pwd));
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // Ambil 5 karakter pertama untuk k-anonymity
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);

    // Cek via HIBP API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();

    // Cari apakah suffix ada di hasil
    const lines = text.split('\n');
    const match = lines.find(line => line.startsWith(suffix));

    if (match) {
      const count = match.split(':')[1];
      resultDiv.innerHTML = `<span style="color: red">❌ Password kamu pernah bocor ${count} kali!</span><br>
        <small>Sebaiknya ganti password sekarang.</small>`;
    } else {
      resultDiv.innerHTML = '<span style="color: green">✅ Password aman — belum pernah bocor.</span>';
    }
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: orange">⚠️ Gagal cek: ${error.message}</span>`;
  }
}
