import ResumeLanguageLevel from "@/enums/LanguageEnum";

export const lanLevelToNum = (level: string | number): number => {
    // If it's a string, map to the enum value
    if (typeof level === "string") {
        switch (level) {
            case "A1": return 10;
            case "A2": return 30;
            case "B1": return 50;
            case "B2": return 60;
            case "C1": return 80;
            case "C2": return 95;
            default: return 0;
        }
    }
    // If it's a number, map as before
    switch (level) {
        case 1: return 10;
        case 29: return 30;
        case 49: return 50;
        case 59: return 60;
        case 89: return 80;
        case 99: return 95;
        case 40: return 70;
        case 80: return 90;
        case 100: return 100;
        case 60: return 60;
        case 20: return 40;
        default: return 0;
    }
};

export const getLanStringVal = (level: string | number): string => {
    if (typeof level === "string") {
        switch (level) {
            case "A1": return "A1";
            case "A2": return "A2";
            case "B1": return "B1";
            case "B2": return "B2";
            case "C1": return "C1";
            case "C2": return "C2";
            default: return "A1";
        }
    }
    switch (level) {
        case 1: return "A1";
        case 29: return "A2";
        case 49: return "B1";
        case 59: return "B2";
        case 89: return "C1";
        case 99: return "C2";
        default: return "A1";
    }
}