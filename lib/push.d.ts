/**
 * JSON format for a multi-file push manifest.
 */
export interface PushManifestData {
    [pattern: string]: {
        [resource: string]: {
            type: string;
            weight?: number;
        };
    };
}
/**
 * Maps from an HTTP request path to the set of additional resources that
 * should be pre-emptively pushed to the client via HTTP/2 server push.
 */
export declare class PushManifest {
    private mapping;
    /**
     * Create a new `PushManifest` from a JSON object which is expected to match
     * the multi-file variant of the format described at
     * https://github.com/GoogleChrome/http2-push-manifest.
     *
     * The keys of this object are exact-match regular expression patterns that
     * will be tested against the request URL path.
     *
     * If `basePath` is set, relative paths in the push manifest (both patterns
     * and resources) will be interpreted as relative to this directory.
     * Typically it should be set to the path from the server file root to the
     * push manifest file.
     *
     * Throws an exception if the given object does not match the manifest
     * format, if a resource is not a valid URI path, or if `type` is not one of
     * the valid request destinations
     * (https://fetch.spec.whatwg.org/#concept-request-destination).
     *
     * Note that this class does not validate that resources exist on disk, since
     * we can't assume if or how the server maps resources to disk.
     */
    constructor(manifest: PushManifestData, basePath?: string);
    /**
     * Generate `Link: rel=preload` headers for each push resource associated
     * with `path`.
     *
     * A cooperating HTTP/2 server may intercept these headers and intiate a
     * server push for each resource.
     *
     * See https://w3c.github.io/preload/#server-push-http-2.
     */
    linkHeaders(path: string): string[];
}
