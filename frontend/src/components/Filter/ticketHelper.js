import i18n from '@/plugins/i18n'

export function formatPriorities(data) {
    for (const ticket of data) {
        if(ticket.priority == i18n.t('priorities[2]')) {ticket.color = 'red'; ticket.icon = 'schedule'}
        else if(ticket.priority == i18n.t('priorities[1]')) {ticket.color = 'gray'; ticket.icon = 'schedule'}
        else {ticket.color = 'green'; ticket.icon = 'schedule'}
    }

    return data
}
