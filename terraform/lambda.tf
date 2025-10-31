# GetUser Lambda Function
resource "aws_lambda_function" "get_user" {
  filename         = "../backend/dist/getUser.zip"
  function_name    = "${var.project_name}-getUser"
  role             = aws_iam_role.lambda_role.arn
  handler          = "getUser.handler"
  source_code_hash = filebase64sha256("../backend/dist/getUser.zip")
  runtime          = "nodejs20.x"
  timeout          = 30

  environment {
    variables = {
      DYNAMODB_REGION = var.aws_region
    }
  }

  tags = {
    Name        = "${var.project_name}-getUser"
    Environment = var.environment
    Project     = var.project_name
  }
}

# AddUser Lambda Function
resource "aws_lambda_function" "add_user" {
  filename         = "../backend/dist/addUser.zip"
  function_name    = "${var.project_name}-addUser"
  role             = aws_iam_role.lambda_role.arn
  handler          = "addUser.handler"
  source_code_hash = filebase64sha256("../backend/dist/addUser.zip")
  runtime          = "nodejs20.x"
  timeout          = 30

  environment {
    variables = {
      DYNAMODB_REGION = var.aws_region
    }
  }

  tags = {
    Name        = "${var.project_name}-addUser"
    Environment = var.environment
    Project     = var.project_name
  }
}

# GetAllUsers Lambda Function
resource "aws_lambda_function" "get_all_users" {
  filename         = "../backend/dist/getAllUsers.zip"
  function_name    = "${var.project_name}-getAllUsers"
  role             = aws_iam_role.lambda_role.arn
  handler          = "getAllUsers.handler"
  source_code_hash = filebase64sha256("../backend/dist/getAllUsers.zip")
  runtime          = "nodejs20.x"
  timeout          = 30

  environment {
    variables = {
      DYNAMODB_REGION = var.aws_region
    }
  }

  tags = {
    Name        = "${var.project_name}-getAllUsers"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Log Groups for Lambda Functions
resource "aws_cloudwatch_log_group" "get_user_logs" {
  name              = "/aws/lambda/${aws_lambda_function.get_user.function_name}"
  retention_in_days = 7

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_cloudwatch_log_group" "add_user_logs" {
  name              = "/aws/lambda/${aws_lambda_function.add_user.function_name}"
  retention_in_days = 7

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_cloudwatch_log_group" "get_all_users_logs" {
  name              = "/aws/lambda/${aws_lambda_function.get_all_users.function_name}"
  retention_in_days = 7

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

