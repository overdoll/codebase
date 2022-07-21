/**
 * @generated SignedSource<<50a33ad5d22f53ddc8ed6b19fdfe00fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedViewerFragment">;
  readonly " $fragmentType": "PostSupporterContentViewerFragment";
};
export type PostSupporterContentViewerFragment$key = {
  readonly " $data"?: PostSupporterContentViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentLockedViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "977b3f28548f1d67e0e0c67b2696d4eb";

export default node;
