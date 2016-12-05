import FusionFormService from 'src/form/services/FusionFormService';

import TableData from 'src/table/components/TableData';


// Definizione del modulo Angular 'Table'

export default angular
    .module("table", ['ngMaterial', 'ngRoute', 'angular-bind-html-compile', 'md.data.table'])

    .component(TableData.name, TableData.config)
    
    .service("FusionFormService", FusionFormService);

