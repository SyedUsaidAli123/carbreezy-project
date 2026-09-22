// ============================================
// MAIN FUNCTIONALITY
// ============================================

$(document).ready(function () {
    
    // ===== Smooth Scroll Navigation =====
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
    
    // ===== Active Nav Link on Scroll =====
    $(window).on('scroll', function () {
        const scrollPos = $(this).scrollTop() + 150;
        
        $('section').each(function () {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                $('.main-navbar .nav-link').removeClass('active');
                $(`.main-navbar .nav-link[href="#${id}"]`).addClass('active');
            }
        });
    });
    
    // ===== Navbar Sticky Shadow =====
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#mainNav').addClass('shadow');
        } else {
            $('#mainNav').removeClass('shadow');
        }
    });
    
    // ===== Contact Form Submit =====
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        alert('Shukriya! Aapka message bhej diya gaya hai. Hum jald contact karenge.');
        this.reset();
    });
    
    // ===== Newsletter Form =====
    $('.newsletter-form').on('submit', function (e) {
        e.preventDefault();
        alert('Shukriya! Aap newsletter ke liye subscribe ho gaye.');
        this.reset();
    });
});
// Query Form Submit
$('#queryForm').on('submit', function (e) {
    e.preventDefault();
    alert('Shukriya! Aapka query bhej diya gaya hai. Hum 24 hours me reply karenge.');
    this.reset();
});