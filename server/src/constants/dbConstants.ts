export enum DBEvents {
  ON_CONNECTED = 'connected',
  ON_ERROR = 'error',
  ON_DISCONNECT = 'disconnected',
}

export enum DBLogMessages {
  CONNECTED = 'Connected successfully',
  ERROR = 'Error while connecting',
  DISCONNECT = 'Connection closed successfully',
  MS_CONNECTED = 'Mongo memory server is running',
  MS = 'Mongo memory server: ',
}
