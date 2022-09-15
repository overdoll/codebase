/**
 * @generated SignedSource<<3a293dee3226895a7bfa905fae0becd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollBrowseViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollBrowseViewerFragment";
};
export type ScrollBrowseViewerFragment$key = {
  readonly " $data"?: ScrollBrowseViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollBrowseViewerFragment",
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

(node as any).hash = "a4f2eb0d8116e72c971371cecf6af0ba";

export default node;
