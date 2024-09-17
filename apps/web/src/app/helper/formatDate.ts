// export function formatDate(dateString: string) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
// }

export function formatDate(date: string): string {
    // Check if the date is valid
    if (!date) return '';

    // Create a Date object from the string
    const eventDate = new Date(date);

    // Add 7 hours to the date
    eventDate.setHours(eventDate.getHours() + 2);

    // Format the date and time using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return formatter.format(eventDate);
}
