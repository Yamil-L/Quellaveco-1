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
        btn.addEventListener('click', function () {
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

function initializeMenu() {
    // Esperar a que el menú dinámico se cargue completamente
    setTimeout(() => {
        // Seleccionar elementos dentro del menú cargado dinámicamente
        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("toggle-btn");
        const dropdownBtns = document.querySelectorAll(".dropdown-btn");

        // Verificar que los elementos existen antes de asignar eventos
        if (!sidebar || !toggleBtn || dropdownBtns.length === 0) {
            console.error("No se encontraron elementos del menú. Verifica el HTML.");
            return;
        }

        // Asignar evento para el botón de toggle del sidebar
        toggleBtn.addEventListener("click", function () {
            toggleSidebar(sidebar);
        });

        // Asignar eventos a los botones de submenú
        dropdownBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                handleSubmenuToggle(this, sidebar);
            });
        });

        console.log("Eventos del menú asignados correctamente.");
    }, 100); // Esperar 100ms para asegurar que el HTML esté cargado
}

// Función para abrir/cerrar el sidebar
function toggleSidebar(sidebar) {
    sidebar.classList.toggle("close");

    // Cerrar todos los submenús cuando se cierra el sidebar
    if (sidebar.classList.contains("close")) {
        closeAllSubmenus();
    }
}

// Función para manejar el clic en un botón de submenú
function handleSubmenuToggle(button, sidebar) {
    // Si el sidebar está cerrado, abrirlo primero
    if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
    }

    // Obtener el submenú asociado al botón
    const submenu = button.nextElementSibling;

    // Si no hay submenú (es un enlace final), simplemente retornar
    if (!submenu || !submenu.classList.contains("sub-menu")) {
        return;
    }

    // Alternar visibilidad del submenú actual
    submenu.classList.toggle("show");
    button.classList.toggle("active");
}

// Función para cerrar todos los submenús
function closeAllSubmenus() {
    const openMenus = document.querySelectorAll(".sub-menu.show");
    const activeButtons = document.querySelectorAll(".dropdown-btn.active");

    openMenus.forEach(menu => menu.classList.remove("show"));
    activeButtons.forEach(btn => btn.classList.remove("active"));
}

// Cargar el menú dinámicamente y volver a asignar los eventos
document.addEventListener("DOMContentLoaded", function () {
    fetch("menu.html") 
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;
            initializeMenu(); // Reasignar eventos

            const sidebar = document.getElementById("sidebar");
            if (sidebar) {
                sidebar.style.maxHeight = "100vh"; 
                sidebar.style.overflowY = "auto"; // Reforzar el scroll
            }
        })
        .catch(error => console.error("Error al cargar el menú:", error));
});

