import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Account = sequelize.define(
  'Account',
  {
    account_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    company: { type: DataTypes.STRING(100), allowNull: false },
    contact_person: DataTypes.STRING(50),
    email: { type: DataTypes.STRING(50), allowNull: false },
    phone: DataTypes.STRING(50),
    web_link: DataTypes.STRING(50),
    address: DataTypes.TEXT,
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Accounts', timestamps: false },
);

export default Account;
