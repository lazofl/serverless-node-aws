import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { setupDb } from './core/db';
import { setupEnvs } from './core/setup-envs';

setupEnvs();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  try {
    const userId = event.pathParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'User ID is required' }),
      };
    }

    const command = new GetCommand({
      TableName: "Users",
      Key: {
        id: userId,
      },
    });

    const response = await setupDb().docClient.send(command);

    if (!response.Item) {
      // Return mock data if user not found in DynamoDB
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: userId,
          name: 'Mock User',
          email: 'mock@example.com',
          createdAt: new Date().toISOString(),
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

