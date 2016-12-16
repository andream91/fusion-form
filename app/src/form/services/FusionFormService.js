class FusionFormService {
    constructor($http) {
        var self = this;
        self.$http = $http;

        self.credentials = btoa("neo4j:password");

        self.runQuery = function (query, config) { // una funzione per ogni caso o 5 return con switch (su currentTab)
            //console.log(currentTab);
            //SOSTITUIRE CAMPI VUOTI CON .*
            return $http({
                method: 'POST',
                url: 'http://localhost:7474/db/data/transaction/commit',
                headers: {
                    'Authorization': 'Basic ' + self.credentials,
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'X-Stream': true
                },
                data: {
                    "statements": [
                        {

                            "statement": config.queries["fusion"]["fusion_predicted_effect_1_defined_2_defined"].join(" "),

                            "parameters": {
                                "query": query
                            }

                        }
                    ]
                }
            }).then(self.dataRetrieved)
        }
        self.dataRetrieved = function (response) {
            console.log(response);
            var data = {
                count: 0,
                elements: []
            };

            data.count = response.data.results[0].data[0].row[0].total;

            for (var idx = 0; idx < response.data.results[0].data.length; idx++) {

                data.elements.push({
                    cell_line: response.data.results[0].data[idx].row[0].cell_line,
                    gene1: response.data.results[0].data[idx].row[0].gene1,
                    gene2: response.data.results[0].data[idx].row[0].gene2,
                    fusion: response.data.results[0].data[idx].row[0].fusion,
                    chromosome1: response.data.results[0].data[idx].row[0].chromosome1,
                    chromosome2: response.data.results[0].data[idx].row[0].chromosome2,
                    couple_tp: response.data.results[0].data[idx].row[0].couple_tp,
                    exon1: response.data.results[0].data[idx].row[0].exon1,
                    exon2: response.data.results[0].data[idx].row[0].exon2
                })
            }

            return data;
        }
    }

}

export default FusionFormService;