/**
 * @generated SignedSource<<bbd2f026fee0ccc772d42a3df3a1b71e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostMenuButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonViewerFragment">;
  readonly " $fragmentType": "PostMenuButtonViewerFragment";
};
export type PostMenuButtonViewerFragment$key = {
  readonly " $data"?: PostMenuButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuButtonViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fa3be18b5eed4c9e54c6c6f6f8250c3a";

export default node;
