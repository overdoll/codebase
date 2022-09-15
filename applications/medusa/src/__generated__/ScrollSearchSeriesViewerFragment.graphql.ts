/**
 * @generated SignedSource<<71f218a95773d86fe5fede9fdc84ef21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchSeriesViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollSearchSeriesViewerFragment";
};
export type ScrollSearchSeriesViewerFragment$key = {
  readonly " $data"?: ScrollSearchSeriesViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchSeriesViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchSeriesViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "29a2959a40b0530d1ed84b259c873e90";

export default node;
