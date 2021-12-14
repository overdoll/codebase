/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RejectionReasonsFragment = {
    readonly postRejectionReasons: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly reason: string;
                readonly infraction: boolean;
            };
        }>;
    };
    readonly " $refType": "RejectionReasonsFragment";
};
export type RejectionReasonsFragment$data = RejectionReasonsFragment;
export type RejectionReasonsFragment$key = {
    readonly " $data"?: RejectionReasonsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RejectionReasonsFragment">;
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
(node as any).hash = '7250faaec4208f87d53fdbce39f7855d';
export default node;
