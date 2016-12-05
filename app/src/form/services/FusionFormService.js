class FusionFormService {
    constructor($http) {
        var self = this;
        self.$http = $http;

        self.credentials = btoa("neo4j:password");

        self.runQuery = function (query) { // una funzione per ogni caso o 5 return con switch (su currentTab)
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
                            "statement": "match (c:CellLine)-[:HAPPEN]->(f:Fusion) where c.cell_line=~'.*' with c,f order by ID(f) skip {skip} limit {limit} match (f)-[:AT_CHROMOSOME]->(ch:Chromosome),(g1:Gene)-[:HAD]->(f)-[:WITH]->(g2:Gene) where ch.id=~'.*' and ((f.fusion_point_1>='0' and f.fusion_point_1<='999999999') or (f.fusion_point_2>='0' and f.fusion_point_2<='999999999'))  optional match (f)-[:WITH_TRANSCRIPT]->(t1:Transcript)-[:IN_COUPLE]->(co:Couple)-[:WITH_OTHER_TRANSCRIPT]->(t2:Transcript) optional match (f)-[:AT_EXON]->(e1:Exon)-[:IN_GENE]->(g1),(f)-[:AT_EXON]->(e2:Exon)-[:IN_GENE]->(g2) optional match (t1)-[:WITH_PROTEIN]->(p:Protein), (t2)-[:WITH_PROTEIN]->(p) return {cell: c, fusion: f,chromosome: ch, gene1: g1, gene2: g2, transcript1: t1, transcript2: t2, exon1:e1, exon2: e2, protein: p}, count(f) as total",
                            "parameters" : {
                                'skip': query.skip,
                                'limit': query.limit
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
                    gene1: response.data.results[0].data[idx].row[0].gene1,
                    gene2: response.data.results[0].data[idx].row[0].gene2,
                    fusion: response.data.results[0].data[idx].row[0].fusion,
                    chromosome: response.data.results[0].data[idx].row[0].chromosome,
                    transcript1: response.data.results[0].data[idx].row[0].transcript1,
                    transcript2: response.data.results[0].data[idx].row[0].transcript2,
                    exon1: response.data.results[0].data[idx].row[0].exon1,
                    exon2: response.data.results[0].data[idx].row[0].exon2,
                    protein: response.data.results[0].data[idx].row[0].protein
                })
            }

            return data;
        }
    }

}

export default FusionFormService;