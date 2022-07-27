/**
 * @generated SignedSource<<99cc3c963079e4eb8e101f23b0c3bda5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostDescriptionFragment" | "PostFooterButtonsFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderFragment">;
  readonly " $fragmentType": "FullDetailedPostFragment";
};
export type FullDetailedPostFragment$key = {
  readonly " $data"?: FullDetailedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
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
      "name": "PostHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "66d2a64582af2bd754a526f3aed3242b";

export default node;
