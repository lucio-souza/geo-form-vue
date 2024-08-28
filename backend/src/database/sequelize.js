import { Sequelize } from 'sequelize';

// Cria uma instância do Sequelize com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // O arquivo SQLite que armazenará os dados
});

// Testa a conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;