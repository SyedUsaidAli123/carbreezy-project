function openCarModal(carId) {
    
    
    const car = allCars.find(c => c.id === carId);
    
    if (!car) {
        console.error('Car not found:', carId);
        return;
    }
    

    $('#carModalTitle').text(car.name);
    

    const imagePath = typeof getImagePath === 'function' 
        ? getImagePath(car.image) 
        : car.image;

    const fallbackImg = typeof getFallbackImage === 'function' 
        ? getFallbackImage(car.name, 500, 350) 
        : '';
    

    $('#carModalImage')
        .attr('src', imagePath)
        .off('error')  
        .on('error', function() {
            this.onerror = null;
            if (fallbackImg) {
                this.src = fallbackImg;
            }
        });
    
    $('#carModalPrice').text('₨ ' + car.price);
    
    let internalHtml = '';
    if (car.internal) {
        for (const [key, value] of Object.entries(car.internal)) {
            internalHtml += `<li><strong>${capitalize(key)}</strong><span>${value}</span></li>`;
        }
    } else {
        internalHtml = '<li class="text-muted">No data available</li>';
    }
    $('#internalSpecs').html(internalHtml);
    
    let externalHtml = '';
    if (car.external) {
        for (const [key, value] of Object.entries(car.external)) {
            externalHtml += `<li><strong>${capitalize(key)}</strong><span>${value}</span></li>`;
        }
    } else {
        externalHtml = '<li class="text-muted">No data available</li>';
    }
    $('#externalSpecs').html(externalHtml);
    
    let engineHtml = '';
    if (car.engine) {
        for (const [key, value] of Object.entries(car.engine)) {
            engineHtml += `<li><strong>${capitalize(key)}</strong><span>${value}</span></li>`;
        }
    } else {
        engineHtml = '<li class="text-muted">No data available</li>';
    }
    $('#engineSpecs').html(engineHtml);
    
    let dimensionsHtml = '';
    if (car.dimensions) {
        for (const [key, value] of Object.entries(car.dimensions)) {
            dimensionsHtml += `<li><strong>${capitalize(key)}</strong><span>${value}</span></li>`;
        }
    } else {
        dimensionsHtml = '<li class="text-muted">No data available</li>';
    }
    $('#dimensionsSpecs').html(dimensionsHtml);
    
    $('#carTabs button').removeClass('active');
    $('#carTabs button:first').addClass('active');
    $('.tab-pane').removeClass('show active');
    $('#internal').addClass('show active');

    const modal = new bootstrap.Modal(document.getElementById('carModal'));
    modal.show();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}