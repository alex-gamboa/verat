import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    'en': {
        access: 'Access',
        actions: 'Actions',
        adminPortal: 'Admin web',
        addNewArea: 'Add new area',
        addNewBrand: 'Add new brand',
        addNewCategory: 'Add new category',
        addNewKind: 'Add new kind',
        addNewService: 'Add new service',
        addNewType: 'Add new type',
        addNewStatus: 'Add new status',
        addNewPriority: 'Add new priority',
        area: 'Area',
        agent: 'Agent',
        asset: 'Asset',
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
        assetReports: ['By category', 'By kind', 'By Status', 'By brand'],
        barcode: 'Barcode',
        brand: 'Brand',
        btnNew: 'New',
        btnApply: 'Apply',
        btnSave: 'Save',
        btnCancel: 'Cancel',
        btnClose: 'Close',
        category: 'Category',
        comments: 'Comments',
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
        cost: 'Cost',
        credentials: 'Credentials',
        date: 'Date',
        day: 'Day',
        description: 'Description',
        details: 'Details',
        documentMainHeaders: [
            'Name',
            'Description',
            'Tags',
            'Date',
            'Actions'
        ],
        email: 'Email',
        fullName: 'Full Name',
        filterBy: 'Filter by',
        file: 'File',
        frequency: 'Frequency',
        groupBy: 'Group By',
        hours: 'Hours',
        kind: 'Kind',
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
        manualDocument: 'Technical Document',
        model: 'Model',
        number: 'Number',
        name: 'Name',
        language: 'Language',
        password: 'Password',
        phone: 'Phone',
        priority: 'Priority',
        quantity: 'Quantity',
        reason: 'Reason',
        reportAssetsByCategoryTitle: 'Assets by category',
        reportAssetsByStatusTitle: 'Assets by status',
        reportAssetsByBrandTitle: 'Assets by brand',
        reportAssetsBykindTitle: 'Assets by kind',
        reportCategories: ['Assets', 'Costs', 'Operations'],
        renovation: 'Renovation',
        search: 'Search',
        selectCategory: 'Select Category',
        serialNumber: 'Serial Number',
        service: 'Service',
        scheduledTaskMainHeaders: [
            'Name',
            'Description',
            'Frequency',
            'Day',
            'Actions'
        ],
        solution: 'Solution',
        status: 'Status',
        tags: 'Tags',
        ticketCreationDate: 'Created',
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
        ticketFilters: [
            'Everything',
            'Agent',
            'Status',
            'Priority',
            'User'
        ],
        type: 'Type',
        user: 'User',
        userTypes: [
            'Support',
            'User',
            'Data'
        ],
        userMainHeaders: [
            'Name',
            'Username',
            'Profile',
            'Actions'
        ],
        username: 'Username',
        userDocumentHeaders: [
            'Name',
            'Description',
            'Date',
            'Actions'
        ],
    },
    'es': {
        access: 'Acceso',
        actions: 'Acciones',
        adminPortal: 'Portal de Administración',
        addNewArea: 'Agregar nueva área',
        addNewBrand: 'Agregar nueva marca',
        addNewCategory: 'Agregar nueva categoria',
        addNewKind: 'Agregar nuevo tipo',
        addNewService: 'Agregar nuevo servicio',
        addNewType: 'Agregar nuevo tipo',
        addNewStatus: 'Agregar nuevo status',
        addNewPriority: 'Agregar nuevo prioridad',
        area: 'Área',
        agent: 'Agente',
        asset: 'Activo',
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
        assetReports: ['Por Categoria', 'Por tipo', 'Por estado', 'Por marca'],
        barcode: 'Codigo de barras',
        brand: 'Marca',
        btnNew: 'Nuevo',
        btnApply: 'Aplicar',
        btnSave: 'Guardar',
        btnCancel: 'Cancelar',
        btnClose: 'Salir',
        category: 'Categoria',
        comments: 'Comentarios',
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
        cost: 'Costo',
        credentials: 'Credenciales',
        date: 'Fecha',
        day: 'Día',
        description: 'Descripción',
        details: 'Detalles',
        documentMainHeaders: [
            'Nombre',
            'Descripción',
            'Etiquetas',
            'Fecha',
            'Acciones'
        ],
        email: 'Correo',
        file: 'Archivo',
        filterBy: 'Filtrar Por',
        fullName: 'Nombre Completo',
        frequency: 'Frecuencia',
        groupBy: 'Agrupar por',
        hours: 'Horas',
        kind: 'Tipo',
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
        manualDocument: 'Manual',
        model: 'Modelo',
        number: 'Folio',
        name: 'Nombre',
        language: 'Lenguaje',
        password: 'Contraseña',
        phone: 'Telefono',
        priority: 'Prioridad',
        quantity: 'Cantidad',
        reason: 'Motivo',
        reportAssetsByCategoryTitle: 'Activos por categoria',
        reportAssetsByStatusTitle: 'Activos por estado',
        reportAssetsByBrandTitle: 'Activos por Marca',
        reportAssetsBykindTitle: 'Activos por Tipo',
        reportCategories: ['Activos', 'Costos', 'Operación'],
        renovation: 'Renovación',
        search: 'Buscar',
        selectCategory: 'Selecione Categoria',
        service: 'Servicio',
        scheduledTaskMainHeaders: [
            'Nombre',
            'Descripción',
            'Frecuencia',
            'Día',
            'Acciones'
        ],
        serialNumber: 'Numero de Serie',
        solution: 'Solución',
        status: 'Estado',
        tags: 'Etiquetas',
        ticketCreationDate: 'Creado',
        ticketFilters: [
            'Todo',
            'Agente',
            'Estado',
            'Prioridad',
            'Usuario'
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
        type: 'Tipo',
        user: 'Usuario',
        userTypes: [
            'Soporte',
            'Usuario',
            'Dato'
        ],
        userMainHeaders: [
            'Nombre',
            'Usuario',
            'Tipo',
            'Acciones'
        ],
        username: 'Username',
        userDocumentHeaders: [
            'Nombre',
            'Descripción',
            'Fecha',
            'Acciones'
        ],

    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n
