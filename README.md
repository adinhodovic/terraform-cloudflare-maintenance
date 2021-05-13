# Terraform-Cloudflare-Maintenance

Terraform module to create a responsive **Maintenance Page** using
Cloudflare Workers.

The module can be used through [Terraform's registry](https://registry.terraform.io/modules/adinhodovic/maintenance/cloudflare/latest).

## Preview

![Preview](https://i.imgur.com/CiguM4w.png)

You can [preview the full page here](https://hodovi.cc/maintenance/).

## Usage

A detailed explanation of [the implementation can be found
here.](https://hodovi.cc/blog/quick-pretty-and-easy-maintenance-page-using-cloudflare-workers-terraform/)

Export cloudflare credentials

```bash
TF_VAR_cloudflare_email=xxx
TF_VAR_cloudflare_api_key=xxx
TF_VAR_cloudflare_account_id=xxx
```

If using a token, make sure it has all the necessary permissions

Simple maintenance page with your logo, fav icon, company name, font and email with multiple routes on the same domain:

```terraform
module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.4.0"
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*", "hodovi.cc/example/*"]
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  font            = "Poppins"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic-blue.original.png"
  favicon_url     = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
```

Use the enabled flag to enable/disable the Cloudflare route when
maintenance starts/ends:

```terraform
module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.4.0"
  enabled         = false
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*"]
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  font            = "Poppins"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic-blue.original.png"
  favicon_url     = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
```

## Requirements

| Name | Version |
|------|---------|
| terraform | >= 0.13 |
| cloudflare | > 2.0.0 |

## Providers

| Name | Version |
|------|---------|
| cloudflare | > 2.0.0 |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| cloudflare\_zone | n/a | `string` | n/a | yes |
| company\_name | n/a | `string` | n/a | yes |
| email | n/a | `string` | n/a | yes |
| enabled | n/a | `bool` | `true` | no |
| favicon\_url | n/a | `string` | `"https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/maintenance-512.png"` | no |
| font | n/a | `string` | `"Poppins"` | no |
| logo\_url | n/a | `string` | n/a | yes |
| patterns | n/a | `list(string)` | n/a | yes |
| whitelist\_ips | n/a | `string` | `"placeholder"` | no |

## Notes

Get fonts from [**Google** fonts](https://fonts.google.com/). Ensure that the Google Font is identical in casing e.g "PT Sans" can't be
"Pt Sans" otherwise it'll fail to fetch the font.

Example can be found in examples/root-example.

## Outputs

No output.
