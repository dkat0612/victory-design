export const NAME: string = 'vcCeoService';

export class CEOService {
    constructor(private $document: ng.IDocumentService) { }

    public setTitle(title: string) {
        this.$document.find('title').html(title + ' - Victory Computers');
    }

    public setDescription(description: string) {
        this.$document.find('meta[name="description"]').attr('content', description);
    }

    public setKeywords(keywords: string) {
        this.$document.find('meta[name="keywords"]').attr('content', keywords);
    }
}
CEOService.$inject = ['$document'];

export default {
    name: NAME,
    service: CEOService
}