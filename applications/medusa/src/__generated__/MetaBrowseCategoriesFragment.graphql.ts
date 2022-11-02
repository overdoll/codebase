/**
 * @generated SignedSource<<be1b18718dab4624678068a74468e349>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaBrowseCategoriesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseCategoriesFragment">;
  readonly " $fragmentType": "MetaBrowseCategoriesFragment";
};
export type MetaBrowseCategoriesFragment$key = {
  readonly " $data"?: MetaBrowseCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaBrowseCategoriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaBrowseCategoriesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerBrowseCategoriesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "242af7dadc6241a99b013d55541c11ac";

export default node;
