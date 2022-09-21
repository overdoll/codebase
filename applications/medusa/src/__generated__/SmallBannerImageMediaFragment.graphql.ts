/**
 * @generated SignedSource<<76a048287a28bc1ea5f060908c6e2459>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmallBannerImageMediaFragment$data = {
  readonly colorPalettes: ReadonlyArray<{
    readonly blue: number;
    readonly green: number;
    readonly red: number;
  }>;
  readonly variants: {
    readonly smallBanner: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
  };
  readonly " $fragmentType": "SmallBannerImageMediaFragment";
};
export type SmallBannerImageMediaFragment$key = {
  readonly " $data"?: SmallBannerImageMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SmallBannerImageMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmallBannerImageMediaFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMediaVariants",
      "kind": "LinkedField",
      "name": "variants",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ImageMediaAccess",
          "kind": "LinkedField",
          "name": "smallBanner",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ImageMedia",
  "abstractKey": null
};

(node as any).hash = "4dd9399aa2471708a5e16e6bb9fe01c5";

export default node;
