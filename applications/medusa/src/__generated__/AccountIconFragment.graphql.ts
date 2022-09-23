/**
 * @generated SignedSource<<91580bf8867dfad7df52b7df05097fe8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountIconFragment$data = {
  readonly avatar: {
    readonly __typename: "Resource";
  } | null;
  readonly id: string;
  readonly " $fragmentType": "AccountIconFragment";
};
export type AccountIconFragment$key = {
  readonly " $data"?: AccountIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountIconFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
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
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "da7e0ce38c25b6855da84d50539fd813";

export default node;
