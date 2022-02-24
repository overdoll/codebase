/**
 * @generated SignedSource<<623102f3a237b604601c92c4d33137a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportButtonFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PostReportButtonFragment";
};
export type PostReportButtonFragment = PostReportButtonFragment$data;
export type PostReportButtonFragment$key = {
  readonly " $data"?: PostReportButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReportButtonFragment",
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

(node as any).hash = "52355114c22ce19ecdc39a4df1658d98";

export default node;
