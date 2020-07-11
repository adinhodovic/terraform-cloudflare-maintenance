variable "cloudflare_zone" {
  type = string
}

variable "pattern" {
  type = string
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

variable "white_list_ips" {
  default = "placeholder"
  type    = string
}
