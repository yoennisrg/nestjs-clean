/**
 * Model.paginate([consulta], [opciones], [devolución de llamada]) ==> promesa de devoluciones

Parámetros

[query]{Objeto} - Criterios de consulta. 
[options] {Objeto}
---------------------------------------------
[select]{Objeto | String} - Campos a devolver (por defecto devuelve todos los campos). https://mongoosejs.com/docs/api.html#query_Query-select
[collation]{Objeto} - Especifique la documentación de colación https://docs.mongodb.com/manual/reference/collation/
[sort]{Objeto | Cadena} - Orden de clasificación. https://mongoosejs.com/docs/api.html#query_Query-sort
[populate]{matriz | Objeto | String}: rutas que deben completarse con otros documentos. https://mongoosejs.com/docs/api.html#query_Query-populate
[projection]{Object | null} - Obtener/establecer la proyección de la consulta. https://mongoosejs.com/docs/api/query.html#query_Query-projection
[lean=false]{Boolean} - ¿Deberían devolverse objetos javascript simples en lugar de documentos Mongoose? https://mongoosejs.com/docs/api.html#query_Query-lean
[leanWithId=true]{Booleano}: si leany leanWithIdson true, agrega idun campo con una representación de cadena de _idcada documento
[offset=0]{Número}: use offseto pagepara establecer la posición de salto
[page=1] {Número}
[limit=10] {Número}
[customLabels] {Objeto}: los desarrolladores pueden proporcionar etiquetas personalizadas para manipular los datos de respuesta.
[pagination]{Booleano}: si paginationse establece en falso, devolverá todos los documentos sin agregar una condición de límite. (Predeterminado: Verdadero)
[useEstimatedCount]{Booleano}: habilite la cantidad estimada de documentos para conjuntos de datos más grandes. No cuenta según la consulta dada, por lo que el recuento coincidirá con el tamaño de la colección completa. (Predeterminado: Falso)
[useCustomCountFn]{Booleano}: habilite la función personalizada para conjuntos de datos de conteo. (Predeterminado: Falso)
[forceCountFn]{Booleano}: configúrelo en verdadero, si necesita admitir consultas de $geo. (Predeterminado: Falso)
[allowDiskUse]{Booleano}: establezca esto en verdadero, lo que permite que el servidor MongoDB use más de 100 MB para la consulta. Esta opción puede permitirle solucionar los errores QueryExceededMemoryLimitNoDiskUseAllowed del servidor MongoDB. (Predeterminado: Falso)
[read]{Objeto}: determina los nodos de MongoDB desde los que leer. A continuación se muestran las opciones disponibles.
      [pref]: una de las opciones de preferencia o alias enumerados.
      [tags]: etiquetas opcionales para esta consulta. (Debe usarse con [pref])
[options]{Object} - Opciones pasadas a la find()función de Mongoose. https://mongoosejs.com/docs/api.html#query_Query-setOptions

Promesa cumplida con objeto que tiene propiedades:

docs {Array} - Matriz de documentos
totalDocs {Número}: número total de documentos en la colección que coinciden con una consulta
limit {Número} - Límite que se usó
hasPrevPage {Bool} - Disponibilidad de la página anterior.
hasNextPage {Bool} - Disponibilidad de la página siguiente.
page {Número} - Número de página actual
totalPages {Número} - Número total de páginas.
offset{Número}: solo si se usaron valores page/ predeterminados o especificadosoffset
prevPage {Número} - Número de página anterior si está disponible o NULL
nextPage {Número} - Número de página siguiente si está disponible o NULL
pagingCounter{Número}: el número inicial de índice/serie/cronológico del primer documento en la página actual. (Por ejemplo: si la página = 2 y el límite = 10, entonces pagingCounter será 11)
meta {Objeto}: objeto de metadatos de paginación (falso predeterminado). */

export type QueryPagination = Record<string, any>;

export class OptionsPagination {
  readonly select: Record<string, number> | string | string[];
  readonly collation: Record<string, any>;
  readonly sort:
    | Record<string, 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1>
    | string;
  readonly populate: Record<string, any> | string;
  readonly projection: Record<string, any> | null;
  readonly lean: boolean;
  readonly leanWithId: boolean;
  readonly offset: number;
  readonly page: number;
  readonly limit: number;
  readonly customLabels: Record<string, string>;
  readonly pagination: boolean;
  readonly useEstimatedCount: boolean;
  readonly useCustomCountFn: boolean;
  readonly forceCountFn: boolean;
  //readonly allowDiskUse: boolean;
  readonly read: {
    readonly pref: string;
    readonly tags: any[];
  };
  readonly options: Record<string, any>;
}
