document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const savedPackageRaw = localStorage.getItem('current_selected_package');
  const displayPackageName = document.getElementById('displayPackageName');
  const billSummaryPackage = document.getElementById('billSummaryPackage');
  const vegGuestsInput = document.getElementById('vegGuests');
  const totalGuestCount = document.getElementById('totalGuestCount');
  const eventDetailsForm = document.getElementById('eventDetailsForm');
  const eventDateInput = document.getElementById('eventDate');
  const ecoPackagingCheck = document.getElementById('ecoPackagingCheck');
  const ecoPackStatus = document.getElementById('ecoPackStatus');

  const MIN_PERSONS = 10;

  // 2. Prevent past dates
  if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
    if (!eventDateInput.value) {
      eventDateInput.value = today;
    }
  }

  // 3. Populate Package Details from localStorage
  let currentPackage = null;
  if (savedPackageRaw) {
    try {
      currentPackage = JSON.parse(savedPackageRaw);
      if (currentPackage.name) {
        if (displayPackageName) displayPackageName.textContent = currentPackage.name;
        if (billSummaryPackage) billSummaryPackage.textContent = currentPackage.name;
      }
      if (currentPackage.initialQty && vegGuestsInput) {
        vegGuestsInput.value = Math.max(MIN_PERSONS, parseInt(currentPackage.initialQty, 10));
      }
    } catch (err) {
      console.error('Error parsing package:', err);
    }
  }

  // 4. Update Person Count Display (Min 10 enforced)
  function updatePersonsCount() {
    let persons = parseInt(vegGuestsInput ? vegGuestsInput.value : `${MIN_PERSONS}`, 10) || MIN_PERSONS;
    if (persons < MIN_PERSONS) {
      persons = MIN_PERSONS;
      if (vegGuestsInput) vegGuestsInput.value = MIN_PERSONS;
    }

    if (totalGuestCount) {
      totalGuestCount.textContent = `${persons} Persons`;
    }
  }

  // 5. Quantity Stepper Controls (Step by 5, Min 10 rule)
  document.querySelectorAll('.btn-step').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      let currentVal = parseInt(input.value || `${MIN_PERSONS}`, 10);
      const min = parseInt(input.getAttribute('min') || `${MIN_PERSONS}`, 10);
      const max = parseInt(input.getAttribute('max') || '500', 10);

      if (btn.classList.contains('inc') && currentVal < max) {
        input.value = currentVal + 5;
      } else if (btn.classList.contains('dec')) {
        input.value = Math.max(min, currentVal - 5);
      }

      updatePersonsCount();
    });
  });

  if (vegGuestsInput) {
    vegGuestsInput.addEventListener('input', updatePersonsCount);
    vegGuestsInput.addEventListener('change', updatePersonsCount);
  }

  // 6. Mandatory Eco Packaging Setup
  if (ecoPackagingCheck) {
    ecoPackagingCheck.checked = true;
    ecoPackagingCheck.addEventListener('change', () => {
      ecoPackagingCheck.checked = true;
    });
  }
  if (ecoPackStatus) {
    ecoPackStatus.textContent = '₹149 (Mandatory)';
    ecoPackStatus.style.color = '#16A34A';
  }

  updatePersonsCount();

  // 7. Form Submission -> WhatsApp Request (Option 2 Receipt Format)
  if (eventDetailsForm) {
    eventDetailsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(eventDetailsForm);
      const city = formData.get('city') || 'Noida';
      const occasion = formData.get('occasion');
      const eventDate = formData.get('eventDate');
      const deliveryTime = formData.get('deliveryTime');
      const totalPersons = Math.max(MIN_PERSONS, parseInt(vegGuestsInput ? vegGuestsInput.value : `${MIN_PERSONS}`, 10) || MIN_PERSONS);

      const pkgName = currentPackage ? currentPackage.name : 'Custom Zoro Package';
      
      // Clean itemized list format without emojis
      const dishesList = (currentPackage && currentPackage.customDishes && currentPackage.customDishes.length > 0)
        ? currentPackage.customDishes.map(dish => `- ${dish}`).join('\n')
        : '- Standard Chef Curation';

      // Clean, structured receipt format to avoid encoding bugs
      const message = 
`*FOODZORO CATERING INQUIRY*
----------------------------------------

[EVENT OVERVIEW]
City: ${city}
Occasion: ${occasion}
Date: ${eventDate}
Slot: ${deliveryTime}

[ORDER DETAILS]
Package: ${pkgName}
Guest Count: ${totalPersons} Persons
Eco Packaging: Mandatory Standard Applied (Rs. 149)

[CURATED DISHES]
${dishesList}

----------------------------------------
_Please share the per-head quote and delivery confirmation._`;

      const encodedMessage = encodeURIComponent(message);
      const zoroWhatsAppNumber = '919810788986';

      const submitBtn = document.querySelector('.btn-customize-menu');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Connecting to Zoros...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        window.location.href = `https://wa.me/${zoroWhatsAppNumber}?text=${encodedMessage}`;
        if (submitBtn) {
          setTimeout(() => {
            submitBtn.innerHTML = '<span>Request Zoro Quote</span> <i class="fa-brands fa-whatsapp"></i>';
            submitBtn.disabled = false;
          }, 1200);
        }
      }, 450);
    });
  }
});