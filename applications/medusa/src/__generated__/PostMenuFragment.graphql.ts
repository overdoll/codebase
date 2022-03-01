/**
 * @generated SignedSource<<e9d3233dd2e169532ec104ff47223c49>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "91e22d0976d1c8273beb28c1bdbdb5b2";

export default node;
