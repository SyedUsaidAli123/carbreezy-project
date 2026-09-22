// ============================================
// FILTER SYSTEM
// ============================================

$(document).ready(function () {
    
    // ===== Type Filter (Hatchback, Sedan, SUV, etc.) =====
    $('.filter-btn[data-filter]').on('click', function () {
        $('.filter-btn[data-filter]').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.car-item').fadeIn(400);
        } else {
            $('.car-item').each(function () {
                if ($(this).data('type') === filter) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(400);
                }
            });
        }
    });
    
    // ===== Category Filter (New, Used) =====
    $('.filter-btn[data-category]').on('click', function () {
        $('.filter-btn[data-category]').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('category');
        
        if (category === 'all') {
            $('.car-item').fadeIn(400);
        } else {
            $('.car-item').each(function () {
                if ($(this).data('category') === category) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(400);
                }
            });
        }
    });
    
    // ===== Reset Filters =====
    $('.filter-reset').on('click', function () {
        $('.filter-btn').removeClass('active');
        $('.filter-btn[data-filter="all"]').addClass('active');
        $('.filter-btn[data-category="all"]').addClass('active');
        $('.car-item').fadeIn(400);
    });
});
// Sitemap Filter Links
$('[data-sitemap-filter]').on('click', function (e) {
    e.preventDefault();
    const filterType = $(this).data('sitemap-filter');
    
    // Filter button activate karo
    $('.filter-btn[data-filter]').removeClass('active');
    $(`.filter-btn[data-filter="${filterType}"]`).addClass('active');
    
    // Filter apply karo
    $('.car-item').each(function () {
        if ($(this).data('type') === filterType) {
            $(this).fadeIn(400);
        } else {
            $(this).fadeOut(400);
        }
    });
    
    // Scroll to new cars
    $('html, body').animate({
        scrollTop: $('#new').offset().top - 100
    }, 800);
});