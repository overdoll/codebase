/**
 * @generated SignedSource<<7022428a9f8c97f4777c7fe7e76990f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubViewerFragment">;
  readonly " $fragmentType": "HeaderPublicClubViewerFragment";
};
export type HeaderPublicClubViewerFragment$key = {
  readonly " $data"?: HeaderPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinBannerPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e0cac7828d7ea65c454c8d483a53a8f8";

export default node;
