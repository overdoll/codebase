/**
 * @generated SignedSource<<fa20e22ba9e0e2b5a222d58e9979f31d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchCategoryAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollSearchCategoryAccountFragment";
};
export type ScrollSearchCategoryAccountFragment$key = {
  readonly " $data"?: ScrollSearchCategoryAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCategoryAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchCategoryAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f59c697bae7bb8dd2750d6d0b0b04a72";

export default node;
