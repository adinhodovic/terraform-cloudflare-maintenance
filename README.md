# Terraform-Cloudflare-Maintenance

Terraform module to create a responsive **Maintenance Page** using
Cloudflare Workers.

## Preview

![Preview](https://i.imgur.com/CiguM4w.png)

You can [preview the full page here](https://hodovi.cc/maintenance/).

## Usage

A detailed explanation of [the implementation can be found
here.](https://hodovi.cc/blog/quick-pretty-and-easy-maintenance-page-using-cloudflare-workers-terraform/)

Simple maintenance page with your logo, fav icon, company name, font and
email:

```terraform
module "hodovi_cc_maintenance" {
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.3.0"
  cloudflare_zone = "hodovi.cc"
  patterns        = ["hodovi.cc/maintenance/*"]
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
  source          = "git::git@github.com:adinhodovic/terraform-cloudflare-maintenance.git?ref=v0.3.0"
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

## Inputs

| Variable        | Description                                                       | Required | Type                                           | Default                          |
|-----------------|:-----------------------------------------------------------------:|:--------:|:----------------------------------------------:|:--------------------------------:|
| enabled         | Flag to create/delete the worker route.                           | False    | Bool                                           | true                             |
| cloudflare_zone | The Cloudflare Zone.                                              | True     | String                                         | -                                |
| pattern         | The DNS pattern to deploy the maintenance page to.                | True     | String                                         | -                                |
| email           | The email address for used for support inquiries.                 | True     | String                                         | -                                |
| company_name    | Your company name.                                                | True     | String                                         | -                                |
| font            | [**Google** font](https://fonts.google.com/) that should be used. | False    | String                                         | "Poppins"                        |
| whitelist_ips   | The IPS that are whitelisted to bypass the maintenance page.      | False    | List separated by commas e.g "1.1.1.1,2.2.2.2" | "placeholder"                    |
| logo_url        | The logo to be displayed.                                         | True     | String                                         | -                                |
| favicon_url     | The favicon to be displayed.                                      | False    | String                                         | A maintenance icon from the web. |

Ensure that the Google Font is identical in casing e.g "PT Sans" can't be
"Pt Sans" otherwise it'll fail to fetch the font.

Example can be found in examples/root-example.
