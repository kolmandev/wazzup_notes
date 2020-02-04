const { sendQuery, closePool } = require('./database/connection');

const query = `
    DROP TABLE IF EXISTS users, notes ;

    CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` int(255) unsigned NOT NULL AUTO_INCREMENT,
        \`login\` varchar(50) NOT NULL,
        \`hash\` varchar(250) NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`login\` (\`login\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
  
    CREATE TABLE IF NOT EXISTS \`notes\` (
        \`id\` int(255) unsigned NOT NULL AUTO_INCREMENT,
        \`user_id\` varchar(255) NOT NULL,
        \`text\` text NOT NULL,
        \`updatedAt\` datetime DEFAULT NULL,
        \`createdAt\` datetime NOT NULL,
        \`shared\` ENUM('true','false') DEFAULT 'false',
        PRIMARY KEY (\`id\`),
        KEY \`notes_ibfk_1\` (\`user_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

sendQuery( query )
    .then(() => {
        console.log('Creating tables success');
    })
    .catch(err => console.error(err))
    .finally(() => closePool() )