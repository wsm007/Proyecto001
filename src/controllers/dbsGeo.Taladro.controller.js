import { sql, getConnection } from '../db.js';

export const getTaladros = async (req, res) => {
    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .execute('dbsGeo.usp_Taladro_Read')

    res.status(200).json({
      Registros: result.rowsAffected[0] ,
      Mensaje: "Taladros obtenidos"
    })

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const getTaladro = async (req, res) => {

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .input('TaladroId', sql.Int, req.params.TaladroId)
      .execute('dbsGeo.usp_Taladro_ReadById')

    // Verificar si el Taladro existe
    if (result.rowsAffected[0] == 0) {
      res.status(404).json({
          Mensaje: "Taladro no encontrada"
      })
    } else {
      res.status(200).json({
        Registros: result.rowsAffected[0],
        Mensaje: "Taladro obtenido"
      })
    }

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const createTaladro = async (req, res, next) => {

  try {
    // Obtener los datos enviados desde el cliente
    const {Codigo, Descripcion, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .input('Codigo', sql.VarChar(30), Codigo)
      .input('Descripcion', sql.VarChar(400), Descripcion)
      .input('RegistroActivo', sql.Int, RegistroActivo)
      .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
      .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
      .output('TaladroId', sql.Int)
      .execute('dbsGeo.usp_Taladro_Create')

    res.status(200).json({
      Id: result.output.TaladroId,
      Registros: result.rowsAffected[0],
      Message: "El Taladro se creó correctamente"
    })

    // Cerrar la conexión a la base de datos
    pool.close();

  } catch (error) {
    if (error.number == 2601) {
        return res.status(409).json({
            message: "El Taladro ya existe"
        })
    }
    next(error);
  }

}

export const updateTaladro = async(req, res, next) => {

  try {
    // Obtener los datos enviados desde el cliente
    const {Codigo, Descripcion, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .input('TaladroId', sql.Int, req.params.TaladroId)
      .input('Codigo', sql.VarChar(30), Codigo)
      .input('Descripcion', sql.VarChar(400), Descripcion)
      .input('RegistroActivo', sql.Int, RegistroActivo)
      .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
      .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
      .execute('dbsGeo.usp_Taladro_Update')

    // Verificar si la Taladro existe
    if (result.rowsAffected[0] == 0) {
      res.status(404).json({
          Mensaje: "Taladro no encontrado"
      })
    } else {
      res.status(200).json({
          Id: result.output.TaladroId,
          Registros: result.rowsAffected[0],
          Message: "El Taladro se actualizó correctamente"
      })
    }

    // Cerrar la conexión a la base de datos
    pool.close();

  } catch (error) {
    if (error.number == 2601) {
      return res.status(409).json({
          message: "El Taladro ya existe"
      })
    }
    next(error);
  }

}

export const deleteTaladro = async (req, res) => {
  // Conexion a la base de datos
  const pool = await getConnection()

  // Ejecutar el procedimiento almacenado
  const result = await pool.request()
    .input('TaladroId', sql.Int, req.params.TaladroId)
    .execute('dbsGeo.usp_Taladro_Delete')

  // Verificar si el Taladro existe
  if (result.rowsAffected[0] == 0) {
    res.status(404).json({
        message: "Taladro no encontrado"
    })
  } else {
    res.status(200).json({
      Id: result.output.TaladroId,
      Registros: result.rowsAffected[0],
      Message: "El Taladro se eliminó correctamente"
    })
  }

  // Cerrar la conexión a la base de datos
  pool.close();
}
