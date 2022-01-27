/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RejectionReasonsFragment = {
    readonly rules: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string;
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
      "concreteType": "RuleConnection",
      "kind": "LinkedField",
      "name": "rules",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RuleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Rule",
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
(node as any).hash = '119c98a1df163dd7aebae6f0e69c3f67';
export default node;
