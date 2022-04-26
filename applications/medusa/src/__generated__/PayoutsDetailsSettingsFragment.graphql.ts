/**
 * @generated SignedSource<<e22c9cd8b676dc54825ff5cf80c3da54>>
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "afff0faa79e95ef48d941da282648930";

export default node;
