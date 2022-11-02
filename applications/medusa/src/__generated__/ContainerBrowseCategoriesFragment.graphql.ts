/**
 * @generated SignedSource<<fbb92adda8cb0b432d7fc6158e293ce9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseCategoriesFragment$data = {
  readonly viewer: {
    readonly __typename: "Account";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseCategoriesFragment">;
  readonly " $fragmentType": "ContainerBrowseCategoriesFragment";
};
export type ContainerBrowseCategoriesFragment$key = {
  readonly " $data"?: ContainerBrowseCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerBrowseCategoriesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollBrowseCategoriesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "fdf4668fe32af5be0b73fbcbf7f0de6f";

export default node;
