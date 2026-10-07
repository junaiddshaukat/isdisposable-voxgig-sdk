// Typed models for the Isdisposable SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bulk {
  emails: any[]
  results?: any[]
}

export interface BulkCreateData {
  emails: any[]
  results?: any[]
}

export interface Check {
  cached?: boolean
  disposable?: boolean
  domain?: string
  domain_age_days?: number
  email?: string
  mx_valid?: boolean
  reason?: string
  score?: number
}

export interface CheckCreateData {
  cached?: boolean
  disposable?: boolean
  domain?: string
  domain_age_days?: number
  email?: string
  mx_valid?: boolean
  reason?: string
  score?: number
}

export interface Health {
  status?: string
  timestamp?: string
  version?: string
}

export interface HealthLoadMatch {
  status?: string
  timestamp?: string
  version?: string
}

