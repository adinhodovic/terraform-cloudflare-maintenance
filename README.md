# Terraform-Cloudflare-zone-rules Module

Module to override Cloudflare zone settings.

The following settings are set:

| Rule                     | Value  |
| -------------------------|:------:|
| SSL                      | Strict |
| Security Level           | High   |
| Automatic Https Rewrites | On     |
| Always Use Https         | On     |
| Always Online            | On     |
| Email Obfuscation        | On     |

Example found in examples/root-example.
