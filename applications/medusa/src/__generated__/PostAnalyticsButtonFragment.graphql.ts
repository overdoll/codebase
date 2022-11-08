/**
 * @generated SignedSource<<2dc84edf2b31615c12f34f3d2ccd3482>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostAnalyticsButtonFragment$data = {
  readonly likes: number;
  readonly views: number;
  readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostFragment">;
  readonly " $fragmentType": "PostAnalyticsButtonFragment";
};
export type PostAnalyticsButtonFragment$key = {
  readonly " $data"?: PostAnalyticsButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostAnalyticsButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostAnalyticsButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "views",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridPaginationPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ae2605d0dbde3f3e8dd5a767e0e8ecf5";

export default node;
