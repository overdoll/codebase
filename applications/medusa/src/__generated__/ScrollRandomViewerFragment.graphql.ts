/**
 * @generated SignedSource<<3164b6ce04286b50124655dc6d469913>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollRandomViewerFragment";
};
export type ScrollRandomViewerFragment$key = {
  readonly " $data"?: ScrollRandomViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollRandomViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollRandomViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ef24359c1caa70c94f87a740670ff5a6";

export default node;
