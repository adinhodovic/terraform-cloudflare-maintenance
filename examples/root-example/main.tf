module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-mailgun-cloudflare?ref=v0.1.0"
  cloudflare_zone = "hodovi.cc"
  pattern         = "hodovi.cc/maintenance/*"
  company_name    = "HoneyLogic"
  white_list_ips  = "1.1.1.1"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
