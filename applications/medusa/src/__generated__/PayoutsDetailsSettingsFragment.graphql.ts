/**
 * @generated SignedSource<<b47d27fa1074b04e880e1fd96fa6f4d9>>
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
    readonly firstName: string;
    readonly lastName: string;
    readonly country: {
      readonly name: string;
      readonly emoji: string;
    };
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Country",
          "kind": "LinkedField",
          "name": "country",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "emoji",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f11144b5cc8a61fb4eb079044b0491ee";

export default node;
