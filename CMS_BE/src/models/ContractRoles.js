import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ContractRole = sequelize.define(
  'ContractRole',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(20), allowNull: false },
    level: {
      type: DataTypes.ENUM('Fresher', 'Junior', 'Developer', 'Senior'),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractRoles', timestamps: false },
);

export default ContractRole;
