terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 5.19.1"
    }
  }
  required_version = ">= 1.0.0"
}
