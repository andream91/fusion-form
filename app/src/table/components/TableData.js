import TableDataController from './TableDataController';
import FusionFormService from './../../form/services/FusionFormService';

export default {
    name : 'tableData',
    config : {
        bindings: {data: '<'},
        templateUrl: 'src/table/components/TableData.html',
        controller: ['$http', '$routeParams', '$log', '$mdDialog', 'FusionFormService', TableDataController ]
    }
};