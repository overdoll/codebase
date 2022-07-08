/**
 * @generated SignedSource<<b5fd1cd81e6679d620ae0f97508d7492>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
  readonly " $fragmentType": "PostHeaderFragment";
};
export type PostHeaderFragment$key = {
  readonly " $data"?: PostHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderFragment",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "JoinClubFromPostFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "775e86f43cc9fa6a3f2fbe510dc2f2b6";

export default node;
