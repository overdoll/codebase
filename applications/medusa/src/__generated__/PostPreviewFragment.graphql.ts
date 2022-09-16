/**
 * @generated SignedSource<<cc8e65accaf36b458f320bbc8133206f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostPrivateHeaderFragment" | "RawCinematicContentFragment">;
  readonly " $fragmentType": "PostPreviewFragment";
};
export type PostPreviewFragment$key = {
  readonly " $data"?: PostPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawCinematicContentFragment"
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

(node as any).hash = "746a441b68b02506a23228a3218e0200";

export default node;
