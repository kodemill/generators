resource "aws_lambda_function" "lambda" {
  s3_bucket        = "${var.s3_bucket}"
  s3_key           = "${var.s3_key}"
  function_name    = "${var.name}"
  handler          = "${var.handler}"
  memory_size      = "${var.memory_size}"
  timeout          = "${var.timeout}"
  role             = "${var.role}"
  runtime          = "nodejs8.10"
  source_code_hash = "${filebase64sha256(var.source_code)}"

<% if (vpc_config) { %>
  vpc_config {
    security_group_ids = "${var.security_group_ids}"
    subnet_ids         = "${var.subnet_ids}"
  }
<% } %>

  environment {
    variables = "${var.environment_variables}"
  }

  tags = "${var.tags}"
}

resource "aws_s3_bucket_object" "lambda_source" {
  bucket = "${var.s3_bucket}"
  key    = "${var.s3_key}"
  source = "${var.source_code}"
  etag   = "${filemd5(var.source_code)}"
  tags   = "${var.tags}"
}
