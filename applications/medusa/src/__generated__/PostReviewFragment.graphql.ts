/**
 * @generated SignedSource<<68de12017ac461be9f6c11436c7aa4ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicContentFragment">;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "060569a156dd676ffa29cd349ff68d0e";

export default node;
