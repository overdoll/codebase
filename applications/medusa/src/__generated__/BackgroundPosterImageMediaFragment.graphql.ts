/**
 * @generated SignedSource<<14e3ac42cf0ca8de33c49a05010d09ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BackgroundPosterImageMediaFragment$data = {
  readonly colorPalettes: ReadonlyArray<{
    readonly blue: number;
    readonly green: number;
    readonly red: number;
  }>;
  readonly variants: {
    readonly thumbnail: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
  };
  readonly " $fragmentType": "BackgroundPosterImageMediaFragment";
};
export type BackgroundPosterImageMediaFragment$key = {
  readonly " $data"?: BackgroundPosterImageMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackgroundPosterImageMediaFragment",
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
          "name": "thumbnail",
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

(node as any).hash = "039f5f073330cf278125a622694cc649";

export default node;
