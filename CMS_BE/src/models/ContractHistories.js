import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';

const ContractHistory = sequelize.define(
  'ContractHistory',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    action_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    detail: DataTypes.JSON,
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractHistories', timestamps: false },
);

ContractHistory.belongsTo(Contract, { foreignKey: 'contract_id' });

export default ContractHistory;
