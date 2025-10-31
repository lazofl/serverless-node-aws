const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
require('dotenv').config({ path: '.env.local' });

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'eu-central-1',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
});

const createTable = async () => {
  try {
    // Check if table already exists
    const listCommand = new ListTablesCommand({});
    const tables = await client.send(listCommand);
    
    if (tables.TableNames?.includes(process.env.TABLE_NAME || 'Users')) {
      console.log(`Table ${process.env.TABLE_NAME || 'Users'} already exists`);
      return;
    }

    // Create the table
    const command = new CreateTableCommand({
      TableName: process.env.TABLE_NAME || 'Users',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });

    await client.send(command);
    console.log(`Table ${process.env.TABLE_NAME || 'Users'} created successfully`);
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
};

createTable();

