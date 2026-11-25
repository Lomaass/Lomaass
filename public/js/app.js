const OFFICE_ADDRESS = 'გიორგი აბაშვილის ქუჩა, 3/8';
const SERVICE_FEE_RATE = 0.1; // 10%

const LOCATION_FEES = {
  office: 0,
  tbilisi: 25,
  outside: 100
};

const translations = {
  ka: {
    navTrack: 'ჯავშნის შემოწმება',
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
    pickupTypeLabel: 'აყვანის ტიპი *',
    pickupOffice: 'ოფისიდან წაყვანა ($0)',
    pickupTbilisi: 'მიწოდება თბილისში (+$25)',
    pickupOutside: 'მიწოდება ქალაქგარეთ / სხვა ქალაქში (+$100)',
    dropoffTypeLabel: 'დაბრუნების ტიპი *',
    dropoffOffice: 'ოფისში დაბრუნება ($0)',
    dropoffTbilisi: 'დაბრუნება თბილისში (+$25)',
    dropoffOutside: 'დაბრუნება ქალაქგარეთ / სხვა ქალაქში (+$100)',
    pickupLocation: 'სად დახვდეს მანქანა (აყვანა) *',
    dropoffLocation: 'სად ჩააბაროს მანქანა (დაბრუნება) *',
    pinPlaceholder: 'დასვით პინი რუკაზე...',
    paymentMethodLabel: 'გადახდის მეთოდი (აყვანისას) *',
    paymentCash: 'ქეშით (Cash)',
    paymentCard: 'ბარათით (Card)',
    mapPickerTitle: 'მისამართის არჩევა რუკაზე',
    mapSearchLabel: 'მისამართის ძიება',
    mapSelectHint: 'დააკლიკეთ რუკაზე პინის დასასმელად ან მოძებნეთ მისამართი.',
    mapLoadingAddress: 'მისამართის განსაზღვრა...',
    mapNotFound: 'მისამართი ვერ მოიძებნა, სცადეთ სხვა ჩანაწერი ან დასვით პინი რუკაზე.',
    confirmLocation: 'ლოკაციის დადასტურება',
    locationRequiredErr: 'გთხოვთ აირჩიოთ რუკაზე ადგილი, სად უნდა დახვდეს მანქანა.',
    dropoffInvalidErr: 'გთხოვთ აირჩიოთ რუკაზე ადგილი, სად უნდა ჩააბაროს მანქანა.',
    mapNotReadyErr: 'რუკის ბიბლიოთეკა ვერ ჩაიტვირთა. განაახლეთ გვერდი.',
    fullName: 'სახელი და გვარი *',
    phone: 'ტელეფონი *',
    phoneRequiredErr: 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი.',
    email: 'ელ-ფოსტა *',
    notes: 'დამატებითი შენიშვნა',
    cancel: 'გაუქმება',
    confirmBooking: 'დაჯავშნა',
    trackTitle: 'ჯავშნის კოდით გადამოწმება',
    checkBtn: 'შემოწმება',
    adminTitle: 'Western - Car Rental — ადმინისტრირება',
    loadBookings: 'ჯავშნების ჩატვირთვა',
    bookingCreated: (code, total) => `ჯავშანი გაფორმდა! კოდი: ${code} | ჯამური თანხა: $${total}`,
    rentalLine: (days, daily, base) =>
      days > 0
        ? `ავტომობილის ქირა (${days} დღე × $${daily}):`
        : `ავტომობილის ქირა ($${daily}/დღე):`,
    pickupFeeLine: (typeLabel) => `აყვანა (${typeLabel}):`,
    dropoffFeeLine: (typeLabel) => `დაბრუნება (${typeLabel}):`,
    serviceFeeLine: 'Service Fee (10%):',
    totalLine: 'ჯამური გადასახდელი თანხა:'
  },
  en: {
    navTrack: 'Track Booking',
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
    pickupTypeLabel: 'Pickup Type *',
    pickupOffice: 'Office pickup ($0)',
    pickupTbilisi: 'Tbilisi delivery (+$25)',
    pickupOutside: 'Outside Tbilisi / other city delivery (+$100)',
    dropoffTypeLabel: 'Drop-off Type *',
    dropoffOffice: 'Office return ($0)',
    dropoffTbilisi: 'Tbilisi return (+$25)',
    dropoffOutside: 'Outside Tbilisi / other city return (+$100)',
    pickupLocation: 'Where to meet car (Pickup) *',
    dropoffLocation: 'Where to return car (Drop-off) *',
    pinPlaceholder: 'Drop a pin on map...',
    paymentMethodLabel: 'Payment Method (At Pickup) *',
    paymentCash: 'Cash',
    paymentCard: 'Card',
    mapPickerTitle: 'Select Address on Map',
    mapSearchLabel: 'Search Address',
    mapSelectHint: 'Click on the map to drop a pin or search for an address.',
    mapLoadingAddress: 'Resolving address...',
    mapNotFound: 'Address not found. Try another query or drop a pin directly on the map.',
    confirmLocation: 'Confirm Location',
    locationRequiredErr: 'Please pick a pickup location on the map.',
    dropoffInvalidErr: 'Please pick a drop-off location on the map.',
    mapNotReadyErr: 'Map library failed to load. Please refresh the page.',
    fullName: 'Full Name *',
    phone: 'Phone *',
    phoneRequiredErr: 'Please enter your phone number.',
    email: 'Email *',
    notes: 'Additional Notes',
    cancel: 'Cancel',
    confirmBooking: 'Confirm Booking',
    trackTitle: 'Track Booking by Code',
    checkBtn: 'Check',
    adminTitle: 'Western - Car Rental — Admin',
    loadBookings: 'Load Bookings',
    bookingCreated: (code, total) => `Booking confirmed! Code: ${code} | Total: $${total}`,
    rentalLine: (days, daily) =>
      days > 0
        ? `Car rental (${days} day(s) × $${daily}):`
        : `Car rental ($${daily}/day):`,
    pickupFeeLine: (typeLabel) => `Pickup (${typeLabel}):`,
    dropoffFeeLine: (typeLabel) => `Drop-off (${typeLabel}):`,
    serviceFeeLine: 'Service Fee (10%):',
    totalLine: 'Total Amount:'
  }
};

