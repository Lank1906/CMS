import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Contract from './Contracts.js';
import User from './Users.js';
import ContractRole from './ContractRoles.js';

const ContractStaff = sequelize.define(
  'ContractStaff',
  {
    contract_staff_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    contract_role_id: { type: DataTypes.INTEGER, allowNull: false },
    assigned_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { tableName: 'ContractStaffs', timestamps: false },
);

ContractStaff.belongsTo(Contract, { foreignKey: 'contract_id' });
ContractStaff.belongsTo(User, { foreignKey: 'user_id' });
ContractStaff.belongsTo(ContractRole, { foreignKey: 'contract_role_id' });

export default ContractStaff;
