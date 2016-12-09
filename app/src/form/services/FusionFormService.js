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
                            "statement": "match (c:CellLine)-[:HAPPEN]->(f:Fusion) where c.cell_line=~'CCLE_095' with c,f order by ID(f) match (g1:Gene)-[:HAD]->(f)-[:WITH]->(g2:Gene)  where (g1.symbol=~'KMT2A' and g1.gene_id=~'.*' and g1.fusion_partner='5end') and (g2.symbol=~'.*' and g2.gene_id=~'.*' and g2.fusion_partner='3end') optional match (f)-[:AT_CHROMOSOME]->(ch1:Chromosome)-[:OF_GENE]->(g1),(f)-[:AT_CHROMOSOME]->(ch2:Chromosome)-[:OF_GENE]->(g2) optional match (f)-[:WITH_TRANSCRIPT]->(t1:Transcript)-[:IN_COUPLE]->(co:Couple)-[:WITH_OTHER_TRANSCRIPT]->(t2:Transcript),(f)-[:WITH_TRANSCRIPT]->(t2),(co)-[:IN_FUSION]->(f) optional match (f)-[:AT_EXON]->(e1:Exon)-[:IN_GENE]->(g1),(f)-[:AT_EXON]->(e2:Exon)-[:IN_GENE]->(g2) optional match (t1)-[:WITH_PROTEIN]->(p:Protein), (t2)-[:WITH_PROTEIN]->(p),(p)-[:P_IN_FUSION]->(f) with f,co,c,ch1,ch2,g1,g2,e1,e2,collect([p]) as proteins,collect([t1,t2]) as couple_t return {cell: c, fusion: f,chromosome1:ch1,chromosome2:ch2, gene1: g1, gene2: g2, exon1: e1, exon2:e2, protein:proteins, couple_t:couple_t}",
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
                    chromosome1: response.data.results[0].data[idx].row[0].chromosome1,
                    chromosome2: response.data.results[0].data[idx].row[0].chromosome2,
                    couple_t: response.data.results[0].data[idx].row[0].couple_t,
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