function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const FEES = {
  office: 0,
  tbilisi: 25,
  outside: 100
};

function getPickupTypeLabel(type) {
  if (type === 'tbilisi') return 'მიწოდება თბილისის მასშტაბით (+$25)';
  if (type === 'outside') return 'მიწოდება ქალაქგარეთ / სხვა ქალაქში (+$100)';
  return 'ოფისიდან წაყვანა ($0)';
}

function getDropoffTypeLabel(type) {
  if (type === 'tbilisi') return 'დაბრუნება თბილისის მასშტაბით (+$25)';
  if (type === 'outside') return 'დაბრუნება ქალაქგარეთ / სხვა ქალაქში (+$100)';
  return 'ოფისში დაბრუნება ($0)';
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

  const pickupType = booking.pickup_delivery_type || 'office';
  const dropoffType = booking.dropoff_delivery_type || 'office';

  const pickupFee = Number(
    booking.pickup_delivery_fee ?? FEES[pickupType] ?? 0
  );
  const dropoffFee = Number(
    booking.dropoff_delivery_fee ?? FEES[dropoffType] ?? 0
  );
  const totalDeliveryFee = Number(
    booking.delivery_fee ?? pickupFee + dropoffFee
  );
  const serviceFee = Number(booking.service_fee || 0);
  const totalPrice = Number(booking.total_price || 0);
  const daysCount = Number(booking.total_days || 0);
  const baseRental =
    daysCount > 0 && car?.daily_price
      ? Number((daysCount * Number(car.daily_price)).toFixed(2))
      : Math.max(0, Number((totalPrice - totalDeliveryFee - serviceFee).toFixed(2)));

  const pickupLabel = getPickupTypeLabel(pickupType);
  const dropoffLabel = getDropoffTypeLabel(dropoffType);
  const paymentLabel = getPaymentLabel(booking.payment_method);
  const daysText = daysCount > 0 ? `${daysCount} დღე` : '';

  const subject = `ჯავშნის დადასტურება (${booking.booking_code}) — Western - Car Rental`;

  const text = [
    `გამარჯობა, ${toName}!`,
    ``,
    `თქვენი ჯავშანი მიღებულია. დეტალები:`,
    `ჯავშნის კოდი: ${booking.booking_code}`,
    `ავტომობილი: ${carTitle}`,
    `აყვანა: ${booking.pickup_date} — ${pickupLabel} — ${booking.pickup_location}`,
    `დაბრუნება: ${booking.dropoff_date} — ${dropoffLabel} — ${booking.dropoff_location}`,
    daysText ? `ხანგრძლივობა: ${daysText}` : null,
    `გადახდის მეთოდი: ${paymentLabel}`,
    `--- ფასების დაშლა ---`,
    `ავტომობილის ქირა: $${baseRental.toFixed(2)}`,
    `აყვანის მიწოდება (${pickupLabel}): $${pickupFee.toFixed(2)}`,
    `დაბრუნების მიწოდება (${dropoffLabel}): $${dropoffFee.toFixed(2)}`,
    `Service Fee (10%): $${serviceFee.toFixed(2)}`,
    `ჯამური თანხა: $${totalPrice.toFixed(2)}`,
    `სტატუსი: ${booking.status}`,
    ``,
    `მადლობა, რომ ირჩევთ Western - Car Rental-ს.`
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 620px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px; color: #111827;">Western - Car Rental</h2>
      <p>გამარჯობა, <strong>${escapeHtml(toName)}</strong>,</p>
      <p>თქვენი ჯავშანი წარმატებით დარეგისტრირდა. ქვემოთ მოცემულია ჯავშნისა და ფასების დეტალური დაშლა:</p>
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
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.pickup_date)} — <strong>${escapeHtml(pickupLabel)}</strong><br/><span style="color:#4b5563;font-size:13px;">${escapeHtml(booking.pickup_location)}</span></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>დაბრუნება:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(booking.dropoff_date)} — <strong>${escapeHtml(dropoffLabel)}</strong><br/><span style="color:#4b5563;font-size:13px;">${escapeHtml(booking.dropoff_location)}</span></td>
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
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ავტომობილის ქირა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">$${escapeHtml(baseRental.toFixed(2))}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>აყვანის მიწოდება:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">$${escapeHtml(pickupFee.toFixed(2))}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>დაბრუნების მიწოდება:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">$${escapeHtml(dropoffFee.toFixed(2))}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Service Fee (10%):</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">$${escapeHtml(serviceFee.toFixed(2))}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>ჯამური თანხა:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>$${escapeHtml(totalPrice.toFixed(2))}</strong></td>
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