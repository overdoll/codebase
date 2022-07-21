/**
 * @generated SignedSource<<b89a4031df4996c6109d710561347be2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadContentModifyFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContentModifyPreviewFragment">;
  readonly " $fragmentType": "UploadContentModifyFragment";
};
export type UploadContentModifyFragment$key = {
  readonly " $data"?: UploadContentModifyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentModifyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadContentModifyFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContentModifyPreviewFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "16fc19c6d497966803d35ef3aa1ee1d8";

export default node;
