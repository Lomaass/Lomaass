const OFFICE_ADDRESS = 'გიორგი აბაშვილის ქუჩა, 3/8';
const TBILISI_FEE = 25;
const OUTSIDE_CITY_FEE = 100;
const SERVICE_FEE_RATE = 0.1; // 10%

const translations = {
  ka: {
    navTrack: 'ჯავშნის შემოწმება',
    navAdmin: 'ადმინი',
    heroEyebrow: 'სანდო ავტოპარკი და გამჭვირვალე პირობები',
    heroTitle: 'იქირავეთ ავტომობილი სწრაფად და მარტივად',
    heroSubtitle: 'შეარჩიეთ სასურველი კლასი, გადაამოწმეთ თავისუფალი თარიღები და დაჯავშნეთ წუთებში.',
    filterCategory: 'კატეგორია',
    filterTransmission: 'გადაცემათა კოლოფი',
    pickupDate: 'აყვანის თარიღი',
    dropoffDate: 'დაბრუნების თარიღი',
    maxDailyPrice: 'მაქს. დღიური ფასი ($)',
    searchLabel: 'ძიება',
    allOption: 'ყველა',
    resetFilters: 'გასუფთავება',
    searchCars: 'მოძებნა',
    footerNote: 'პროფესიონალური ავტომობილების გაქირავების პლატფორმა',
    perDay: '/ დღე',
    deposit: 'დეპოზიტი',
    bookNow: 'დაჯავშნა',
    seats: 'ადგილი',
    foundCars: (n) => `ნაპოვნია ${n} ავტომობილი`,
    noCars: 'მითითებული პარამეტრებით თავისუფალი ავტომობილი ვერ მოიძებნა.',
    pickupLocation: 'აყვანის ლოკაცია *',
    dropoffLocation: 'დაბრუნების ლოკაცია *',
    officeFreeBtn: 'ოფისი (უფასო)',
    pickOnMap: 'რუკა (+$25 / +$100)',
    paymentMethodLabel: 'გადახდის მეთოდი (აყვანისას) *',
    paymentCash: 'ქეშით (Cash)',
    paymentCard: 'ბარათით (Card)',
    mapPickerTitle: 'მისამართის არჩევა რუკაზე',
    mapSearchLabel: 'მისამართის ძიება',
    mapSelectHint: 'დააკლიკეთ რუკაზე პინის დასასმელად (თბილისი: +$25, ქალაქგარეთ/სხვა ქალაქი: +$100).',
    mapLoadingAddress: 'მისამართის განსაზღვრა...',
    mapNotFound: 'მისამართი ვერ მოიძებნა, სცადეთ სხვა ჩანაწერი ან დასვით პინი რუკაზე.',
    confirmLocation: 'ლოკაციის დადასტურება',
    locationRequiredErr: 'გთხოვთ აირჩიოთ აყვანის ლოკაცია (ოფისი ან რუკაზე).',
    dropoffInvalidErr: 'გთხოვთ აირჩიოთ დაბრუნების ლოკაცია (ოფისი ან რუკაზე).',
    mapNotReadyErr: 'რუკის ბიბლიოთეკა ვერ ჩაიტვირთა. განაახლეთ გვერდი.',
    zoneTbilisi: 'თბილისი',
    zoneOutside: 'ქალაქგარეთ / სხვა ქალაქი',
    zoneOffice: 'ოფისი (უფასო)',
    fullName: 'სახელი და გვარი *',
    phone: 'ტელეფონი *',
    email: 'ელ-ფოსტა *',
    notes: 'დამატებითი შენიშვნა',
    cancel: 'გაუქმება',
    confirmBooking: 'დაჯავშნა',
    trackTitle: 'ჯავშნის კოდით გადამოწმება',
    checkBtn: 'შემოწმება',
    adminTitle: 'Western - Car Rental — ადმინისტრირება',
    loadBookings: 'ჯავშნების ჩატვირთვა',
    bookingCreated: (code, total) => `ჯავშანი გაფორმდა! კოდი: ${code} | ჯამური თანხა: $${total}`,
    calcSummary: (days, deliveryFee, serviceFee, total) =>
      `${days} დღე | მიწოდება/ჩაბარება: $${deliveryFee} | Service Fee (10%): $${serviceFee} | ჯამი: $${total}`,
    calcBaseOnly: (dailyPrice, deliveryFee) =>
      `ფასი: $${dailyPrice}/დღე | მიწოდება/ჩაბარება: $${deliveryFee} (+10% Service Fee)`
  },
  en: {
    navTrack: 'Track Booking',
    navAdmin: 'Admin',
    heroEyebrow: 'Reliable fleet & transparent rental terms',
    heroTitle: 'Rent a car quickly and effortlessly',
    heroSubtitle: 'Choose your class, check real-time availability, and book in minutes.',
    filterCategory: 'Category',
    filterTransmission: 'Transmission',
    pickupDate: 'Pickup Date',
    dropoffDate: 'Drop-off Date',
    maxDailyPrice: 'Max Daily Price ($)',
    searchLabel: 'Search',
    allOption: 'All',
    resetFilters: 'Reset',
    searchCars: 'Search',
    footerNote: 'Professional Car Rental Platform',
    perDay: '/ day',
    deposit: 'Deposit',
    bookNow: 'Book Now',
    seats: 'seats',
    foundCars: (n) => `${n} vehicle(s) available`,
    noCars: 'No vehicles match your selected criteria.',
    pickupLocation: 'Pickup Location *',
    dropoffLocation: 'Drop-off Location *',
    officeFreeBtn: 'Office (Free)',
    pickOnMap: 'Map (+$25 / +$100)',
    paymentMethodLabel: 'Payment Method (At Pickup) *',
    paymentCash: 'Cash',
    paymentCard: 'Card',
    mapPickerTitle: 'Select Address on Map',
    mapSearchLabel: 'Search Address',
    mapSelectHint: 'Click on the map to drop a pin (Tbilisi: +$25, Outside/Other city: +$100).',
    mapLoadingAddress: 'Resolving address...',
    mapNotFound: 'Address not found. Try another query or drop a pin directly on the map.',
    confirmLocation: 'Confirm Location',
    locationRequiredErr: 'Please choose a pickup location (Office or on the map).',
    dropoffInvalidErr: 'Please choose a drop-off location (Office or on the map).',
    mapNotReadyErr: 'Map library failed to load. Please refresh the page.',
    zoneTbilisi: 'Tbilisi',
    zoneOutside: 'Outside / Other City',
    zoneOffice: 'Office (Free)',
    fullName: 'Full Name *',
    phone: 'Phone *',
    email: 'Email *',
    notes: 'Additional Notes',
    cancel: 'Cancel',
    confirmBooking: 'Confirm Booking',
    trackTitle: 'Track Booking by Code',
    checkBtn: 'Check',
    adminTitle: 'Western - Car Rental — Admin',
    loadBookings: 'Load Bookings',
    bookingCreated: (code, total) => `Booking confirmed! Code: ${code} | Total: $${total}`,
    calcSummary: (days, deliveryFee, serviceFee, total) =>
      `${days} day(s) | Delivery/Drop-off: $${deliveryFee} | Service Fee (10%): $${serviceFee} | Total: $${total}`,
    calcBaseOnly: (dailyPrice, deliveryFee) =>
      `Rate: $${dailyPrice}/day | Delivery/Drop-off: $${deliveryFee} (+10% Service Fee)`
  }
};

