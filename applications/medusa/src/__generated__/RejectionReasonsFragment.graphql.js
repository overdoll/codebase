/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RejectionReasonsFragment$ref: FragmentReference;
declare export opaque type RejectionReasonsFragment$fragmentType: RejectionReasonsFragment$ref;
export type RejectionReasonsFragment = {|
  +postRejectionReasons: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +reason: string,
        +infraction: boolean,
      |}
    |}>
  |},
  +$refType: RejectionReasonsFragment$ref,
|};
export type RejectionReasonsFragment$data = RejectionReasonsFragment;
export type RejectionReasonsFragment$key = {
  +$data?: RejectionReasonsFragment$data,
  +$fragmentRefs: RejectionReasonsFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RejectionReasonsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostRejectionReasonConnection",
      "kind": "LinkedField",
      "name": "postRejectionReasons",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostRejectionReasonEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PostRejectionReason",
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
                  "name": "reason",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "infraction",
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
(node: any).hash = '7250faaec4208f87d53fdbce39f7855d';
module.exports = node;
