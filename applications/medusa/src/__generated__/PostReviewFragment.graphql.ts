/**
 * @generated SignedSource<<6db34abf711e241e1cf322c1d993bebe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostPrivateHeaderFragment" | "RawCinematicContentFragment">;
  readonly " $fragmentType": "PostReviewFragment";
};
export type PostReviewFragment$key = {
  readonly " $data"?: PostReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawCinematicContentFragment"
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
      "name": "PostPrivateHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "bcb5ed804cd5dd326169046bd3a11a3a";

export default node;
