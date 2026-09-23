// Types for the @easyops-cn/docusaurus-search-local internals LiveSearch uses
// (the package ships JS only). Shapes mirror its own SearchBar / worker usage.

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker' {
  export type SearchDocument = {
    i: number; // id
    t: string; // title (Title docs) or text (Heading/Content docs)
    u: string; // page url
    h?: string; // #hash for headings/content
    p?: number; // parent page id
    s?: string; // section/keywords
    b?: string[]; // breadcrumb
  };
  export type SearchResult = {
    document: SearchDocument;
    /** 0 Title · 1 Heading · 2 Description · 3 Keywords · 4 Content */
    type: number;
    page: SearchDocument | false | undefined;
    metadata: Record<string, Record<string, { position: [number, number][] }>>;
    tokens: string[];
    score: number;
  };
  export function fetchIndexesByWorker(baseUrl: string, searchContext: string): Promise<void>;
  export function searchByWorker(
    baseUrl: string,
    searchContext: string,
    input: string,
    limit: number,
  ): Promise<SearchResult[]>;
}

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight' {
  export function highlight(content: string, tokens: string[], forceMatched?: boolean): string;
}

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed' {
  export function highlightStemmed(
    content: string,
    positions: [number, number][],
    tokens: string[],
    maxLength?: number,
  ): string;
}

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions' {
  import type { SearchResult } from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker';
  export function getStemmedPositions(metadata: SearchResult['metadata'], field: string): [number, number][];
}
