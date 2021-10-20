resource "cloudflare_worker_script" "this" {
  name = format("maintenance-%s", replace(var.cloudflare_zone, ".", "-"))
  content = templatefile("${path.module}/maintenance.js", {
    company_name    = var.company_name
    logo_url        = var.logo_url
    favicon_url     = var.favicon_url
    font            = var.font
    email           = var.email
    statuspage_url  = var.statuspage_url
    google_font     = replace(var.font, " ", "+")
  })
  plain_text_binding {
    name = "WHITELIST_IPS"
    text = var.whitelist_ips
  }
}

data "cloudflare_zones" "this" {
  filter {
    name = var.cloudflare_zone
  }
}

resource "cloudflare_worker_route" "this" {
  count       = var.enabled != false ? length(var.patterns) : 0
  zone_id     = lookup(data.cloudflare_zones.this.zones[0], "id")
  pattern     = var.patterns[count.index]
  script_name = cloudflare_worker_script.this.name
}
