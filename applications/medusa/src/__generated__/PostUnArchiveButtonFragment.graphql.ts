/**
 * @generated SignedSource<<361acab3c47587a6696300adbe206ef0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostUnArchiveButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostUnArchiveButtonFragment";
};
export type PostUnArchiveButtonFragment = PostUnArchiveButtonFragment$data;
export type PostUnArchiveButtonFragment$key = {
  readonly " $data"?: PostUnArchiveButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostUnArchiveButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostUnArchiveButtonFragment",
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

(node as any).hash = "aaf78524262d68683358ccf055aa6815";

export default node;
