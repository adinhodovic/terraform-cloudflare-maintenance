module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=0.9.3"
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*", "hodovi.cc/example/*"]
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  statuspage_url  = "https://status.hodovi.cc"
  font            = "Lato"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
