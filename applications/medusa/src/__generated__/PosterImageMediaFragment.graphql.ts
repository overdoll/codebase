/**
 * @generated SignedSource<<fadea24f35002cf622231b7bdfcc3871>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PosterImageMediaFragment$data = {
  readonly variants: {
    readonly small: {
      readonly height: number;
      readonly url: string;
      readonly width: number;
    };
  };
  readonly " $fragmentType": "PosterImageMediaFragment";
};
export type PosterImageMediaFragment$key = {
  readonly " $data"?: PosterImageMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PosterImageMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PosterImageMediaFragment",
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
          "name": "small",
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

(node as any).hash = "eb3eff4429ba3848beaff46d8ca4e20a";

export default node;
