/**
 * @generated SignedSource<<8ecbb265dbb9ca2ddb4d38d2728aff56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaClubsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerClubsFeedViewerFragment">;
  readonly " $fragmentType": "MetaClubsFeedViewerFragment";
};
export type MetaClubsFeedViewerFragment$key = {
  readonly " $data"?: MetaClubsFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaClubsFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaClubsFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerClubsFeedViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cb5b79e7617964b8c4b990ca60e67529";

export default node;
