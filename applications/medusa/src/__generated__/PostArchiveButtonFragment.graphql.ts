/**
 * @generated SignedSource<<07cfba27855ff4ec12bee5ed01c90f09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostArchiveButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostArchiveButtonFragment";
};
export type PostArchiveButtonFragment$key = {
  readonly " $data"?: PostArchiveButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostArchiveButtonFragment",
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

(node as any).hash = "3397166296becedd685d48aa5941c411";

export default node;
