/**
 * @generated SignedSource<<5254964bcb61cb05e055d63baaf6fe0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsFragment">;
  readonly " $fragmentType": "ContainerPublicClubPostsFragment";
};
export type ContainerPublicClubPostsFragment$key = {
  readonly " $data"?: ContainerPublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubPostsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c8720f53bd798caf7c7ac52eb031d5d0";

export default node;
