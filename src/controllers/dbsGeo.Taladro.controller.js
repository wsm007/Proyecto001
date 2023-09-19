import sql from 'mssql';
import { getConnection } from '../db.js';
import boom from '@hapi/boom';


export const getTaladros = async (req, res, next) => {
    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
        .execute('dbsGeo.usp_Taladro_Read')

    console.log(result.rowsAffected[0])

    res.status(200).json({
      filas: result.rowsAffected[0] ,
      message: "Taladros obtenidos"
    })

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const getTaladro = async (req, res) => {

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
        .input('TaladroId', sql.Int, req.params.id)
        .execute('dbsGeo.usp_Taladro_ReadById')

    console.log(result)

    // Verificar si el Taladro existe
    if (result.rowsAffected[0] == 0) {
        // res.status(404).json({
        //     message: "Taladro no encontrada"
        // })
        boom.notFound('Taladro no encontrado');
        // throw boom.notFound('Taladro no encontrado');
    } else {
        res.status(200).json({
          filas: result.rowsAffected[0]
        })
    }

    // Cerrar la conexión a la base de datos
    pool.close();
}

export const createTaladro = async (req, res, next) => {

    // Obtener los datos enviados desde el cliente
    const {Codigo, Descripcion, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

    try {
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

        res.json(result.output.TaladroId)

        // Cerrar la conexión a la base de datos
        pool.close();

    } catch (error) {
        if (error.number == 2601) {
            // return res.status(409).json({
            //     message: "El Taladro ya existe"
            // })
            boom.conflict('El Taladro ya existe');
            // throw boom.conflict('El Taladro ya existe');
        }
        next(error);
        //return res.send('Problemas con la BD al crear la Taladro');
    }

}

export const updateTaladro = async(req, res) => {

    const {Codigo, Descripcion, RegistroActivo, FechaActualizacion, UsuarioActualizacion} = req.body;

    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
        .input('TaladroId', sql.Int, req.params.id)
        .input('Codigo', sql.VarChar(30), Codigo)
        .input('Descripcion', sql.VarChar(400), Descripcion)
        .input('RegistroActivo', sql.Int, RegistroActivo)
        .input('FechaActualizacion', sql.DateTime, FechaActualizacion)
        .input('UsuarioActualizacion', sql.VarChar(50), UsuarioActualizacion)
        .execute('dbsGeo.usp_Taladro_Update')

    console.log(result)

    // Verificar si la Taladro existe
    if (result.rowsAffected[0] == 0) {
        // res.status(404).json({
        //     message: "Taladro no encontrado"
        // })
        boom.notFound('Taladro no encontrado');
        // throw boom.notFound('Taladro no encontrado');
    } else {
        res.status(200).json({
            message: "Taladro actualizada exitosamente"
        })
    }-

    // Cerrar la conexión a la base de datos
    pool.close();

}

export const deleteTaladro = async (req, res) => {
    // Conexion a la base de datos
    const pool = await getConnection()

    // Ejecutar el procedimiento almacenado
    const result = await pool.request()
        .input('TaladroId', sql.Int, req.params.id)
        .execute('dbsGeo.usp_Taladro_Delete')

    console.log(result.rowsAffected[0])

    // Verificar si el Taladro existe
    if (result.rowsAffected[0] == 0) {
        // res.status(404).json({
        //     message: "Taladro no encontrado"
        // })
        boom.notFound('Taladro no encontrado');
        // throw boom.notFound('Taladro no encontrado');
    } else {
        res.status(204).json({
          filas: result.rowsAffected[0] ,
          message: "Taladro eliminado exitosamente"
        })
    }

    // Cerrar la conexión a la base de datos
    pool.close();
}
