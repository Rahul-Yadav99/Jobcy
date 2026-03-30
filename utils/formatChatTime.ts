export const formatChatTime = (date: any) => {
    if (!date) return "";

    const now = new Date();
    const inputDate = new Date(date);

    const isToday =
        now.toDateString() === inputDate.toDateString();

    const isYesterday =
        new Date(now.setDate(now.getDate() - 1)).toDateString() ===
        inputDate.toDateString();

    const time = inputDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) return time;

    if (isYesterday) return `Yesterday ${time}`;

    return inputDate.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};