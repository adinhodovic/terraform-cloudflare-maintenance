# Terraform-Cloudflare-Maintenance Module

Dead simple Terraform module to create a *Maintenance Page* using Cloudflare Workers.

The following settings are set:

                                      | Variable        | Description                                                   | Required | Type                                           | Default       |
--------------------------------------|-----------------|:-------------------------------------------------------------:|:--------:|:----------------------------------------------:|:-------------:|
                                      | cloudflare_zone | The Cloudflare Zone                                           | True     | String                                         | -             |
                                      | pattern         | The DNS pattern to apply the Maintenance page to              | True     | String                                         | -             |
                                      | email           | The email address for support                                 | True     | String                                         | -             |
                                      | company_name    | Company name                                                  | True     | String                                         | -             |
                                      | font            | The font for the page                                         | false    | String                                         | Poppins       |
                                      | white_list_ips  | The IPS that are whitelisted to bypass the maintenance page. | false    | List separated by commas e.g "1.1.1.1,2.2.2.2" | "placeholder" |
                                      | logo_url        | The logo to be displayed                                      | True     | String                                         | -             |

Example found in examples/root-example.
