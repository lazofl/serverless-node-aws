import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { setupEnvs } from './core/setup-envs';
import { setupDb } from './core/db';

setupEnvs();

interface UserInput {
  name: string;
  email: string;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const input: UserInput = JSON.parse(event.body);

    if (!input.name || !input.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and email are required' }),
      };
    }

    const user = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: "Users",
      Item: user,
    });

    await setupDb().docClient.send(command);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(user),
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

