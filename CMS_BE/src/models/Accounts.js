import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Account = sequelize.define(
  'Account',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    company: { type: DataTypes.STRING(100), allowNull: false },
    contact_person: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false },
    phone: DataTypes.STRING(10),
    url: DataTypes.STRING,
    address: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'Accounts', timestamps: false },
);

export default Account;
