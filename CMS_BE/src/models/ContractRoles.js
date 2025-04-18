import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ContractRole = sequelize.define(
  'ContractRole',
  {
    contract_role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_role_name: { type: DataTypes.STRING(20), allowNull: false },
    level: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractRoles', timestamps: false },
);

export default ContractRole;
