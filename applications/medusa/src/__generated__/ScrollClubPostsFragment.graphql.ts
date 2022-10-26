/**
 * @generated SignedSource<<3fb958a5ca6b814c74beade9c492a5c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollClubPostsFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment" | "SwapClubPostsFragment">;
  readonly " $fragmentType": "ScrollClubPostsFragment";
};
export type ScrollClubPostsFragment$key = {
  readonly " $data"?: ScrollClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollClubPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubEmptyPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SwapClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f3de3125c6c1751d1d646d54f685ee4b";

export default node;