let currentLang = 'ka';
let selectedCar = null;
let activeAdminKey = '';

// Leaflet Map state
let leafletMap = null;
let leafletMarker = null;
let activeLocationTarget = 'pickup'; // 'pickup' | 'dropoff'
let pendingPickedLocation = null; // { address, lat, lng, zone, fee }

const els = {
  carsGrid: document.getElementById('carsGrid'),
  carsCount: document.getElementById('carsCount'),
  langToggle: document.getElementById('langToggle'),
  filterCategory: document.getElementById('filterCategory'),
  filterTransmission: document.getElementById('filterTransmission'),
  filterPickup: document.getElementById('filterPickup'),
  filterDropoff: document.getElementById('filterDropoff'),
  filterMaxPrice: document.getElementById('filterMaxPrice'),
  filterSearch: document.getElementById('filterSearch'),
  applyFiltersBtn: document.getElementById('applyFiltersBtn'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  bookingModal: document.getElementById('bookingModal'),
  bookingModalTitle: document.getElementById('bookingModalTitle'),
  bookingCarId: document.getElementById('bookingCarId'),
  bookingCarSummary: document.getElementById('bookingCarSummary'),
  bookingForm: document.getElementById('bookingForm'),
  pickupDateInput: document.getElementById('pickupDateInput'),
  dropoffDateInput: document.getElementById('dropoffDateInput'),
  pickupLocationInput: document.getElementById('pickupLocationInput'),
  dropoffLocationInput: document.getElementById('dropoffLocationInput'),
  pickupLatInput: document.getElementById('pickupLatInput'),
  pickupLngInput: document.getElementById('pickupLngInput'),
  pickupZoneInput: document.getElementById('pickupZoneInput'),
  pickupFeeInput: document.getElementById('pickupFeeInput'),
  dropoffLatInput: document.getElementById('dropoffLatInput'),
  dropoffLngInput: document.getElementById('dropoffLngInput'),
  dropoffZoneInput: document.getElementById('dropoffZoneInput'),
  dropoffFeeInput: document.getElementById('dropoffFeeInput'),
  setPickupOfficeBtn: document.getElementById('setPickupOfficeBtn'),
  pickPickupMapBtn: document.getElementById('pickPickupMapBtn'),
  setDropoffOfficeBtn: document.getElementById('setDropoffOfficeBtn'),
  pickDropoffMapBtn: document.getElementById('pickDropoffMapBtn'),
  paymentMethodInput: document.getElementById('paymentMethodInput'),
  mapModal: document.getElementById('mapModal'),
  mapSearchInput: document.getElementById('mapSearchInput'),
  mapSearchBtn: document.getElementById('mapSearchBtn'),
  leafletMapCanvas: document.getElementById('leafletMapCanvas'),
  mapSelectedSummary: document.getElementById('mapSelectedSummary'),
  confirmMapLocationBtn: document.getElementById('confirmMapLocationBtn'),
  customerNameInput: document.getElementById('customerNameInput'),
  customerPhoneInput: document.getElementById('customerPhoneInput'),
  customerEmailInput: document.getElementById('customerEmailInput'),
  notesInput: document.getElementById('notesInput'),
  pricePreview: document.getElementById('pricePreview'),
  bookingMessage: document.getElementById('bookingMessage'),
  trackModal: document.getElementById('trackModal'),
  openTrackBtn: document.getElementById('openTrackBtn'),
  trackCodeInput: document.getElementById('trackCodeInput'),
  trackSearchBtn: document.getElementById('trackSearchBtn'),
  trackResult: document.getElementById('trackResult'),
  adminModal: document.getElementById('adminModal'),
  openAdminBtn: document.getElementById('openAdminBtn'),
  adminKeyInput: document.getElementById('adminKeyInput'),
  loadAdminBtn: document.getElementById('loadAdminBtn'),
  adminMessage: document.getElementById('adminMessage'),
  adminBookingsList: document.getElementById('adminBookingsList')
};

function t(key, ...args) {
  const val = translations[currentLang][key];
  return typeof val === 'function' ? val(...args) : val;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  if (els.langToggle) {
    els.langToggle.textContent = currentLang === 'ka' ? 'EN' : 'KA';
  }

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    const val = translations[currentLang][key];
    if (typeof val === 'string') {
      node.textContent = val;
    }
  });

  updatePricePreview();
}

