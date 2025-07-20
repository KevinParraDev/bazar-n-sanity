import { initDB } from '../utils/db';

export const createUserWallet = async (userId: number) => {
  const db = await initDB();
  await db.run(
    'INSERT INTO user_wallet (user_id, wumpa, gem, golden, relic) VALUES (?, ?, ?, ?, ?)',
    userId, 300, 5, 0, 5 // valores por defecto
  );
};

export const getUserWallet = async (userId: number) => {
  const db = await initDB();
  return db.get('SELECT * FROM user_wallet WHERE user_id = ?', userId);
};

export const updateUserCurrency = async (
  userId: number,
  type: 'wumpa' | 'gem' | 'golden' | 'relic',
  amount: number
) => {
  const db = await initDB();
  await db.run(`UPDATE user_wallet SET ${type} = ? WHERE user_id = ?`, amount, userId);
};


export const updateUserWallet = async (
  userId: number,
  wallet: { wumpa: number; gem: number; golden: number; relic: number }
) => {
  const db = await initDB();
  await db.run(
    `UPDATE user_wallet SET wumpa = ?, gem = ?, golden = ?, relic = ? WHERE user_id = ?`,
    wallet.wumpa,
    wallet.gem,
    wallet.golden,
    wallet.relic,
    userId
  );
};
