/**
 * @generated SignedSource<<bf35434a99bdb677db11bed2c670b685>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostModerateButtonFragment" | "PostPreviewContentFragment">;
  readonly " $fragmentType": "ReviewPostFragment";
};
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
      "name": "PostModerateButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "988610d51ee3609e3c26572a50267a02";

export default node;
