/**
 * @generated SignedSource<<809cd20a98a34a9b3d2a069369c02e9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutsMethodSettingsFragment$data = {
  readonly payoutMethod: {
    readonly __typename: string;
  } | null;
  readonly details: {
    readonly id: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"DisplayPayoutMethodFragment">;
  readonly " $fragmentType": "PayoutsMethodSettingsFragment";
};
export type PayoutsMethodSettingsFragment = PayoutsMethodSettingsFragment$data;
export type PayoutsMethodSettingsFragment$key = {
  readonly " $data"?: PayoutsMethodSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutsMethodSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutsMethodSettingsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DisplayPayoutMethodFragment"
    },
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountDetails",
      "kind": "LinkedField",
      "name": "details",
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
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "649908455e2a42217eb462ef11c06153";

export default node;
