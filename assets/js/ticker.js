$(document).ready(function () {

    let visitorCount = localStorage.getItem('carbreezy_visitors') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('carbreezy_visitors', visitorCount);
    
    animateCounter('#visitorCount', visitorCount);

    updateTicker();
    setInterval(updateTicker, 1000);

});

function updateTicker() {
    const now = new Date();
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const date = now.toLocaleDateString('en-PK', dateOptions);
    const time = now.toLocaleTimeString('en-PK');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                
                $('#tickerText').html(
                    `<i class="fas fa-map-marker-alt"></i> Location: ${lat}, ${lon} ` +
                    `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
                    `<i class="fas fa-calendar-alt"></i> ${date} ` +
                    `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
                    `<i class="fas fa-clock"></i> ${time} ` +
                    `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
                    `<i class="fas fa-car"></i> Welcome to CarBreezy Pakistan 🇵🇰`
                );
            },
            function (error) {
                showDefaultTicker(date, time);
            }
        );
    } else {
        showDefaultTicker(date, time);
    }
}

function showDefaultTicker(date, time) {
    $('#tickerText').html(
        `<i class="fas fa-map-marker-alt"></i> Pakistan ` +
        `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
        `<i class="fas fa-calendar-alt"></i> ${date} ` +
        `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
        `<i class="fas fa-clock"></i> ${time} ` +
        `&nbsp;&nbsp;|&nbsp;&nbsp; ` +
        `<i class="fas fa-car"></i> Welcome to CarBreezy Pakistan 🇵🇰`
    );
}

function animateCounter(selector, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);
    
    const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        $(selector).text(current.toLocaleString('en-PK'));
    }, 30);
}