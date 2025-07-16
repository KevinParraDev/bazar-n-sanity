import { initDB } from '../utils/db';

/**
 * Crea un nuevo usuario en la base de datos
 */
export const createUser = async (email: string, password: string) => {
  try {
    const db = await initDB();
    const result = await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      email,
      password
    );
    console.log('✅ Usuario insertado en la BD con ID:', result.lastID);
    return result.lastID;
  } catch (error) {
    console.error('❌ Error al insertar usuario:', error);
    throw error;
  }
};

/**
 * Busca un usuario por su email (para login o validación)
 */
export const findUserByEmail = async (email: string) => {
  try {
    const db = await initDB();
    const user = await db.get('SELECT * FROM users WHERE email = ?', email);
    console.log('🔍 Usuario buscado por email:', email, '->', user ? 'Encontrado' : 'No encontrado');
    return user;
  } catch (error) {
    console.error('❌ Error al buscar usuario por email:', error);
    throw error;
  }
};
export const deleteAllUsers = async () => {
  const db = await initDB();
  await db.run('DELETE FROM users');
  console.log('🧹 Todos los usuarios han sido eliminados de la tabla.');
};