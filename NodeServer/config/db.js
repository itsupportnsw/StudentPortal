'user strict';

var dbConfig = {
	user: require('../config/keys').dbUser,
	password: require('../config/keys').dbPassword,
	database: require('../config/keys').dbDatabase,
	server: require('../config/keys').dbServer
}

module.exports = dbConfig;