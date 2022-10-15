/**
 * @generated SignedSource<<cffb865b2045d070db21fb9d6e854819>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubFragment" | "HeaderPublicClubFragment" | "PrepareClubPostsFragment" | "SupportPublicClubFragment">;
  readonly " $fragmentType": "ContainerPublicClubFragment";
};
export type ContainerPublicClubFragment$key = {
  readonly " $data"?: ContainerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrepareClubPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportPublicClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "55a8589847c8b2e2c13b31c183f5f019";

export default node;
