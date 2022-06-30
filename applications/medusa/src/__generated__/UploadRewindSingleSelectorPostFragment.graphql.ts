/**
 * @generated SignedSource<<d77a9c2b5f233266bb796a50993bcd88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadRewindSingleSelectorPostFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UploadRewindSingleSelectorPostFragment";
};
export type UploadRewindSingleSelectorPostFragment$key = {
  readonly " $data"?: UploadRewindSingleSelectorPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadRewindSingleSelectorPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadRewindSingleSelectorPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "78f824de5760bcb676a04d42ceadd102";

export default node;