function classifyLocationZone(lat, lng, addressText = '', nominatimAddress = null) {
  const addrStr = `${addressText} ${JSON.stringify(nominatimAddress || {})}`.toLowerCase();
  const mentionsTbilisi =
    addrStr.includes('თბილისი') ||
    addrStr.includes('tbilisi') ||
    addrStr.includes('тбилиси');

  const mentionsOtherCity =
    addrStr.includes('ბათუმი') ||
    addrStr.includes('batumi') ||
    addrStr.includes('ქუთაისი') ||
    addrStr.includes('kutaisi') ||
    addrStr.includes('რუსთავი') ||
    addrStr.includes('rustavi') ||
    addrStr.includes('გორი') ||
    addrStr.includes('gori') ||
    addrStr.includes('თელავი') ||
    addrStr.includes('telavi') ||
    addrStr.includes('ზუგდიდი') ||
    addrStr.includes('zugdidi') ||
    addrStr.includes('მცხეთა') ||
    addrStr.includes('mtskheta');

  // Greater Tbilisi bounding box check
  const inTbilisiBounds = lat >= 41.62 && lat <= 41.84 && lng >= 44.65 && lng <= 45.02;

  if (!mentionsOtherCity && (mentionsTbilisi || inTbilisiBounds)) {
    return { zone: 'tbilisi', fee: TBILISI_FEE };
  }
  return { zone: 'outside', fee: OUTSIDE_CITY_FEE };
}

