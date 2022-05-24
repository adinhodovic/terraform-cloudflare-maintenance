# Terraform-Cloudflare-Maintenance

Terraform module to create a responsive **Maintenance Page** using
Cloudflare Workers.

The module can be used through [Terraform's registry](https://registry.terraform.io/modules/adinhodovic/maintenance/cloudflare/latest).

## Preview

![Preview](https://i.imgur.com/G8fJ2mj.png)

You can [preview the full page here](https://hodovi.cc/maintenance/).

## Usage

A detailed explanation of [the implementation can be found here.](https://hodovi.cc/blog/quick-pretty-and-easy-maintenance-page-using-cloudflare-workers-terraform/)

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
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.5.0"
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*", "hodovi.cc/example/*"]
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  statuspage_url  = "https://status.hodovi.cc"
  font            = "Poppins"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic-blue.original.png"
  favicon_url     = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
```

Use the enabled flag to enable/disable the Cloudflare route when
maintenance starts/ends:

```terraform
module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.5.0"
  enabled         = false
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*"]
  company_name    = "HoneyLogic"
  email           = "support@honeylogic.io"
  statuspage_url  = "null"
  font            = "Poppins"
  logo_url        = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic-blue.original.png"
  favicon_url     = "https://s3.eu-west-1.amazonaws.com/honeylogic.io/media/images/Honeylogic_-_icon.original.height-80.png"
}
```

Example can be found in examples/root-example.

<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| terraform | >= 0.13 |
| cloudflare | > 2.0.0 |

## Providers

| Name | Version |
|------|---------|
| cloudflare | > 2.0.0 |

## Resources

| Name | Type |
|------|------|
| [cloudflare_worker_route.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/worker_route) | resource |
| [cloudflare_worker_script.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/worker_script) | resource |
| [cloudflare_zones.this](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/data-sources/zones) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| cloudflare\_zone | n/a | `string` | n/a | yes |
| company\_name | n/a | `string` | n/a | yes |
| email | The email address to used for support inquiries. | `string` | n/a | yes |
| enabled | Flag to create/delete the worker route. | `bool` | `true` | no |
| favicon\_url | The favicon to be displayed. Defaults to a maintenance icon from the web. | `string` | `"https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/maintenance-512.png"` | no |
| font | [Google font](https://fonts.google.com/) that should be used. | `string` | `"Poppins"` | no |
| logo\_url | The logo to be displayed. | `string` | n/a | yes |
| patterns | The DNS pattern list to deploy the maintenance page to. | `list(string)` | n/a | yes |
| statuspage\_url | The status page address to get updated information. | `string` | `"null"` | no |
| whitelist\_ips | The IPs that are whitelisted to bypass the maintenance page. | `string` | `"null"` | no |
| whitelist\_path | The paths that are whitelisted defined with a regex expression to bypass the maintenance page. | `string` | `"null"` | no |
<!-- END_TF_DOCS -->

## Notes

Get fonts from [**Google** fonts](https://fonts.google.com/). Ensure that the Google Font is identical in casing e.g "PT Sans" can't be
"Pt Sans" otherwise it'll fail to fetch the font.
