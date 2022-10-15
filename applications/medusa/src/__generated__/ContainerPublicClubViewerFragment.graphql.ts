/**
 * @generated SignedSource<<33f441567457d9490877a2486f360ab8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubViewerFragment" | "HeaderPublicClubViewerFragment" | "SupportPublicClubViewerFragment">;
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
      "name": "SupportPublicClubViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2e829262399bcf956e6630291731be4e";

export default node;
