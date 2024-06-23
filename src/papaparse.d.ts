declare module 'papaparse' {
    export function parse(
      input: any,
      config?: {
        delimiter?: string;
        newline?: string;
        quoteChar?: string;
        escapeChar?: string;
        header?: boolean;
        dynamicTyping?: boolean | ((field: string | number) => boolean);
        preview?: number;
        encoding?: string;
        worker?: boolean;
        comments?: boolean | string;
        step?: (results: ParseResult, parser: any) => void;
        complete?: (results: ParseResult) => void;
        error?: (error: any, file?: any) => void;
        download?: boolean;
        skipEmptyLines?: boolean | 'greedy';
        chunk?: (results: ParseResult, parser: any) => void;
        fastMode?: boolean;
        beforeFirstChunk?: (chunk: string) => string | void;
        withCredentials?: boolean;
        transform?: (value: any, field: string | number) => any;
      }
    ): ParseResult;
  
    export interface ParseResult {
      data: any[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
      };
    }
  }
  