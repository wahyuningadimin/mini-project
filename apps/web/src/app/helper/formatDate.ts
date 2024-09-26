// export function formatDate(dateString: string) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
// }

export function formatDate(date: string): string {
    if (!date) return '';

    const eventDate = new Date(date);

    eventDate.setHours(eventDate.getHours() - 5 );

    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return formatter.format(eventDate);
}
