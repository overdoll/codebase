/**
 * @generated SignedSource<<e6b3f1123f267c8b54814a9f3377880f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostFooterButtonsFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderFragment">;
  readonly " $fragmentType": "FullDetailedPostFragment";
};
export type FullDetailedPostFragment$key = {
  readonly " $data"?: FullDetailedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
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

(node as any).hash = "06f9ec747827be3d5a6d6bc38d3a398c";

export default node;
