/**
 * @generated SignedSource<<705d73d37e98239470b89804c71c8b71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowStickyFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowFooterFragment">;
  readonly " $fragmentType": "UploadFlowStickyFooterFragment";
};
export type UploadFlowStickyFooterFragment$key = {
  readonly " $data"?: UploadFlowStickyFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowStickyFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowStickyFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadFlowFooterFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "bd55db32cdc9e0a8840f0cd18cda0d30";

export default node;
