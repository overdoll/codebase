/**
 * @generated SignedSource<<dcd4352833d3c90f821426341868f71f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostMenuFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PostMenuFragment";
};
export type PostMenuFragment = PostMenuFragment$data;
export type PostMenuFragment$key = {
  readonly " $data"?: PostMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "reference",
        "storageKey": null
      },
      "action": "THROW",
      "path": "reference"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9204e4db0464e5809800d9539e50d2c2";

export default node;
