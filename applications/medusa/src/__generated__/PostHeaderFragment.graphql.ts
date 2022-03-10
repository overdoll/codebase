/**
 * @generated SignedSource<<0927d0e8298b34e56e556657cf1a492e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment$data = {
  readonly reassignmentAt: any;
  readonly post: {
    readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
  };
  readonly " $fragmentType": "PostHeaderFragment";
};
export type PostHeaderFragment = PostHeaderFragment$data;
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
      "kind": "ScalarField",
      "name": "reassignmentAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostHeaderClubFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostModerator",
  "abstractKey": null
};

(node as any).hash = "6fae96d6289352cdfd95fedfd7accc2d";

export default node;
