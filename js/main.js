/**
 * MSH Real Estate — Main Application Logic
 * Premium, modular, vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll listener
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Navigation Drawer Toggle (Desktop & Mobile)
  const mobileToggle = document.querySelector('.btn-menu-toggle, .btn-mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile drawer when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // 3. Favorites state
  let favoriteCount = 0;
  const favoritesBadge = document.querySelector('.favorites-count');

  document.querySelectorAll('.property-btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const isFav = btn.classList.contains('active');
      
      if (isFav) {
        favoriteCount++;
        btn.setAttribute('aria-label', 'Удалить из избранного');
      } else {
        favoriteCount = Math.max(0, favoriteCount - 1);
        btn.setAttribute('aria-label', 'Добавить в избранное');
      }

      if (favoritesBadge) {
        favoritesBadge.textContent = String(favoriteCount);
      }
    });
  });

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. Interactive Broker Showcase (City Homes Style)
  const brokersData = [
    {
      id: 1,
      name: "Данияр Агудо",
      role: "Основатель MSH · Ведущий эксперт по инвестициям",
      phone: "+7 (7252) 45-61-24",
      email: "daniyar@msh.kz",
      telegram: "@daniyar_msh",
      image: "assets/images/broker-main.jpg",
      bio: "Более 15 лет формирует портфели частных и коммерческих активов в Шымкенте. Каждая сделка рассматривается как надежная долгосрочная инвестиция в ликвидность и семейный капитал. Провел более 180 закрытых сделок в премиальном сегменте города.",
      quote: "«В премиальном сегменте доверие строится на точности цифр, юридической чистоте и конфиденциальности. MSH освобождает клиента от рутины и предлагает только объекты мирового уровня.»"
    },
    {
      id: 2,
      name: "Айгерим Касымова",
      role: "Руководитель направления элитных резиденций",
      phone: "+7 (7252) 45-61-25",
      email: "aigerim@msh.kz",
      telegram: "@aigerim_msh",
      image: "assets/images/broker-2.jpg",
      bio: "11 лет специализируется на загородных резиденциях и клубных домах мкр. Мирас и предгорьях Казыгурта. Помогает семьям находить исключительные пространства с приватной территорией и панорамными видами.",
      quote: "«Дом премиум-класса — это не просто квадратные метры, это архитектурная гармония и ощущение защищенности для вашей семьи на десятилетия вперед.»"
    },
    {
      id: 3,
      name: "Бауыржан Садыков",
      role: "Ведущий консультант по коммерческим площадям",
      phone: "+7 (7252) 45-61-26",
      email: "bauyrzhan@msh.kz",
      telegram: "@sadykov_msh",
      image: "assets/images/broker-3.jpg",
      bio: "Эксперт по доходной недвижимости: стрит-ритейл, бизнес-центры и офисные кластеры на проспектах Кунаева и Тауке Хана. Глубокий аудит доходности и прогнозирование арендных потоков.",
      quote: "«Коммерческий актив должен генерировать стабильный дивидендный поток с первого дня. Мы отбираем объекты с окупаемостью выше среднерыночной.»"
    },
    {
      id: 4,
      name: "Ерлан Омаров",
      role: "Старший брокер новостроек и закрытых стартов продаж",
      phone: "+7 (7252) 45-61-27",
      email: "erlan@msh.kz",
      telegram: "@erlan_broker",
      image: "assets/images/broker-4.jpg",
      bio: "Сопровождает прямые контракты с застройщиками первого эшелона в мкр. Туран и Нурсат. Открывает доступ к предстартовым ценам и эксклюзивным пентхаусам до официального релиза на рынке.",
      quote: "«Инвестиции на стадии котлована требуют строгого контроля надежности девелопера. Мы работаем только с застройщиками, подтвердившими надежность временем.»"
    },
    {
      id: 5,
      name: "Мадина Нургалиева",
      role: "Эксперт по юридическому аудиту и Off-Market активам",
      phone: "+7 (7252) 45-61-28",
      email: "madina@msh.kz",
      telegram: "@madina_legal",
      image: "assets/images/broker-5.jpg",
      bio: "Юрист международного права в сфере недвижимости. Обеспечивает 100% проверку истории собственности, отсутствие скрытых обременений и комфортное структурирование сделок.",
      quote: "«Безопасность сделки — наш главный стандарт. Клиент MSH подписывает договор только тогда, когда каждый юридический пункт проверен до мелочей.»"
    }
  ];

  const brokerAvatarCards = document.querySelectorAll('.broker-avatar-card');
  const profileBox = document.getElementById('active-broker-profile');
  const brokerImg = document.getElementById('broker-detail-img');
  const brokerName = document.getElementById('broker-detail-name');
  const brokerRole = document.getElementById('broker-detail-role');
  const brokerPhone = document.getElementById('broker-detail-phone');
  const brokerEmail = document.getElementById('broker-detail-email');
  const brokerTelegram = document.getElementById('broker-detail-tg');
  const brokerBio = document.getElementById('broker-detail-bio');
  const brokerQuote = document.getElementById('broker-detail-quote');

  function updateBrokerProfile(brokerId) {
    const data = brokersData.find(b => b.id === Number(brokerId));
    if (!data || !profileBox) return;

    profileBox.style.opacity = '0.3';
    setTimeout(() => {
      if (brokerImg) brokerImg.src = data.image;
      if (brokerImg) brokerImg.alt = `Портрет брокера ${data.name}`;
      if (brokerName) brokerName.textContent = data.name;
      if (brokerRole) brokerRole.textContent = data.role;
      if (brokerPhone) {
        brokerPhone.textContent = data.phone;
        brokerPhone.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;
      }
      if (brokerEmail) {
        brokerEmail.textContent = data.email;
        brokerEmail.href = `mailto:${data.email}`;
      }
      if (brokerTelegram) {
        brokerTelegram.textContent = data.telegram;
        brokerTelegram.href = `https://t.me/${data.telegram.replace('@', '')}`;
      }
      if (brokerBio) brokerBio.textContent = data.bio;
      if (brokerQuote) brokerQuote.textContent = data.quote;

      profileBox.style.opacity = '1';
    }, 150);
  }

  brokerAvatarCards.forEach(card => {
    card.addEventListener('click', () => {
      brokerAvatarCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const brokerId = card.getAttribute('data-broker-id');
      updateBrokerProfile(brokerId);
    });
  });

  // Broker Strip Horizontal Scroll
  const brokerStrip = document.querySelector('.broker-strip');
  document.getElementById('broker-prev')?.addEventListener('click', () => {
    brokerStrip?.scrollBy({ left: -240, behavior: 'smooth' });
  });
  document.getElementById('broker-next')?.addEventListener('click', () => {
    brokerStrip?.scrollBy({ left: 240, behavior: 'smooth' });
  });

  // 6. Properties Carousel Navigation
  const propertiesContainer = document.querySelector('.properties-grid');
  document.getElementById('prop-prev')?.addEventListener('click', () => {
    propertiesContainer?.scrollBy({ left: -320, behavior: 'smooth' });
  });
  document.getElementById('prop-next')?.addEventListener('click', () => {
    propertiesContainer?.scrollBy({ left: 320, behavior: 'smooth' });
  });

  // 7. Booking / Consultation Modal
  const modal = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openConsultationModal = function(topic = 'Консультация с брокером') {
    if (!modal) return;
    const modalTitle = document.getElementById('modal-topic-title');
    if (modalTitle) modalTitle.textContent = topic;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeConsultationModal = function() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeConsultationModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeConsultationModal();
  });

  document.getElementById('consultation-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Ваш запрос принят. Персональный брокер свяжется с вами в течение 10 минут.');
    closeConsultationModal();
  });

  // 8. Coldwell Banker Hero Search Widget
  const searchTabs = document.querySelectorAll('.hero-search-tab');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const action = tab.dataset.tab;
      if (action === 'estimate') {
        const valSection = document.getElementById('valuation');
        valSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'offmarket') {
        openConsultationModal('Доступ в закрытую коллекцию Off-Market активов');
      }
    });
  });

  window.handleHeroSearch = function() {
    const query = document.getElementById('hero-search-input')?.value.trim().toLowerCase();
    if (!query) return;
    const propSection = document.getElementById('properties');
    propSection?.scrollIntoView({ behavior: 'smooth' });

    // Filter property cards
    document.querySelectorAll('.property-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'block';
        card.style.borderColor = 'var(--navy-900)';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 9. City Homes Districts Carousel Navigation
  const districtsStrip = document.getElementById('districts-strip');
  document.getElementById('district-prev')?.addEventListener('click', () => {
    districtsStrip?.scrollBy({ left: -310, behavior: 'smooth' });
  });
  document.getElementById('district-next')?.addEventListener('click', () => {
    districtsStrip?.scrollBy({ left: 310, behavior: 'smooth' });
  });

  window.filterByDistrict = function(districtName) {
    const propSection = document.getElementById('properties');
    propSection?.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.property-card').forEach(card => {
      const locationText = card.querySelector('.property-location')?.textContent || '';
      if (locationText.toLowerCase().includes(districtName.toLowerCase())) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 10. Coldwell Banker + City Homes Live Valuation Calculator
  function formatKZT(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
  }

  window.calculateValuation = function() {
    const districtSelect = document.getElementById('calc-district');
    const typeSelect = document.getElementById('calc-type');
    const areaInput = document.getElementById('calc-area');

    if (!districtSelect || !typeSelect || !areaInput) return;

    const baseRate = Number(districtSelect.selectedOptions[0]?.dataset.rate || 480000);
    const area = Number(areaInput.value || 95);

    let typeMultiplier = 1.0;
    if (typeSelect.value === 'house') typeMultiplier = 1.15;
    if (typeSelect.value === 'townhouse') typeMultiplier = 1.08;

    const totalEstimate = Math.round(baseRate * area * typeMultiplier);
    const outputPrice = document.getElementById('calc-output-price');
    const pillPrice = document.getElementById('pill-live-price');

    if (outputPrice) outputPrice.textContent = formatKZT(totalEstimate);
    if (pillPrice) pillPrice.textContent = formatKZT(totalEstimate);
  };

  window.updateAreaAndValuation = function(val) {
    const areaValDisplay = document.getElementById('calc-area-value');
    if (areaValDisplay) areaValDisplay.textContent = `${val} м²`;
    calculateValuation();
  };

  window.requestDetailedValuation = function() {
    const districtText = document.getElementById('calc-district')?.selectedOptions[0]?.text || '';
    const area = document.getElementById('calc-area')?.value || '95';
    openConsultationModal(`Официальная оценка: ${districtText}, ${area} м²`);
  };

  // Initial calculation
  calculateValuation();

  console.log('MSH Real Estate app initialized with Coldwell Banker, Alpha, and City Homes architectural components.');
});
