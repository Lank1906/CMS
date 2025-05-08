import Account from '../models/Accounts.js';

class AccountServce {
  static async hardRemove(id) {
    const acc = await Account.findByPk(id);
    if (!acc) {
      throw new Error('Account not found');
    }
    await acc.destroy();
    return 'Account delete successfully';
  }
  static async softRemove(id) {
    const acc = await Account.findByPk(id);
    if (!acc) {
      throw new Error('Account not found');
    }
    await acc.update({
      is_active: false,
    });
    return 'Account remove successfully';
  }
}
export default AccountServce;
