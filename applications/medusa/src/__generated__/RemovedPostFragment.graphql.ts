/**
 * @generated SignedSource<<baa277a06038d31b383995ecae97e117>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemovedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "PostModerateButtonFragment" | "PostDeleteButtonFragment">;
  readonly " $fragmentType": "RemovedPostFragment";
};
export type RemovedPostFragment = RemovedPostFragment$data;
export type RemovedPostFragment$key = {
  readonly " $data"?: RemovedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemovedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RemovedPostFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDeleteButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "2c323a3134993078e788cce320b0a0f1";

export default node;
