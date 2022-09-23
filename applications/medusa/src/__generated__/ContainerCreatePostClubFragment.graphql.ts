/**
 * @generated SignedSource<<bf81a2231e345e529cc36cc409a28c46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerCreatePostClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerCreatePostClubFragment" | "NewCreatePostClubFragment">;
  readonly " $fragmentType": "ContainerCreatePostClubFragment";
};
export type ContainerCreatePostClubFragment$key = {
  readonly " $data"?: ContainerCreatePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerCreatePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerCreatePostClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerCreatePostClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewCreatePostClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6ac56a98dd05aaf9463a5c0d55ed4d0b";

export default node;
