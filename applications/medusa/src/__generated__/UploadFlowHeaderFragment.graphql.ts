/**
 * @generated SignedSource<<465a98744ad7f8c742d43fa546658fe4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowHeaderFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentFragment">;
  readonly " $fragmentType": "UploadFlowHeaderFragment";
};
export type UploadFlowHeaderFragment$key = {
  readonly " $data"?: UploadFlowHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowHeaderFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "02267550f973fec42a31a381ed224a6c";

export default node;