function formatZoneLabel(zone) {
  if (zone === 'office') return t('zoneOffice');
  if (zone === 'tbilisi') return `${t('zoneTbilisi')} (+$${TBILISI_FEE})`;
  return `${t('zoneOutside')} (+$${OUTSIDE_CITY_FEE})`;
}

function setOfficeLocation(target) {
  if (target === 'pickup') {
    els.pickupLocationInput.value = OFFICE_ADDRESS;
    els.pickupLatInput.value = '';
    els.pickupLngInput.value = '';
    els.pickupZoneInput.value = 'office';
    els.pickupFeeInput.value = '0';
  } else {
    els.dropoffLocationInput.value = OFFICE_ADDRESS;
    els.dropoffLatInput.value = '';
    els.dropoffLngInput.value = '';
    els.dropoffZoneInput.value = 'office';
    els.dropoffFeeInput.value = '0';
  }
  updatePricePreview();
}

function getDeliveryFee() {
  const pFee = Number(els.pickupFeeInput.value) || 0;
  const dFee = Number(els.dropoffFeeInput.value) || 0;
  return pFee + dFee;
}

function calculateBookingAmounts() {
  const start = new Date(els.pickupDateInput.value);
  const end = new Date(els.dropoffDateInput.value);
  const diffDays = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const deliveryFee = getDeliveryFee();

  if (!selectedCar || diffDays <= 0) {
    return {
      diffDays: 0,
      deliveryFee,
      subtotal: 0,
      serviceFee: 0,
      total: 0
    };
  }

  const baseRental = diffDays * Number(selectedCar.daily_price || 0);
  const subtotal = Number((baseRental + deliveryFee).toFixed(2));
  const serviceFee = Number((subtotal * SERVICE_FEE_RATE).toFixed(2));
  const total = Number((subtotal + serviceFee).toFixed(2));

  return {
    diffDays,
    deliveryFee,
    subtotal,
    serviceFee,
    total
  };
}

function ensureLeafletMap() {
  if (!window.L || !els.leafletMapCanvas) return false;
  if (leafletMap) return true;

  const tbilisiCoords = [41.7151, 44.8271];
  leafletMap = L.map(els.leafletMapCanvas).setView(tbilisiCoords, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap);

  leafletMap.on('click', (e) => {
    placeLeafletPin(e.latlng.lat, e.latlng.lng);
  });

  return true;
}

async function reverseGeocodeLeaflet(lat, lng) {
  els.mapSelectedSummary.textContent = t('mapLoadingAddress');
  const fallbackLabel = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&accept-language=${currentLang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Reverse geocode failed');
    const data = await res.json();
    const address = data.display_name || fallbackLabel;
    const { zone, fee } = classifyLocationZone(lat, lng, address, data.address);
    pendingPickedLocation = { address, lat, lng, zone, fee };
    els.mapSelectedSummary.textContent = `${address} (${lat.toFixed(5)}, ${lng.toFixed(5)}) — ${formatZoneLabel(zone)}`;
  } catch {
    const { zone, fee } = classifyLocationZone(lat, lng, fallbackLabel);
    pendingPickedLocation = { address: fallbackLabel, lat, lng, zone, fee };
    els.mapSelectedSummary.textContent = `${fallbackLabel} — ${formatZoneLabel(zone)}`;
  }
}

