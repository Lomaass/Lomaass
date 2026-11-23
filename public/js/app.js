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
    dropoffLocation: 'დაბრუნების ლოკაცია',
    pickOnMap: 'რუკა',
    mapPickerTitle: 'მისამართის არჩევა რუკაზე',
    mapSearchLabel: 'მისამართის ძიება',
    mapSelectHint: 'დააკლიკეთ რუკაზე პინის დასასმელად ან აირჩიეთ მისამართი ძიებიდან.',
    confirmLocation: 'ლოკაციის დადასტურება',
    locationRequiredErr: 'გთხოვთ აირჩიოთ რეალური აყვანის მისამართი რუკაზე ან ძიებიდან.',
    dropoffInvalidErr: 'გთხოვთ აირჩიოთ რეალური დაბრუნების მისამართი რუკაზე ან ძიებიდან.',
    mapNotReadyErr: 'Google Maps ჯერ არ ჩატვირთულა ან API გასაღები არასწორია.',
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
    calcSummary: (days, total) => `ხანგრძლივობა: ${days} დღე | სავარაუდო ჯამი: $${total}`
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
    dropoffLocation: 'Drop-off Location',
    pickOnMap: 'Map',
    mapPickerTitle: 'Select Address on Map',
    mapSearchLabel: 'Search Address',
    mapSelectHint: 'Click on the map to drop a pin or pick a suggestion from search.',
    confirmLocation: 'Confirm Location',
    locationRequiredErr: 'Please pick a valid pickup address from the map or search.',
    dropoffInvalidErr: 'Please pick a valid drop-off address from the map or search.',
    mapNotReadyErr: 'Google Maps is not loaded yet or the API key is missing.',
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
    calcSummary: (days, total) => `Duration: ${days} day(s) | Estimated Total: $${total}`
  }
};

let currentLang = 'ka';
let selectedCar = null;
let activeAdminKey = '';

// Google Map state
let googleMapsReady = false;
let mapInstance = null;
let mapMarker = null;
let geocoderInstance = null;
let activeLocationTarget = 'pickup'; // 'pickup' | 'dropoff'
let pendingPickedLocation = null; // { address, lat, lng }

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
  dropoffLatInput: document.getElementById('dropoffLatInput'),
  dropoffLngInput: document.getElementById('dropoffLngInput'),
  pickPickupMapBtn: document.getElementById('pickPickupMapBtn'),
  pickDropoffMapBtn: document.getElementById('pickDropoffMapBtn'),
  clearDropoffMapBtn: document.getElementById('clearDropoffMapBtn'),
  mapModal: document.getElementById('mapModal'),
  mapSearchInput: document.getElementById('mapSearchInput'),
  googleMapCanvas: document.getElementById('googleMapCanvas'),
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

function resetBookingLocations() {
  els.pickupLocationInput.value = '';
  els.pickupLatInput.value = '';
  els.pickupLngInput.value = '';
  els.dropoffLocationInput.value = '';
  els.dropoffLatInput.value = '';
  els.dropoffLngInput.value = '';
  pendingPickedLocation = null;
}

function setPinAtLatLng(latLng, addressText = '') {
  const lat = typeof latLng.lat === 'function' ? latLng.lat() : latLng.lat;
  const lng = typeof latLng.lng === 'function' ? latLng.lng() : latLng.lng;

  if (!mapMarker) {
    mapMarker = new google.maps.Marker({
      map: mapInstance,
      position: { lat, lng },
      draggable: true
    });

    mapMarker.addListener('dragend', (ev) => {
      const moved = ev.latLng;
      reverseGeocodeAndSet(moved.lat(), moved.lng());
    });
  } else {
    mapMarker.setPosition({ lat, lng });
  }

  mapInstance.panTo({ lat, lng });

  if (addressText) {
    pendingPickedLocation = { address: addressText, lat, lng };
    els.mapSelectedSummary.textContent = `${addressText} (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
  } else {
    reverseGeocodeAndSet(lat, lng);
  }
}

function reverseGeocodeAndSet(lat, lng) {
  if (!geocoderInstance) return;
  geocoderInstance.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      const formatted = results[0].formatted_address;
      pendingPickedLocation = { address: formatted, lat, lng };
      els.mapSelectedSummary.textContent = `${formatted} (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
    } else {
      pendingPickedLocation = null;
      els.mapSelectedSummary.textContent = t('mapSelectHint');
    }
  });
}

window.initGoogleMapPicker = function initGoogleMapPicker() {
  if (!window.google || !window.google.maps || !els.googleMapCanvas) return;

  const defaultCenter = { lat: 41.7151, lng: 44.8271 }; // Tbilisi
  mapInstance = new google.maps.Map(els.googleMapCanvas, {
    center: defaultCenter,
    zoom: 12,
    streetViewControl: false,
    mapTypeControl: false
  });

  geocoderInstance = new google.maps.Geocoder();

  mapInstance.addListener('click', (event) => {
    setPinAtLatLng(event.latLng);
  });

  if (els.mapSearchInput && google.maps.places) {
    const autocomplete = new google.maps.places.Autocomplete(els.mapSearchInput, {
      fields: ['formatted_address', 'geometry', 'name']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;
      const address = place.formatted_address || place.name || '';
      if (!address) return;
      mapInstance.setZoom(15);
      setPinAtLatLng(place.geometry.location, address);
    });
  }

  googleMapsReady = true;
};

