terraform {
  required_version = ">= 0.11.13"

<% if (backend) { %>
  backend "s3" {
    region         = "<%= backend.region %>"
    bucket         = "<%= backend.bucket %>"
    key            = "<%= backend.key %>"
    dynamodb_table = "<%= backend.dynamodb_table %>"
  }
<% } %>
}
