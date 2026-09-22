$(document).ready(function () {
    
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    function animateCounter() {
        $('.counter').each(function () {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            
            if (!$this.hasClass('counted')) {
                const offset = $this.offset().top;
                const windowHeight = $(window).height();
                const scrollPos = $(window).scrollTop();
                
                if (scrollPos + windowHeight > offset + 100) {
                    $this.addClass('counted');
                    
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    
                    const timer = setInterval(function () {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        $this.text(current.toLocaleString('en-PK'));
                    }, 25);
                }
            }
        });
    }
    
    animateCounter();
    $(window).on('scroll', animateCounter);
});