/**
 * @generated SignedSource<<6334b5b3b7f33533e2c51e46162e0535>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollClubPostsFragment">;
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
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a498a6fca6fc2cbeb3600ff7f607c19a";

export default node;
