
const Tarea = require('./tarea')
var colors = require('colors')

/**
 *  _listado:
 *      { 'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:922231 }'}
 *      { 'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:922231 }'}
 *      { 'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:922231 }'}
 */

class Tareas {

    _listado = {}

    get listadoArr() {
        
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea ( id = '' ){
        if( this._listado[id] ) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log()
        // Object.keys(this._listado).forEach( (key, idx) => {
        //     const tarea = this._listado[key]
        //     console.log( `${colors.green(idx+1)}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red }`)
        // })

        this.listadoArr.forEach( ( tarea, i ) => {
            const idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red

            console.log(`${ idx }. ${ desc } :: ${ estado }`);
        })
    }

    listarPendientesCompletadas( completadas = true ) {
        console.log()
        let idx = 0
        this.listadoArr.forEach( tarea => {
            
            const { desc, completadoEn } = tarea
            const estado = ( completadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red
            completadas 
                ? completadoEn && console.log(`${colors.green(++idx)}. ${ desc } :: ${ completadoEn.green }`)
                : !completadoEn && console.log(`${colors.green(++idx)}. ${ desc } :: ${ estado }`)
        })
    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach ( id => {
            const tarea = this._listado[id]
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach ( tarea => {

            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null
            }

        })


    }

}


module.exports = Tareas