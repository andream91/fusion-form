class FusionFormService {
    constructor($http) {
        var self = this;
        self.$http = $http;

        self.credentials = btoa("neo4j:password");

        self.runQuery = function (currentTab, chromosome, gene, fusion, exon, transcript) { // una funzione per ogni caso o 5 return con switch (su currentTab)
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
                            /*"statement": "query{lola}",
                            "parameters": {
                                "lola": query.lola
                            }*/
                            "statement": "match(a) return a limit 5"
                        }
                    ]
                }
            }).then(self.dataRetrieved)
        }
        self.dataRetrieved = function (data) {
            console.log(data);
            return data;
        }
    }

}

export default FusionFormService;