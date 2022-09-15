/**
 * @generated SignedSource<<740f551e5ba8caa6a07b0ecf054bc72f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BackgroundPosterImageMediaFragment$data = {
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

(node as any).hash = "cdd96f4268bc5a84d0e47946aa096a96";

export default node;
