/**
 * @generated SignedSource<<691588b424013667ac31881290a2ced5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsFragment" | "PostGalleryPublicSimpleFragment" | "PostHeaderFragment">;
  readonly " $fragmentType": "FullSimplePostFragment";
};
export type FullSimplePostFragment$key = {
  readonly " $data"?: FullSimplePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "cd9b8ef6c5d71a90803759b6cb7b72ad";

export default node;
