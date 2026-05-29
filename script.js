// --- Mock Data ---
const initialPromos = [
    { id: 1, name: "Coca-Cola 500ml", category: "Beverage", price: "2,200원", promo: "1+1", image: "🥤" },
    { id: 2, name: "Pringles Onion", category: "Snack", price: "3,500원", promo: "2+1", image: "🍟" },
    { id: 3, name: "Samgak Gimbap", category: "Instant Meal", price: "1,200원", promo: "2+1", image: "🍙" },
    { id: 4, name: "Banana Milk", category: "Beverage", price: "1,700원", promo: "1+1", image: "🥛" },
    { id: 5, name: "Pepero Choco", category: "Snack", price: "1,500원", promo: "2+1", image: "🍫" },
    { id: 6, name: "Shin Ramyun Small", category: "Instant Meal", price: "1,100원", promo: "2+1", image: "🍜" },
];

const initialDeals = [
    { id: 101, item: "Coca-Cola 500ml", type: "1+1", location: "Dorm A Lobby", joined: 1, total: 2, status: "Active" },
    { id: 102, item: "Pringles Onion", type: "2+1", location: "Store Entrance", joined: 2, total: 3, status: "Active" },
];

// --- App State ---
let promos = [...initialPromos];
let deals = JSON.parse(localStorage.getItem('kenvenience_deals')) || [...initialDeals];
let requests = JSON.parse(localStorage.getItem('kenvenience_requests')) || [];

// --- Selectors ---
const promoGrid = document.getElementById('promo-grid');
const splitDealGrid = document.getElementById('split-deal-grid');
const requestList = document.getElementById('request-list');
const orderForm = document.getElementById('order-request-form');
const createDealForm = document.getElementById('create-deal-form');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal Elements
const modal = document.getElementById('deal-modal');
const openModalBtn = document.getElementById('open-deal-modal');
const closeModalBtn = document.querySelector('.close-modal');

// --- Functions ---

function renderPromos(filter = 'all') {
    promoGrid.innerHTML = '';
    const filtered = filter === 'all' ? promos : promos.filter(p => p.category === filter);
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-img-placeholder">
                <span style="font-size: 3rem">${item.image}</span>
                <span class="promo-tag">${item.promo}</span>
            </div>
            <div class="item-info">
                <span class="item-category">${item.category}</span>
                <h3>${item.name}</h3>
                <p class="item-price">${item.price}</p>
            </div>
        `;
        promoGrid.appendChild(card);
    });
}

function renderDeals() {
    splitDealGrid.innerHTML = '';
    deals.forEach(deal => {
        const isFull = deal.joined >= deal.total;
        const card = document.createElement('div');
        card.className = `deal-card ${isFull ? 'full' : ''}`;
        card.innerHTML = `
            <div class="deal-header">
                <span class="deal-status" style="color: ${isFull ? '#666' : 'var(--primary-green)'}">
                    ${isFull ? 'Completed' : 'Recruiting'}
                </span>
                <span class="deal-count">${deal.joined}/${deal.total} joined</span>
            </div>
            <div class="deal-info">
                <h3>${deal.item}</h3>
                <div class="deal-meta">
                    <span>📍 ${deal.location}</span><br>
                    <span>🏷️ ${deal.type} Promo</span>
                </div>
            </div>
            <button class="btn btn-primary btn-block join-btn" 
                data-id="${deal.id}" 
                ${isFull ? 'disabled' : ''}>
                ${isFull ? 'Closed' : 'Join Deal'}
            </button>
        `;
        splitDealGrid.appendChild(card);
    });

    // Add Join Event Listeners
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            joinDeal(id);
        });
    });
}

function renderRequests() {
    requestList.innerHTML = '';
    if (requests.length === 0) {
        requestList.innerHTML = '<p style="color: #999">No requests yet.</p>';
        return;
    }

    // Show last 5 requests
    requests.slice().reverse().slice(0, 5).forEach(req => {
        const li = document.createElement('li');
        li.className = 'request-item';
        li.innerHTML = `
            <h4>${req.name}</h4>
            <p class="meta">${req.category} | ${req.reason}</p>
        `;
        requestList.appendChild(li);
    });
}

function joinDeal(id) {
    const deal = deals.find(d => d.id === id);
    if (deal && deal.joined < deal.total) {
        deal.joined++;
        saveAndRender();
    }
}

function saveAndRender() {
    localStorage.setItem('kenvenience_deals', JSON.stringify(deals));
    localStorage.setItem('kenvenience_requests', JSON.stringify(requests));
    renderDeals();
    renderRequests();
}

// --- Event Handlers ---

// Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPromos(btn.dataset.filter);
    });
});

// Order Request Form
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRequest = {
        name: document.getElementById('item-name').value,
        category: document.getElementById('item-category').value,
        reason: document.getElementById('request-reason').value,
        timestamp: new Date().toISOString()
    };
    requests.push(newRequest);
    orderForm.reset();
    saveAndRender();
    alert('Request submitted! Thank you.');
});

// Create Deal Form
createDealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newDeal = {
        id: Date.now(),
        item: document.getElementById('deal-item').value,
        type: document.getElementById('deal-type').value,
        location: document.getElementById('deal-location').value,
        joined: 1,
        total: document.getElementById('deal-type').value === '1+1' ? 2 : 3,
        status: "Active"
    };
    deals.push(newDeal);
    createDealForm.reset();
    modal.style.display = "none";
    saveAndRender();
});

// Modal Logic
openModalBtn.onclick = () => modal.style.display = "block";
closeModalBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

// --- Initial Render ---
renderPromos();
renderDeals();
renderRequests();
