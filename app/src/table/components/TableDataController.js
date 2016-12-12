class TableDataController {

    /** Costruttore
     * 
     * @param $log
     */
    constructor($http, $routeParams, $log, $mdDialog, FusionFormService) {
        var self = this;
        self.$log = $log;

        self.selected = [];
        self.selectedIndex = 0;
        self.config = {};
        self.rows = [];

        self.query = {
            //'file': $routeParams.filename,
            'cell_line': ".*",
            'limit': 5,
            'page': 1,
            'skip': 0,
            'gene1_symbol': ".*",
            'gene2': 1,
            'fusion': 1,
            'chromosome1': 1,
            'chromosome2': 1,
            'transcript1': 1,
            'transcipt2': 1,
            'exon1': 1,
            'exon2': 1
        };


        console.log($routeParams);

        // Caricamento del file di config
        $http.get('src/table/config/table.config.json')
            .then(

            function (response) {
                console.log("Loaded tableData configuration file");
                self.config = response.data;

                self.promise = FusionFormService.runQuery(self.query, self.config).then(function (data) {
                    self.processDataForVisualization(data);
                }).catch(function () { console.log('Some error occurred') });

                console.log(self.config);
            },

            function (error) {
                console.log("Some error occurred");
            }

            );




        self.getElems = function () {
            console.log('Getting elements');
            self.query.skip = self.query.limit * (self.query.page - 1);

            self.promise = FusionFormService.runQuery(self.query, self.config).then(function (data) {
                self.processDataForVisualization(data);
            }).catch(function () { console.log('Some error occurred') });
        };

        self.processDataForVisualization = function (data) {
            self.data = data;

            self.template = self.config.row.join("\n");


            /*
                        for( var i = 0; i < data.variants.length; i++) {
                            self.rows.push({
                                "data": self.data.variants[i],
                                "row": $interpolate(template)(self.data.variants[i])
                            });
                        }
            */
            console.log(self.data)

        }

        self.getSamples = function () {
            self.displayed_samples = self.selected.genotypes.slice(5 * (self.genotypes_page - 1), Math.min(self.selected.genotypes.length, 5 * (self.genotypes_page - 1) + 5));
            console.log("Showing more samples");
            console.log(self.displayed_samples);
        };

        // Metodo chiamato per visualizzare le annotazioni di una particolare variante
        self.showAnnotations = function ($event, selected) {

            self.selected = selected;
            self.genotype_headers = selected.variant.FORMAT.split(':');
            self.genotypes_page = 1;
            self.displayed_samples = self.selected.genotypes.slice(5 * (self.genotypes_page - 1), Math.min(self.selected.genotypes.length, 5 * (self.genotypes_page - 1) + 5));

            var annotationDialog = {
                fullscreen: true,
                autowrap: false,
                parent: angular.element(document.body),
                targetEvent: $event,
                templateUrl: './src/table/components/AnnotationDialog.html',
                clickOutsideToClose: true,
                controller: () => self,
                controllerAs: '$ctrl'
            }

            $mdDialog.show(annotationDialog)
                .finally(function () {
                    console.log("Dialog closed.");
                    self.selected = null;
                    self.genotype_headers = null;
                    self.displayed_samples = null;
                    self.genotypes_page = 1;
                })
        };

        self.closeDialog = function () {
            $mdDialog.hide();
        };
    }

}

export default TableDataController;