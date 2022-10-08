/**
 * @generated SignedSource<<6bdd1519cfbf404617f7d32eff35d4bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FancyClubIcon$data = {
  readonly slug: string;
  readonly thumbnailMedia: {
    readonly colorPalettes?: ReadonlyArray<{
      readonly blue: number;
      readonly green: number;
      readonly red: number;
    }>;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  readonly " $fragmentType": "FancyClubIcon";
};
export type FancyClubIcon$key = {
  readonly " $data"?: FancyClubIcon$data;
  readonly " $fragmentSpreads": FragmentRefs<"FancyClubIcon">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FancyClubIcon",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "thumbnailMedia",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ColorPalette",
              "kind": "LinkedField",
              "name": "colorPalettes",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "red",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "green",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "blue",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "ImageMedia",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "86afbe770b59a26edf0e2de9ca373219";

export default node;
