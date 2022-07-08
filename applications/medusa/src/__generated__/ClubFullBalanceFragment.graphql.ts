/**
 * @generated SignedSource<<eddf5031e519c04afe642768bb9de66c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubFullBalanceFragment$data = {
  readonly pendingBalance: {
    readonly amount: number;
    readonly currency: Currency;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceFragment">;
  readonly " $fragmentType": "ClubFullBalanceFragment";
};
export type ClubFullBalanceFragment$key = {
  readonly " $data"?: ClubFullBalanceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFullBalanceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFullBalanceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Balance",
      "kind": "LinkedField",
      "name": "pendingBalance",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currency",
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

(node as any).hash = "04ab5c9f621c0cbedea05c9ccd3cdb4f";

export default node;
