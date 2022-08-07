/**
 * @generated SignedSource<<27a7a9a6e44cf896762fc29a29035520>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderClubFragment$data = {
  readonly club: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  };
  readonly " $fragmentType": "PostHeaderClubFragment";
};
export type PostHeaderClubFragment$key = {
  readonly " $data"?: PostHeaderClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubThumbnailFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "16b0de807c65253b81479bce9502bd13";

export default node;
