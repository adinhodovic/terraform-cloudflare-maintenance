resource "cloudflare_worker_script" "this" {
  name    = "maintenance"
  content = file(format("%s/maintenance.js", path.module))

  plain_text_binding {
    name = "COMPANY_NAME"
    text = var.company_name
  }

  plain_text_binding {
    name = "WHITELIST_IPS"
    text = var.whitelist_ips
  }

  plain_text_binding {
    name = "LOGO_URL"
    text = var.logo_url
  }

  plain_text_binding {
    name = "FONT"
    text = var.font
  }

  plain_text_binding {
    name = "EMAIL"
    text = var.email
  }
}

data "cloudflare_zones" "this" {
  filter {
    name = format("%s*", var.cloudflare_zone)
  }
}

resource "cloudflare_worker_route" "this" {
  count       = var.enabled ? 1 : 0
  zone_id     = lookup(data.cloudflare_zones.this.zones[0], "id")
  pattern     = var.pattern
  script_name = cloudflare_worker_script.this.name
}
