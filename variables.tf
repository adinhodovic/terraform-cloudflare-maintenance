variable "cloudflare_zone" {
  type = string
}

variable "pattern" {
  type = list(string)
}

variable "font" {
  type    = string
  default = "Poppins"
}

variable "email" {
  type = string
}

variable "company_name" {
  type = string
}

variable "logo_url" {
  type = string
}

variable "favicon_url" {
  type    = string
  default = "https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/maintenance-512.png"
}

variable "enabled" {
  type    = bool
  default = true
}

variable "whitelist_ips" {
  default = "placeholder"
  type    = string
}
