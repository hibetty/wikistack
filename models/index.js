var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page =  db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: Sequelize.ENUM('open', 'closed')
}, {
  getterMethods: { route: function(){ return '/wiki/' + this.urlTitle + '/'; }}
});

var User =  db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false, validate: {isAlpha: true} },
  email: { type: Sequelize.STRING, allowNull: false, validate: {isEmail: true} }
});

module.exports = {
  Page: Page,
  User: User,
  db: db
};
