/**
 * @generated SignedSource<<505baa9cd59c332d819acfdf5c1f7d64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubBalanceHeaderFragment$data = {
  readonly owner: {
    readonly payoutMethod: {
      readonly __typename: string;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceFragment">;
  readonly " $fragmentType": "ClubBalanceHeaderFragment";
};
export type ClubBalanceHeaderFragment$key = {
  readonly " $data"?: ClubBalanceHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubBalanceHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "payoutMethod",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBalanceFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f5a34bac1fae80e2c8bb2ae5e9257d3e";

export default node;
