/**
 * @generated SignedSource<<2068a2f4bb09ce3de6d4d3e8b41f55df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly __typename: "PostContent";
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicCarouselFragment" | "RouletteGalleryFragment">;
  readonly " $fragmentType": "RouletteContentFragment";
};
export type RouletteContentFragment$key = {
  readonly " $data"?: RouletteContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteContentFragment",
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
      "name": "RouletteGalleryFragment"
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

(node as any).hash = "1632fee64e877b5116c580ea7897fcbf";

export default node;
