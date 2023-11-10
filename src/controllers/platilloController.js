const { Platillo, Restaurante, CategoriaPlatillo, CategoriaRestaurante } = require("../db")
const categoriaplatillo = require("../models/categoriaplatillo")

const crearPlatillo = async ( platillo ) => {
   
    const { categoriaId, nombre, descripcion, precio, foto, promo ,stock } = platillo

    const infoPlatillo = {
            nombre,
            descripcion,
            precio,
            foto,
            promo,
            stock   
        }
  
        const categoria = await CategoriaPlatillo.findByPk(categoriaId)

        if(!categoria) return "La categoría no existe"
        
        const nuevoPlatillo = await Platillo.create(infoPlatillo);
        await categoria.addPlatillo(nuevoPlatillo)

        return true
}

const actualizarPlatillo = async( platillo ) => {

    const { id, nombre, descripcion, precio , foto , promo , stock  , activo  } = platillo

        const platilloDb = await Platillo.findByPk(id);
        if(!platilloDb){
            throw new Error(`no se encontro platillo con id ${id}`)
        }
            
        const updates = {
            nombre,
            descripcion,
            foto,
            promo,
            stock,
            activo,
            precio
        }
        
        await platilloDb.update(updates);
        return true
  
}

const getPlatillos = async ( rest ) => {

    try {            
        const platillosPorCategoria = []

        for (let i = 0; i < rest.length; i++) {
        const categoriaId = rest[i];
        const platillos = await Platillo.findAll({
            where: {
            CategoriaPlatilloId: categoriaId,
            },include: CategoriaPlatillo
        });
        platillosPorCategoria.push(platillos);
        }

        return platillosPorCategoria

    } catch (error) {
        return error   
    }
}

const todosPlatillos = async () =>{
    let platillos = await Platillo.findAll()

    return platillos
}


module.exports = {
    crearPlatillo,
    actualizarPlatillo,
    getPlatillos,
    todosPlatillos
}