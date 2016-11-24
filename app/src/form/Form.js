import FusionForm from "src/form/components/FusionForm";
import FusionFormService from 'src/form/services/FusionFormService';

export default angular
    .module("form", ['ngMaterial'])
    .component(FusionForm.name, FusionForm.config)

    .service("FusionFormService", FusionFormService);