/**
 * @generated SignedSource<<1afda26b4d59909aed58dc70d015899b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly __typename: "PostContent";
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicCarouselFragment" | "CinematicGalleryFragment">;
  readonly " $fragmentType": "CinematicContentFragment";
};
export type CinematicContentFragment$key = {
  readonly " $data"?: CinematicContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicGalleryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicCarouselFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9019a040a98ef5ce5d9aa09fa9c0182b";

export default node;
