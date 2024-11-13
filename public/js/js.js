// Función para actualizar la hora y fecha
function updateDateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toLocaleDateString();
}

// Actualizar la hora y fecha inicialmente
updateDateTime();

// Actualizar la hora y fecha cada segundo
setInterval(updateDateTime, 1000);