function placeLeafletPin(lat, lng, presetAddress = '', presetAddrObj = null) {
  if (!leafletMap) return;

  if (!leafletMarker) {
    leafletMarker = L.marker([lat, lng], { draggable: true }).addTo(leafletMap);
    leafletMarker.on('dragend', () => {
      const pos = leafletMarker.getLatLng();
      reverseGeocodeLeaflet(pos.lat, pos.lng);
    });
  } else {
    leafletMarker.setLatLng([lat, lng]);
  }

  leafletMap.panTo([lat, lng]);

  if (presetAddress) {
    const { zone, fee } = classifyLocationZone(lat, lng, presetAddress, presetAddrObj);
    pendingPickedLocation = { address: presetAddress, lat, lng, zone, fee };
    els.mapSelectedSummary.textContent = `${presetAddress} (${lat.toFixed(5)}, ${lng.toFixed(5)}) — ${formatZoneLabel(zone)}`;
  } else {
    reverseGeocodeLeaflet(lat, lng);
  }
}

async function searchAddressOnMap() {
  const query = els.mapSearchInput.value.trim();
  if (!query || !leafletMap) return;

  els.mapSelectedSummary.textContent = t('mapLoadingAddress');
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(query)}&accept-language=${currentLang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Search failed');
    const results = await res.json();

    if (!results || !results.length) {
      els.mapSelectedSummary.textContent = t('mapNotFound');
      return;
    }

    const best = results[0];
    const lat = Number(best.lat);
    const lng = Number(best.lon);
    leafletMap.setView([lat, lng], 14);
    placeLeafletPin(lat, lng, best.display_name, best.address || null);
  } catch {
    els.mapSelectedSummary.textContent = t('mapNotFound');
  }
}

function openMapForTarget(target) {
  activeLocationTarget = target;
  pendingPickedLocation = null;
  els.bookingMessage.className = 'feedback';
  els.bookingMessage.textContent = '';

  if (!ensureLeafletMap()) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('mapNotReadyErr');
    return;
  }

  els.mapModal.classList.remove('hidden');
  els.mapSearchInput.value = '';
  els.mapSelectedSummary.textContent = t('mapSelectHint');

  setTimeout(() => {
    leafletMap.invalidateSize();

    const zone =
      target === 'pickup' ? els.pickupZoneInput.value : els.dropoffZoneInput.value;
    const existingLat =
      target === 'pickup' ? Number(els.pickupLatInput.value) : Number(els.dropoffLatInput.value);
    const existingLng =
      target === 'pickup' ? Number(els.pickupLngInput.value) : Number(els.dropoffLngInput.value);
    const existingAddr =
      target === 'pickup' ? els.pickupLocationInput.value : els.dropoffLocationInput.value;

    if (zone !== 'office' && Number.isFinite(existingLat) && Number.isFinite(existingLng) && existingLat !== 0 && existingLng !== 0) {
      leafletMap.setView([existingLat, existingLng], 14);
      placeLeafletPin(existingLat, existingLng, existingAddr);
    } else {
      if (leafletMarker) {
        leafletMap.removeLayer(leafletMarker);
        leafletMarker = null;
      }
      leafletMap.setView([41.7151, 44.8271], 12);
    }
  }, 60);
}

els.setPickupOfficeBtn?.addEventListener('click', () => setOfficeLocation('pickup'));
els.setDropoffOfficeBtn?.addEventListener('click', () => setOfficeLocation('dropoff'));

els.pickPickupMapBtn?.addEventListener('click', () => openMapForTarget('pickup'));
els.pickupLocationInput?.addEventListener('click', () => openMapForTarget('pickup'));

els.pickDropoffMapBtn?.addEventListener('click', () => openMapForTarget('dropoff'));
els.dropoffLocationInput?.addEventListener('click', () => openMapForTarget('dropoff'));

els.mapSearchBtn?.addEventListener('click', searchAddressOnMap);
els.mapSearchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchAddressOnMap();
  }
});

els.confirmMapLocationBtn?.addEventListener('click', () => {
  if (!pendingPickedLocation || !pendingPickedLocation.address) {
    els.mapSelectedSummary.textContent = t('mapSelectHint');
    return;
  }

  if (activeLocationTarget === 'pickup') {
    els.pickupLocationInput.value = pendingPickedLocation.address;
    els.pickupLatInput.value = String(pendingPickedLocation.lat);
    els.pickupLngInput.value = String(pendingPickedLocation.lng);
    els.pickupZoneInput.value = pendingPickedLocation.zone;
    els.pickupFeeInput.value = String(pendingPickedLocation.fee);
  } else {
    els.dropoffLocationInput.value = pendingPickedLocation.address;
    els.dropoffLatInput.value = String(pendingPickedLocation.lat);
    els.dropoffLngInput.value = String(pendingPickedLocation.lng);
    els.dropoffZoneInput.value = pendingPickedLocation.zone;
    els.dropoffFeeInput.value = String(pendingPickedLocation.fee);
  }

  updatePricePreview();
  els.mapModal.classList.add('hidden');
});

