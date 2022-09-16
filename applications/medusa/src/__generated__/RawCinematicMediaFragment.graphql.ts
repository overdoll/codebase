/**
 * @generated SignedSource<<82930f3e642845cbdbca0801ac24bae1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RawCinematicMediaFragment$data = {
  readonly __typename: string;
  readonly " $fragmentSpreads": FragmentRefs<"CinematicMediaFragment" | "ProcessingRawMediaFragment">;
  readonly " $fragmentType": "RawCinematicMediaFragment";
};
export type RawCinematicMediaFragment$key = {
  readonly " $data"?: RawCinematicMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RawCinematicMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RawCinematicMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProcessingRawMediaFragment"
        }
      ],
      "type": "RawMedia",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicMediaFragment"
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};

(node as any).hash = "30603e5b3812b637c3b698e8ed3378ae";

export default node;
