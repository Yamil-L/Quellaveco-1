// Sidebar
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close')

    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}

// Mostrar/Ocultar sub-menus
function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle('show');

    if (sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close')
    }
}