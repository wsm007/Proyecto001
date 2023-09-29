import bcrypt from 'bcrypt';
import { sql, getConnection } from '../../db.js';

export const signin = async (req, res) => {
  const {Email, Password } = req.body;

  // Conexion a la base de datos
  const pool = await getConnection();

  // Ejecutar el procedimiento almacenado
  const result = await pool.request()
  .input('Email', sql.VarChar(50), Email)
  .execute('dbsSeg.usp_Usuario_SignIn')

  if (!result.recordset[0]) {
    return res.status(400).json({
      message: "El correo indicado no está registrado."
    })
  }

  // Validar la contraseña
  const validPassword = await bcrypt.compare(Password, result.recordset[0].Password);

  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña no es correcta"
    })
  }

  if (result.recordset[0].RegistroActivo == 0) {
    return res.status(400).json({
      message: "El usuario está inactivo."
    })
  }

  // Cerrar la conexión a la base de datos
  pool.close();

  return res.status(200).json({
    message: 'Bienvenido ' + result.recordset[0].Nombre
  })
}

export const signup = async (req, res, next) => {

  const {Nombre, Email, Password, ConfirmPassword, UsuarioTipo, Estado, FechaAlta, RegistroActivo, FechaActualizacion, UsuarioActualizacion } = req.body;

  //FechaActualizacion = FechaActualizacion.toISOString().slice(0, 19).replace('T', ' ');

  // Validar que las contraseñas coincidan
  if (Password != ConfirmPassword) {
    return res.status(400).json({
      Mensaje: "Las contraseñas no coinciden"
    })
  }

  // Encriptar la contraseña
  const hashPassword = await bcrypt.hash(Password, 10);

  try {
    // Conexion a la base de datos
    const pool = await getConnection();

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
    .input('Nombre', sql.VarChar(50), Nombre)
    .input('Email', sql.VarChar(50), Email)
    .input('Password', sql.VarChar(256), hashPassword)
    .input('UsuarioTipo', sql.VarChar(1), UsuarioTipo)
    .input('Estado', sql.VarChar(1), Estado)
    .input('FechaAlta', sql.DateTime, FechaAlta)
    .input('RegistroActivo', sql.Int, RegistroActivo)
    .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
    .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
    .output('UsuarioId', sql.Int)
    .execute('dbsSeg.usp_Usuario_SignUp')

    // Cerrar la conexión a la base de datos
    pool.close();

    return res.status(200).json({
      Mensaje: "Usuario creado correctamente",
    })

  } catch (error) {
    if (error.number == 2601) {
      return res.status(409).json({
        Mensaje: "El usuario ya existe"
      })
    }

    next(error);
  }
}

export const signout = (req, res) => {

  return res.status(200).json({
    Mensaje: "Sesión cerrada."
  })
}

export const profile = async (req, res) => {

  // Conexion a la base de datos
  const pool = await getConnection();

  // Ejecutar el procedimiento almacenado
  const result = await pool.request()
  .input('UsuarioId', sql.Int, req.UsuarioId)
  .execute('dbsSeg.usp_Usuario_ReadById')

  return res.status(200).json(result.recordset[0])
}
