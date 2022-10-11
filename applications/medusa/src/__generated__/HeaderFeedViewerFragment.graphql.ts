/**
 * @generated SignedSource<<ca72e319888630b8db4a9f1d9cb12f80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"QuickPreferencesFragment">;
  readonly " $fragmentType": "HeaderFeedViewerFragment";
};
export type HeaderFeedViewerFragment$key = {
  readonly " $data"?: HeaderFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuickPreferencesFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "21a9ae41cb4c1265afe3527a2d1111f6";

export default node;
