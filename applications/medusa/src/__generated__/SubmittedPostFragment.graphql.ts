/**
 * @generated SignedSource<<0df62cdf910a70577db387979632f5de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmittedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostModerateButtonFragment" | "PostPreviewContentFragment">;
  readonly " $fragmentType": "SubmittedPostFragment";
};
export type SubmittedPostFragment$key = {
  readonly " $data"?: SubmittedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmittedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmittedPostFragment",
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

(node as any).hash = "1feb5e8f116f20372d626e5adf9d8ad0";

export default node;
