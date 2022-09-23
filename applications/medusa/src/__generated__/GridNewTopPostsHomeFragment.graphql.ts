/**
 * @generated SignedSource<<ed7801f317076e9fb037e72328d936ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridNewTopPostsHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GridSeriesCharactersCategoriesFragment" | "GridTopNewPostsFragment">;
  readonly " $fragmentType": "GridNewTopPostsHomeFragment";
};
export type GridNewTopPostsHomeFragment$key = {
  readonly " $data"?: GridNewTopPostsHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridNewTopPostsHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridNewTopPostsHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridTopNewPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridSeriesCharactersCategoriesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b91353762d096e76f2cff436c92488ff";

export default node;
