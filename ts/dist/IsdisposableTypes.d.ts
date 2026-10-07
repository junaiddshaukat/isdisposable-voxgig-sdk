export interface Bulk {
    emails: any[];
    results?: any[];
}
export interface BulkCreateData {
    emails: any[];
    results?: any[];
}
export interface Check {
    cached?: boolean;
    disposable?: boolean;
    domain?: string;
    domain_age_days?: number;
    email?: string;
    error?: string;
    mx_valid?: boolean;
    reason?: string;
    score?: number;
}
export interface CheckCreateData {
    cached?: boolean;
    disposable?: boolean;
    domain?: string;
    domain_age_days?: number;
    email?: string;
    error?: string;
    mx_valid?: boolean;
    reason?: string;
    score?: number;
}
export interface Health {
    status?: string;
    timestamp?: string;
    version?: string;
}
export interface HealthLoadMatch {
    status?: string;
    timestamp?: string;
    version?: string;
}
