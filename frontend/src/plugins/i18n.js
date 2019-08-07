import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    'en': {
        btnNew: 'New',
        btnApply: 'Apply',
        filterBy: 'Filter by',
        mainMenu: [
            'Assets',
            'Users',
            'Tickets',
            'Consumables',
            'Contracts',
            'Configurations',
            'Scheduled Tasks',
            'Documents',
            'Reports'
        ],
        assetMainHeaders: [
            'Control Number',
            'Category',
            'Kind',
            'Brand',
            'Model',
            'User',
            'Area',
            'Status',
            'Actions'
        ],
        assetFilters: [
            'Everything',
            'Area',
            'Category',
            'Status',
            'Brand',
            'Kind',
            'User'
        ],
        userMainHeaders: [
            'Name',
            'Username',
            'Profile',
            'Actions'
        ],
        ticketMainHeaders: [
            'Priority',
            'Number',
            'Type',
            'Status',
            'User',
            'Agent',
            'Description',
            'Actions'
        ],
        consumableMainHeaders: [
            'Kind',
            'Brand',
            'Model',
            'Quantity',
            'Comments',
            'Actions'
        ],
        contractMainHeaders: [
            'Name',
            'Expiration',
            'Cost',
            'Actions'
        ]
    },
    'es': {
        btnNew: 'Nuevo',
        btnApply: 'Aplicar',
        filterBy: 'Filtrar Por',
        mainMenu: [
            'Activos',
            'Usuarios',
            'Tickets',
            'Consumibles',
            'Contratos',
            'Configuraciones',
            'Tareas Programadas',
            'Documentos',
            'Reportes'
        ],
        assetMainHeaders: [
            'Numero de control',
            'Categoria',
            'Tipo',
            'Marca',
            'Modelo',
            'Usuario',
            'Área',
            'Status',
            'Acciones'
        ],
        assetFilters: [
            'Todo',
            'Área',
            'Categoria',
            'Estado',
            'Marca',
            'Tipo',
            'Usuario'
        ],
        userMainHeaders: [
            'Nombre',
            'Usuario',
            'Tipo',
            'Acciones'
        ],
        ticketMainHeaders: [
            'Prioridad',
            'Folio',
            'Tipo',
            'Estado',
            'Usuario',
            'Agente',
            'Descripción',
            'Acciones'
        ],
        consumableMainHeaders: [
            'Tipo',
            'Marca',
            'Modelo',
            'Cantidad',
            'Observaciones',
            'Acciones'
        ],
        contractMainHeaders: [
            'Nombre',
            'Renovación',
            'Costo',
            'Acciones'
        ]
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n
