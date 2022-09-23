/**
 * @generated SignedSource<<66e62abf64d5a5fa810ee8e5d104656c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubFragment" | "ButtonsPublicClubFragment" | "HeaderPublicClubFragment" | "PrepareClubPostsFragment">;
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
      "name": "id",
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
      "name": "ButtonsPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrepareClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "629f7147f881fe28adaed8529854c733";

export default node;
