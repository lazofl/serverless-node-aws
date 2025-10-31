output "api_gateway_url" {
  description = "API Gateway URL"
  value       = aws_api_gateway_stage.main.invoke_url
}

output "get_user_lambda_name" {
  description = "GetUser Lambda function name"
  value       = aws_lambda_function.get_user.function_name
}

output "add_user_lambda_name" {
  description = "AddUser Lambda function name"
  value       = aws_lambda_function.add_user.function_name
}

output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.id
}

