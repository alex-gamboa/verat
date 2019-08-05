
export function formatPriorities(data) {
    for (const ticket of data) {
        if(ticket.priority == 'Alta') {ticket.color = 'red'; ticket.icon = 'schedule'}
        else if(ticket.priority == 'Normal') {ticket.color = 'gray'; ticket.icon = 'schedule'}
        else {ticket.color = 'green'; ticket.icon = 'schedule'}
    }

    return data
}
