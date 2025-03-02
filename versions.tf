terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = ">= 5.1.0"
    }
  }
  required_version = ">= 1.0.0"
}
