export const formatDate = (createdAt: string | Date) => {
    const date = new Date(createdAt);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};