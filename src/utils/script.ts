export function getDateToday(): Date {
    let dateSeconds = Date.now();
    let date = new Date(dateSeconds)
    return date
}

export function getDateYesterday(date: Date): Date{
    let yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday
}

export function getDateTomorrow(date: Date): Date{
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow    
}

export function getDateStringTitle(date: Date): string{
    const months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    let result = "";
    result = date.getDate().toString()+". "+months[date.getMonth()].toUpperCase()
    return result
}