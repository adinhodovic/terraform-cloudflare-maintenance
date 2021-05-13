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

variable "enabled" {
  type        = bool
  default     = true
  description = "Flag to create/delete the worker route."
}

variable "whitelist_ips" {
  default     = "placeholder"
  description = "The IPs that are white listed to bypass the maintenance page."
  type        = string
}