function getQueryParams() {
  const params = new URLSearchParams();
  if (els.filterCategory?.value) params.set('category', els.filterCategory.value);
  if (els.filterTransmission?.value) params.set('transmission', els.filterTransmission.value);
  if (els.filterPickup?.value) params.set('pickup_date', els.filterPickup.value);
  if (els.filterDropoff?.value) params.set('dropoff_date', els.filterDropoff.value);
  if (els.filterMaxPrice?.value) params.set('max_price', els.filterMaxPrice.value);
  if (els.filterSearch?.value.trim()) params.set('search', els.filterSearch.value.trim());
  return params.toString();
}

async function fetchAndRenderCars() {
  if (!els.carsGrid) return;
  const qs = getQueryParams();
  const url = qs ? `/api/cars?${qs}` : '/api/cars';
  const res = await fetch(url);
  const json = await res.json();
  const cars = json.data || [];

  if (els.carsCount) {
    els.carsCount.textContent = t('foundCars', cars.length);
  }

  if (!cars.length) {
    els.carsGrid.innerHTML = `<p class="muted">${t('noCars')}</p>`;
    return;
  }

  els.carsGrid.innerHTML = cars
    .map((car) => {
      const desc =
        currentLang === 'ka'
          ? car.description_ka || car.description_en
          : car.description_en || car.description_ka;
      return `
        <article class="car-card">
          <div class="car-image-wrap">
            <img src="${car.image_url}" alt="${car.brand} ${car.model}" loading="lazy" />
          </div>
          <div class="car-body">
            <div class="car-top">
              <h3 class="car-title">${car.brand} ${car.model} (${car.year})</h3>
              <span class="car-badge">${car.category}</span>
            </div>
            <div class="car-specs">
              <span>${car.transmission}</span>
              <span>•</span>
              <span>${car.fuel_type}</span>
              <span>•</span>
              <span>${car.seats} ${t('seats')}</span>
            </div>
            <p class="car-desc">${desc || ''}</p>
            <div class="car-footer">
              <div>
                <div class="price-main">$${car.daily_price} <span class="price-sub">${t('perDay')}</span></div>
                <div class="price-sub">${t('deposit')}: $${car.deposit}</div>
              </div>
              <button type="button" class="btn btn-primary book-car-btn" data-car-id="${car.id}">${t('bookNow')}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

async function openBooking(carId) {
  const res = await fetch(`/api/cars/${carId}`);
  const json = await res.json();
  if (!json.success) return;

  selectedCar = json.data;
  els.bookingCarId.value = selectedCar.id;
  els.bookingModalTitle.textContent = `${selectedCar.brand} ${selectedCar.model} (${selectedCar.year})`;
  els.bookingCarSummary.textContent = `$${selectedCar.daily_price} ${t('perDay')} • ${t('deposit')}: $${selectedCar.deposit}`;
  els.bookingMessage.className = 'feedback';
  els.bookingMessage.textContent = '';

  setOfficeLocation('pickup');
  setOfficeLocation('dropoff');
  if (els.paymentMethodInput) els.paymentMethodInput.value = 'cash';

  if (els.filterPickup?.value) els.pickupDateInput.value = els.filterPickup.value;
  if (els.filterDropoff?.value) els.dropoffDateInput.value = els.filterDropoff.value;

  updatePricePreview();
  els.bookingModal.classList.remove('hidden');
}

function updatePricePreview() {
  if (!selectedCar || !els.pricePreview) return;
  const calc = calculateBookingAmounts();

  if (calc.diffDays > 0) {
    els.pricePreview.textContent = t(
      'calcSummary',
      calc.diffDays,
      calc.deliveryFee.toFixed(2),
      calc.serviceFee.toFixed(2),
      calc.total.toFixed(2)
    );
  } else {
    els.pricePreview.textContent = t('calcBaseOnly', selectedCar.daily_price, calc.deliveryFee.toFixed(2));
  }
}

els.carsGrid?.addEventListener('click', (e) => {
  const btn = e.target.closest('.book-car-btn');
  if (btn) {
    openBooking(Number(btn.getAttribute('data-car-id')));
  }
});

els.pickupDateInput?.addEventListener('change', updatePricePreview);
els.dropoffDateInput?.addEventListener('change', updatePricePreview);

els.bookingForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.bookingMessage.className = 'feedback';
  els.bookingMessage.textContent = '';

  const pickupAddress = els.pickupLocationInput.value.trim();
  const pickupZone = els.pickupZoneInput.value;
  const pickupLat = Number(els.pickupLatInput.value);
  const pickupLng = Number(els.pickupLngInput.value);

  const hasValidPickup =
    pickupAddress.length > 0 &&
    (pickupZone === 'office' ||
      (Number.isFinite(pickupLat) &&
        Number.isFinite(pickupLng) &&
        Math.abs(pickupLat) <= 90 &&
        Math.abs(pickupLng) <= 180));

  if (!hasValidPickup) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('locationRequiredErr');
    return;
  }

  const dropoffAddress = els.dropoffLocationInput.value.trim();
  const dropoffZone = els.dropoffZoneInput.value;
  const dropoffLat = Number(els.dropoffLatInput.value);
  const dropoffLng = Number(els.dropoffLngInput.value);

  const hasValidDropoff =
    dropoffAddress.length > 0 &&
    (dropoffZone === 'office' ||
      (Number.isFinite(dropoffLat) &&
        Number.isFinite(dropoffLng) &&
        Math.abs(dropoffLat) <= 90 &&
        Math.abs(dropoffLng) <= 180));

  if (!hasValidDropoff) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('dropoffInvalidErr');
    return;
  }

  const calc = calculateBookingAmounts();
  const paymentMethod = els.paymentMethodInput?.value || 'cash';
  const paymentLabel = paymentMethod === 'card' ? 'Card (ბარათით აყვანისას)' : 'Cash (ქეშით აყვანისას)';

  const summaryNote =
    `Payment: ${paymentLabel} | ` +
    `Pickup: ${pickupAddress} [${formatZoneLabel(pickupZone)}] | ` +
    `Drop-off: ${dropoffAddress} [${formatZoneLabel(dropoffZone)}] | ` +
    `Delivery/Drop-off fee: $${calc.deliveryFee} | ` +
    `Service Fee (10%): $${calc.serviceFee.toFixed(2)}`;

  const userNotes = els.notesInput.value.trim();
  const combinedNotes = userNotes ? `${summaryNote} | Note: ${userNotes}` : summaryNote;

  const payload = {
    car_id: Number(els.bookingCarId.value),
    pickup_date: els.pickupDateInput.value,
    dropoff_date: els.dropoffDateInput.value,
    pickup_location: pickupAddress,
    dropoff_location: dropoffAddress,
    payment_method: paymentMethod,
    delivery_fee: calc.deliveryFee,
    service_fee: calc.serviceFee,
    total_price: calc.total > 0 ? calc.total : undefined,
    customer_name: els.customerNameInput.value.trim(),
    customer_phone: els.customerPhoneInput.value.trim(),
    customer_email: els.customerEmailInput.value.trim(),
    notes: combinedNotes
  };

  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  if (!res.ok) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = json.message || 'Error';
    return;
  }

  els.bookingMessage.className = 'feedback ok';
  els.bookingMessage.textContent = t('bookingCreated', json.data.booking_code, json.data.total_price);
  els.bookingForm.reset();
  setOfficeLocation('pickup');
  setOfficeLocation('dropoff');
  fetchAndRenderCars();
});

els.openTrackBtn?.addEventListener('click', () => {
  els.trackResult.innerHTML = '';
  els.trackModal.classList.remove('hidden');
});

els.trackSearchBtn?.addEventListener('click', async () => {
  const code = els.trackCodeInput.value.trim();
  if (!code) return;

  const res = await fetch(`/api/bookings/track/${encodeURIComponent(code)}`);
  const json = await res.json();

  if (!res.ok) {
    els.trackResult.innerHTML = `<div class="feedback err">${json.message}</div>`;
    return;
  }

  const b = json.data;
  els.trackResult.innerHTML = `
    <div class="booking-item">
      <div>
        <strong>${b.booking_code}</strong> — ${b.brand} ${b.model} (${b.year})<br />
        <span class="muted">${b.pickup_date} → ${b.dropoff_date} (${b.total_days}d) | $${b.total_price}</span>
      </div>
      <span class="car-badge">${b.status}</span>
    </div>
  `;
});

els.openAdminBtn?.addEventListener('click', () => {
  els.adminModal.classList.remove('hidden');
});

els.loadAdminBtn?.addEventListener('click', async () => {
  const key = els.adminKeyInput.value.trim();
  activeAdminKey = key;
  els.adminMessage.className = 'feedback';
  els.adminMessage.textContent = '';

  const res = await fetch('/api/bookings', {
    headers: { 'x-admin-key': key }
  });
  const json = await res.json();

  if (!res.ok) {
    els.adminMessage.className = 'feedback err';
    els.adminMessage.textContent = json.message || 'Unauthorized';
    return;
  }

  renderAdminBookings(json.data || []);
});

function renderAdminBookings(bookings) {
  if (!bookings.length) {
    els.adminBookingsList.innerHTML = '<p class="muted">ჯავშნები ჯერ არ არის.</p>';
    return;
  }

  const statuses = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];

  els.adminBookingsList.innerHTML = bookings
    .map((b) => {
      const paymentText =
        b.payment_method === 'card'
          ? 'ბარათით (Card — აყვანისას)'
          : b.payment_method === 'cash'
            ? 'ქეშით (Cash — აყვანისას)'
            : 'მითითებულია დეტალებში / აყვანისას';

      return `
      <div class="booking-item">
        <div>
          <strong>${b.booking_code}</strong> • ${b.customer_name} (${b.customer_phone} | ${b.customer_email || ''})<br />
          <span class="muted">${b.brand} ${b.model} (${b.year || ''}) | ${b.pickup_date} → ${b.dropoff_date} | $${b.total_price}</span>
          <div class="admin-booking-details">
            <div><strong>აყვანა:</strong> ${b.pickup_location || '—'}</div>
            <div><strong>ჩაბარება:</strong> ${b.dropoff_location || b.pickup_location || '—'}</div>
            <div><strong>გადახდა:</strong> ${paymentText}</div>
            ${b.notes ? `<div><strong>დეტალები / შენიშვნა:</strong> ${b.notes}</div>` : ''}
          </div>
        </div>
        <select class="admin-status-select" data-booking-id="${b.id}">
          ${statuses.map((st) => `<option value="${st}" ${b.status === st ? 'selected' : ''}>${st}</option>`).join('')}
        </select>
      </div>
    `;
    })
    .join('');
}

els.adminBookingsList?.addEventListener('change', async (e) => {
  const select = e.target.closest('.admin-status-select');
  if (!select) return;

  const id = Number(select.getAttribute('data-booking-id'));
  const status = select.value;

  const res = await fetch(`/api/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': activeAdminKey
    },
    body: JSON.stringify({ status })
  });
  const json = await res.json();
  els.adminMessage.className = res.ok ? 'feedback ok' : 'feedback err';
  els.adminMessage.textContent = res.ok ? `Status updated: ${json.data.status}` : json.message;
});

document.querySelectorAll('[data-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    document.getElementById(id)?.classList.add('hidden');
  });
});

els.langToggle?.addEventListener('click', () => {
  currentLang = currentLang === 'ka' ? 'en' : 'ka';
  applyTranslations();
  fetchAndRenderCars();
});

els.applyFiltersBtn?.addEventListener('click', fetchAndRenderCars);

els.resetFiltersBtn?.addEventListener('click', () => {
  if (els.filterCategory) els.filterCategory.value = '';
  if (els.filterTransmission) els.filterTransmission.value = '';
  if (els.filterPickup) els.filterPickup.value = '';
  if (els.filterDropoff) els.filterDropoff.value = '';
  if (els.filterMaxPrice) els.filterMaxPrice.value = '';
  if (els.filterSearch) els.filterSearch.value = '';
  fetchAndRenderCars();
});

applyTranslations();
fetchAndRenderCars();