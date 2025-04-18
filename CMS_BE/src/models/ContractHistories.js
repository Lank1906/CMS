import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';
import User from './Users.js';

const ContractHistory = sequelize.define(
  'ContractHistory',
  {
    history_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    action_by: { type: DataTypes.INTEGER, allowNull: false },
    action_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    note: DataTypes.JSON,
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractHistories', timestamps: false },
);

ContractHistory.belongsTo(Contract, { foreignKey: 'contract_id' });
ContractHistory.belongsTo(User, { foreignKey: 'action_by' });

export default ContractHistory;
