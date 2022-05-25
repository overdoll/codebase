/**
 * @generated SignedSource<<27d2c95eab6ae0e802747aec76f07dde>>
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
  readonly multiFactorTotpConfigured: boolean;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "multiFactorTotpConfigured",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0ff913720de19c0468b3c3e2beddb647";

export default node;
