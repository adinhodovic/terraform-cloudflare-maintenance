module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.1.0"
  cloudflare_zone = "hodovi.cc"
  pattern         = "hodovi.cc/maintenance/*"
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  font            = "Lato"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
