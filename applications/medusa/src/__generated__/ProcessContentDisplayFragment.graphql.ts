/**
 * @generated SignedSource<<602a1808d0f9ea240fb866620b44f16c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentDisplayFragment$data = {
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly failed: boolean;
      readonly processed: boolean;
      readonly progress: {
        readonly progress: number;
      } | null;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentType": "ProcessContentDisplayFragment";
};
export type ProcessContentDisplayFragment$key = {
  readonly " $data"?: ProcessContentDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentDisplayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessContentDisplayFragment",
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
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "failed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "processed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ResourceProgress",
              "kind": "LinkedField",
              "name": "progress",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "progress",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ExpandableResourceInfoFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ca76435590703986e1f7df684c5d8669";

export default node;
