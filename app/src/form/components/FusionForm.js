import FusionFormController from './FusionFormController';
import FusionFormService from './../services/FusionFormService';

export default {
    name : 'fusionForm',
    config: {
        bindings: {data: '<'},
        templateUrl: 'src/form/templates/FusionForm.html',
        controller: ['$http','FusionFormService', FusionFormController]
    }
};