resource "cloudflare_workers_kv_namespace" "this" {
  title = "maintenance"
}

resource "cloudflare_worker_script" "this" {
  name    = "maintenance"
  content = file(format("%s/maintenance.js", path.module))

  kv_namespace_binding {
    name         = "maintenance"
    namespace_id = cloudflare_workers_kv_namespace.this.id
  }

  plain_text_binding {
    name = "COMPANY_NAME"
    text = var.company_name
  }

  plain_text_binding {
    name = "WHITE_LIST_IPS"
    text = var.white_list_ips
  }

  plain_text_binding {
    name = "LOGO_URL"
    text = var.logo_url
  }
}

data "cloudflare_zones" "this" {
  filter {
    name = format("%s*", var.cloudflare_zone)
  }
}

resource "cloudflare_worker_route" "this" {
  zone_id     = lookup(data.cloudflare_zones.this.zones[0], "id")
  pattern     = var.pattern
  script_name = cloudflare_worker_script.this.name
}
