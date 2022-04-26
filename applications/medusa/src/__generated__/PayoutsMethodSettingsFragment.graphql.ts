/**
 * @generated SignedSource<<d384b2c627cb489a23f07591b311c41b>>
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
    readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment">;
  } | null;
  readonly details: {
    readonly id: string;
  } | null;
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PayoutMethodFragment"
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

(node as any).hash = "53de7cc8e2d7c8f160ee5f766e96f111";

export default node;
