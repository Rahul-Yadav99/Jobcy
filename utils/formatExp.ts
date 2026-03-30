export const formatExperience = (exp: any) => {
    if (!exp && exp !== 0) return "0 years";

    const years = Math.floor(exp);
    const months = Math.round((exp - years) * 12);

    let result = "";

    if (years > 0) {
        result += `${years} year${years > 1 ? "s" : ""}`;
    }

    if (months > 0) {
        result += `${years > 0 ? " " : ""}${months} month${months > 1 ? "s" : ""}`;
    }

    return result || "0 months";
};