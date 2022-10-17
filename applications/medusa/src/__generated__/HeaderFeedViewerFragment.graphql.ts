/**
 * @generated SignedSource<<74d1739c24a7111922f9e0652d7ffbe9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CuratedDataFeedFragment" | "QuickPreferencesFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CuratedDataFeedFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ec2b0f042fad37abf7896a9ecf6cc88b";

export default node;
