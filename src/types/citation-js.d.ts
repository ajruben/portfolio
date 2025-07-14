declare module '@citation-js/core' {
  export class Cite {
    constructor(data: string | Record<string, unknown>);
    data: Array<{ id: string; [key: string]: unknown }>;
    format(type: string, options?: Record<string, unknown>): string;
    get(options?: Record<string, unknown>): Array<{ id: string; [key: string]: unknown }>;
  }
}

declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-csl';
