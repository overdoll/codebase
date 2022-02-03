/**
 * @generated SignedSource<<5ef7edc0e05a91aa3f55697b87fe4855>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RejectionReasonsFragment$data = {
  readonly rules: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly infraction: boolean;
      };
    }>;
  };
  readonly " $fragmentType": "RejectionReasonsFragment";
};
export type RejectionReasonsFragment = RejectionReasonsFragment$data;
export type RejectionReasonsFragment$key = {
  readonly " $data"?: RejectionReasonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RejectionReasonsFragment">;
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

(node as any).hash = "119c98a1df163dd7aebae6f0e69c3f67";

export default node;
