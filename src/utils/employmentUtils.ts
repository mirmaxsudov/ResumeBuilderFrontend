import { EmploymentResponseItem } from "@/components/profile/employment-edit-modal";

/**
 * Transforms API employment data to the format expected by the edit modal
 */
export function transformApiToEmploymentItem(apiData: any): EmploymentResponseItem {
    return {
        id: apiData.id || null,
        jobTitle: apiData.jobTitle || "",
        companyName: apiData.companyName || "",
        startDate: apiData.startDate ? new Date(apiData.startDate).toISOString().split('T')[0] : "",
        endDate: apiData.endDate ? new Date(apiData.endDate).toISOString().split('T')[0] : "",
        priority: apiData.priority || 0,
        description: apiData.description || "",
        currentJob: apiData.currentJob || false,
    };
}

/**
 * Transforms employment item back to API format
 */
export function transformEmploymentItemToApi(item: EmploymentResponseItem): any {
    return {
        id: item.id,
        jobTitle: item.jobTitle,
        companyName: item.companyName,
        startDate: item.startDate ? new Date(item.startDate).toISOString() : null,
        endDate: item.currentJob ? null : (item.endDate ? new Date(item.endDate).toISOString() : null),
        priority: item.priority,
        description: item.description,
        currentJob: item.currentJob,
    };
}

/**
 * Validates employment item data
 */
export function validateEmploymentItem(item: EmploymentResponseItem): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!item.jobTitle.trim()) {
        errors.push("Job title is required");
    }

    if (!item.companyName.trim()) {
        errors.push("Company name is required");
    }

    if (!item.startDate) {
        errors.push("Start date is required");
    }

    if (!item.currentJob && !item.endDate) {
        errors.push("End date is required for non-current jobs");
    }

    if (item.startDate && item.endDate && !item.currentJob) {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        if (startDate > endDate) {
            errors.push("Start date cannot be after end date");
        }
    }

    if (item.description.trim().length < 10) {
        errors.push("Description should be at least 10 characters long");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Sorts employment items by priority
 */
export function sortEmploymentByPriority(items: EmploymentResponseItem[]): EmploymentResponseItem[] {
    return [...items].sort((a, b) => a.priority - b.priority);
}

/**
 * Generates a new priority for adding items
 */
export function getNextPriority(items: EmploymentResponseItem[]): number {
    if (items.length === 0) return 1;
    return Math.max(...items.map(item => item.priority)) + 1;
}

/**
 * Creates a new empty employment item
 */
export function createEmptyEmploymentItem(priority: number): EmploymentResponseItem {
    return {
        id: null,
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        priority,
        description: "",
        currentJob: false,
    };
} 