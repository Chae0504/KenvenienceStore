// --- Mock Data ---
const initialPromos = [
    { id: 1, name: "코카콜라 500ml", category: "Beverage", price: "2,200원", promo: "1+1", image: "🥤" },
    { id: 2, name: "프링글스 어니언", category: "Snack", price: "3,500원", promo: "2+1", image: "🍟" },
    { id: 3, name: "참치마요 삼각김밥", category: "Instant Meal", price: "1,200원", promo: "2+1", image: "🍙" },
    { id: 4, name: "빙그레 바나나우유", category: "Beverage", price: "1,700원", promo: "1+1", image: "🥛" },
    { id: 5, name: "빼빼로 초코", category: "Snack", price: "1,500원", promo: "2+1", image: "🍫" },
    { id: 6, name: "신라면 소컵", category: "Instant Meal", price: "1,100원", promo: "2+1", image: "🍜" },
];

const initialDeals = [
    { id: 101, item: "코카콜라 500ml", type: "1+1", location: "기숙사 A동 로비", joined: 1, total: 2, status: "Active" },
    { id: 102, item: "프링글스 어니언", type: "2+1", location: "편의점 입구", joined: 2, total: 3, status: "Active" },
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
const promoSearch = document.getElementById('promo-search');

// Modal Elements
const modal = document.getElementById('deal-modal');
const openModalBtn = document.getElementById('open-deal-modal');
const closeModalBtn = document.querySelector('.close-modal');

// --- Functions ---

function renderPromos(filter = 'all', searchTerm = '') {
    promoGrid.innerHTML = '';
    let filtered = filter === 'all' ? promos : promos.filter(p => p.category === filter);
    
    if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filtered.length === 0) {
        promoGrid.innerHTML = '<p style="padding: 20px; color: #999">해당하는 상품이 없습니다.</p>';
        return;
    }
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-img-placeholder">
                <span style="font-size: 3rem">${item.image}</span>
                <span class="promo-tag">${item.promo}</span>
            </div>
            <div class="item-info">
                <span class="item-category">${getCategoryName(item.category)}</span>
                <h3>${item.name}</h3>
                <p class="item-price">${item.price}</p>
            </div>
        `;
        promoGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const names = {
        'Beverage': '음료',
        'Snack': '과자류',
        'Instant Meal': '간편식',
        'Other': '기타'
    };
    return names[cat] || cat;
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
                    ${isFull ? '모집완료' : '모집중'}
                </span>
                <span class="deal-count">${deal.joined}/${deal.total} 명 참여</span>
            </div>
            <div class="deal-info">
                <h3>${deal.item}</h3>
                <div class="deal-meta">
                    <span>📍 ${deal.location}</span><br>
                    <span>🏷️ ${deal.type} 행사</span>
                </div>
            </div>
            <button class="btn btn-primary btn-block join-btn" 
                data-id="${deal.id}" 
                ${isFull ? 'disabled' : ''}>
                ${isFull ? '마감됨' : '참여하기'}
            </button>
        `;
        splitDealGrid.appendChild(card);
    });

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
        requestList.innerHTML = '<p style="color: #999">아직 요청이 없습니다.</p>';
        return;
    }

    // 정렬: 좋아요 순 -> 최신 순
    const sortedRequests = [...requests].sort((a, b) => {
        if ((b.likes || 0) !== (a.likes || 0)) {
            return (b.likes || 0) - (a.likes || 0);
        }
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    sortedRequests.slice(0, 10).forEach(req => {
        const li = document.createElement('li');
        li.className = 'request-item';
        li.innerHTML = `
            <h4>${req.name}</h4>
            <p class="meta">${getCategoryName(req.category)} | ${req.reason}</p>
            <div class="request-footer">
                <button class="like-btn" data-id="${req.id}">
                    ❤️ 추천 <span class="like-count">${req.likes || 0}</span>
                </button>
            </div>
        `;
        requestList.appendChild(li);
    });

    // 좋아요 버튼 이벤트
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.like-btn').dataset.id;
            addLike(id);
        });
    });
}

function addLike(id) {
    const req = requests.find(r => r.id === id);
    if (req) {
        req.likes = (req.likes || 0) + 1;
        saveAndRender();
    }
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

// 검색 기능
promoSearch.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderPromos(activeFilter, e.target.value);
});

// 필터링
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPromos(btn.dataset.filter, promoSearch.value);
    });
});

// 발주 요청 폼
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRequest = {
        id: Date.now().toString(),
        name: document.getElementById('item-name').value,
        category: document.getElementById('item-category').value,
        reason: document.getElementById('request-reason').value,
        likes: 0,
        timestamp: new Date().toISOString()
    };
    requests.push(newRequest);
    orderForm.reset();
    saveAndRender();
    alert('발주 요청이 등록되었습니다!');
});

// Split-the-Deal 폼
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
