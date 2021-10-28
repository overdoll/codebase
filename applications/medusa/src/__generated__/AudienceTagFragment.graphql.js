/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AudienceTagFragment$ref: FragmentReference;
declare export opaque type AudienceTagFragment$fragmentType: AudienceTagFragment$ref;
export type AudienceTagFragment = {|
  +audiences: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +title: string,
        +thumbnail: ?{|
          +type: ResourceType,
          +urls: $ReadOnlyArray<{|
            +mimeType: string,
            +url: any,
          |}>,
        |},
      |}
    |}>
  |},
  +$refType: AudienceTagFragment$ref,
|};
export type AudienceTagFragment$data = AudienceTagFragment;
export type AudienceTagFragment$key = {
  +$data?: AudienceTagFragment$data,
  +$fragmentRefs: AudienceTagFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceTagFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AudienceConnection",
      "kind": "LinkedField",
      "name": "audiences",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AudienceEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Audience",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Resource",
                  "kind": "LinkedField",
                  "name": "thumbnail",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "type",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ResourceUrl",
                      "kind": "LinkedField",
                      "name": "urls",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "mimeType",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "url",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '023599c58ba6511034a8b0f7a932a023';
module.exports = node;
