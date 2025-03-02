resource "cloudflare_workers_script" "this" {
  account_id  = var.account_id
  script_name = format("maintenance-%s", replace(var.cloudflare_zone, ".", "-"))
  content = templatefile("${path.module}/maintenance.js", {
    company_name   = var.company_name
    logo_url       = var.logo_url
    favicon_url    = var.favicon_url
    font           = var.font
    email          = var.email
    statuspage_url = var.statuspage_url
    google_font    = replace(var.font, " ", "+")
  })

  bindings = [{
    name = "WHITELIST_IPS"
    type = "plain"
    text = var.whitelist_ips
    },
    {
      name = "WHITELIST_PATH"
      type = "plain"
      text = var.whitelist_path
    }
  ]
}

data "cloudflare_zone" "this" {
  filter = {
    account = {
      id = var.account_id
    }
    name = var.cloudflare_zone
  }
}

resource "cloudflare_workers_route" "this" {
  count   = var.enabled != false ? length(var.patterns) : 0
  zone_id = data.cloudflare_zone.this.id
  pattern = var.patterns[count.index]
  script  = cloudflare_workers_script.this.script_name
}
