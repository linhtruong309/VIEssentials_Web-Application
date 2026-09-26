// 1. IMAGE TOGGLE LOGIC (FROM YOUR ORIGINAL CODE)
const myImage = document.querySelector('#hero-img');

if (myImage) {
  myImage.addEventListener('click', () => {
    const mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/Vietnam Nature.jpeg') {
      myImage.setAttribute('src', 'images/Vietnam Culture.jpeg');
    } else {
      myImage.setAttribute('src', 'images/Vietnam Nature.jpeg');
    }
  });
}

// 2. USERNAME & LOCALSTORAGE LOGIC (FROM YOUR ORIGINAL CODE)
const myButton = document.querySelector('#user-btn');
const myHeading = document.querySelector('#welcome-heading');

function setUserName() {
  const myName = prompt('Please enter your name.');
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = `Welcome to Vietnam, ${myName}`;
  }
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.textContent = `Welcome to Vietnam, ${storedName}`;
}

if (myButton) {
  myButton.addEventListener('click', () => {
    setUserName();
  });
}

// 3. ESSENTIALS DATABASE FOR TOURISTS
const essentialsData = [
  {
    title: "🚑 Ambulance / Emergency Medical",
    category: "emergency",
    description: "National emergency medical service hotline.",
    phone: "115",
    tags: ["medical", "hospital", "doctor", "ambulance", "emergency"]
  },
  {
    title: "👮 Police / Emergency Assistance",
    category: "emergency",
    description: "National police assistance for crime or emergency reporting.",
    phone: "113",
    tags: ["police", "crime", "help", "emergency"]
  },
  {
    title: "📱 Viettel / Vinaphone SIM Cards",
    category: "sim",
    description: "Best 4G/5G coverage in Vietnam. Buy at airports or official stores with your passport.",
    tags: ["sim", "internet", "4g", "5g", "data", "wifi", "eSIM"]
  },
  {
    title: "🚕 Grab & Xanh SM Ride-Hailing",
    category: "transport",
    description: "Download Grab or Xanh SM apps for fair-rate taxis and bike rides (avoids scams).",
    tags: ["taxi", "cab", "grab", "xanh sm", "ride", "transport"]
  },
  {
    title: "🏧 Cash & ATMs",
    category: "money",
    description: "VND is the local currency. ATMs from Vietcombank, BIDV, and TPBank accept international cards.",
    tags: ["atm", "cash", "money", "exchange", "card", "currency"]
  },
  {
    title: "🏥 International Hospitals",
    category: "medical",
    description: "FV Hospital (HCMC), Vinmec (Nationwide), Raffles Medical (Hanoi/HCMC) have English-speaking staff.",
    tags: ["hospital", "doctor", "clinic", "pharmacy", "medicine"]
  },
  {
    title: "🔌 Power Plugs & Voltage",
    category: "general",
    description: "Vietnam uses Type A, C, and F plugs at 220V / 50Hz.",
    tags: ["plug", "power", "electricity", "adapter", "charger", "voltage"]
  },
  {
    title: "🏛️ Tourist Helpline",
    category: "emergency",
    description: "Vietnam National Authority of Tourism Help Center.",
    phone: "1800556896",
    tags: ["tourist", "help", "information", "support"]
  }
];

// 4. RENDER AND SEARCH LOGIC
const resultsContainer = document.querySelector('#results-container');
const searchInput = document.querySelector('#search-input');
const filterButtons = document.querySelectorAll('#filter-tags .tag');

let currentCategory = 'all';

function renderCards(filterText = '') {
  if (!resultsContainer) return;
  
  const query = filterText.toLowerCase().trim();
  resultsContainer.innerHTML = '';

  const filteredData = essentialsData.filter(item => {
    const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
    const matchesSearch = query === '' || 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (filteredData.length === 0) {
    resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">No results found for "${filterText}". Try searching for 'hospital', 'SIM', or 'ATM'.</p>`;
    return;
  }

  filteredData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      ${item.phone ? `<a href="tel:${item.phone}" class="phone-link">📞 Call ${item.phone}</a>` : ''}
    `;
    resultsContainer.appendChild(card);
  });
}

// Initial Render
renderCards();

// Event Listeners for Search
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    renderCards(e.target.value);
  });
}

// Event Listeners for Category Filters
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    renderCards(searchInput ? searchInput.value : '');
  });
});

// 5. CURRENCY CONVERTER LOGIC
const foreignAmountInput = document.querySelector('#foreign-amount');
const foreignCurrencySelect = document.querySelector('#foreign-currency');
const vndResultDiv = document.querySelector('#vnd-result');

function updateCurrency() {
  if (!foreignAmountInput || !foreignCurrencySelect || !vndResultDiv) return;
  
  const amount = parseFloat(foreignAmountInput.value) || 0;
  const selectedOption = foreignCurrencySelect.options[foreignCurrencySelect.selectedIndex];
  const rate = parseFloat(selectedOption.getAttribute('data-rate'));
  
  const vndTotal = amount * rate;
  vndResultDiv.textContent = `${vndTotal.toLocaleString('en-US')} VND`;
}

if (foreignAmountInput && foreignCurrencySelect) {
  foreignAmountInput.addEventListener('input', updateCurrency);
  foreignCurrencySelect.addEventListener('change', updateCurrency);
}

// 6. TEXT-TO-SPEECH FOR PHRASEBOOK
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, text-to-speech is not supported in your browser.');
  }
}