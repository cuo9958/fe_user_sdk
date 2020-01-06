/// <reference types="node" />
import querystring from 'querystring';
export declare function post(url: string, data?: querystring.ParsedUrlQueryInput): Promise<any>;
export declare function get(url: string, data?: querystring.ParsedUrlQueryInput): Promise<any>;
