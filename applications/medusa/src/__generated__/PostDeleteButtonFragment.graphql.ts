/**
 * @generated SignedSource<<173d50c2a970b9d07385ed62ce37be5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDeleteButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostDeleteButtonFragment";
};
export type PostDeleteButtonFragment$key = {
  readonly " $data"?: PostDeleteButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDeleteButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDeleteButtonFragment",
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

(node as any).hash = "20792fe1a542c6803452e37523f5535c";

export default node;
