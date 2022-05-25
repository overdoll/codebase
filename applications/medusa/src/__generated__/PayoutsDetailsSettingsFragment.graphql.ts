/**
 * @generated SignedSource<<e85d59ec6ac112333f75a5ab5c955e98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutsDetailsSettingsFragment$data = {
  readonly details: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountDetailsFragment">;
  } | null;
  readonly multiFactorTotpConfigured: boolean;
  readonly " $fragmentType": "PayoutsDetailsSettingsFragment";
};
export type PayoutsDetailsSettingsFragment = PayoutsDetailsSettingsFragment$data;
export type PayoutsDetailsSettingsFragment$key = {
  readonly " $data"?: PayoutsDetailsSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutsDetailsSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutsDetailsSettingsFragment",
  "selections": [
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AccountDetailsFragment"
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

(node as any).hash = "58b035ef737e29945264cfa0e7062519";

export default node;
