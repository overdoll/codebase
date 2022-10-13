/**
 * @generated SignedSource<<700681ae737a0917f7a662447afb5b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportSelectMethodViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodViewerFragment">;
  readonly " $fragmentType": "ClubSupportSelectMethodViewerFragment";
};
export type ClubSupportSelectMethodViewerFragment$key = {
  readonly " $data"?: ClubSupportSelectMethodViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportSelectMethodViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportSelectMethodViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportSelectMethodViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "78f5038fc0674fd56ef0d826d07c00c6";

export default node;
