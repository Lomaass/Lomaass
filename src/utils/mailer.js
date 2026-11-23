function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendBookingConfirmationEmail(booking, car) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing; skipping booking confirmation email.');
    return { sent: false, reason: 'missing_resend_api_key' };
  }

  const from = process.env.MAIL_FROM || 'Western - Car Rental <onboarding@resend.dev>';
  const to = booking?.customer_email;

  if (!to) {
    return { sent: false, reason: 'missing_recipient' };
  }

  const carTitle = car
    ? `${car.brand || ''} ${car.model || ''} ${car.year || ''}`.trim()
    : `Car #${booking.car_id}`;

  const subject = `ჯავშნის დადასტურება (${booking.booking_code}) — Western - Car Rental`;

  const text = [
    `გამარჯობა, ${booking.customer_name}!`,
    ``,
    `თქვენი ჯავშანი მიღებულია. დეტალები:`,
    `ჯავშნის კოდი: ${booking.booking_code}`,
    `ავტომობილი: ${carTitle}`,
    `აყვანის თარიღი და ლოკაცია: ${booking.pickup_date} — ${booking.pickup_location}`,
    `დაბრუნების თარიღი და ლოკაცია: ${booking.dropoff_date} — ${booking.dropoff_location}`,
    `ჯამური თანხა: ${booking.total_price}`,
    `სტატუსი: ${booking.status}`,
    ``,
    `მადლობა, რომ ირჩევთ Western - Car Rental-ს.`
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px; color: #111827;">Western - Car Rental</h2>
      <p>გამარჯობა, <strong>${escapeHtml(booking.customer_name)}</strong>,</p>
      <p>თქვენი ჯავშანი წარმატებით დარეგისტრირდა. ქვემოთ მოცემულია ჯავშნის დეტალები:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ჯავშნის კოდი:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.booking_code)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ავტომობილი:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(carTitle)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>აყვანა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.pickup_date)} — ${escapeHtml(booking.pickup_location)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>დაბრუნება:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.dropoff_date)} — ${escapeHtml(booking.dropoff_location)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ჯამური თანხა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.total_price)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>სტატუსი:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.status)}</td>
        </tr>
      </table>
      <p style="color: #4b5563; font-size: 14px;">მადლობა, რომ ირჩევთ Western - Car Rental-ს.</p>
    </div>
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        html
      }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data?.message || `Resend API error (${response.status})`);
      err.code = `RESEND_${response.status}`;
      err.response = JSON.stringify(data);
      throw err;
    }

    console.log('Booking confirmation email sent via Resend:', {
      id: data?.id,
      to
    });

    return { sent: true, id: data?.id };
  } finally {
    clearTimeout(timeoutId);
  }
}