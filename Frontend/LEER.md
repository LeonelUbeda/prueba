En App.vue está esto:
<router-view></router-view>
Esto es que renderiza el componente segun la ruta actual del navegador.
Esta configuración está en /Frontend/Router/index.js
Simplemente es un arreglo de objetos ruta

Para que la aplicación y las rutas funcionan correctamente, se tiene que hacer que en cualquier ruta, se mande el mismo html y js. Osea, mandar el layout main.
La verdad es que ya ni necesitamos Handlebars así que estaría modificando eso en otro momento. 
Falta hacer el componente de Barra de busqueda, sinceramente no sé como hacerlo así que ahí te lo dejo Carlos. Espero entendas mi forma de trabajo, la verdad creo que así está bien :v




A los componentes se le pasan los props por medio de v-bind:NombreDelProp="ValorEnJavascript"
si queres que sean textos planos, se pasa por NombreDelProp="TextoPlano"


v-bind:key
    Ni siquiera se que es y para que sirve.
    Pero el editor de texto me lo recomendaba asi que lo utilice en el loop del componente Tabla.
    