variable "cloudflare_zone" {
  type = string
}

variable "pattern" {
  type = string
}

variable "company_name" {
  type = string
}

variable "logo_url" {
  type = string
}

variable "white_list_ips" {
  default = ""
  type    = string
}
