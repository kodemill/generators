variable "s3_bucket" {
  description = "The source bucket for the lambda"

  # type = "string"
}

variable "s3_key" {
  description = "The key in the source bucket for the lambda"

  # type = "string"
}

variable "name" {
  description = "The name of the lambda function"

  # type = "string"
}

variable "timeout" {
  description = "The lambda timeout"

  # default = 120
}

variable "memory_size" {
  description = "The allocated memory size"

  # type = "string"
  # default = 128
}

<% if (vpc_config) { %>
variable "subnet_ids" {
  description = "The list of the VPC subnet ids"
  type        = "list"
  default     = []
}

variable "security_group_ids" {
  description = "The list of the lambda security group ids"
  type        = "list"
  default     = []
}
<% } %>

variable "source_code" {
  description = "The path of the lambda source code"
}

variable "handler" {
  description = "The handler function name"
  default     = "index.handler"
}

variable "environment_variables" {
  description = "The environment variables for the lambda"
  type = "map"
}

variable "role" {
  description = "The environment variables for the lambda"
}

variable "tags" {
  default = {}
}
