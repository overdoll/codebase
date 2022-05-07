/**
 * @generated SignedSource<<0b70016ce307a6f194b1b1cba3c9b2b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountDetailsFragment$data = {
  readonly firstName: string;
  readonly lastName: string;
  readonly country: {
    readonly name: string;
    readonly emoji: string;
  };
  readonly " $fragmentType": "AccountDetailsFragment";
};
export type AccountDetailsFragment = AccountDetailsFragment$data;
export type AccountDetailsFragment$key = {
  readonly " $data"?: AccountDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountDetailsFragment",
  "selections": [
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
  "type": "AccountDetails",
  "abstractKey": null
};

(node as any).hash = "5c821018199500d882fb25fc40d19828";

export default node;
