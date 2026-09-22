let allCars = [];
let allBrands = [];
let allOffers = [];
let allGallery = [];
let allTeam = [];

function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
}

$(document).ready(function () {
    const basePath = getBasePath();
    const jsonPath = basePath + 'assets/data/cars.json';
    
    $.getJSON(jsonPath, function (data) {
        
        allCars = data.cars || [];
        allBrands = data.brands || [];
        allOffers = data.offers || [];
        allGallery = data.gallery || [];
        allTeam = data.team || [];
        
        if ($('#featuredCarsContainer').length) {
            renderFeaturedCars('featuredCarsContainer');
        }
        
        if ($('#newCarsContainer').length) {
            renderCars('new', 'newCarsContainer');
        }
        
        if ($('#usedCarsContainer').length) {
            renderCars('used', 'usedCarsContainer');
        }
        
        if ($('#brandsContainer').length) {
            renderBrands();
        }
        
        if ($('#offersContainer').length) {
            renderOffers();
        }
        
        if ($('#galleryContainer').length) {
            renderGallery();
        }
        
        if ($('#teamContainer').length) {
            renderTeam();
        }
        
    }).fail(function () {
        console.error('cars.json load nahi ho raha. Path check karo:', jsonPath);
        
        const containers = ['#newCarsContainer', '#usedCarsContainer', '#featuredCarsContainer', 
                           '#brandsContainer', '#offersContainer', '#galleryContainer', '#teamContainer'];
        containers.forEach(id => {
            if ($(id).length) {
                $(id).html(`
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle"></i> 
                            Data load nahi hua. JSON file check karo: <code>assets/data/cars.json</code>
                        </div>
                    </div>
                `);
            }
        });
    });
});

function getFallbackImage(text, width = 400, height = 250) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FF8C00" />
                    <stop offset="100%" style="stop-color:#FF6B00" />
                </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#grad)"/>
            <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="${Math.floor(width/15)}" 
                  font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
                ${text}
            </text>
            <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="${Math.floor(width/25)}" 
                  fill="#ffffff" text-anchor="middle" dominant-baseline="middle" opacity="0.8">
                🚗 CarBreezy
            </text>
        </svg>
    `;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function getImagePath(imagePath) {
    if (!imagePath) return '';
    
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
        return imagePath;
    }
    
    const basePath = getBasePath();
    
    if (imagePath.startsWith('assets/')) {
        return basePath + imagePath;
    }
    
    return imagePath;
}

function renderCars(category, containerId) {
    const container = $('#' + containerId);
    
    if (!container.length) return;
    
    const cars = allCars.filter(car => car.category === category);
    
    if (cars.length === 0) {
        container.html('<div class="col-12 text-center text-muted py-5">No cars found</div>');
        return;
    }
    
    let html = '';
    
    cars.forEach(car => {
        const fallbackImg = getFallbackImage(car.name, 400, 250);
        const imagePath = getImagePath(car.image);
        
        html += `
            <div class="col-lg-4 col-md-6 car-item" 
                 data-id="${car.id}"
                 data-type="${car.type}" 
                 data-category="${car.category}" 
                 data-brand="${car.brand}"
                 data-price="${parseInt(car.price.replace(/,/g, ''))}"
                 data-name="${car.name}">
                <div class="car-card" onclick="openCarModal(${car.id})">
                    <div class="car-card-img">
                        <img src="${imagePath}" alt="${car.name}" 
                             onerror="this.onerror=null; this.src='${fallbackImg}'">
                        <span class="car-badge ${car.category}">${car.category.toUpperCase()}</span>
                        <span class="car-category-badge">${car.type.toUpperCase()}</span>
                    </div>
                    <div class="car-card-body">
                        <h5 class="car-card-title">${car.name}</h5>
                        <div class="car-card-brand">
                            <i class="fas fa-trademark"></i> ${car.brand}
                        </div>
                        <div class="car-card-price">
                            ₨ ${car.price} <small>PKR</small>
                        </div>
                        <div class="car-card-features">
                            <span><i class="fas fa-users"></i> ${car.features.seats} Seats</span>
                            <span><i class="fas fa-gas-pump"></i> ${car.features.mileage}</span>
                        </div>
                        <button class="car-card-btn">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
    
    if (typeof updateResultsCount === 'function') {
        updateResultsCount();
    }
}

