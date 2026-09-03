export async function sendSmsNotification(phones: string[], message: string) {
  const baseUrl = process.env.SMS_API_URL;
  if (!baseUrl) {
    console.warn("[SMS] SMS_API_URL bulunamadığı için SMS gönderilemedi.");
    return;
  }

  try {
    // 1. Get Token
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'deniz@cerilas.com',
        password: '24232423'
      })
    });

    if (!loginRes.ok) {
      console.error("[SMS] Giriş yapılamadı, token alınamadı.");
      return;
    }

    const loginData = await loginRes.json();
    const token = loginData.token || loginData.data?.token || loginData.access_token;

    if (!token) {
      console.error("[SMS] Token bulunamadı.");
      return;
    }

    // 2. Send SMS to each phone
    for (const phone of phones) {
      // Format phone (remove leading zero if necessary, though the docs say "başında 0 olmadan")
      let cleanPhone = phone.replace(/[^0-9]/g, "");
      if (cleanPhone.startsWith("0")) {
        cleanPhone = cleanPhone.substring(1);
      }
      if (cleanPhone.startsWith("90")) {
        cleanPhone = cleanPhone.substring(2);
      }

      const sendRes = await fetch(`${baseUrl}/api/sms/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          msg: message,
          no: cleanPhone
        })
      });

      if (!sendRes.ok) {
        console.error(`[SMS] ${cleanPhone} numarasına SMS gönderilemedi:`, await sendRes.text());
      } else {
        console.log(`[SMS] ${cleanPhone} numarasına başarıyla gönderildi.`);
      }
    }
  } catch (error) {
    console.error("[SMS] Hata oluştu:", error);
  }
}
