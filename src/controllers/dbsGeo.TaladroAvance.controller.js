import { sql, getConnection } from '../db.js';

export const getTaladroAvances = async (req, res) => {
    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .input('TaladroId', sql.Int, req.params.TaladroId)
      .execute('dbsGeo.usp_TaladroAvance_Read')

    res.status(200).json({
      Registros: result.rowsAffected[0] ,
      Mensaje: "Avances obtenidos"
    })

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const getTaladroAvance = async (req, res) => {

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
        .input('TaladroAvanceId', sql.Int, req.params.TaladroAvanceId)
        .execute('dbsGeo.usp_TaladroAvance_ReadById')

    // Verificar si el TaladroAvance existe
    if (result.rowsAffected[0] == 0) {
      res.status(404).json({
          Mensaje: "Avance no encontrado"
      })
    } else {
      res.status(200).json({
        Registros: result.rowsAffected[0],
        Mensaje: "Avance obtenido"
      })
    }

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const createTaladroAvance = async (req, res, next) => {

    try {
      // Obtener los datos enviados desde el cliente
      const {TaladroId, Fecha, Turno, TipoDiametro, Desde, Hasta, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

      // Conexion a la base de datos
      const pool = await getConnection()

      // Ejecutar el procedimiento almacenado
      const result = await pool.request()
        .input('TaladroId', sql.Int, TaladroId)
        .input('Fecha', sql.Date, Fecha)
        .input('Turno', sql.VarChar(1), Turno)
        .input('TipoDiametro', sql.Int, TipoDiametro)
        .input('Desde', sql.Decimal(9, 2), Desde)
        .input('Hasta', sql.Decimal(9, 2), Hasta)
        .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
        .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
        .output('TaladroAvanceId', sql.Int)
        .execute('dbsGeo.usp_TaladroAvance_Create')

      res.status(200).json({
        Id: result.output.TaladroAvanceId,
        Registros: result.rowsAffected[0],
        Message: "El Avance se creó correctamente"
      })

      // Cerrar la conexión a la base de datos
      pool.close();

    } catch (error) {
      if (error.number == 2601) {
          return res.status(409).json({
              message: "El Avance ya existe"
          })
      }
      next(error);
    }

}

export const updateTaladroAvance = async(req, res, next) => {

  try {
    // Obtener los datos enviados desde el cliente
    const {TaladroId, Fecha, Turno, TipoDiametro, Desde, Hasta, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
      .input('TaladroAvanceId', sql.Int, req.params.TaladroAvanceId)
      .input('TaladroId', sql.Int, TaladroId)
      .input('Fecha', sql.Date, Fecha)
      .input('Turno', sql.VarChar(1), Turno)
      .input('TipoDiametro', sql.Int, TipoDiametro)
      .input('Desde', sql.Decimal(9, 2), Desde)
      .input('Hasta', sql.Decimal(9, 2), Hasta)
      .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
      .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
      .execute('dbsGeo.usp_TaladroAvance_Update')

    // Verificar si la TaladroAvance existe
    if (result.rowsAffected[0] == 0) {
      res.status(404).json({
          Mensaje: "Avance no encontrado"
      })
    } else {
      res.status(200).json({
          Id: result.output.TaladroAvanceId,
          Registros: result.rowsAffected[0],
          Message: "El Avance se actualizó correctamente"
      })
    }

    // Cerrar la conexión a la base de datos
    pool.close();

  } catch (error) {
    if (error.number == 2601) {
      return res.status(409).json({
          message: "El TaladroAvance ya existe"
      })
    }
    next(error);
  }

}

export const deleteTaladroAvance = async (req, res) => {
  // Conexion a la base de datos
  const pool = await getConnection()

  // Ejecutar el procedimiento almacenado
  const result = await pool.request()
    .input('TaladroAvanceId', sql.Int, req.params.TaladroAvanceId)
    .execute('dbsGeo.usp_TaladroAvance_Delete')

  // Verificar si el TaladroAvance existe
  if (result.rowsAffected[0] == 0) {
    res.status(404).json({
        message: "Avance no encontrado"
    })
  } else {
    res.status(200).json({
      Id: result.output.TaladroAvanceId,
      Registros: result.rowsAffected[0],
      Message: "El Avance se eliminó correctamente"
    })
  }

  // Cerrar la conexión a la base de datos
  pool.close();
}
