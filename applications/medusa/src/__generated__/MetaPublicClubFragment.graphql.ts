/**
 * @generated SignedSource<<1af900250d0d49e85befee42cc35a25f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubFragment" | "PublicClubRichObjectFragment" | "PublicClubStructuredDataFragment">;
  readonly " $fragmentType": "MetaPublicClubFragment";
};
export type MetaPublicClubFragment$key = {
  readonly " $data"?: MetaPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicClubRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicClubStructuredDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "77e0f9ee6b9911c392b1e4090510ddc6";

export default node;
