/**
 * @generated SignedSource<<2150d4e7840f32bae8e9da193d3483d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollPublicClubPostsAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollPublicClubPostsAccountFragment";
};
export type ScrollPublicClubPostsAccountFragment$key = {
  readonly " $data"?: ScrollPublicClubPostsAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollPublicClubPostsAccountFragment",
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

(node as any).hash = "51e038d49799e64e25f094f5c92421fa";

export default node;
