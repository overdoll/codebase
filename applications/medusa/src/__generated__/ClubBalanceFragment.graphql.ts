/**
 * @generated SignedSource<<647462d5eebc1b137735f62e462dc849>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubBalanceFragment$data = {
  readonly balance: {
    readonly amount: number;
    readonly currency: Currency;
  };
  readonly " $fragmentType": "ClubBalanceFragment";
};
export type ClubBalanceFragment = ClubBalanceFragment$data;
export type ClubBalanceFragment$key = {
  readonly " $data"?: ClubBalanceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBalanceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubBalanceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Balance",
      "kind": "LinkedField",
      "name": "balance",
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1f499669bc3d246bde8d0876982ed295";

export default node;
