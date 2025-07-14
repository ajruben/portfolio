declare module '@citation-js/core' {
  export class Cite {
    constructor(data: any);
    data: any[];
    format(type: string, options?: any): string;
    get(options?: any): any;
  }
}

declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-csl'; 