function openMapForTarget(target) {
  activeLocationTarget = target;
  pendingPickedLocation = null;
  els.bookingMessage.className = 'feedback';
  els.bookingMessage.textContent = '';

  if (!googleMapsReady || !mapInstance) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('mapNotReadyErr');
    return;
  }

  els.mapModal.classList.remove('hidden');
  els.mapSearchInput.value = '';
  els.mapSelectedSummary.textContent = t('mapSelectHint');

  setTimeout(() => {
    google.maps.event.trigger(mapInstance, 'resize');
    const existingLat =
      target === 'pickup' ? Number(els.pickupLatInput.value) : Number(els.dropoffLatInput.value);
    const existingLng =
      target === 'pickup' ? Number(els.pickupLngInput.value) : Number(els.dropoffLngInput.value);
    const existingAddr =
      target === 'pickup' ? els.pickupLocationInput.value : els.dropoffLocationInput.value;

    if (Number.isFinite(existingLat) && Number.isFinite(existingLng) && existingLat !== 0 && existingLng !== 0) {
      setPinAtLatLng({ lat: existingLat, lng: existingLng }, existingAddr);
      mapInstance.setZoom(15);
    } else {
      mapInstance.setCenter({ lat: 41.7151, lng: 44.8271 });
      mapInstance.setZoom(12);
    }
  }, 60);
}

els.pickPickupMapBtn?.addEventListener('click', () => openMapForTarget('pickup'));
els.pickupLocationInput?.addEventListener('click', () => openMapForTarget('pickup'));

els.pickDropoffMapBtn?.addEventListener('click', () => openMapForTarget('dropoff'));
els.dropoffLocationInput?.addEventListener('click', () => openMapForTarget('dropoff'));

els.clearDropoffMapBtn?.addEventListener('click', () => {
  els.dropoffLocationInput.value = '';
  els.dropoffLatInput.value = '';
  els.dropoffLngInput.value = '';
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
  resetBookingLocations();

  if (els.filterPickup?.value) els.pickupDateInput.value = els.filterPickup.value;
  if (els.filterDropoff?.value) els.dropoffDateInput.value = els.filterDropoff.value;

  updatePricePreview();
  els.bookingModal.classList.remove('hidden');
}

function updatePricePreview() {
  if (!selectedCar || !els.pricePreview) return;
  const start = new Date(els.pickupDateInput.value);
  const end = new Date(els.dropoffDateInput.value);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    const total = (diffDays * selectedCar.daily_price).toFixed(2);
    els.pricePreview.textContent = t('calcSummary', diffDays, total);
  } else {
    els.pricePreview.textContent = `$${selectedCar.daily_price} ${t('perDay')}`;
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
  const pickupLat = Number(els.pickupLatInput.value);
  const pickupLng = Number(els.pickupLngInput.value);

  const hasValidPickup =
    pickupAddress.length > 0 &&
    Number.isFinite(pickupLat) &&
    Number.isFinite(pickupLng) &&
    Math.abs(pickupLat) <= 90 &&
    Math.abs(pickupLng) <= 180;

  if (!hasValidPickup) {
    els.bookingMessage.className = 'feedback err';
    els.bookingMessage.textContent = t('locationRequiredErr');
    return;
  }

  const dropoffAddressRaw = els.dropoffLocationInput.value.trim();
  const dropoffLatRaw = els.dropoffLatInput.value.trim();
  const dropoffLngRaw = els.dropoffLngInput.value.trim();

  let dropoffAddress = pickupAddress;
  if (dropoffAddressRaw || dropoffLatRaw || dropoffLngRaw) {
    const dLat = Number(dropoffLatRaw);
    const dLng = Number(dropoffLngRaw);
    const hasValidDropoff =
      dropoffAddressRaw.length > 0 &&
      Number.isFinite(dLat) &&
      Number.isFinite(dLng) &&
      Math.abs(dLat) <= 90 &&
      Math.abs(dLng) <= 180;

    if (!hasValidDropoff) {
      els.bookingMessage.className = 'feedback err';
      els.bookingMessage.textContent = t('dropoffInvalidErr');
      return;
    }
    dropoffAddress = dropoffAddressRaw;
  }

  const payload = {
    car_id: Number(els.bookingCarId.value),
    pickup_date: els.pickupDateInput.value,
    dropoff_date: els.dropoffDateInput.value,
    pickup_location: pickupAddress,
    dropoff_location: dropoffAddress,
    customer_name: els.customerNameInput.value.trim(),
    customer_phone: els.customerPhoneInput.value.trim(),
    customer_email: els.customerEmailInput.value.trim(),
    notes: els.notesInput.value.trim()
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
  resetBookingLocations();
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
    .map(
      (b) => `
      <div class="booking-item">
        <div>
          <strong>${b.booking_code}</strong> • ${b.customer_name} (${b.customer_phone})<br />
          <span class="muted">${b.brand} ${b.model} | ${b.pickup_date} → ${b.dropoff_date} | $${b.total_price}</span>
        </div>
        <select class="admin-status-select" data-booking-id="${b.id}">
          ${statuses.map((st) => `<option value="${st}" ${b.status === st ? 'selected' : ''}>${st}</option>`).join('')}
        </select>
      </div>
    `
    )
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