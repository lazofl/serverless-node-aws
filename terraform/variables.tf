variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "serverless-user-app"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

