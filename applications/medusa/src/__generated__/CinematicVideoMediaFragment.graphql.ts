/**
 * @generated SignedSource<<0116744714eacf72cd4bf2e7bbec252f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CinematicVideoMediaFragment$data = {
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment" | "PosterImageMediaFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ContainersVideoMediaFragment">;
  readonly " $fragmentType": "CinematicVideoMediaFragment";
};
export type CinematicVideoMediaFragment$key = {
  readonly " $data"?: CinematicVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CinematicVideoMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMedia",
      "kind": "LinkedField",
      "name": "cover",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BackgroundPosterImageMediaFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PosterImageMediaFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainersVideoMediaFragment"
    }
  ],
  "type": "VideoMedia",
  "abstractKey": null
};

(node as any).hash = "a6535c413a458e44c78197ce3ff9c401";

export default node;