let currentLang = 'ka';
let selectedCar = null;
let activeAdminKey = '';

let leafletMap = null;
let leafletMarker = null;
let activeLocationTarget = 'pickup';
let pendingPickedLocation = null;

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
  pickupDeliveryTypeInput: document.getElementById('pickupDeliveryTypeInput'),
  dropoffDeliveryTypeInput: document.getElementById('dropoffDeliveryTypeInput'),
  paymentMethodInput: document.getElementById('paymentMethodInput'),
  pickupMapField: document.getElementById('pickupMapField'),
  dropoffMapField: document.getElementById('dropoffMapField'),
  pickupLocationInput: document.getElementById('pickupLocationInput'),
  dropoffLocationInput: document.getElementById('dropoffLocationInput'),
  pickupLatInput: document.getElementById('pickupLatInput'),
  pickupLngInput: document.getElementById('pickupLngInput'),
  dropoffLatInput: document.getElementById('dropoffLatInput'),
  dropoffLngInput: document.getElementById('dropoffLngInput'),
  mapModal: document.getElementById('mapModal'),
  mapSearchInput: document.getElementById('mapSearchInput'),
  mapSearchBtn: document.getElementById('mapSearchBtn'),
  leafletMapCanvas: document.getElementById('leafletMapCanvas'),
  mapSelectedSummary: document.getElementById('mapSelectedSummary'),
  confirmMapLocationBtn: document.getElementById('confirmMapLocationBtn'),
  customerNameInput: document.getElementById('customerNameInput'),
  phoneCountryCodeInput: document.getElementById('phoneCountryCodeInput'),
  phoneFlagImg: document.getElementById('phoneFlagImg'),
  phoneCodeDisplay: document.getElementById('phoneCodeDisplay'),
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
  adminKeyInput: document.getElementById('adminKeyInput'),
  loadAdminBtn: document.getElementById('loadAdminBtn'),
  adminMessage: document.getElementById('adminMessage'),
  adminBookingsList: document.getElementById('adminBookingsList')
};

function syncPhoneCountryVisual() {
  const select = els.phoneCountryCodeInput;
  if (!select) return;
  const selectedOpt = select.options[select.selectedIndex];
  const code = select.value || '+995';
  const iso = (selectedOpt?.getAttribute('data-iso') || 'ge').toLowerCase();

  if (els.phoneCodeDisplay) {
    els.phoneCodeDisplay.textContent = code;
  }
  if (els.phoneFlagImg) {
    els.phoneFlagImg.src = `https://flagcdn.com/w40/${iso}.png`;
    els.phoneFlagImg.alt = iso.toUpperCase();
  }
}

