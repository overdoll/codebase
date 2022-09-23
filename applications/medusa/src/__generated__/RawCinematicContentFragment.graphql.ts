/**
 * @generated SignedSource<<a35a0179e010fdbe1595257a62951aea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawCinematicContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly __typename: "PostContent";
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicCarouselFragment" | "RawCinematicGalleryFragment">;
  readonly " $fragmentType": "RawCinematicContentFragment";
};
export type RawCinematicContentFragment$key = {
  readonly " $data"?: RawCinematicContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawCinematicContentFragment",
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
      "name": "RawCinematicGalleryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawCinematicCarouselFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "cacb3c9926c9d82f29f0baabf9bf134a";

export default node;
