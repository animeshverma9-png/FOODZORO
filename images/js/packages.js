document.addEventListener('DOMContentLoaded', () => {
  // =======================================================
  // 1. MASTER MENU DATABASE (Mapped to spreadsheet)
  // =======================================================
  const MASTER_MENU = {
    tandooriSnacks: [
      'Paneer Tikka',
      'Malai Chaap',
      'Masala Chaap',
      'Achari Chaap',
      'Stuff Tandoori Aloo',
      'Tandoori Momos',
      'Seekh Kebab',
      'Dahi Ke Kebab',
      'Achari Paneer Tikka',
      'Malai Paneer Tikka',
      'Mushroom Tikka',
      'Hara Bhara Kebab'
    ],
    chineseSnacks: [
      'Veg Manchurian Dry',
      'Kung Pao Potato',
      'Spring Rolls',
      'Chilli Potato',
      'Honey Chilli Potato',
      'Crispy Corn',
      'Veg Noodles',
      'Hakka Noodles',
      'Chilli Paneer Dry',
      'Chilli Mushroom Dry'
    ],
    continentalSnacks: [
      'French Fries',
      'Steam Corn',
      'Corn Butter Chaat',
      'Molten Cheese Balls',
      'Cheese Cigar Rolls'
    ],
    indianMains: [
      'Dal Makhni',
      'Dal Tadka',
      'Kadhai Paneer',
      'Paneer Lababdaar',
      'Paneer Butter Masala',
      'Tawa Roast Mix Veg',
      'Rajma Masala',
      'Choley',
      'Chaap Masala Gravy',
      'Tawa Chaap',
      'Malai Kofta'
    ],
    noodles: [
      'Veg Noodles',
      'Hakka Noodles',
      'Schezwan Noodles',
      'Chilli Garlic Noodles'
    ],
    rice: [
      'Veg Fried Rice',
      'Schezwan Fried Rice',
      'Veggie Fried Rice',
      'Chilli Garlic Fried Rice'
    ],
    chineseMains: [
      'Veg Manchurian Gravy',
      'Chilli Paneer Gravy',
      'Chilli Mushroom Gravy',
      'Veggie in Hot Garlic Sauce'
    ],
    continentalMains: [
      'Pasta',
      'Burger',
      'Wada Pav',
      'Pav Bhaji'
    ],
    breadsAndRice: [
      'Butter Naan',
      'Tandoori Roti (Wheat)',
      'Laccha Paratha',
      'Garlic Naan',
      'Jeera Rice',
      'Steam Rice',
      'Dum Biryani',
      'Poori',
      'Aloo Kulcha'
    ],
    desserts: [
      'Gulab Jamun',
      'Chocolate Brownie',
      'Chocolate Pastry',
      'Cup Cakes',
      'Ice Cream'
    ]
  };

  const ALL_SNACKS = [
    ...MASTER_MENU.tandooriSnacks,
    ...MASTER_MENU.chineseSnacks,
    ...MASTER_MENU.continentalSnacks
  ];

  const NOODLES_AND_RICE = [
    ...MASTER_MENU.noodles,
    ...MASTER_MENU.rice
  ];

  // =======================================================
  // 2. PACKAGES CONFIGURATION & STRICT RULES ENGINE
  // =======================================================
  const PACKAGES_CONFIG = {
    'pkg-1': {
      name: 'Zoro Mix (Package 1)',
      basePrice: 299,
      description: '3 Snacks (from Tandoori, Chinese & Continental) + 1 Noodles + 1 Fried Rice + 1 Dessert',
      groups: [
        { id: 'p1_snacks', title: 'Snacks (Tandoori, Chinese, Continental)', quota: 3, items: ALL_SNACKS },
        { id: 'p1_noodles', title: 'Noodles Option', quota: 1, items: MASTER_MENU.noodles },
        { id: 'p1_rice', title: 'Fried Rice Option', quota: 1, items: MASTER_MENU.rice },
        { id: 'p1_dessert', title: 'Dessert Option', quota: 1, items: MASTER_MENU.desserts }
      ]
    },
    'pkg-2': {
      name: 'Zoro Snack Attack (Package 2)',
      basePrice: 289,
      description: '6 Snacks from all snack menus',
      groups: [
        { id: 'p2_snacks', title: 'Pick Any 6 Snacks (All Snack Menus)', quota: 6, items: ALL_SNACKS }
      ]
    },
    'pkg-3': {
      name: 'Zoro Wok (Package 3)',
      basePrice: 299,
      description: '3 Chinese Snacks + 2 Noodles/Rice + 1 Chinese Main Course Gravy',
      groups: [
        { id: 'p3_ch_snacks', title: 'Chinese Snacks', quota: 3, items: MASTER_MENU.chineseSnacks },
        { id: 'p3_noodles_rice', title: 'Noodles / Fried Rice Options', quota: 2, items: NOODLES_AND_RICE },
        { id: 'p3_ch_mains', title: 'Chinese Main Course Gravy', quota: 1, items: MASTER_MENU.chineseMains }
      ]
    },
    'pkg-4': {
      name: 'Desi Zoro (Package 4)',
      basePrice: 199,
      description: '3 Indian Main Course Curries + 3 Rice and Breads + 1 Dessert',
      groups: [
        { id: 'p4_ind_mains', title: 'Indian Main Course Dishes', quota: 3, items: MASTER_MENU.indianMains },
        { id: 'p4_breads_rice', title: 'Breads & Rice Choices', quota: 3, items: MASTER_MENU.breadsAndRice },
        { id: 'p4_dessert', title: 'Dessert Option', quota: 1, items: MASTER_MENU.desserts }
      ]
    },
    'pkg-5': {
      name: 'Zoro Feast (Package 5)',
      basePrice: 339,
      description: '3 Snacks + 2 Indian Main Course Items + 3 Rice and Breads + 1 Dessert',
      groups: [
        { id: 'p5_snacks', title: 'Snacks Selection', quota: 3, items: ALL_SNACKS },
        { id: 'p5_ind_mains', title: 'Indian Main Course Dishes', quota: 2, items: MASTER_MENU.indianMains },
        { id: 'p5_breads_rice', title: 'Breads & Rice Choices', quota: 3, items: MASTER_MENU.breadsAndRice },
        { id: 'p5_dessert', title: 'Dessert Option', quota: 1, items: MASTER_MENU.desserts }
      ]
    },
    'pkg-6': {
      name: 'Build Your Zoro (Package 6)',
      basePrice: 249,
      isCustom: true,
      description: 'Free choice of Bases, Mains, Sides, and Sauces from the master menu.',
      groups: [
        { id: 'p6_base', title: 'Base (Rice & Noodles)', quota: 99, items: NOODLES_AND_RICE },
        { id: 'p6_mains', title: 'Mains (Indian & Chinese)', quota: 99, items: [...MASTER_MENU.indianMains, ...MASTER_MENU.chineseMains] },
        { id: 'p6_sides', title: 'Sides (All Snacks)', quota: 99, items: ALL_SNACKS },
        { id: 'p6_breads', title: 'Breads & Accompaniments', quota: 99, items: MASTER_MENU.breadsAndRice },
        { id: 'p6_desserts', title: 'Desserts', quota: 99, items: MASTER_MENU.desserts }
      ]
    }
  };

  // =======================================================
  // 3. DIETARY FILTER TOGGLING
  // =======================================================
  const vegTab = document.querySelector('.filter-tab[data-filter="veg"]');
  const nonVegTab = document.querySelector('.filter-tab[data-filter="nonveg"]');
  const packagesMainContent = document.getElementById('packagesMainContent');
  const nonVegEmptyNotice = document.getElementById('nonVegEmptyNotice');
  const btnSwitchToVeg = document.getElementById('btnSwitchToVeg');

  function showVegView() {
    if (packagesMainContent) packagesMainContent.style.display = 'block';
    if (nonVegEmptyNotice) nonVegEmptyNotice.classList.remove('show');
    if (vegTab) vegTab.classList.add('active');
    if (nonVegTab) nonVegTab.classList.remove('active');
  }

  function showNonVegNoticeView() {
    if (packagesMainContent) packagesMainContent.style.display = 'none';
    if (nonVegEmptyNotice) nonVegEmptyNotice.classList.add('show');
    if (nonVegTab) nonVegTab.classList.add('active');
    if (vegTab) vegTab.classList.remove('active');
  }

  if (vegTab) vegTab.addEventListener('click', showVegView);
  if (nonVegTab) nonVegTab.addEventListener('click', showNonVegNoticeView);
  if (btnSwitchToVeg) btnSwitchToVeg.addEventListener('click', showVegView);

  // =======================================================
  // 4. QUANTITY STEPPERS & MODAL OPENING
  // =======================================================
  document.querySelectorAll('.box-card').forEach((card) => {
    const pkgId = card.getAttribute('data-package-id');
    const qtyVal = card.querySelector('.qty-val');
    const decBtn = card.querySelector('.qty-btn.dec');
    const incBtn = card.querySelector('.qty-btn.inc');
    const addBtn = card.querySelector('.btn-add-cart');
    const viewMenuBtn = card.querySelector('.btn-view-menu');

    let qty = parseInt(qtyVal?.textContent || '10', 10);

    incBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      qty += 5;
      qtyVal.textContent = qty;
    });

    decBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (qty > 5) {
        qty -= 5;
        qtyVal.textContent = qty;
      }
    });

    const launchConfigurator = (e) => {
      e.preventDefault();
      openMenuModal(pkgId, qty);
    };

    addBtn?.addEventListener('click', launchConfigurator);
    viewMenuBtn?.addEventListener('click', launchConfigurator);
  });

  // =======================================================
  // 5. MODAL LOGIC & STRICT CATEGORY VALIDATION
  // =======================================================
  const modalBackdrop = document.getElementById('menuModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalPackageTitle');
  const modalPrice = document.getElementById('modalPackagePrice');
  const modalRuleBadge = document.getElementById('modalRuleBadge');
  const modalInstruction = document.getElementById('modalInstructionText');
  const modalDishCategories = document.getElementById('modalDishCategories');
  const modalSelectedCount = document.getElementById('modalSelectedCount');
  const btnFinalizeOrder = document.getElementById('btnFinalizeOrder');

  let activePkgId = null;
  let activeQty = 10;

  function openMenuModal(pkgId, quantity) {
    const pkgConfig = PACKAGES_CONFIG[pkgId];
    if (!pkgConfig) return;

    activePkgId = pkgId;
    activeQty = quantity || 10;

    modalTitle.textContent = pkgConfig.name;
    modalPrice.textContent = `₹${pkgConfig.basePrice} / box onwards`;
    modalRuleBadge.textContent = pkgConfig.isCustom ? 'Customizer' : 'Strict Quota Rules';
    modalInstruction.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${pkgConfig.description}`;

    modalDishCategories.innerHTML = '';

    pkgConfig.groups.forEach((group) => {
      const groupBlock = document.createElement('div');
      groupBlock.className = 'modal-category-block';
      groupBlock.dataset.groupId = group.id;
      groupBlock.dataset.quota = group.quota;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'modal-category-header-row';
      groupHeader.innerHTML = `
        <h4 class="modal-category-title"><i class="fa-solid fa-utensils"></i> ${group.title}</h4>
        <span class="group-quota-tracker" id="tracker_${group.id}">
          ${group.quota < 90 ? `Selected: 0 / ${group.quota}` : 'Added: 0 items'}
        </span>
      `;
      groupBlock.appendChild(groupHeader);

      const listDiv = document.createElement('div');
      listDiv.className = 'dish-selection-list';

      const uniqueItems = Array.from(new Set(group.items));

      uniqueItems.forEach((dishName) => {
        const label = document.createElement('label');
        label.className = 'dish-item-card';
        label.innerHTML = `
          <div class="dish-info-left">
            <input type="checkbox" class="dish-checkbox" value="${dishName}" data-group="${group.id}" />
            <span class="dish-name-text">${dishName}</span>
          </div>
          <span class="dish-portion-tag">Included</span>
        `;
        listDiv.appendChild(label);
      });

      groupBlock.appendChild(listDiv);
      modalDishCategories.appendChild(groupBlock);
    });

    modalDishCategories.querySelectorAll('.dish-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const card = e.target.closest('.dish-item-card');
        card.classList.toggle('checked', e.target.checked);
        validatePackageQuotas(pkgConfig);
      });
    });

    validatePackageQuotas(pkgConfig);

    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function validatePackageQuotas(pkgConfig) {
    let allRequirementsMet = true;
    let totalItemsSelected = 0;

    pkgConfig.groups.forEach((group) => {
      const groupBlock = modalDishCategories.querySelector(`[data-group-id="${group.id}"]`);
      if (!groupBlock) return;

      const checkedBoxes = groupBlock.querySelectorAll('.dish-checkbox:checked');
      const uncheckedBoxes = groupBlock.querySelectorAll('.dish-checkbox:not(:checked)');
      const count = checkedBoxes.length;
      totalItemsSelected += count;

      const tracker = document.getElementById(`tracker_${group.id}`);
      if (tracker) {
        if (group.quota < 90) {
          tracker.textContent = `Selected: ${count} / ${group.quota}`;
          tracker.classList.toggle('fulfilled', count === group.quota);
        } else {
          tracker.textContent = `Added: ${count} items`;
        }
      }

      // Lock remaining unchecked options once quota is satisfied
      if (group.quota < 90 && count >= group.quota) {
        uncheckedBoxes.forEach((chk) => {
          chk.disabled = true;
          chk.closest('.dish-item-card').classList.add('disabled');
        });
      } else {
        uncheckedBoxes.forEach((chk) => {
          chk.disabled = false;
          chk.closest('.dish-item-card').classList.remove('disabled');
        });
      }

      if (group.quota < 90 && count !== group.quota) {
        allRequirementsMet = false;
      }
    });

    if (pkgConfig.isCustom && totalItemsSelected === 0) {
      allRequirementsMet = false;
    }

    if (allRequirementsMet) {
      modalSelectedCount.innerHTML = `<span style="color: #16A34A;"><i class="fa-solid fa-circle-check"></i> Quotas Fully Satisfied (${totalItemsSelected} items)</span>`;
      btnFinalizeOrder.disabled = false;
    } else {
      modalSelectedCount.innerHTML = `<span style="color: #D97706;"><i class="fa-solid fa-clock"></i> Incomplete: Follow category quotas</span>`;
      btnFinalizeOrder.disabled = true;
    }
  }

  function closeMenuModal() {
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeMenuModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeMenuModal();
    });
  }

  // =======================================================
  // 6. FINALIZE SELECTION & ROUTE TO EVENT DETAILS
  // =======================================================
  btnFinalizeOrder?.addEventListener('click', () => {
    if (!activePkgId) return;
    const pkgConfig = PACKAGES_CONFIG[activePkgId];

    const selectedDishes = [];
    modalDishCategories.querySelectorAll('.dish-checkbox:checked').forEach((chk) => {
      selectedDishes.push(chk.value);
    });

    const packagePayload = {
      id: activePkgId,
      name: pkgConfig.name,
      price: pkgConfig.basePrice,
      initialQty: activeQty,
      isVeg: true,
      customDishes: selectedDishes
    };

    localStorage.setItem('current_selected_package', JSON.stringify(packagePayload));
    btnFinalizeOrder.innerHTML = '<span>Saving Selection...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      window.location.href = 'event-details.html';
    }, 350);
  });
});