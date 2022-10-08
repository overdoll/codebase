/**
 * @generated SignedSource<<ca88b9cf579a79c245edd9888a764e63>>
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
              "kind": "RequiredField",
              "field": {
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
              },
              "action": "THROW",
              "path": "thumbnailMedia.colorPalettes"
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

(node as any).hash = "7118927490ddeed5708e89b07ece2659";

export default node;
