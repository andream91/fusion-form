class FusionFormController {
    constructor($http, FusionFormService) {
        var self = this;
        self.chromosome = {
            chromosome: '',
            line: '',
            strand: '.*',
            start_point: '',
            end_point: ''
        }
        self.gene = {
            query_type: '',
            input1: '',
            input2: '',
            symbol1: '',
            id1: '',
            symbol2: '',
            id2: '',
            line: '',
            end: '.*'
        }
        self.exon = {
            query_type: '',
            id1: '',
            id2: '',
            strand1: '.*',
            strand2: '.*',
            line: '',
            end: '.*'
        }
        self.transcript = {
            query_type: '',
            id1: '',
            id2: '',
            position1: '',
            position2: '',
            strand1: '.*',
            strand2: '.*',
            line: '',
            end: '.*'
        }
        self.fusion = {
            description: '',
            method: '',
            predicted_effect: 'in-frame',
            predicted_effect_gene_1: '',
            predicted_effect_gene_2: '',
            line: ''
        }
        self.query = {
            currentTab: '', 
            chromosome: '', 
            gene: '',
            fusion: '',
            exon: '',
            transcript: ''
        }
        self.methods = ['Any', 'BOWTIE', 'BOWTIE+BLAT', 'BOWTIE+STAR', 'BOWTIE+BOWTIE2', 'BOWTIE+BWA'];
        self.descriptions = ['Any', 'antisense', 'adjacent', 'banned', 'bodymap2', 'cell_lines', 'chimerdb2', 'conjoing', 'cosmic', 'cacg', 'cgp', 'cta_gene', 'ctb_gene', 'ctc_gene', 'ctd_gene', 'distance1000bp', 'distance10kbp', 'distance100kbp', 'duplicates', 'ensembl_fully_overlapping', 'ucsc_fully_overlapping', 'refseq_fully_overlapping', 'gtex', 'healthy', 'hpa', 'known', 'matched-normal', 'partial-matched-normal', 'prostates', 'lincrna', 'metazoa', 'mirna', 'mt', 'non_tumor_cells', 'no_protein_product', 'oncogene', 'pair_pseudo_genes', 'paralogs', 'ensembl_partially_overlapping', 'ucsc_partially_overlapping', 'refseq_partially_overlapping', 'readthrough', 'ribosomal_protein', 'rp11_gene', 'rp_gene', 'rrna', 'ensembl_same_strand_overlapping', 'ucsc_same_strand_overlapping', 'refseq_same_strand_overlapping', 'short_distance', 'similar_reads', 'similar_symbols', 'snorna', 'snrna', 'tcga', 'ticdb', 'trna', 'yrna'];
        self.effects = ['Any', 'intergenic', 'intronic', 'exonic(no-known-CDS)', 'UTR', 'CDS(not-reliable-start-or-end)', 'CDS(truncated)', 'CDS(complete)'];

        self.showSelect = function () {
            var t = document.getElementById("toggle");
            if (self.fusion.predicted_effect == "pair") {
                t.style.display = "block";
                //self.fusion.predicted_effect = '';
            }
            else {
                t.style.display = "none";
                self.fusion.predicted_effect_gene_1 = '';
                self.fusion.predicted_effect_gene_2 = '';
            }
        }

        self.showSelectG = function () {
            var s = document.getElementById("toggle_single_gene");
            var p = document.getElementById("toggle_pair_gene");
            if (self.gene.query_type == "pair") {
                s.style.display = "none";
                p.style.display = "block";
                //Se ho riempito il campo del singolo ed è un 3end, passando alla coppia lo passo nel secondo campo
                if (self.gene.end === "3end") {
                    self.gene.input2 = self.gene.input1;
                    self.gene.input1 = '';
                }
                //pulisco il campo end
                self.gene.end = '.*';
            }
            else {
                s.style.display = "block";
                p.style.display = "none";
                //Pulisco tutti i campi di tutti i geni in ogni caso
                self.gene.input1 = '';
                self.gene.input2 = '';
            }
        }

        self.showSelectE = function () {
            var s = document.getElementById("toggle_single_exon");
            var p = document.getElementById("toggle_pair_exon");
            if (self.exon.query_type == "pair") {
                s.style.display = "none";
                p.style.display = "block";
                //Se ho riempito il campo del singolo ed è un 3end, passando alla coppia lo passo nel secondo campo
                if (self.exon.end === "3end") {
                    self.exon.id2 = self.exon.id1;
                    self.exon.strand2 = self.exon.strand1;
                    self.exon.id1 = '';
                    self.exon.strand1 = '.*';
                }
                //pulisco il campo end
                self.exon.end = '.*';
            }
            else {
                s.style.display = "block";
                p.style.display = "none";
                //Pulisco tutti i campi di tutti i geni in ogni caso
                self.exon.id1 = '';
                self.exon.id2 = '';
                self.exon.strand1 = '.*';
                self.exon.strand2 = '.*';
            }

        }

        self.showSelectT = function () {
            var s = document.getElementById("toggle_single_transcript");
            var p = document.getElementById("toggle_pair_transcript");
            if (self.transcript.query_type == "pair") {
                s.style.display = "none";
                p.style.display = "block";
                //Se ho riempito il campo del singolo ed è un 3end, passando alla coppia lo passo nel secondo campo
                if (self.transcript.end === "3end") {
                    self.transcript.id2 = self.transcript.id1;
                    self.transcript.strand2 = self.transcript.strand1;
                    self.transcript.id1 = '';
                    self.transcript.strand1 = '.*';
                }
                //pulisco il campo end
                self.transcript.end = '.*';
            }
            else {
                s.style.display = "block";
                p.style.display = "none";
                //Pulisco tutti i campi di tutti i geni in ogni caso
                self.transcript.id1 = '';
                self.transcript.id2 = '';
                self.transcript.strand1 = '.*';
                self.transcript.strand2 = '.*';
            }
        }

        self.checkGeneInput = function () {
            if (self.gene.input1.substring(0, 4) === "ENSG") {
                self.gene.id1 = self.gene.input1;
            }
            else {
                self.gene.symbol1 = self.gene.input1;
            }
            if (self.gene.input2.substring(0, 4) === "ENSG") {
                self.gene.id2 = self.gene.input2;
            }
            else {
                self.gene.symbol2 = self.gene.input2;
            }
        }

        self.selectedIndex = 1;

        self.onTabChanges = function (currentTabIndex) {
            //console.log('Current tab ' + currentTabIndex);
            localStorage.setItem('active', currentTabIndex);
            //console.log(localStorage.getItem('active'));
            //AZZERA TUTTI I CAMPI
            self.initializeFields();
            self.hideToggles();
        };

        if (localStorage.getItem('active') === undefined) {
            self.selectedIndex = 1;
        }
        else {
            self.selectedIndex = localStorage.getItem('active');

        }

        self.callQuery = function () {
            if (localStorage.getItem('active') == 2) {
                self.checkGeneInput();
                //console.log(self.gene.id1);
                //console.log(self.gene.symbol1);
                //console.log(self.gene.id2);
                //console.log(self.gene.symbol2);
            }

            self.promise = FusionFormService.runQuery(localStorage.getItem('active'), self.chromosome, self.gene, self.exon, self.transcript, self.fusion).then(function (data) {
                self.data = data;
            }).catch(function () { console.log('ciaone'); });
        }

        self.initializeFields = function () {
            self.chromosome = {
                chromosome: '',
                line: '',
                strand: '.*',
                start_point: '',
                end_point: ''
            }
            self.gene = {
                query_type: '',
                input1: '',
                input2: '',
                symbol1: '',
                id1: '',
                symbol2: '',
                id2: '',
                line: '',
                end: '.*'
            }
            self.exon = {
                query_type: '',
                id1: '',
                id2: '',
                strand1: '.*',
                strand2: '.*',
                line: '',
                end: '.*'
            }
            self.transcript = {
                query_type: '',
                id1: '',
                id2: '',
                position1: '',
                position2: '',
                strand1: '.*',
                strand2: '.*',
                line: '',
                end: '.*'
            }
            self.fusion = {
                description: '',
                method: '',
                predicted_effect: '',
                predicted_effect_gene_1: '',
                predicted_effect_gene_2: '',
                line: ''
            }
        }
        self.hideToggles = function () {
            document.getElementById("toggle_single_gene").style.display = "none";
            document.getElementById("toggle_pair_gene").style.display = "none";
            document.getElementById("toggle_single_exon").style.display = "none";
            document.getElementById("toggle_pair_exon").style.display = "none";
            document.getElementById("toggle_single_transcript").style.display = "none";
            document.getElementById("toggle_pair_transcript").style.display = "none";
        }
    }
}

export default FusionFormController;