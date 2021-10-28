/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AudienceTagFragment$ref: FragmentReference;
declare export opaque type AudienceTagFragment$fragmentType: AudienceTagFragment$ref;
export type AudienceTagFragment = {|
  +audiences: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string
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
(node: any).hash = '1a980bcf9749fe94342b4e5a5766d17c';
module.exports = node;
