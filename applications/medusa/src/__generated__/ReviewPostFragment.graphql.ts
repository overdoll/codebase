/**
 * @generated SignedSource<<6c6ae2904229a13741847c65f377a998>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostMenuFragment">;
  readonly " $fragmentType": "ReviewPostFragment";
};
export type ReviewPostFragment = ReviewPostFragment$data;
export type ReviewPostFragment$key = {
  readonly " $data"?: ReviewPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReviewPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPreviewContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "6cd8030d17b576bf8b417488f2b95c21";

export default node;
