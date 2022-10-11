/**
 * @generated SignedSource<<26dc47ec46a598c6932f0dbf5c589dd7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollRandomViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollRandomViewerFragment";
};
export type ScrollRandomViewerFragment$key = {
  readonly " $data"?: ScrollRandomViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollRandomViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollRandomViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb4f62de83bab3f149dcaaaae25ce475";

export default node;