els.phoneCountryCodeInput?.addEventListener('change', syncPhoneCountryVisual);

function t(key, ...args) {
  const val = translations[currentLang][key];
  return typeof val === 'function' ? val(...args) : val;
}

function getPickupType() {
  const val = els.pickupDeliveryTypeInput?.value || 'office';
  return Object.hasOwn(LOCATION_FEES, val) ? val : 'office';
}

function getDropoffType() {
  const val = els.dropoffDeliveryTypeInput?.value || 'office';
  return Object.hasOwn(LOCATION_FEES, val) ? val : 'office';
}

function getShortTypeLabel(side, type) {
  if (side === 'pickup') {
    if (type === 'tbilisi') return currentLang === 'ka' ? 'თბილისში მიწოდება' : 'Tbilisi delivery';
    if (type === 'outside') return currentLang === 'ka' ? 'ქალაქგარეთ მიწოდება' : 'Outside delivery';
    return currentLang === 'ka' ? 'ოფისიდან' : 'Office';
  }
  if (type === 'tbilisi') return currentLang === 'ka' ? 'თბილისში დაბრუნება' : 'Tbilisi return';
  if (type === 'outside') return currentLang === 'ka' ? 'ქალაქგარეთ დაბრუნება' : 'Outside return';
  return currentLang === 'ka' ? 'ოფისში' : 'Office';
}

function getFormattedPhoneNumber() {
  const code = (els.phoneCountryCodeInput?.value || '+995').trim();
  let localNumber = (els.customerPhoneInput?.value || '').trim();

  if (!localNumber) return '';

  const normalizedCodeDigits = code.replace(/[^\d]/g, '');
  const trimmedStart = localNumber.replace(/^[\s()-]+/, '');

  if (trimmedStart.startsWith(code)) {
    localNumber = trimmedStart.slice(code.length).trim();
  } else if (trimmedStart.startsWith(`+${normalizedCodeDigits}`)) {
    localNumber = trimmedStart.slice(normalizedCodeDigits.length + 1).trim();
  } else if (
    normalizedCodeDigits &&
    trimmedStart.startsWith(normalizedCodeDigits) &&
    trimmedStart.length > normalizedCodeDigits.length + 5
  ) {
    localNumber = trimmedStart.slice(normalizedCodeDigits.length).trim();
  }

  localNumber = localNumber.replace(/^0+/, '').trim();
  if (!localNumber) return '';

  return `${code} ${localNumber}`;
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

  if (els.pickupLocationInput) els.pickupLocationInput.placeholder = t('pinPlaceholder');
  if (els.dropoffLocationInput) els.dropoffLocationInput.placeholder = t('pinPlaceholder');

  updatePricePreview();
}

function syncDeliverySidesUI() {
  const pickupType = getPickupType();
  const dropoffType = getDropoffType();

  if (pickupType === 'office') {
    els.pickupMapField?.classList.add('hidden');
    els.pickupLocationInput.value = OFFICE_ADDRESS;
    els.pickupLatInput.value = '';
    els.pickupLngInput.value = '';
  } else {
    els.pickupMapField?.classList.remove('hidden');
    if (els.pickupLocationInput.value === OFFICE_ADDRESS) {
      els.pickupLocationInput.value = '';
      els.pickupLatInput.value = '';
      els.pickupLngInput.value = '';
    }
  }

  if (dropoffType === 'office') {
    els.dropoffMapField?.classList.add('hidden');
    els.dropoffLocationInput.value = OFFICE_ADDRESS;
    els.dropoffLatInput.value = '';
    els.dropoffLngInput.value = '';
  } else {
    els.dropoffMapField?.classList.remove('hidden');
    if (els.dropoffLocationInput.value === OFFICE_ADDRESS) {
      els.dropoffLocationInput.value = '';
      els.dropoffLatInput.value = '';
      els.dropoffLngInput.value = '';
    }
  }

  updatePricePreview();
}

