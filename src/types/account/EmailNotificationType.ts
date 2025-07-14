export interface EmailNotificationResponse {
    careerPlans: boolean,
    updateAndOffers: boolean,
    resumeAndJobTipsNewsletter: boolean,
    resumeAnalytics: boolean
}

export interface EmailNotificationRequest extends EmailNotificationResponse {
    careerPlans: boolean,
    updateAndOffers: boolean,
    resumeAndJobTipsNewsletter: boolean
}