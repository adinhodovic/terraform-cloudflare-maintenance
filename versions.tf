terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 4.39.0"
    }
  }
  required_version = ">= 1.0.0"
}
