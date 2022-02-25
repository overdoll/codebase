/**
 * @generated SignedSource<<5a67c351ec86a8ad46b8afc90fc583eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportButtonFragment$data = {
  readonly id: string;
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

(node as any).hash = "bc09e2d6143b6a1a6680ce71ea23e743";

export default node;
