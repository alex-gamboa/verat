import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    'en': {
        btnNew: 'New',
        btnApply: 'Apply',
        btnSave: 'Save',
        btnCancel: 'Cancel',
        btnClose: 'Close',
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
        assetControlNumber: 'Control Number',
        assetLogHeaders: [
            'Date',
            'User',
            'Asset',
            'Event',
            'Document',
            'New value',
            'Reason'
        ],
        category: 'Category',
        kind: 'Kind',
        brand: 'Brand',
        model: 'Model',
        serialNumber: 'Serial Number',
        comments: 'Comments',
        user: 'User',
        userTypes: [
            'Support',
            'User',
            'Data'
        ],
        status: 'Status',
        area: 'Area',
        barcode: 'Barcode',
        quantity: 'Quantity',
        reason: 'Reason',
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
        ],
        configurationMainHeaders: [
            'Name',
            'Description',
            'Access',
            'Actions'
        ],
        scheduledTaskMainHeaders: [
            'Name',
            'Description',
            'Frequency',
            'Day',
            'Actions'
        ],
        documentMainHeaders: [
            'Name',
            'Description',
            'Tags',
            'Date',
            'Actions'
        ],
        fullName: 'Full Name',
        username: 'Username',
        password: 'Password',
        type: 'Type',
        userDocumentHeaders: [
            'Name',
            'Description',
            'Date',
            'Actions'
        ],
        description: 'Description',
        file: 'File',
        ticketFilters: [
            'Everything',
            'Agent',
            'Status',
            'Priority',
            'User'
        ],
        agents: ['Ricardo','Alejandro'],
        states: ['Waiting','Attended','Resolved','Closed'],
        priorities: ['Low','Normal','High'],
        ticketTypes: ['Incident','Problem','Presale','Training','Request'],
    },
    'es': {
        btnNew: 'Nuevo',
        btnApply: 'Aplicar',
        btnSave: 'Guardar',
        btnCancel: 'Cancelar',
        btnClose: 'Salir',
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
        assetControlNumber: 'Numero de Control',
        assetLogHeaders: [
            'Fecha',
            'Usuario',
            'Activo',
            'Evento',
            'Documento',
            'Nuevo Valor',
            'Motivo'
        ],
        category: 'Categoria',
        kind: 'Tipo',
        brand: 'Marca',
        model: 'Modelo',
        serialNumber: 'Numero de Serie',
        comments: 'Comentarios',
        user: 'Usuario',
        userTypes: [
            'Soporte',
            'Usuario',
            'Dato'
        ],
        status: 'Estado',
        area: 'Área',
        barcode: 'Codigo de barras',
        quantity: 'Cantidad',
        reason: 'Motivo',
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
        ],
        configurationMainHeaders: [
            'Nombre',
            'Descripción',
            'Ruta de acceso',
            'Acciones'
        ],
        scheduledTaskMainHeaders: [
            'Nombre',
            'Descripción',
            'Frecuencia',
            'Día',
            'Acciones'
        ],
        documentMainHeaders: [
            'Nombre',
            'Descripción',
            'Etiquetas',
            'Fecha',
            'Acciones'
        ],
        fullName: 'Nombre Completo',
        username: 'Username',
        password: 'Contraseña',
        type: 'Tipo',
        userDocumentHeaders: [
            'Nombre',
            'Descripción',
            'Fecha',
            'Acciones'
        ],
        description: 'Descripción',
        file: 'Archivo',
        ticketFilters: [
            'Todo',
            'Agente',
            'Estado',
            'Prioridad',
            'Usuario'
        ],
        agents: ['Ricardo','Alejandro'],
        states: ['Sin Atender','Atendido','Resuelto','Cerrado'],
        priorities: ['Baja','Normal','Alta'],
        ticketTypes: ['Incidente','Problema','Preventa','Capacitación','Solicitud'],
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n
