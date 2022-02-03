/**
 * @generated SignedSource<<7466e4dfa1bbd1a8b7e2051de17c1dc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResourceIconFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  readonly " $fragmentType": "ResourceIconFragment";
};
export type ResourceIconFragment = ResourceIconFragment$data;
export type ResourceIconFragment$key = {
  readonly " $data"?: ResourceIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceIconFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceItemFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "03da2a16b7301d10959b565ebcd28268";

export default node;
