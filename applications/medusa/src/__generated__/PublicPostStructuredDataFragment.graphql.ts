/**
 * @generated SignedSource<<362a056478049cb4c0f65ebd6a01d3b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicPostStructuredDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"addPostJsonLdFragment">;
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
      "name": "addPostJsonLdFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "837df524f1ae7db7fb189e72b010f251";

export default node;
