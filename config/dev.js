import { dbUserName, dbPassword } from '../private/privateKeys.service.js';

export default {
    dbURL: `mongodb+srv://${dbUserName}:${dbPassword}@tarello.oxvmtp6.mongodb.net/tarello_db?retryWrites=true&w=majority`,
    // dbURL: 'mongodb://127.0.0.1:27017',
    dbName: 'tarello_db',
}
