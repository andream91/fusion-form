/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController() {
  var self = this;

  self.chromosome = {
    chromosome: '',
    line: ''
  }
  self.gene = {
    symbol: '',
    id: '',
    line: '',
    end: ''
  }
  self.exon = {
    id: '',
    direction: '',
    line: '',
    end: ''
  }
  self.transcript = {
    id: '',
    position: '',
    line: '',
    end: ''
  }
  self.fusion = {
    description: '',
    method: '',
    predicted_effect: '',
    predicted_effect_gene_1: '',
    predicted_effect_gene_2: '',
    line: ''
  }
  self.methods = ['Any', 'BOWTIE', 'BOWTIE+BLAT', 'BOWTIE+STAR', 'BOWTIE+BOWTIE2', 'BOWTIE+BWA'];
  self.descriptions = ['Any', 'antisense', 'adjacent', 'banned', 'bodymap2', 'cell_lines', 'chimerdb2', 'conjoing', 'cosmic', 'cacg', 'cgp', 'cta_gene', 'ctb_gene', 'ctc_gene', 'ctd_gene', 'distance1000bp', 'distance10kbp', 'distance100kbp', 'duplicates', 'ensembl_fully_overlapping', 'ucsc_fully_overlapping', 'refseq_fully_overlapping', 'gtex', 'healthy', 'hpa', 'known', 'matched-normal', 'partial-matched-normal', 'prostates', 'lincrna', 'metazoa', 'mirna', 'mt', 'non_tumor_cells', 'no_protein_product', 'oncogene', 'pair_pseudo_genes', 'paralogs', 'ensembl_partially_overlapping', 'ucsc_partially_overlapping', 'refseq_partially_overlapping', 'readthrough', 'ribosomal,protein', 'rp11_gene', 'rp_gene', 'rrna', 'ensembl_same_strand_overlapping', 'ucsc_same_strand_overlapping', 'refseq_same_strand_overlapping', 'short_distance', 'similar_reads', 'similar_symbols', 'snorna', 'snrna', 'tcga', 'ticdb', 'trna', 'yrna'];
  self.effects = ['Any', 'intergenic', 'intronic', 'exonic(no-known-CDS)', 'UTR', 'CDS(not-reliable-start-or-end)', 'CDS(truncated)', 'CDS(complete)'];


}

export default [AppController];
