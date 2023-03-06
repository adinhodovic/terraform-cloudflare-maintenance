Cloudflare Maintenance Page

This Cloudflare script intercepts all incoming requests and checks if the request is coming from an IP that is in the whitelist or if the request path matches a whitelisted path. If the request is not whitelisted, it returns a maintenance page.

Installation

To use this script, you must have a Cloudflare account and access to the Workers section of the Cloudflare dashboard. Follow these steps to install the script:

1. Copy the code from index.js in this repository.
2. Open the Cloudflare dashboard and navigate to the Workers section.
3. Click the "Create a Worker" button and paste the code into the editor.
4. Click the "Save and Deploy" button to deploy the worker.

Configuration

This script can be configured using environment variables. The following variables can be set:

- WHITELIST_IPS: A comma-separated list of IP addresses that are whitelisted.
- WHITELIST_PATH: A regular expression string that matches whitelisted paths.

Additionally, the following variables in the code can be customized:

- google_font: The name of the Google font used in the maintenance page.
- font: The name of the font used in the maintenance page.
- favicon_url: The URL of the favicon used in the maintenance page.
- logo_url: The URL of the logo used in the maintenance page.
- company_name: The name of your company or website.
- maintenance_image_url: The URL of the maintenance image used in the maintenance page.
- support_email: The email address for contacting support.

Usage

Once the script is installed and configured, it will intercept all incoming requests and check if the request is whitelisted. If the request is not whitelisted, it will return a maintenance page. The maintenance page can be customized by editing the HTML in the maintenancePage variable.

License

This project is licensed under the MIT License - see the LICENSE file for details.
