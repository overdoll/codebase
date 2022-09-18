/**
 * @generated SignedSource<<26145e6d85110e757a17dadd1a876675>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubViewerFragment" | "HeaderPublicClubViewerFragment">;
  readonly " $fragmentType": "ContainerPublicClubViewerFragment";
};
export type ContainerPublicClubViewerFragment$key = {
  readonly " $data"?: ContainerPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicClubViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "88403c5caccbd3ebf32a527dbc77646d";

export default node;