function renderFeaturedCars(containerId) {
    const container = $('#' + containerId);
    
    if (!container.length) return;
    
    const featured = allCars.slice(0, 6);
    
    let html = '';
    
    featured.forEach(car => {
        const fallbackImg = getFallbackImage(car.name, 400, 250);
        const imagePath = getImagePath(car.image);
        
        html += `
            <div class="col-lg-4 col-md-6">
                <div class="car-card" onclick="openCarModal(${car.id})">
                    <div class="car-card-img">
                        <img src="${imagePath}" alt="${car.name}" 
                             onerror="this.onerror=null; this.src='${fallbackImg}'">
                        <span class="car-badge ${car.category}">${car.category.toUpperCase()}</span>
                        <span class="car-category-badge">${car.type.toUpperCase()}</span>
                    </div>
                    <div class="car-card-body">
                        <h5 class="car-card-title">${car.name}</h5>
                        <div class="car-card-brand">
                            <i class="fas fa-trademark"></i> ${car.brand}
                        </div>
                        <div class="car-card-price">
                            ₨ ${car.price} <small>PKR</small>
                        </div>
                        <div class="car-card-features">
                            <span><i class="fas fa-users"></i> ${car.features.seats} Seats</span>
                            <span><i class="fas fa-gas-pump"></i> ${car.features.mileage}</span>
                        </div>
                        <button class="car-card-btn">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

function renderBrands() {
    const container = $('#brandsContainer');
    
    if (!container.length) return;
    
    let html = '';
    
    allBrands.forEach(brand => {
        const fallbackImg = getFallbackImage(brand.name, 100, 60);
        const logoPath = getImagePath(brand.logo);
        
        const totalCount = allCars.filter(car => car.brand === brand.name).length;
        
        const newCount = allCars.filter(car => 
            car.brand === brand.name && car.category === 'new'
        ).length;
        
        const usedCount = allCars.filter(car => 
            car.brand === brand.name && car.category === 'used'
        ).length;
        
        html += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="brand-card" onclick="goToBrandCars('${brand.name}')">
                    <img src="${logoPath}" alt="${brand.name}" 
                         onerror="this.onerror=null; this.src='${fallbackImg}'">
                    <h5>${brand.name}</h5>
                    <p class="brand-total">${totalCount} ${totalCount === 1 ? 'Car' : 'Cars'}</p>
                    <div class="brand-breakdown">
                        <span class="new-count">
                            <i class="fas fa-plus-circle"></i> ${newCount} New
                        </span>
                        <span class="divider">|</span>
                        <span class="used-count">
                            <i class="fas fa-history"></i> ${usedCount} Used
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

function renderOffers() {
    const container = $('#offersContainer');
    
    if (!container.length) return;
    
    let html = '';
    
    allOffers.forEach(offer => {
        const fallbackImg = getFallbackImage(offer.title, 400, 200);
        const imagePath = getImagePath(offer.image);
        
        html += `
            <div class="col-lg-4 col-md-6">
                <div class="offer-card">
                    <img src="${imagePath}" alt="${offer.title}" 
                         onerror="this.onerror=null; this.src='${fallbackImg}'">
                    <div class="offer-card-body">
                        <span class="offer-tag">${offer.tag}</span>
                        <h4>${offer.title}</h4>
                        <p>${offer.description}</p>
                        <div class="offer-validity">
                            <i class="fas fa-clock"></i> Valid till: ${offer.validTill}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

function renderGallery() {
    const container = $('#galleryContainer');
    
    if (!container.length) return;
    
    let html = '';
    
    allGallery.forEach(item => {
        const fallbackImg = getFallbackImage(item.title, 400, 300);
        const imagePath = getImagePath(item.image);
        const category = item.category || 'luxury';
        
        html += `
            <div class="gallery-page-item" data-category="${category}">
                <img src="${imagePath}" alt="${item.title}" 
                     onerror="this.onerror=null; this.src='${fallbackImg}'">
                <div class="gallery-page-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
                <div class="gallery-page-overlay">
                    <span class="gallery-page-category">${category}</span>
                    <h5 class="gallery-page-title">${item.title}</h5>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

function renderTeam() {
    const container = $('#teamContainer');
    
    if (!container.length) return;
    
    const teamMembers = allTeam.length > 0 ? allTeam : [
        { name: "Ahmed Khan", role: "Founder & CEO", icon: "fa-user-tie" },
        { name: "Sara Ali", role: "Head of Operations", icon: "fa-user" },
        { name: "Bilal Ahmed", role: "Sales Manager", icon: "fa-user-tie" },
        { name: "Fatima Khan", role: "Customer Support", icon: "fa-user" }
    ];
    
    let html = '';
    
    teamMembers.forEach(member => {
        html += `
            <div class="col-lg-3 col-md-6">
                <div class="team-card">
                    <div class="team-card-img">
                        <i class="fas ${member.icon || 'fa-user'}"></i>
                    </div>
                    <div class="team-card-body">
                        <h5>${member.name}</h5>
                        <p>${member.role}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.html(html);
}

$(document).ready(function () {
    $(document).on('change', '#sortCars', function () {
        const sortValue = $(this).val();
        sortCars(sortValue);
    });
});

function sortCars(sortValue) {
    const container = $('.car-item').first().parent();
    
    if (!container.length) return;
    
    const carItems = $('.car-item').toArray();
    
    carItems.sort(function (a, b) {
        const $a = $(a);
        const $b = $(b);
        
        const priceA = parseInt($a.data('price')) || 0;
        const priceB = parseInt($b.data('price')) || 0;
        
        const nameA = ($a.data('name') || '').toString().toLowerCase();
        const nameB = ($b.data('name') || '').toString().toLowerCase();
        
        const idA = parseInt($a.data('id')) || 0;
        const idB = parseInt($b.data('id')) || 0;
        
        switch (sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
            case 'default':
            default:
                return idA - idB;
        }
    });
    
    container.empty();
    carItems.forEach(function (item) {
        container.append(item);
    });
    
    if (typeof updateResultsCount === 'function') {
        updateResultsCount();
    }
}

function updateResultsCount() {
    const countEl = $('#resultsCount');
    if (countEl.length) {
        countEl.text($('.car-item:visible').length);
    }
}

function goToBrandCars(brandName) {
    if (!window.location.pathname.includes('/pages/')) {
        window.location.href = 'pages/new-cars.html?brand=' + encodeURIComponent(brandName);
    } else {
        if ($('#newCarsContainer').length) {
            filterCarsByBrand(brandName);
        } else {
            window.location.href = 'new-cars.html?brand=' + encodeURIComponent(brandName);
        }
    }
}

function filterCarsByBrand(brandName) {
    $('.car-item').each(function () {
        const carBrand = $(this).data('brand');
        if (carBrand === brandName) {
            $(this).fadeIn(400);
        } else {
            $(this).fadeOut(400);
        }
    });
    updateResultsCount();
}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const brandFilter = urlParams.get('brand');
    
    if (brandFilter) {
        setTimeout(function () {
            filterCarsByBrand(brandFilter);
        }, 500);
    }
});

function filterByBrand(brandName) {
    goToBrandCars(brandName);
}