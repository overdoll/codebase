/**
 * @generated SignedSource<<02f1ce175998e175e92bdbf85df56969>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReportButtonViewerFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "PostReportButtonViewerFragment";
};
export type PostReportButtonViewerFragment = PostReportButtonViewerFragment$data;
export type PostReportButtonViewerFragment$key = {
  readonly " $data"?: PostReportButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReportButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fddaf99d11062b31dc3fdfa8f6231bf2";

export default node;
