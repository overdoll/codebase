/**
 * @generated SignedSource<<46f3a8b1ed67da0086d10df898ab4d8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubPostsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubPostsFragment" | "ScrollPublicClubPostsFragment">;
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
      "name": "HeaderPublicClubPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "569b676ffd50774fa8c46cb430c0629b";

export default node;
