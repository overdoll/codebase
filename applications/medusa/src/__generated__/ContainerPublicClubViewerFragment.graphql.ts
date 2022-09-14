/**
 * @generated SignedSource<<5fecb831ea32dd0e62cada8f7b342158>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubViewerFragment" | "HeaderPublicClubViewerFragment" | "PostsPublicClubViewerFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "da8ab9628abbb447263f8c2a55b33a9a";

export default node;
