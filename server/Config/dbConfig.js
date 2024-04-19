module.exports = {
	host: "localhost",
	user: "root",
	password: "",
	database: "o2s",
	dialect: "mysql",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
