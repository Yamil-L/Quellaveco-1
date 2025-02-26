// Referencias a elementos del DOM
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

// Inicializar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSidebar);

function initSidebar() {
    // Configurar el evento de toggle del sidebar
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    // Configurar los eventos para todos los botones desplegables
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleSubmenuToggle(this);
        });
    });
}

// Función para abrir/cerrar el sidebar
function toggleSidebar() {
    sidebar.classList.toggle('close');
    
    // Cerrar todos los submenús cuando se cierra el sidebar
    if (sidebar.classList.contains('close')) {
        closeAllSubmenus();
    }
}

// Función para manejar el clic en un botón de submenú
function handleSubmenuToggle(button) {
    // Si el sidebar está cerrado, abrirlo primero
    if (sidebar.classList.contains('close')) {
        sidebar.classList.remove('close');
    }
    
    // Obtener el submenú asociado al botón
    const submenu = button.nextElementSibling;
    
    // Si no hay submenú (es un enlace final), simplemente retornar
    if (!submenu || !submenu.classList.contains('sub-menu')) {
        return;
    }
    
    // Obtener el nivel de profundidad
    const level = button.getAttribute('data-level');
    
    // Si el submenú se está abriendo, asegurarse de que su contenido tenga altura
    if (submenu.classList.contains('show')) {
        // Asegurarse de que los elementos dentro del submenú tengan altura suficiente
        // Esto es importante para la animación grid-template-rows
        const submenuContent = submenu.querySelector('div') || submenu;
        if (submenuContent) {
            submenuContent.style.height = 'auto';
        }
    }
    
    // Alternar visibilidad del submenú actual
    submenu.classList.toggle('show');
    button.classList.toggle('active');
}

// Función para cerrar todos los submenús
function closeAllSubmenus() {
    const openMenus = document.querySelectorAll('.sub-menu.show');
    const activeButtons = document.querySelectorAll('.dropdown-btn.active');
    
    openMenus.forEach(menu => menu.classList.remove('show'));
    activeButtons.forEach(btn => btn.classList.remove('active'));
}