import i18n from '@/plugins/i18n'

export function formatPriorities(data) {
    for (const ticket of data) {
        ticket.color = 'green'; ticket.icon = 'schedule'
    }

    return data
}