function calculateBookingAmounts() {
  const start = new Date(els.pickupDateInput.value);
  const end = new Date(els.dropoffDateInput.value);
  const diffDays = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const pickupType = getPickupType();
  const dropoffType = getDropoffType();
  const pickupFee = Number((LOCATION_FEES[pickupType] ?? 0).toFixed(2));
  const dropoffFee = Number((LOCATION_FEES[dropoffType] ?? 0).toFixed(2));
  const deliveryFee = Number((pickupFee + dropoffFee).toFixed(2));
  const dailyRate = Number(selectedCar?.daily_price || 0);

  const baseRental = selectedCar && diffDays > 0 ? Number((diffDays * dailyRate).toFixed(2)) : 0;
  const subtotal = Number((baseRental + deliveryFee).toFixed(2));
  const serviceFee = Number((subtotal * SERVICE_FEE_RATE).toFixed(2));
  const total = Number((subtotal + serviceFee).toFixed(2));

  return {
    diffDays,
    dailyRate,
    pickupType,
    dropoffType,
    pickupFee,
    dropoffFee,
    deliveryFee,
    baseRental,
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
    pendingPickedLocation = { address, lat, lng };
    els.mapSelectedSummary.textContent = `${address} (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
  } catch {
    pendingPickedLocation = { address: fallbackLabel, lat, lng };
    els.mapSelectedSummary.textContent = fallbackLabel;
  }
}

function placeLeafletPin(lat, lng, presetAddress = '') {
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
    pendingPickedLocation = { address: presetAddress, lat, lng };
    els.mapSelectedSummary.textContent = `${presetAddress} (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
  } else {
    reverseGeocodeLeaflet(lat, lng);
  }
}

async function searchAddressOnMap() {
  const query = els.mapSearchInput.value.trim();
  if (!query || !leafletMap) return;

  const sideType = activeLocationTarget === 'pickup' ? getPickupType() : getDropoffType();
  els.mapSelectedSummary.textContent = t('mapLoadingAddress');
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}&accept-language=${currentLang}`;
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
    const zoomLevel = sideType === 'outside' ? 10 : 15;
    leafletMap.setView([lat, lng], zoomLevel);
    placeLeafletPin(lat, lng, best.display_name);
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

  const sideType = target === 'pickup' ? getPickupType() : getDropoffType();
  const isOutside = sideType === 'outside';
  const initialCenter = isOutside ? [41.8, 43.4] : [41.7151, 44.8271];
  const initialZoom = isOutside ? 7 : 12;

  setTimeout(() => {
    leafletMap.invalidateSize();

    const existingLat =
      target === 'pickup' ? Number(els.pickupLatInput.value) : Number(els.dropoffLatInput.value);
    const existingLng =
      target === 'pickup' ? Number(els.pickupLngInput.value) : Number(els.dropoffLngInput.value);
    const existingAddr =
      target === 'pickup' ? els.pickupLocationInput.value : els.dropoffLocationInput.value;

    if (Number.isFinite(existingLat) && Number.isFinite(existingLng) && existingLat !== 0 && existingLng !== 0) {
      leafletMap.setView([existingLat, existingLng], isOutside ? 11 : 15);
      placeLeafletPin(existingLat, existingLng, existingAddr);
    } else {
      if (leafletMarker) {
        leafletMap.removeLayer(leafletMarker);
        leafletMarker = null;
      }
      leafletMap.setView(initialCenter, initialZoom);
    }
  }, 60);
}

els.pickupDeliveryTypeInput?.addEventListener('change', syncDeliverySidesUI);
els.dropoffDeliveryTypeInput?.addEventListener('change', syncDeliverySidesUI);

els.pickupLocationInput?.addEventListener('click', () => openMapForTarget('pickup'));
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
  } else {
    els.dropoffLocationInput.value = pendingPickedLocation.address;
    els.dropoffLatInput.value = String(pendingPickedLocation.lat);
    els.dropoffLngInput.value = String(pendingPickedLocation.lng);
  }

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

  if (els.pickupDeliveryTypeInput) els.pickupDeliveryTypeInput.value = 'office';
  if (els.dropoffDeliveryTypeInput) els.dropoffDeliveryTypeInput.value = 'office';
  if (els.paymentMethodInput) els.paymentMethodInput.value = 'cash';
  if (els.phoneCountryCodeInput) els.phoneCountryCodeInput.value = '+995';
  syncPhoneCountryVisual();

  if (els.filterPickup?.value) els.pickupDateInput.value = els.filterPickup.value;
  if (els.filterDropoff?.value) els.dropoffDateInput.value = els.filterDropoff.value;

  syncDeliverySidesUI();
  els.bookingModal.classList.remove('hidden');
}

function updatePricePreview() {
  if (!selectedCar || !els.pricePreview) return;
  const calc = calculateBookingAmounts();
  const pickupShort = getShortTypeLabel('pickup', calc.pickupType);
  const dropoffShort = getShortTypeLabel('dropoff', calc.dropoffType);

  els.pricePreview.innerHTML = `
    <div class="price-breakdown-line">
      <span>${t('rentalLine', calc.diffDays, calc.dailyRate)}</span>
      <strong>$${calc.baseRental.toFixed(2)}</strong>
    </div>
    <div class="price-breakdown-line">
      <span>${t('pickupFeeLine', pickupShort)}</span>
      <strong>$${calc.pickupFee.toFixed(2)}</strong>
    </div>
    <div class="price-breakdown-line">
      <span>${t('dropoffFeeLine', dropoffShort)}</span>
      <strong>$${calc.dropoffFee.toFixed(2)}</strong>
    </div>
    <div class="price-breakdown-line">
      <span>${t('serviceFeeLine')}</span>
      <strong>$${calc.serviceFee.toFixed(2)}</strong>
    </div>
    <div class="price-breakdown-total">
      <span>${t('totalLine')}</span>
      <span>$${calc.total.toFixed(2)}</span>
    </div>
  `;
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

  const formattedPhone = getFormattedPhoneNumber();
  if (!formattedPhone) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('phoneRequiredErr');
    els.customerPhoneInput?.focus();
    return;
  }

  const pickupDeliveryType = getPickupType();
  const dropoffDeliveryType = getDropoffType();

  const pickupAddress =
    pickupDeliveryType === 'office' ? OFFICE_ADDRESS : els.pickupLocationInput.value.trim();
  const dropoffAddress =
    dropoffDeliveryType === 'office' ? OFFICE_ADDRESS : els.dropoffLocationInput.value.trim();

  if (pickupDeliveryType !== 'office') {
    const pLat = Number(els.pickupLatInput.value);
    const pLng = Number(els.pickupLngInput.value);
    const hasPickup =
      pickupAddress.length > 0 &&
      Number.isFinite(pLat) &&
      Number.isFinite(pLng) &&
      Math.abs(pLat) <= 90 &&
      Math.abs(pLng) <= 180;

    if (!hasPickup) {
      els.bookingMessage.className = 'feedback err';
      els.bookingMessage.textContent = t('locationRequiredErr');
      return;
    }
  }

  if (dropoffDeliveryType !== 'office') {
    const dLat = Number(els.dropoffLatInput.value);
    const dLng = Number(els.dropoffLngInput.value);
    const hasDropoff =
      dropoffAddress.length > 0 &&
      Number.isFinite(dLat) &&
      Number.isFinite(dLng) &&
      Math.abs(dLat) <= 90 &&
      Math.abs(dLng) <= 180;

    if (!hasDropoff) {
      els.bookingMessage.className = 'feedback err';
      els.bookingMessage.textContent = t('dropoffInvalidErr');
      return;
    }
  }

  const calc = calculateBookingAmounts();
  const paymentMethod = els.paymentMethodInput?.value || 'cash';
  const paymentLabel = paymentMethod === 'card' ? 'ბარათით (Card — აყვანისას)' : 'ქეშით (Cash — აყვანისას)';

  const pickupLabel = getShortTypeLabel('pickup', pickupDeliveryType);
  const dropoffLabel = getShortTypeLabel('dropoff', dropoffDeliveryType);

  const detailedInfo = [
    `გადახდა აყვანისას: ${paymentLabel}`,
    `აყვანის ტიპი: ${pickupLabel} ($${calc.pickupFee.toFixed(2)}) — ${pickupAddress}`,
    `დაბრუნების ტიპი: ${dropoffLabel} ($${calc.dropoffFee.toFixed(2)}) — ${dropoffAddress}`,
    `ქირა (${calc.diffDays} დღე): $${calc.baseRental.toFixed(2)} | აყვანა: $${calc.pickupFee.toFixed(2)} | დაბრუნება: $${calc.dropoffFee.toFixed(2)} | Service Fee (10%): $${calc.serviceFee.toFixed(2)} | სულ: $${calc.total.toFixed(2)}`
  ].join(' | ');

  const userNote = els.notesInput.value.trim();
  const combinedNotes = userNote ? `${detailedInfo} | შენიშვნა: ${userNote}` : detailedInfo;

  const payload = {
    car_id: Number(els.bookingCarId.value),
    pickup_date: els.pickupDateInput.value,
    dropoff_date: els.dropoffDateInput.value,
    pickup_location: pickupAddress,
    dropoff_location: dropoffAddress,
    pickup_delivery_type: pickupDeliveryType,
    dropoff_delivery_type: dropoffDeliveryType,
    payment_method: paymentMethod,
    pickup_delivery_fee: calc.pickupFee,
    dropoff_delivery_fee: calc.dropoffFee,
    delivery_fee: calc.deliveryFee,
    service_fee: calc.serviceFee,
    total_days: calc.diffDays > 0 ? calc.diffDays : undefined,
    total_price: calc.total > 0 ? calc.total : undefined,
    customer_name: els.customerNameInput.value.trim(),
    customer_phone: formattedPhone,
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
  if (els.pickupDeliveryTypeInput) els.pickupDeliveryTypeInput.value = 'office';
  if (els.dropoffDeliveryTypeInput) els.dropoffDeliveryTypeInput.value = 'office';
  if (els.paymentMethodInput) els.paymentMethodInput.value = 'cash';
  if (els.phoneCountryCodeInput) els.phoneCountryCodeInput.value = '+995';
  syncPhoneCountryVisual();
  syncDeliverySidesUI();
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

function openAdminPanel() {
  els.adminModal?.classList.remove('hidden');
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') {
    openAdminPanel();
  }
});

if (window.location.hash === '#admin') {
  openAdminPanel();
}

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
      const paymentLabel =
        b.payment_method === 'card'
          ? 'ბარათით (Card — აყვანისას)'
          : b.payment_method === 'cash'
            ? 'ქეშით (Cash — აყვანისას)'
            : 'მითითებულია დეტალებში (აყვანისას)';

      const pType = b.pickup_delivery_type || 'office';
      const dType = b.dropoff_delivery_type || 'office';
      const pFee = Number(b.pickup_delivery_fee ?? LOCATION_FEES[pType] ?? 0).toFixed(2);
      const dFee = Number(b.dropoff_delivery_fee ?? LOCATION_FEES[dType] ?? 0).toFixed(2);
      const sFee = Number(b.service_fee ?? 0).toFixed(2);

      const pickupPlace = b.pickup_location || OFFICE_ADDRESS;
      const dropoffPlace = b.dropoff_location || OFFICE_ADDRESS;

      return `
      <div class="booking-item">
        <div class="admin-booking-card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div>
              <strong>${b.booking_code}</strong> • <strong>${b.customer_name}</strong>
              <span class="muted">(${b.brand} ${b.model}${b.year ? ` ${b.year}` : ''})</span>
            </div>
            <select class="admin-status-select" data-booking-id="${b.id}">
              ${statuses.map((st) => `<option value="${st}" ${b.status === st ? 'selected' : ''}>${st}</option>`).join('')}
            </select>
          </div>

          <div class="admin-booking-grid">
            <div><strong>თარიღები:</strong> ${b.pickup_date} → ${b.dropoff_date}${b.total_days ? ` (${b.total_days} დღე)` : ''}</div>
            <div><strong>ჯამური თანხა:</strong> $${b.total_price}</div>
            <div><strong>ტელეფონი:</strong> ${b.customer_phone || '—'}</div>
            <div><strong>ელ-ფოსტა:</strong> ${b.customer_email || '—'}</div>
            <div><strong>გადახდის მეთოდი:</strong> ${paymentLabel}</div>
            <div><strong>აყვანის ტიპი / ფასი:</strong> ${pType} ($${pFee})</div>
            <div><strong>დაბრუნების ტიპი / ფასი:</strong> ${dType} ($${dFee})</div>
            <div><strong>Service Fee (10%):</strong> $${sFee}</div>
            <div><strong>სად დახვდეს მანქანა:</strong> ${pickupPlace}</div>
            <div><strong>სად ჩააბაროს მანქანა:</strong> ${dropoffPlace}</div>
          </div>

          ${b.notes ? `<div class="admin-note-box"><strong>სრული დეტალები / შენიშვნა:</strong> ${b.notes}</div>` : ''}
        </div>
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

syncPhoneCountryVisual();
applyTranslations();
fetchAndRenderCars();