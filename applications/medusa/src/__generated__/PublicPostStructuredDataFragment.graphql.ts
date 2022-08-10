/**
 * @generated SignedSource<<dec9812f1c5d1f468cdbffde5e45d9db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicPostStructuredDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"addPostContentJsonLdFragment" | "addPostListJsonLdFragment">;
  readonly " $fragmentType": "PublicPostStructuredDataFragment";
};
export type PublicPostStructuredDataFragment$key = {
  readonly " $data"?: PublicPostStructuredDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicPostStructuredDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicPostStructuredDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addPostListJsonLdFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addPostContentJsonLdFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9b6b67906aaf6fe2cc519d9953fe0cea";

export default node;
