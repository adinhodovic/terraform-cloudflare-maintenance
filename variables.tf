variable "account_id" {
  type        = string
  description = "Cloudflare account id"
  default     = null
}

variable "cloudflare_zone" {
  type = string
}

variable "patterns" {
  type        = list(string)
  description = "The DNS pattern list to deploy the maintenance page to."
}

variable "font" {
  type        = string
  description = "[Google font](https://fonts.google.com/) that should be used."
  default     = "Poppins"
}

variable "email" {
  type        = string
  description = "The email address to used for support inquiries."
}

variable "statuspage_url" {
  type        = string
  default     = "null"
  description = "The status page address to get updated information."
}

variable "company_name" {
  type = string
}

variable "logo_url" {
  type        = string
  description = "The logo to be displayed."
}

variable "favicon_url" {
  type        = string
  default     = "https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/maintenance-512.png"
  description = "The favicon to be displayed. Defaults to a maintenance icon from the web."
}

variable "image_url" {
  type        = string
  default     = "https://i.imgur.com/0uJkCM8.png"
  description = "The main image to be displayed."
}

variable "enabled" {
  type        = bool
  default     = true
  description = "Flag to create/delete the worker route."
}

variable "whitelist_ips" {
  type        = string
  default     = "null"
  description = "The IPs that are whitelisted to bypass the maintenance page."
}

variable "whitelist_path" {
  type        = string
  default     = "null"
  description = "The paths that are whitelisted defined with a regex expression to bypass the maintenance page."
}
