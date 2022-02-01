/**
 * @generated SignedSource<<4dd145f363b82039acc6fbf1c990e715>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
  readonly " $fragmentType": "ReviewFragment";
};
export type ReviewFragment = ReviewFragment$data;
export type ReviewFragment$key = {
  readonly " $data"?: ReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReviewFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b9fffff9ef7f5f561b9e36dd4f583688";

export default node;
