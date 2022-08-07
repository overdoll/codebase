/**
 * @generated SignedSource<<85c024fdc02ba60c9a658dd9197001a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly contributor: {
    readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedViewerFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostDescriptionFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment" | "PostPrivateHeaderFragment">;
  readonly " $fragmentType": "PostReviewFragment";
};
export type PostReviewFragment$key = {
  readonly " $data"?: PostReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostGalleryPublicDetailedViewerFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostPrivateHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ff45b28eb5eadaec0c31408ed8b5328b";

export default node;
