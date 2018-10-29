import nconf from 'nconf';
import path from 'path';

const profile = process.env.PROFILE || 'local';
const file = `${path.join(__dirname, 'profiles', profile)}.json`;

nconf.argv()
.env()
.file({ file });

export = (key) => { return nconf.get(key); };
