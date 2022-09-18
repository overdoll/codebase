/**
 * @generated SignedSource<<b6a2cc940179b25e81ac3a4b48080b12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostFooterButtonsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuButtonViewerFragment">;
  readonly " $fragmentType": "PostFooterButtonsViewerFragment";
};
export type PostFooterButtonsViewerFragment$key = {
  readonly " $data"?: PostFooterButtonsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostFooterButtonsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "204c9cb4bcabf19f1fccd8c11b733e31";

export default node;
