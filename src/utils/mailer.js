function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getDeliveryLabel(type) {
  if (type === 'tbilisi') return 'მიწოდება და დაბრუნება თბილისის მასშტაბით (+$25)';
  if (type === 'outside') return 'მიწოდება / დაბრუნება ქალაქგარეთ / სხვა ქალაქში (+$100)';
  return 'ოფისიდან წაყვანა და ოფისში დაბრუნება ($0)';
}

function getPaymentLabel(method) {
  return method === 'card' ? 'ბარათით (Card — აყვანისას)' : 'ქეშით (Cash — აყვანისას)';
}

export async function sendBookingConfirmationEmail(booking, car) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('BREVO_API_KEY is missing; skipping booking confirmation email.');
    return { sent: false, reason: 'missing_brevo_api_key' };
  }

  const senderEmail = (process.env.MAIL_FROM || '').trim();
  const senderName = (process.env.MAIL_FROM_NAME || 'Western - Car Rental').trim();

  if (!senderEmail) {
    console.warn('MAIL_FROM is missing; skipping booking confirmation email.');
    return { sent: false, reason: 'missing_mail_from' };
  }

  const toEmail = String(booking?.customer_email || '').trim();
  const toName = String(booking?.customer_name || 'Customer').trim();

  if (!toEmail) {
    return { sent: false, reason: 'missing_recipient' };
  }

  const carTitle = car
    ? `${car.brand || ''} ${car.model || ''} ${car.year || ''}`.trim()
    : `Car #${booking.car_id}`;

  const deliveryLabel = getDeliveryLabel(booking.delivery_type);
  const paymentLabel = getPaymentLabel(booking.payment_method);
  const daysText = booking.total_days ? `${booking.total_days} დღე` : '';
  const totalPriceText = `$${Number(booking.total_price || 0).toFixed(2)}`;

  const subject = `ჯავშნის დადასტურება (${booking.booking_code}) — Western - Car Rental`;

  const text = [
    `გამარჯობა, ${toName}!`,
    ``,
    `თქვენი ჯავშანი მიღებულია. დეტალები:`,
    `ჯავშნის კოდი: ${booking.booking_code}`,
    `ავტომობილი: ${carTitle}`,
    `მიწოდების ტიპი: ${deliveryLabel}`,
    `აყვანა: ${booking.pickup_date} — ${booking.pickup_location}`,
    `დაბრუნება: ${booking.dropoff_date} — ${booking.dropoff_location}`,
    daysText ? `ხანგრძლივობა: ${daysText}` : null,
    `გადახდის მეთოდი: ${paymentLabel}`,
    `ჯამური თანხა (10% Service Fee-ს ჩათვლით): ${totalPriceText}`,
    `სტატუსი: ${booking.status}`,
    ``,
    `მადლობა, რომ ირჩევთ Western - Car Rental-ს.`
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px; color: #111827;">Western - Car Rental</h2>
      <p>გამარჯობა, <strong>${escapeHtml(toName)}</strong>,</p>
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
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>მიწოდების ტიპი:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(deliveryLabel)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>აყვანა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.pickup_date)} — ${escapeHtml(booking.pickup_location)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>დაბრუნება:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.dropoff_date)} — ${escapeHtml(booking.dropoff_location)}</td>
        </tr>
        ${
          daysText
            ? `<tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ხანგრძლივობა:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(daysText)}</td>
              </tr>`
            : ''
        }
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>გადახდის მეთოდი:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(paymentLabel)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ჯამური თანხა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${escapeHtml(totalPriceText)}</strong></td>
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
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail, name: toName }],
        subject,
        textContent: text,
        htmlContent: html
      }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data?.message || `Brevo API error (${response.status})`);
      err.code = `BREVO_${response.status}`;
      err.response = JSON.stringify(data);
      throw err;
    }

    console.log('Booking confirmation email sent via Brevo:', {
      messageId: data?.messageId,
      to: toEmail
    });

    return { sent: true, id: data?.messageId };
  } finally {
    clearTimeout(timeoutId);
  }
}