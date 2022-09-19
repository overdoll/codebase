/**
 * @generated SignedSource<<077ce7b0b3dc77151f51a52010680265>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubFragment$data = {
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

(node as any).hash = "07128e7a81809ae336d745faf79446cd";

export default node;
