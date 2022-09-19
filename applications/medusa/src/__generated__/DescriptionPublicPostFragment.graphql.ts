/**
 * @generated SignedSource<<1e2fb66cdb3965c6bbc9ac189be7e593>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostFragment" | "PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "RepostPublicPostFragment">;
  readonly " $fragmentType": "DescriptionPublicPostFragment";
};
export type DescriptionPublicPostFragment$key = {
  readonly " $data"?: DescriptionPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostFragment",
  "selections": [
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
      "name": "RepostPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9b5a3bceca48a514143904c2354a54ae";

export default node;
