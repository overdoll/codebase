/**
 * @generated SignedSource<<191a7a45896bca91de4d809e016274af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicPostFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicPostFragment" | "CinematicPublicPostFragment" | "DescriptionPublicPostFragment" | "PrepareGridSuggestedPostsFragment" | "PrepareSuggestedPostsFragment">;
  readonly " $fragmentType": "ContainerPublicPostFragment";
};
export type ContainerPublicPostFragment$key = {
  readonly " $data"?: ContainerPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DescriptionPublicPostFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrepareSuggestedPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PrepareGridSuggestedPostsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "4ee2df8215b51e8e85a72532964f5475";

export default node;
